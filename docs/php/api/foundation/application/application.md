# Application

`kernel\Foundation\Application\Application`  ·  class

源码：`gstudio_kernel/Foundation/Application/Application.php`

> 应用基类：身份 + 容器 + 组件装配

## 声明

```php
class Application
```

## 概述

一个应用就是「一个 ID + 一个容器」，本类只回答这两件事：
我是谁（`appId`）、我有哪些组件（`register` / `bind` / `import` / `make` / `$app->xxx()`）。
与请求、路由、响应有关的执行流程不在这里——那是子类 [App](/php/api/foundation/app) 的事。

之所以拆成两层：这十几个方法对 HTTP 零依赖，`new` 完不开请求就能单测；而 Web 那一层
可以整体替换，将来要 console 应用或队列 worker，继承本类即可，不必再拖一份路由代码。

组件一律由容器持有，本类不为组件保留属性；`$app->xxx()` 由 `__call`
按类短名解析到容器。新增组件只需在装配期绑定，不需要改这个类。

## 相关

- `Container` 绑定与解析
- `__call` 短名到容器的解析规则

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$id` | `string|null` | protected | 当前应用的ID（id），也是项目文件夹名称。取自已实例化 App 的第一个构造参数，后实例化者覆盖 |
| `$kernelId` | `string|null` | protected | 内核的ID（KernelId），也是内核目录文件夹名称，默认 "kernel" |
| `$container` | `Container|null` | protected | 组件容器（内部件） |
| `$startTime` | `int|null` | protected | 应用启动时间（毫秒时间戳），响应里算 requiredTime 用 |
| `$assembled` | `bool` | protected | 是否已完成装配（Bootstrap 已执行） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建 App：应用基座 |
| [`appId()`](#appid) | 本实例的应用 ID |
| [`assembled()`](#assembled) | 本应用是否已完成装配 |
| [`startTime()`](#starttime) | 应用启动时间（毫秒时间戳） |
| [`mode()`](#mode) | 获取当前运行模式（mode） |
| [`isDevelopment()`](#isdevelopment) | 本应用是否开发模式（`mode === "development"`，字面量比较） |
| [`isProduction()`](#isproduction) | 本应用是否生产模式（`mode === "production"`，字面量比较） |
| [`resolvedConfig()`](#resolvedconfig) | 已加载的配置实例（**不触发加载**） |
| [`container()`](#container) | 取内部容器（实现细节） |
| [`provider()`](#provider) | 登记一个单例组件（装配期调用） |
| [`defer()`](#defer) | 登记延迟单例 |
| [`has()`](#has) | 该名字是否已登记（不论有没有构造） |
| [`bind()`](#bind) | 登记一个多例类 |
| [`make()`](#make) | 解析实例 |
| [`import()`](#import) | 声明「本应用的某个能力来自另一个应用」 |
| [`imports()`](#imports) | 本应用引入了哪些外部能力（排查用） |
| [`providers()`](#providers) | 已构造的单例（排查用） |
| [`__call()`](#__call) | 组件名访问：`$app->request()` / `$app->config()` / `$app->settingProvider()` … |
| [`kernelId()`](#kernelid) | 本实例的内核 ID（KernelId），即内核目录文件夹名称 |
| [`of()`](#of) | 按应用 ID 或该类所属的任意类名，取对方的应用实例 |
| [`owner()`](#owner) | 类所归属的应用 ID |

### __construct()

```php
public function __construct($id, $kernelId = "kernel")
```

构建 App：应用基座

只做基座准备（记录身份、登记到应用管理器、建容器、记启动时间），**不构造任何组件实例**：
组件首次 `$app->x()` 才反射实例化，因此 `of` 懒装配别的应用时
不会顺带把对方的请求、路由表、钩子链拉起来。

没有独立的 `boot()` 步骤：基座就是构造函数本身，子类要追加初始化就覆盖构造函数、
先调 `parent::__construct()`（见 [App](/php/api/foundation/app)）。
少一层间接调用，也避免「构造完还得记得再 boot 一次」这种半初始化的对象状态。

要换掉某个组件实现，装配类里 `$app->register($custom)` 即可——容器里的实例优先。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 设定一个 APP 唯一标识，跟项目目录同名 |
| `$kernelId` | `string` | `"kernel"` | 修改内核默认 id。内核也是一个 APP，所以也有 ID，默认是 kernel |

### appId()

```php
public function appId()
```

本实例的应用 ID

回答「我这个应用是谁」——多应用共存时只有它是可靠的。静态上下文中要取
「当前默认应用是谁」请用 `Applications::defaultId`。

服务 / 上下文里要记「这条数据属于哪个应用」，一律用本方法，不要用静态的。

### assembled()

```php
public function assembled()
```

本应用是否已完成装配

`true` 表示装配类（Bootstrap）已经跑过、业务组件已进容器；
`false` 有两种可能：还没装配（正在构造）、或只是 `of` 建出来的骨架。

跨应用 import 前应确认提供方为 `true`，否则取用时会报「没有登记」。

### startTime()

```php
public function startTime()
```

应用启动时间（毫秒时间戳）

在构造函数里写入，比「读配置的 startTime」可靠：配置可能压根没加载。

### mode()

```php
public static function mode(): string
```

获取当前运行模式（mode）

读取默认应用配置的 "mode" 键（`$app->config()->get("mode", "production")`），未配置时默认 "production"。
替代原 F_APP_MODE 常量，无需提前定义，随时可安全调用。

静态上下文用本方法；手上已有应用实例时用 `isDevelopment` / `isProduction`，
那两个读的是**该实例自己**的配置（多应用可以是不同模式）。

返回：`string` —— string 运行模式（production / development / local / release 等）

### isDevelopment()

```php
public function isDevelopment(): bool
```

本应用是否开发模式（`mode === "development"`，字面量比较）

读本实例所属应用的配置，"mode" 缺失时按 `production`：保守取向，不能因为配置缺失就把调试详情暴露出去。

返回：`bool` —— bool

### isProduction()

```php
public function isProduction(): bool
```

本应用是否生产模式（`mode === "production"`，字面量比较）

配置缺失也算生产模式；要「非开发即生产」的宽松判定请写 `!$app->isDevelopment()`。

返回：`bool` —— bool

### resolvedConfig()

```php
public function resolvedConfig()
```

已加载的配置实例（**不触发加载**）

[Config](/php/api/foundation/builtin/config) 会构建并读文件；本方法只回答「已经加载了没有」。
给静态入口（`mode`）和排查用。

### container()

```php
public function container()
```

取内部容器（实现细节）

业务代码请直接调用 Application / App 上的 register / bind / make / import，
不要通过本方法绕行——容器是内部件，不作为第二个对外概念存在。

### provider()

```php
public function provider($concrete, $name = null)
```

登记一个单例组件（装配期调用）

传类名则立即反射构造（构造参数按类型自动注入），传实例则直接登记；
继承 `Context` 的进请求级表（`flush()` 会清），其余进应用级表。

支持数组批量登记：`register([A::class, "alias" => B::class])`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `mixed` | — | — |
| `$name` | `mixed` | `null` | — |

### defer()

```php
public function defer($concrete, $name = null)
```

登记延迟单例

与 `provider` 相同，只是强调「首次取用才构造」；传实例时退化为单例。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `object|string|callable|array` | — | 实现体 |
| `$name` | `string|null` | `null` | 取用名；省略时按实现体推导 |

### has()

```php
public function has($abstract)
```

该名字是否已登记（不论有没有构造）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$abstract` | `string` | — | 类名或别名 |

