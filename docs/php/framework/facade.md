# 门面

门面（Facade）是访问框架能力的**静态入口**：`Cache::get(...)`、`Config::get(...)` 这类静态调用，内部转发到容器里的真实实例，省去手动 `$app->make()`。

门面自身不持有实例，`Cache::get()` 每次都向**当前应用的容器**取，与 `$app->cache()`、`$app->make(Cache::class)` 同源。

## 内置门面

框架自带四个：

| 门面 | 代理目标 | 容器别名 |
|---|---|---|
| `kernel\Facades\Cache` | `Foundation\Builtin\Cache` | `cache` |
| `kernel\Facades\Config` | `Foundation\Builtin\Config` | `config` |
| `kernel\Facades\Log` | `Foundation\Builtin\Log` | `log` |
| `kernel\Facades\Crons` | `Foundation\Crontab\Crons` | —（`new` 后扫描 `Crons/`） |

```php
use kernel\Facades\Cache;
use kernel\Facades\Config;
use kernel\Facades\Log;

$mode = Config::get("mode", "production");
$value = Cache::get("key");
Log::info("登录", ["uid" => 1]);
```

## 自己定义一个门面

继承 `kernel\Foundation\Facade\Facade`，覆写 `resolve()`（单例门面）或 `accessor()`（多例门面）：

```php
namespace myapp\Facades;

use kernel\Foundation\Facade\Facade;
use kernel\Foundation\Application\Applications;

class Search extends Facade
{
  protected static function resolve()
  {
    return Applications::default()->make(\myapp\Services\SearchService::class);
  }
}
```

之后 `Search::query($kw)` 会经 `__callStatic` 转发到 `SearchService::query($kw)`。

内核在 `App::__construct()` 里把 `Cache / Config / Log / Router / Middleware / Request / Lifecycle` 等登记为延迟单例（`defer`），首次取用才构造；应用想换成自己的实现，重新登记同名条目即可。

## Facade::of() —— 免继承的临时门面

不想专门建门面类时，用 `Facade::of()` 把任意类惰性单例化：

```php
use kernel\Foundation\Facade\Facade;

Facade::of(SomeService::class)->doSomething($a);
Facade::of(SomeService::class, $dep)->run();   // 构造参数仅首次实例化生效
```

## 注意

- 门面依赖**应用已装配**（否则取不到实例）；
- 静态调用永远等于「当前默认应用」，跨应用要用 `App::of($id)->xxx()`，而不是门面。
