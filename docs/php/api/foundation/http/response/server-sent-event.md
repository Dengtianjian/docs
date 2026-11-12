# ServerSentEvent

`kernel\Foundation\HTTP\Response\ServerSentEvent`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ServerSentEvent.php`

## 声明

```php
class ServerSentEvent extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$responseEventName` | `string` | protected | 事件名称 |
| `$closed` | `mixed` | protected | — |
| `$headersSent` | `boolean` | protected | 响应头是否已发送 |
| `$callback` | `callable` | protected | 推流回调 |
| `$intervalTime` | `int` | protected | 推送间隔（秒） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建SSE响应 |
| [`run()`](#run) | 启动 SSE 推送循环 |
| [`success()`](#success) | 成功响应 |
| [`error()`](#error) | 错误响应 |
| [`ping()`](#ping) | 发送ping事件 自动向前端发送ping名称事件 |
| [`output()`](#output) | 输出一帧事件（不结束连接） |
| [`close()`](#close) | — |

### __construct()

```php
public function __construct($callback, $intervalTime = 1, $outputType = "json")
```

构建SSE响应

构造仅做配置（设置响应头、输出类型与推流回调/间隔），**不会立即推流**；
需显式调用 `run` 才开始循环推送。这样可在启动前链式追加配置，也便于单元测试。

```php
use kernel\Foundation\HTTP\Response\ServerSentEvent;

(new ServerSentEvent(function (ServerSentEvent $Response) {
$Response->success([
"time" => time()
]);
$Response->ping();
}))->run();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 回调函数，只有在该回调函数里面调用输出方法前端才可接收到数据。该回调函数第一个参数接收的是当前响应实例。 |
| `$intervalTime` | `int` | `1` | 间隔时间，单位：秒 |
| `$outputType` | `string` | `"json"` | 输出数据类型，可传入json、text、xml |

### run()

```php
public function run()
```

启动 SSE 推送循环

每轮调用回调产出一帧，直到 `close` 被调用、客户端断开或回调主动中断。

### success()

```php
public function success($data, $event = "message", $statusCode = 200, $code = 200000, $message = "ok")
```

成功响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 主体数据 |
| `$event` | `string` | `"message"` | 事件名称 |
| `$statusCode` | `integer` | `200` | HTTP状态码 |
| `$code` | `integer|string` | `200000` | 响应码 |
| `$message` | `string` | `"ok"` | 响应信息 |

### error()

```php
public function error($statusCode, $code = 500, $message = "error", $details = [], $data = [])
```

错误响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | — | HTTP状态码 |
| `$code` | `integer|string` | `500` | 响应码 |
| `$message` | `string` | `"error"` | 响应信息 |
| `$details` | `mixed` | `[]` | 错误详情 |
| `$data` | `mixed` | `[]` | 主体数据 |

### ping()

```php
public function ping()
```

发送ping事件 自动向前端发送ping名称事件

### output()

```php
public function output()
```

输出一帧事件（不结束连接）

由 `run` 的循环调用（`success` / `error` / `ping` 内部会触发），
只负责写这一帧的 body；连接的生命周期由 `run` 控制。

### close()

```php
public function close()
```

## 非公开方法

**protected**

- `protected function sendHeaders()` —— 发送 SSE 响应头（仅发送一次）

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)

