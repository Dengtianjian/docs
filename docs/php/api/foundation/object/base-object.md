# BaseObject

`kernel\Foundation\Object\BaseObject`  ·  class

源码：`gstudio_kernel/Foundation/Object/BaseObject.php`

> 基对象，提供通用的实例化与单例能力

## 声明

```php
class BaseObject
```

## 概述

设计约定（子类与调用方务必知晓）：
- 单例缓存按 `get_called_class()`（后期静态绑定的实际类名）分类存放，
互不共享、也不随继承传递——每个具体子类各持有一份单例。
- 单例「只认类型、不认参数」：构造参数仅在首次实例化时生效。
首次实例化后，无参调用 `singleton()` 是取缓存的常规用法，不受影响；
若之后又以**不同的非空参数**调用 `singleton()`，会抛出 `LogicException`
以提示调用方，避免静默拿到旧实例。
- 单例不可通过 `clone` 或反序列化绕过唯一性（已私有化 `__clone`、
并令 `__wakeup` 抛异常）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $singletonPool` | `array` | `[]` | 单例实例池，键为实际类名（get_called_class()） |
| `static $singletonFingerprints` | `array` | `[]` | 单例首次实例化时的构造参数指纹，键为实际类名 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$app` | `\kernel\Foundation\App|null` | protected | 本对象所属的应用 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__wakeup()`](#__wakeup) | 防止反序列化重建实例破坏单例唯一性 |
| [`singleton()`](#singleton) | — |
| [`make()`](#make) | — |
| [`hasSingleton()`](#hassingleton) | — |
| [`clearSingleton()`](#clearsingleton) | — |
| [`app()`](#app) | 本对象所属的应用 |
| [`bindApp()`](#bindapp) | 补归属应用（容器专用） |

### __wakeup()

```php
public function __wakeup()
```

防止反序列化重建实例破坏单例唯一性

可能抛出：

- `\LogicException`

### singleton()

```php
public static function singleton(...$args)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$args` | `...` | — | — |

### make()

```php
public static function make(...$args)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$args` | `...` | — | — |

### hasSingleton()

```php
public static function hasSingleton($class = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `mixed` | `null` | — |

### clearSingleton()

```php
public static function clearSingleton($class = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `mixed` | `null` | — |

### app()

```php
public function app()
```

本对象所属的应用

优先返回构造期注入的实例；未注入时回落到默认应用（= 当前请求的应用）。
两者都没有说明引导阶段就有对象在算表名 / 路径，属于装配错误——直接抛错，
让问题在 `new` 的那一刻暴露，而不是把表名拼成 `_files` 这种错得无声无息的结果。

可能抛出：

- [Error](/php/api/foundation/exception/error) 未关联任何应用时抛出

### bindApp()

```php
public function bindApp($app)
```

补归属应用（容器专用）

只在对象自身还没有归属时补；已有归属（构造签名里写了 `App` 的）原样保留。

读与写都在本类内完成——`Container` 从外部读写 protected 的 `$app` 会直接报
`Cannot access non-public member`，所以这里开一个受控入口，而不是让容器玩反射。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$app` | `\kernel\Foundation\App|null` | — | 所属应用；null 表示交给默认应用 |

## 非公开方法

**protected**

- `protected function onAppBound()` —— 归属绑定完成的钩子
- `protected function resolveApp($app = null)` —— 构造期注入所属应用

**private**

- `private function __clone()` —— 防止克隆破坏单例唯一性
- `private static function buildFingerprint(array $args)` —— 生成构造参数的指纹，用于单例参数一致性检测

## 同目录

- [AbilityBaseObject](/php/api/foundation/object/ability-base-object)
- [DataObject](/php/api/foundation/object/data-object)
- [ReadonlyDataObject](/php/api/foundation/object/readonly-data-object)

