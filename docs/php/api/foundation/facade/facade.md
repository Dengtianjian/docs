# Facade

`kernel\Foundation\Facade\Facade`  ·  class

源码：`gstudio_kernel/Foundation/Facade/Facade.php`

> 门面基类

## 声明

```php
class Facade
```

## 概述

提供静态转发能力：所有静态调用将被转发到 accessor() 返回的底层实例的对应方法。

自动判定单例/多例（无需子类手动覆写 singleton()）：
- 子类覆写 resolve()  →  单例门面：resolve() 提供兜底实例工厂，
accessor() 首次解析后缓存到 $registry，后续复用同一实例
- 子类覆写 accessor() →  多例门面：每次转发都经该 accessor() 返回新实例

子类只需按需实现 resolve()（单例）或 accessor()（多例），无需再写 singleton()。

若底层实例无法解析（accessor() 返回 null），则对应静态调用返回 null，
由子类决定是否在 accessor() 内抛出更明确的异常。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $registry` | `array` | `[]` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 门面构造函数 |
| [`singleton()`](#singleton) | — |
| [`setInstance()`](#setinstance) | 替换门面背后的底层实例（单例门面） |
| [`getInstance()`](#getinstance) | 获取当前已解析的底层实例（不触发 resolve()） |
| [`clearInstance()`](#clearinstance) | 清除已解析的底层实例 |
| [`of()`](#of) | 包装任意类为门面代理（无需手动实例化） |
| [`__callStatic()`](#__callstatic) | 静态转发：将未定义的静态方法调用委托给底层实例 |

### __construct()

```php
public function __construct()
```

门面构造函数

实例化门面时按子类实现策略主动解析底层实例：
- 子类覆写 resolve()（单例）→ 调用 resolve() 创建兜底实例；
- 子类覆写 accessor()（多例）→ 调用 accessor() 获取实例；
- 两者皆无 → 不执行任何解析（空构造）。

该构造仅为「实例化即预热」提供入口，静态调用路径（__callStatic）不受影响。

### singleton()

```php
public static function singleton(): bool
```

返回：`bool`

### setInstance()

```php
public static function setInstance($instance)
```

替换门面背后的底层实例（单例门面）

用于应用装配阶段注入自定义实例（例如给 FileStorage 门面注入带多磁盘 / 云存储 /
元信息落库的实例），或测试时替换为桩实例。设置后，静态调用一律转发到该实例，
不再触发 resolve()。

注意：多例门面（覆写 accessor()）不使用本注册表，本方法对其无效。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$instance` | `object` | — | 底层实例 |

### getInstance()

```php
public static function getInstance()
```

获取当前已解析的底层实例（不触发 resolve()）

尚未解析 / setInstance 过时返回 null；需要确保拿到实例请改用 `accessor`。

### clearInstance()

```php
public static function clearInstance()
```

清除已解析的底层实例

清除后下次静态调用会重新解析：单例门面重新走 `resolve`，
多例门面走子类 `accessor`。

### of()

```php
public static function of(string $class, ...$args)
```

包装任意类为门面代理（无需手动实例化）

返回 `FacadeProxy`，调用方可直接在其上以「方法调用」形式使用目标类的实例方法，
底层自动单例化目标类（同一类名首次实例化后复用）。

示例：
```php
Facade::of(SomeService::class)->doSomething($a);
Facade::of(SomeService::class, $dep)->run(); // 构造参数仅首次实例化生效
```

与 `__callStatic`（门面子类的静态转发）相互独立：本方法不要求目标类继承
`Facade`，也不要求方法是 static，直接对任意类生效。

```php
Facade::of(SomeService::class)->doSomething($a);
Facade::of(SomeService::class, $dep)->run(); // 构造参数仅首次实例化生效
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `string` | — | 目标类名（完整命名空间） |
| `$args` | `...mixed` | — | 目标类构造参数（仅首次实例化生效） |

### __callStatic()

```php
public static function __callStatic(string $method, array $arguments)
```

静态转发：将未定义的静态方法调用委托给底层实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 方法名 |
| `$arguments` | `array` | — | 参数列表 |

## 非公开方法

**protected**

- `protected static function hasOwnMethod(string $name): bool` —— 判定子类是否自行声明（覆写）了指定方法
- `protected static function accessor()` —— 获取门面背后的底层实例
- `protected static function resolve()` —— 兜底实例工厂（仅单例门面需覆写）

## 同目录

- [FacadeProxy](/php/api/foundation/facade/facade-proxy)