### bind()

```php
public function bind($concrete, $name = null)
```

登记一个多例类

第一个参数永远是类名，第二个参数可选地给它起个短名；不传短名时自动取类短名。
登记后 `make("短名")` / `make(类名)` 都可用，每次都是新对象，从不缓存。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$concrete` | `mixed` | — | — |
| `$name` | `mixed` | `null` | — |

### make()

```php
public function make($abstract, array $params = [])
```

解析实例

顺序：已登记单例 → 多例别名 → 跨应用来源 → 反射构造。
反射构造出来的一次性对象**不缓存**；要共享就先 `register()`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$abstract` | `string|object` | — | 类名、别名或实例 |
| `$params` | `array` | `[]` | 标量参数（参数名 => 值） |

### import()

```php
public function import($abstract, $appId = null, $alias = null)
```

声明「本应用的某个能力来自另一个应用」

装配期一行，之后照旧 `make()`。记 appId 不记实例：时序无关、支持懒启动、双向对称。
不传 appId 时按类名根命名空间推导，`kernel\` 下的类必须显式传。
第三个参数给导入起别名，之后 `$app->别名()` / `make("别名")` 都能取到。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$abstract` | `string` | — | 抽象名（类名） |
| `$appId` | `string|null` | `null` | 提供方应用 ID |
| `$alias` | `string|null` | `null` | 取用别名 |

### imports()

```php
public function imports()
```

本应用引入了哪些外部能力（排查用）

### providers()

```php
public function providers()
```

已构造的单例（排查用）

### __call()

```php
public function __call($name, $arguments)
```

组件名访问：`$app->request()` / `$app->config()` / `$app->settingProvider()` …

只查**已登记的单例**（`providers` → `contexts`），短名大小写不敏感、也接受完整类名，
必须唯一命中。不做反射兜底：拼错、没登记、重名都直接抛错。

要「每次新建」的对象不登记，用 `bind()` 起别名后走 `make("别名")`——
`__call` 不碰多例，避免同一个方法名有时同一份、有时新的。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 组件短名或完整类名 |
| `$arguments` | `array` | — | 不接受参数；需要传参请用 `make(类名, [...])` |

可能抛出：

- [Error](/php/api/foundation/exception/error) 传参 / 未登记 / 短名歧义时抛出

### kernelId()

```php
public function kernelId()
```

本实例的内核 ID（KernelId），即内核目录文件夹名称

就是构造时传入的第二个参数（DiscuzX 下默认 `gstudio_kernel`，其余默认 `kernel`）。
多应用共存时只有它是可靠的——静态语境要取「默认应用的内核 ID」，
请写 `Applications::default()->kernelId()`，不要用静态的。

### of()

```php
public static function of($idOrClass)
```

按应用 ID 或该类所属的任意类名，取对方的应用实例

与「隐式回落」的区别：必须写出要访问谁（ID 或类名），取不到直接抛错。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$idOrClass` | `string` | — | 应用 ID 或该应用的任意类名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 无法确定应用 ID，或该应用尚未登记时抛出

### owner()

```php
public static function owner($classOrObject)
```

类所归属的应用 ID

依据是类型的根命名空间（等于插件目录名），与「当前在跑哪个应用」无关。
`kernel\` 是无归属的共用代码，返回 null——此时跨应用调用必须显式写 appId。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$classOrObject` | `object|string` | — | 对象、类名或命名空间字符串 |

## 非公开方法

**protected**

- `protected function __clone()`
- `protected static function instanceClass()` —— 懒装配新应用时使用的类

## 同目录

- [Applications](/php/api/foundation/application/applications)
- [Container](/php/api/foundation/application/container)
- [Identity](/php/api/foundation/application/identity)

