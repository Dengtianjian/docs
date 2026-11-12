# 生命周期

`kernel\Foundation\Builtin\Lifecycle` 提供请求级的三阶段钩子：**引导（bootUp）→ 结束（shutdown）→ 错误（error）**。

## 三个阶段

| 阶段 | 触发时机 |
|---|---|
| `onBootUp` | 请求到达后、路由匹配前 |
| `onShutdown` | 输出响应前（正常或异常路径都触发） |
| `onError` | 异常路径，在 `onShutdown` 之前 |

## 装配类形式

传类名时按「构造即装配」执行：

```php
new DiscuzXApp(function ($app) {
  $app->onBootUp(Bootup::class);
  $app->onShutdown(Shutdown::class);
});
```

```php
class Bootup
{
  public function __construct(?Request $R = null) { /* 构造即装配 */ }
}

class Shutdown
{
  public function __construct(?Response $response = null) { /* ... */ }
}
```

## 回调形式

```php
$app->onShutdown(function ($response, $context) {
  // $context["error"] 表示是否异常结束
  // $context["exception"] 非空表示异常结束
});

$app->onError(function (\Throwable $e) {
  // 上报 / 兜底
});
```

## 执行顺序

`App::run()` 里依次：

1. `fireBootUp()` —— 装配类收到 `Request`；
2. 正常路径 `fireShutdown($response, ["error" => false])` 后输出并 `exit`；
3. 异常路径先 `fireError($e)`，再 `fireShutdown(null, ["exception" => $e, "error" => true])`，最后抛给全局异常处理器。

## 注意

- 幂等：同一请求各阶段只触发一次（`bootupFired` / `shutdownFired` 保证）；
- `onBootUp()` 不传参数时，默认用 `{App}\Setup\Bootup`；
- `App::onBootUp() / onShutdown() / onError()` 委托到请求级 `$app->lifeCycle()` 实例。
