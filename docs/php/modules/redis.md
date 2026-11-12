# Redis

```
Modules/Redis/
├── Redis.php          门面：Redis::client()
├── RedisModule.php    实现：默认连接 + 具名连接池
└── RedisProvider.php  装配：登记实例
```

## 装配

```php
$this->app()->make(\kernel\Modules\Redis\RedisProvider::class);
// 或
$this->app()->provider(new \kernel\Modules\Redis\RedisProvider());
```

必须传实例：`RedisModule` 是**单例**，连接池与具名连接要整个请求共用一份，否则每次取到不同实例、连接也建不共享。

## 使用

```php
use kernel\Modules\Redis\Redis;

// 默认连接（首次调用才 pconnect）
$client = Redis::client();

$client->set("key", "value");
$value = $client->get("key");
```

## 多个连接

```php
// 建立第二个连接并入池（key 为 "cache"）
Redis::connect("cache", [
  "host" => "127.0.0.1",
  "port" => 6379,
  "database" => 1,
]);

// 切到具名连接
Redis::use("cache");
```

- `connect($useKey, $options)`：建立一个具名连接；
- `use($useKey)`：取连接（不传则取默认连接）；
- `disconnect($useKey)`：断开（不传则断开默认连接）。

每个连接是惰性的：第一次 `client()` / `use()` 时才真正 `pconnect`。

## 配置从哪来

内核不假设配置来源。常见做法是在应用 Bootstrap 里先读设置再建连接：

```php
$conf = Setting::items("Redis_Host", "Redis_Port", "Redis_Password");

Redis::connect("default", [
  "host" => $conf["Redis_Host"],
  "port" => (int) $conf["Redis_Port"],
  "password" => $conf["Redis_Password"] ?: null,
]);
```

## 注意

- 连接池不跨应用共享：每个应用有自己的 `RedisModule`；
- 常驻进程（Swoole / 队列 worker）下长连接会跨请求存活，需要断开重连时显式 `disconnect()`。
