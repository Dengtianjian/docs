# Redis

`kernel\Modules\Redis\Redis`  ·  class

源码：`gstudio_kernel/Modules/Redis/Redis.php`

> Redis 门面

## 声明

```php
class Redis extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

静态转发到**当前应用**容器里的 Redis 模块（短名 `redis`）：
与 `$app->redis()`、`$app->make(RedisModule::class)` 是同一份实例，
连接池也随之共享——否则每次取用的是不同实例、连接建不共享。

底层由 `RedisProvider` 在装配期登记：
```php
// 应用 Bootstrap
$app->make(RedisProvider::class);   // 或 $app->provider(new RedisProvider())
```
没装配就直接调用会抛出「无法解析 redis」，不会悄悄造一个默认实例。

## 示例

```php
// 应用 Bootstrap
$app->make(RedisProvider::class);   // 或 $app->provider(new RedisProvider())
```

## 相关

- `RedisModule` 具体实现：默认连接 + 具名连接池
- `RedisProvider` 装配：登记实例（类名 + 短名 redis）

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `client()` | 默认连接（首次调用才 pconnect） |
| `connect(string|null $useKey = null, array $options = [])` | 建立额外连接并入池 |
| `use(string|null $useKey = null)` | 取连接（不传取默认连接） |
| `disconnect(string|null $useKey = null)` | 断开连接 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 兜底实例：当前应用容器里的 Redis 模块

## 同目录

- [RedisModule](/php/api/modules/redis/redis-module)
- [RedisProvider](/php/api/modules/redis/redis-provider)

