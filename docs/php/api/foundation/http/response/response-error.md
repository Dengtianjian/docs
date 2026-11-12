# ResponseError

`kernel\Foundation\HTTP\Response\ResponseError`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseError.php`

## 声明

```php
class ResponseError extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建错误响应 继承于Response |

### __construct()

```php
public function __construct($statusCode, $code = 500, $message = "error", $details = [], $data = [])
```

构建错误响应 继承于Response

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | — | HTTP状态码 |
| `$code` | `integer|string` | `500` | 响应码 |
| `$message` | `string` | `"error"` | 响应信息 |
| `$details` | `array` | `[]` | 响应详情，主要针对报错 |
| `$data` | `array` | `[]` | 响应的数据 |

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

