# ResponsePagination

`kernel\Foundation\HTTP\Response\ResponsePagination`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponsePagination.php`

## 声明

```php
class ResponsePagination extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$request` | `request` | private | 请求体 |
| `$total` | `integer` | private | 数据总量 |
| `$items` | `integer` | private | 当前页数数据量 |
| `$pagination` | `RequestPagination` | private | 从请求中提取的分页参数 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 响应分页类 |
| [`setTotal()`](#settotal) | 设置数据总量 |
| [`output()`](#output) | — |

### __construct()

```php
public function __construct(Request $R, $total, $data = null)
```

响应分页类

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 请求体 |
| `$total` | `integer` | — | 数据总量 |
| `$data` | `mixed` | `null` | 数据 |

### setTotal()

```php
public function setTotal($total)
```

设置数据总量

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$total` | `integer` | — | 数据总量 |

### output()

```php
public function output()
```

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

