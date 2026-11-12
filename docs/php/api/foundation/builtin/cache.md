# Cache

`kernel\Foundation\Builtin\Cache`  ·  class

源码：`gstudio_kernel/Foundation/Builtin/Cache.php`

> 基于文件的缓存（实例类，应用级）

## 声明

```php
class Cache extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

全部是实例方法：缓存目录跟着应用走，进程内已读表也是每个应用一份。
归属由容器绑定（`bindApp()`），本类没有构造参数：`$app->cache()` /
`register(Cache::class)` 造出来的一定属于那个应用；容器外 `new` 时回落到默认应用。
静态入口请用门面 [Cache](/php/api/facades/cache)；动态 KEY（静态资源版本号）
也在这里，随实例生成一次。

以 PHP 序列化格式将缓存内容写入应用 Data/Cache/ 目录，
支持过期时间与合并写入，进程内维护已读取缓存避免重复读文件。

特性：
- 过期时间以"天"为单位，支持小数（如 1/24 表示 1 小时），<=0 或 null 表示永不过期
- write() 对数组内容做合并（一层，新键覆盖旧键），overwrite() 完全替换，clear() 清空内容
- has()/read() 均自动跳过已过期缓存，过期文件在读取时顺手清理
- remember() 一键"读-生成-写"，get() 支持默认值
- increment()/decrement() 基于文件锁的原子计数器
- flush() 清空全部缓存，gc() 清理过期缓存（运维方法）

安全：
- 缓存 ID 中的路径分隔符与空字节会被替换，防止目录穿越
- 文件写入使用 LOCK_EX，避免并发写坏缓存

注意：
- read() 返回 false 表示缓存不存在，null 表示已过期，其他值为缓存内容
- 内容为 0 / "" / false 等 falsy 值时同样会被正确缓存与返回

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$readCaches` | `array` | private | 已经读取的缓存内容 键是缓存 ID，值是缓存内容 |
| `$readCacheMetas` | `array` | private | 已经读取的缓存元数据 键是缓存 ID，值是缓存元数据 |
| `$daySeconds` | `int` | private | 一天的秒数 |
| `$key` | `string` | private | 本进程的缓存动态 KEY（16 位十六进制） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即生成动态 KEY |
| [`key()`](#key) | 取本进程的动态 KEY |
| [`has()`](#has) | 指定缓存是否存在（可用性语义：存在且未过期） |
| [`read()`](#read) | 读取缓存 |
| [`meta()`](#meta) | 读取缓存的元数据（不判断过期，不清理文件） |
| [`write()`](#write) | 写入缓存（合并模式） |
| [`overwrite()`](#overwrite) | 覆盖写入缓存（不合并，完全替换） |
| [`clear()`](#clear) | 清除缓存内容（将内容设为空数组，保留文件与 30 天有效期） |
| [`remove()`](#remove) | 删除缓存文件并清理进程内缓存 |
| [`remember()`](#remember) | 缓存-回调模式：缓存命中直接返回，未命中用回调生成并写入 |
| [`get()`](#get) | 读取缓存，未命中（不存在或已过期）时返回默认值 |
| [`increment()`](#increment) | 原子自增计数器 |
| [`decrement()`](#decrement) | 原子自减计数器（基于 increment 实现） |
| [`flush()`](#flush) | 清空缓存目录下的全部缓存文件 |
| [`gc()`](#gc) | 清理过期或损坏的缓存文件 |

### __construct()

```php
public function __construct()
```

构造即生成动态 KEY

### key()

```php
public function key(): string
```

取本进程的动态 KEY

返回：`string` —— string 16 位十六进制字符串

### has()

```php
public function has($id)
```

指定缓存是否存在（可用性语义：存在且未过期）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |

### read()

```php
public function read($id)
```

读取缓存

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |

### meta()

```php
public function meta($id)
```

读取缓存的元数据（不判断过期，不清理文件）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |

### write()

```php
public function write($id, $content, $expiresIn = 30)
```

写入缓存（合并模式）

缓存已存在且新旧内容均为数组时做数组合并（新键覆盖旧键），
否则新内容完全替换旧内容。过期缓存视为不存在，直接全新写入。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$content` | `mixed` | — | 缓存内容 |
| `$expiresIn` | `int|float|null` | `30` | 有效期（天），<=0 或 null 表示永不过期 |

### overwrite()

```php
public function overwrite($id, $content, $expiresIn = 30)
```

覆盖写入缓存（不合并，完全替换）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$content` | `mixed` | — | 覆盖的内容 |
| `$expiresIn` | `int|float|null` | `30` | 有效期（天），<=0 或 null 表示永不过期 |

### clear()

```php
public function clear($id)
```

清除缓存内容（将内容设为空数组，保留文件与 30 天有效期）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |

### remove()

```php
public function remove($id)
```

删除缓存文件并清理进程内缓存

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |

### remember()

```php
public function remember($id, $callback, $expiresIn = 30)
```

缓存-回调模式：缓存命中直接返回，未命中用回调生成并写入

等价于"read → 生成 → overwrite"的完整流程，适合缓存计算结果、
数据库查询等场景，避免手动判断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$callback` | `callable` | — | 生成缓存的回调（缓存未命中时调用） |
| `$expiresIn` | `int|float|null` | `30` | 有效期（天），<=0 或 null 表示永不过期 |

### get()

```php
public function get($id, $default = null)
```

读取缓存，未命中（不存在或已过期）时返回默认值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$default` | `mixed` | `null` | 未命中时的返回值，默认 null |

### increment()

```php
public function increment($id, $step = 1, $expiresIn = 30)
```

原子自增计数器

通过文件锁保证并发安全，计数器内容为数字。缓存不存在时从 0 开始。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$step` | `int|float` | `1` | 增量，默认 1 |
| `$expiresIn` | `int|float|null` | `30` | 有效期（天），<=0 或 null 表示永不过期 |

### decrement()

```php
public function decrement($id, $step = 1, $expiresIn = 30)
```

原子自减计数器（基于 increment 实现）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 缓存 ID |
| `$step` | `int|float` | `1` | 减量，默认 1 |
| `$expiresIn` | `int|float|null` | `30` | 有效期（天），<=0 或 null 表示永不过期 |

### flush()

```php
public function flush()
```

清空缓存目录下的全部缓存文件

### gc()

```php
public function gc()
```

清理过期或损坏的缓存文件

## 非公开方法

**private**

- `private function saveBasePath(): string` —— 获取缓存存储目录
- `private function ensureDir()` —— 确保缓存目录存在
- `private function getFilePath($id)` —— 缓存文件路径（对 ID 做安全过滤，防止目录穿越）
- `private function sanitizeId($id)` —— 过滤缓存 ID 中的路径分隔符与空字节，防止目录穿越

## 同目录

- [Config](/php/api/foundation/builtin/config)
- [Deployment](/php/api/foundation/builtin/deployment)
- [Event](/php/api/foundation/builtin/event)
- [Lifecycle](/php/api/foundation/builtin/lifecycle)
- [Log](/php/api/foundation/builtin/log)

