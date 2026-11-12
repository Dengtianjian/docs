# Container

`kernel\Foundation\Application\Container`  ·  class

源码：`gstudio_kernel/Foundation/Application/Container.php`

> 应用容器

## 声明

```php
class Container
```

## 概述

四张表，按「什么时候构造」区分，键统一是「别名，没有别名就用类名」：
- `$providers`：名字 => 实例。**登记即构造**，取用直接返回，适合装配类（构造即装配）；
- `$deferred` ：名字 => 实现体。登记不构造，首次取用才建，适合框架零件这类构造有副作用的；
- `$bindings` ：名字 => 实现体。每次取用都新建，取用时传的参数即构造参数；
- `$imports`  ：名字 => 来源。只记 appId 与转发目标，实际构造发生在提供方容器。

实现体支持四种形态，三张「按需构造」的表共用一套解析：
类名（反射构造，参数自动注入）/ 实例 / 闭包（调用并注入）/ `[类名, 方法]`（工厂，每次新建）。

一个名字只能出现在一张表里：同名重复登记直接报错，不做「后登记覆盖」。
登记时给了别名，就**只**登记别名；但取用时若写的是实现类的完整类名，
会按实现体反查一次（`findByConcrete`），保证 `make(类名)` 与 `$app->别名()`
指向同一个条目。

## 相关

- `Application::__call` `$app->xxx()` 的实现

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$app` | `Application` | protected | 所属应用 |
| `$providers` | `array` | protected | 已构造的单例：名字 => 实例 |
| `$deferred` | `array` | protected | 延迟构造的单例：名字 => 实现体 |
| `$bindings` | `array` | protected | 多例：名字 => 实现体，每次取用新建 |
| `$imports` | `array` | protected | 跨应用来源：名字 => ['appId' => 提供方, 'target' => 提供方容器里的名字] |
| `$resolving` | `array` | protected | 正在构造的实现体（循环依赖检测） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`provider()`](#provider) | 登记单例：**登记即构造** |
| [`defer()`](#defer) | 登记延迟单例：登记不构造，首次取用才建 |
| [`bind()`](#bind) | 登记多例：每次取用新建 |
| [`import()`](#import) | 声明「某个名字由另一个应用提供」 |
| [`make()`](#make) | 取用（唯一入口） |
| [`has()`](#has) | 该名字是否已登记 |
| [`providers()`](#providers) | 已构造的单例（排查用） |
| [`imports()`](#imports) | 已登记的跨应用来源 |

### __construct()

```php
public function __construct(Application $app)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$app` | `Application` | — | — |

### provider()

```php
public function provider($concrete, $name = null)
```

登记单例：**登记即构造**

传类名/闭包/工厂时当场构造一次并入表，之后取用返回同一实例——适合「构造即装配」
的类（挂中间件、建磁盘池、登记账号）。构造会带来的副作用因此发生在装配期。

传实例时直接入表（归属只在为空时补，见 `bindApp`）。

需要「登记但不构造」请用 `defer`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `object|string|callable|array` | — | 实现体：类名 / 实例 / 闭包 / [类名, 方法] |
| `$name` | `string|null` | `null` | 取用名；省略时用实现体的类名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 名字冲突、实现体无法识别或构造失败时抛出

### defer()

```php
public function defer($concrete, $name = null)
```

登记延迟单例：登记不构造，首次取用才建

用于「构造有副作用、但希望等真正用到再付代价」的类（框架零件：Request / Router
/ Lifecycle / Middleware）；传实例时与 `provider` 等价。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `object|string|callable|array` | — | 实现体 |
| `$name` | `string|null` | `null` | 取用名；省略时用实现体的类名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 名字冲突时抛出

### bind()

```php
public function bind($concrete, $name = null)
```

登记多例：每次取用新建

取用时传入的参数即构造参数（`$app->foo($a, $b)`）。传实例时退化为单例
——「每次新建」对现成对象没有意义。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `object|string|callable|array` | — | 实现体 |
| `$name` | `string|null` | `null` | 取用名；省略时用实现体的类名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 名字冲突时抛出

### import()

```php
public function import($source, $appId = null, $alias = null)
```

声明「某个名字由另一个应用提供」

只记来源，不构造；取用时转发到提供方容器，由提供方那条登记的语义决定构造时机
（实例直接返回、延迟的首次构造、多例的每次新建）。

三种形态：
- `import(类名, appId, 别名)`：最常用；
- `import(类名)`：按根命名空间推导 appId（`kernel\` 下的类无归属，必须给 appId）；
- `import($实例, 名字)`：等价 `provider`——实例自带归属，不需要声明来源。

转发要求提供方**已装配**（`Application::assembled`），否则会明确报「尚未装配」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$source` | `string|object` | — | 类名或实例 |
| `$appId` | `string|null` | `null` | 提供方应用 ID；来源是实例时该位置是取用名 |
| `$alias` | `string|null` | `null` | 取用别名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 推导不出 appId 或名字冲突时抛出

### make()

```php
public function make($name, array $params = [])
```

取用（唯一入口）

名字先按「别名 / 完整类名」精确命中；没命中且是完整类名时，按实现体反查
（`findByConcrete`），再退到反射构造。`$app->xxx(...)` 是它的语法糖。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 登记名或完整类名 |
| `$params` | `array` | `[]` | 构造参数（仅多例生效；位置或命名均可） |

可能抛出：

- [Error](/php/api/foundation/exception/error) 名字不存在且不是可用类名、单例传参、提供方未装配时抛出

### has()

```php
public function has($name)
```

该名字是否已登记

登记名命中，或「按实现体反查」命中，都算有。不构造。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 登记名或完整类名 |

### providers()

```php
public function providers()
```

已构造的单例（排查用）

### imports()

```php
public function imports()
```

已登记的跨应用来源

## 非公开方法

**protected**

- `protected function resolveImported($name, $entry, array $params = [])` —— 把取用转发到提供方容器
- `protected function findByConcrete($name)` —— 按实现体反查登记名
- `protected function buildConcrete($concrete, array $args = [], $expect = "")` —— 按实现体构造实例
- `protected function assertConcrete($result, $expect = "")` —— 校验工厂返回值确实是期望的类
- `protected function buildClass($class, array $args = [])` —— 反射构造一个类，构造参数自动注入
- `protected function resolveParameters(ReflectionFunctionAbstract $function, array $args = [])` —— 解析一个可调用目标的参数（构造函数 / 方法 / 闭包共用）
- `protected function describeCallable(ReflectionFunctionAbstract $function)` —— 描述一个可调用目标（错误信息用）
- `protected function resolveName($concrete, $name = null)` —— 算出登记名：给了别名就用别名，否则用实现体自带的类名
- `protected function assertNameFree($key, $name)` —— 名字是否已被占用（四张表共用一个命名空间）
- `protected function bindApp($object)` —— 把实例绑定到本容器所属应用
- `protected function normalize($abstract)` —— 归一化名字：去前导反斜杠、转小写

## 同目录

- [Application](/php/api/foundation/application/application)
- [Applications](/php/api/foundation/application/applications)
- [Identity](/php/api/foundation/application/identity)

