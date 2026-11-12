# Response

`kernel\Foundation\HTTP\Response`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response.php`

## 声明

```php
class Response
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$error` | `boolean` | `false` | 是否返回失败 |
| `static $interactions` | `mixed` | `[ "list" => [], "error" => [], "success"`… | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$responseHeaders` | `array` | protected | 响应头 |
| `$responseData` | `mixed` | protected | 响应数据 |
| `$responseStatusCode` | `integer` | protected | 响应状态码 |
| `$responseCode` | `integer` | protected | 响应码 |
| `$responseMessage` | `string` | protected | 响应信息 |
| `$responseDetails` | `mixed` | protected | 响应错误详情，用于开发模式 |
| `$responseAddBody` | `array` | protected | 增加到响应主体的数据 |
| `$responseResetBody` | `mixed` | protected | 重置响应主体的数据 |
| `$outputType` | `mixed` | protected | 响应输出的格式 |
| `$formatOutputTypeOfText` | `boolean` | protected | 响应输出为text格式是，是否需要格式化 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建响应 |
| [`interaction()`](#interaction) | 响应时拦截 如果同时传入状态码和错误码，就只有当响应状态码和响应错误码都匹配时才会执行回调函数。 如果不传入状态码和错误码，只要响应就会执行 |
| [`header()`](#header) | 设置响应头 |
| [`null()`](#null) | 空响应 |
| [`error()`](#error) | 错误响应 |
| [`success()`](#success) | 成功响应 |
| [`statusCode()`](#statuscode) | 设置/获取HTTP状态码 |
| [`setBody()`](#setbody) | 设置主体 |
| [`addBody()`](#addbody) | 添加数据到主体 |
| [`addData()`](#adddata) | 添加合并数据到主体数据 |
| [`setData()`](#setdata) | 设置主体数据 |
| [`json()`](#json) | 输出为json格式的内容 |
| [`xml()`](#xml) | 输出为xml格式的内容 |
| [`text()`](#text) | 输出为文本格式的内容 |
| [`html()`](#html) | 输出为超文本格式的内容 |
| [`buffer()`](#buffer) | 输出为原始字节（buffer）格式的内容 不对数据做任何编码或格式化，直接原样输出，适用于二进制内容（如图片、文件流等） |
| [`getBody()`](#getbody) | 获取输出的主体 |
| [`getData()`](#getdata) | 获取输出的主体数据 |
| [`output()`](#output) | 输出内容，向客户端发送响应头与主体。 |
| [`outputType()`](#outputtype) | — |

### __construct()

```php
public function __construct($data = null, $statusCode = 200, $code = 200, $message = "ok", $details = [])
```

构建响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array|null` | `null` | 响应的数据 |
| `$statusCode` | `integer` | `200` | HTTP状态码 |
| `$code` | `integer` | `200` | 响应码 |
| `$message` | `string` | `"ok"` | 响应信息 |
| `$details` | `array` | `[]` | 响应详情，主要针对报错 |

### interaction()

```php
public static function interaction(\Closure $callback, $statusCode = null, $errorCode = null, $responseType = null)
```

响应时拦截 如果同时传入状态码和错误码，就只有当响应状态码和响应错误码都匹配时才会执行回调函数。 如果不传入状态码和错误码，只要响应就会执行

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `\Closure` | — | 回调函数，函数接收一个参数，是Response类或者基于Response的派生类 |
| `$statusCode` | `int` | `null` | 状态码，如果传入该值，只有当响应状态码等于指定状态码时才会执行回调函数 |
| `$errorCode` | `string|int` | `null` | 错误码，如果传入该值，只有当响应错误码等于指定错误码时才会执行回调函数 |
| `$responseType` | `string|int` | `null` | 响应类型，可以传入success（成功），或者error（错误），也可传入1或者0，1代表成功，0代表失败，如果响应是成功的就会调用成功的回调函数，如果是错误的，就会调用错误的回调函数 |

### header()

```php
public function header($key, $value, $replace = true)
```

设置响应头

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键 |
| `$value` | `string` | — | 值 |
| `$replace` | `boolean` | `true` | 是否替换 |

### null()

```php
public function null($statusCode = 200)
```

空响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | `200` | HTTP状态码 |

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

### success()

```php
public function success($data, $statusCode = 200, $code = 200, $message = "ok")
```

成功响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 主体数据 |
| `$statusCode` | `integer` | `200` | HTTP状态码 |
| `$code` | `integer|string` | `200` | 响应码 |
| `$message` | `string` | `"ok"` | 响应信息 |

### statusCode()

```php
public function statusCode($statusCode = null)
```

设置/获取HTTP状态码

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | `null` | — |

### setBody()

```php
public function setBody($body)
```

设置主体

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$body` | `mixed` | — | 当输出时会直接输出当前设置的值，而不会组合在一起 |

### addBody()

```php
public function addBody($responseBody, $cover = false)
```

添加数据到主体

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$responseBody` | `array` | — | 主体，最好是关联数组 |
| `$cover` | `boolean` | `false` | 是否覆盖现有的主体 |

### addData()

```php
public function addData($data, $cover = false)
```

添加合并数据到主体数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 添加的数据 |
| `$cover` | `boolean` | `false` | 是否覆盖已有的主体数据 |

### setData()

```php
public function setData($data)
```

设置主体数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 添加的数据 |

### json()

```php
public function json()
```

输出为json格式的内容

### xml()

```php
public function xml()
```

输出为xml格式的内容

### text()

```php
public function text($format = false)
```

输出为文本格式的内容

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$format` | `boolean` | `false` | 是否格式化输出 |

### html()

```php
public function html()
```

输出为超文本格式的内容

### buffer()

```php
public function buffer($contentType = "application/octet-stream")
```

输出为原始字节（buffer）格式的内容 不对数据做任何编码或格式化，直接原样输出，适用于二进制内容（如图片、文件流等）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$contentType` | `string` | `"application/octet-stream"` | 响应的 Content-Type |

### getBody()

```php
public function getBody()
```

获取输出的主体

### getData()

```php
public function getData()
```

获取输出的主体数据

### output()

```php
public function output()
```

输出内容，向客户端发送响应头与主体。

### outputType()

```php
public function outputType()
```

## 非公开方法

**protected**

- `protected function interactionOutput()`

## 同目录

- [Cors](/php/api/foundation/http/cors)
- [Curl](/php/api/foundation/http/curl)
- [Request](/php/api/foundation/http/request)
- [URL](/php/api/foundation/http/url)

