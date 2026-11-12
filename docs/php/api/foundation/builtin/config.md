# Config

`kernel\Foundation\Builtin\Config`  ·  class

源码：`gstudio_kernel/Foundation/Builtin/Config.php`

> 配置（每个应用一份）

## 声明

```php
class Config extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

应用侧一律 `$app->config()`：拿到的是**本应用**的配置实例，读的是本应用目录下
`Configs/` 的五层文件；容器里是同一个对象（`make(Config::class)` 与 `$app->config()` 一致）。

归属由容器注入（`AbilityBaseObject::app`），本类不持有也不推断应用 ID：
- 无构造参数，归属只来自容器——容器构造完实例才 `bindApp()`，所以配置在**首次访问**时
才读文件（`ensureLoaded`），构造期读会落到默认应用；
- 配置读哪个目录，只由「哪个应用的容器构造了它」决定；
- 跨应用读配置必须显式走对方应用的容器：`App::of("gstudio_super_app")->config()`；
- 没有静态入口 `Config::of()`——组件一律从容器取，否则各组件都能自己造一个「访问别人」的口子。

键路径支持 `.` 与 `/` 两种层级分隔符："database.mysql.host" 等价于 "database/mysql/host"。

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `FILES` | `[ "Config.php", "Config.development.php", "Config.local.php", "Config.production.php", "Config.release.php", ]` | 五层配置文件，按顺序读取，后读的覆盖先读的 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$items` | `array` | protected | 内存配置 |
| `$loaded` | `bool` | protected | 是否已尝试读过配置文件（没有 Configs/ 目录也算读过） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`load()`](#load) | 加载本应用 `Configs/` 下的五层配置 |
| [`read()`](#read) | 读取单个配置文件并深度合并进内存配置 |
| [`loaded()`](#loaded) | 是否已读过配置文件 |
| [`get()`](#get) | 获取配置项 |
| [`all()`](#all) | 全部配置 |
| [`set()`](#set) | 运行时设置配置值（仅内存，不写文件） |
| [`has()`](#has) | 判断配置键是否存在 |
| [`forget()`](#forget) | 删除配置键（只删目标节点，不动同级与上级） |
| [`push()`](#push) | 向数组类型的配置项追加值 |
| [`flush()`](#flush) | 清空本实例的全部配置 |

### load()

```php
public function load()
```

加载本应用 `Configs/` 下的五层配置

目录不存在就直接返回（应用可以没有配置文件）；重复调用会重复合并。

### read()

```php
public function read($filePath)
```

读取单个配置文件并深度合并进内存配置

配置文件直接 `return` 一个配置数组即可，不需要以 appId 作顶级键。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string|null` | — | 配置文件完整路径 |

### loaded()

```php
public function loaded()
```

是否已读过配置文件

只查状态、不触发加载：首次 `get()` / `all()` 等访问时才读文件。

### get()

```php
public function get($key = null, $defaultValue = null)
```

获取配置项

用 `.` 或 `/` 分隔逐层深入查找，任一层级不存在即返回 $defaultValue；
传 null 返回本应用的全部配置。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 配置键路径，null 返回全部 |
| `$defaultValue` | `mixed` | `null` | 缺省值 |

### all()

```php
public function all()
```

全部配置

### set()

```php
public function set($keyOrValue, $value = null)
```

运行时设置配置值（仅内存，不写文件）

两种模式：
1. 数组合并：只传一个数组，用 Arr::merge() 深度合并；
2. 键值设置：`set("database.mysql.host", "127.0.0.1")`，支持 `.` / `/` 路径，
中间节点不存在时自动建空数组，可显式设成 null。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keyOrValue` | `string|array` | — | 键名或整个配置数组 |
| `$value` | `mixed` | `null` | 键值 |

### has()

```php
public function has($key)
```

判断配置键是否存在

用于区分「键不存在」与「键存在但值为 null」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 配置键路径 |

### forget()

```php
public function forget($key)
```

删除配置键（只删目标节点，不动同级与上级）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 配置键路径 |

### push()

```php
public function push($key, $value)
```

向数组类型的配置项追加值

目标键或中间层级不存在、不是数组时，自动建空数组再追加。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 配置键路径 |
| `$value` | `mixed` | — | 要追加的值 |

### flush()

```php
public function flush()
```

清空本实例的全部配置

## 非公开方法

**protected**

- `protected static function parseKey($key)` —— 解析键路径：`.` 统一转 `/` 后拆层

**private**

- `private function ensureLoaded()` —— 确保配置已从文件读入（首次访问时触发）

## 同目录

- [Cache](/php/api/foundation/builtin/cache)
- [Deployment](/php/api/foundation/builtin/deployment)
- [Event](/php/api/foundation/builtin/event)
- [Lifecycle](/php/api/foundation/builtin/lifecycle)
- [Log](/php/api/foundation/builtin/log)

