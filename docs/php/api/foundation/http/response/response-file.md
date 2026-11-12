# ResponseFile

`kernel\Foundation\HTTP\Response\ResponseFile`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseFile.php`

## 声明

```php
class ResponseFile extends ResponseDownload
```

父类：`ResponseDownload`

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$imageQuality` | `integer` | private | 预览图片的质量 |
| `$cacheControl` | `mixed` | private | HTTP 缓存控制 |
| `$httpExpires` | `string` | private | HTTP 资源过期时间，秒级时间戳 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 文件格式输出响应 |
| [`output()`](#output) | — |

### __construct()

```php
public function __construct(Request $R, $filePath, $downloadFileName = null, $imageQuality = null, $cacheControl = "no-cache", $httpExpires = null)
```

文件格式输出响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 请求体 |
| `$filePath` | `string` | — | 下载的文件绝对路径 |
| `$downloadFileName` | `mixed` | `null` | — |
| `$imageQuality` | `int` | `null` | 如果是图片类型文件，该值将影响输出的图片质量 |
| `$cacheControl` | `string` | `"no-cache"` | HTTP 缓存控制属性值 |
| `$httpExpires` | `string` | `null` | HTTP 资源过期时间，秒级时间戳 |

### output()

```php
public function output()
```

## 非公开方法

**protected**

- `protected function setCache($fileTag)`

**private**

- `private function createThumb($filePath, $fileName, $targetWidth, $targetHeight, $targetRatio, $NewExtension = null)`

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

