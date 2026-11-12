# Cache

`kernel\Facades\Cache`  ·  class

源码：`gstudio_kernel/Facades/Cache.php`

> 缓存门面

## 声明

```php
class Cache extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

全部方法都转发到应用级 `CacheProvider`：读写缓存在它身上，
动态 KEY（`key()`，静态资源版本号）也随实例生成一次。

门面自身不持有任何实例，`Cache::get()` 每次都向当前应用的容器取，
与 `$app->cache()`、`$app->make(CacheProvider::class)` 同源。

内核在 `\kernel\Foundation\App::__construct` 里把它登记为延迟单例（别名 `cache`），
首次取用才构造；应用想换成自己的实现，重新登记同名条目即可。

取用方式（调用点写法不变，只换 use）：
```php
use kernel\Facades\Cache;

$value = Cache::get("key");
```

## 示例

```php
use kernel\Facades\Cache;

$value = Cache::get("key");
```

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `has(string $id)` | 缓存是否存在且未过期 |
| `read(string $id)` | 读缓存（false=不存在，null=已过期） |
| `meta(string $id)` | 读缓存元信息 |
| `write(string $id, $content, $expiresIn = 30)` | 写缓存（数组内容合并） |
| `overwrite(string $id, $content, $expiresIn = 30)` | 覆盖写 |
| `clear(string $id)` | 清空该缓存的内容（保留文件） |
| `remove(string $id)` | 删除缓存 |
| `remember(string $id, callable $callback, $expiresIn = 30)` | 读不到则生成并写入 |
| `get(string $id, $default = null)` | 读缓存，取不到返回默认值 |
| `increment(string $id, int $step = 1, $expiresIn = 30)` | 原子自增 |
| `decrement(string $id, int $step = 1, $expiresIn = 30)` | 原子自减 |
| `flush()` | 清空全部缓存文件（运维） |
| `gc()` | 清理过期缓存，返回清理数量（运维） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`key()`](#key) | 取本进程的缓存动态 KEY |

### key()

```php
public static function key(): string
```

取本进程的缓存动态 KEY

KEY 随 CacheProvider 实例生成，静态资源地址用它做版本号。

返回：`string` —— string 16 位十六进制字符串

## 非公开方法

**protected**

- `protected static function resolve()` —— 容器键：缓存实例（应用级）

## 同目录

- [Config](/php/api/facades/config)
- [Crons](/php/api/facades/crons)
- [Log](/php/api/facades/log)

