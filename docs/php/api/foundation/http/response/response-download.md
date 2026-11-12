# ResponseDownload

`kernel\Foundation\HTTP\Response\ResponseDownload`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseDownload.php`

## 声明

```php
class ResponseDownload extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | protected | 下载的文件绝对路径 |
| `$fileName` | `string` | protected | 下载的文件名称，也就是保存到下载者电脑的文件名称，需要包含文件扩展名 |
| `$fileSize` | `int` | protected | 文件大小，字节 |
| `$fileExtension` | `string` | protected | 文件扩展名 |
| `$DownloadRateLimit` | `boolean|int` | protected | 下载速率限制。如果值不为false，即开启了文件下载速率限制，单位是：千字节 |
| `$request` | `Request` | protected | 请求体 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 下载文件响应 |
| [`output()`](#output) | — |

### __construct()

```php
public function __construct(Request $R, $filePath, $downloadFileName = null, $rateLimit = false)
```

下载文件响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 请求体 |
| `$filePath` | `string` | — | 下载的文件绝对路径 |
| `$downloadFileName` | `mixed` | `null` | — |
| `$rateLimit` | `boolean|int` | `false` | 下载速率限制，如果值不为false，即开启了下载速率，kb/秒，单位是：千字节 |

### output()

```php
public function output()
```

## 非公开方法

**protected**

- `protected function printContent($readFile = false)` —— 输出文件内容

## 同目录

- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

