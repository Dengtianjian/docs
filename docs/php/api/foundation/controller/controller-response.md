# ControllerResponse

`kernel\Foundation\Controller\ControllerResponse`  ·  class

源码：`gstudio_kernel/Foundation/Controller/ControllerResponse.php`

> 控制器响应工厂

## 声明

```php
class ControllerResponse extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 概述

继承 [Response](/php/api/foundation/http/response)，作为控制器内部快速构建各类具体响应对象的工厂类。
框架在 `Controller::__construct` 中将其初始化为 `$this->response` 的默认实例，
控制器可通过 `success()`/`fail()` 复用该实例，也可在 `data()` 中调用以下工厂方法
生成「独立响应对象」（如文件下载、分页、视图），由其作为最终结果输出。

除 `proxy()` 外，其余工厂方法均自动注入当前请求（`Applications::default()->request()`）作为响应上下文，
因此无需手动传入 Request 即可直接使用。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`file()`](#file) | 文件类型响应 |
| [`download()`](#download) | 下载文件响应 |
| [`pagination()`](#pagination) | 响应分页列表 |
| [`view()`](#view) | 视图响应 |
| [`redirect()`](#redirect) | 重定向响应 |
| [`proxy()`](#proxy) | 远程资源代理响应 |

### file()

```php
public function file($filePath, $downloadFileName = null, $imageQuality = null, $cacheControl = "no-cache", $httpExpires = null)
```

文件类型响应

用于直接输出文件内容（含图片缩略图、Range 分片下载等），支持浏览器内联或强制下载。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 下载的文件绝对路径 |
| `$downloadFileName` | `mixed` | `null` | — |
| `$imageQuality` | `int` | `null` | 如果是图片类型文件，该值将影响输出的图片质量 |
| `$cacheControl` | `string` | `"no-cache"` | HTTP 缓存控制属性值 |
| `$httpExpires` | `string` | `null` | HTTP 资源过期时间，秒级时间戳 |

### download()

```php
public function download($filePath, $downloadFileName = null, $rateLimit = false)
```

下载文件响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 下载的文件绝对路径 |
| `$downloadFileName` | `mixed` | `null` | — |
| `$rateLimit` | `boolean|int` | `false` | 下载速率限制，如果值不为false，即开启了下载速率，kb/秒，单位是：千字节 |

### pagination()

```php
public function pagination($total, $data = null)
```

响应分页列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$total` | `integer` | — | 数据总量 |
| `$data` | `mixed` | `null` | 数据 |

### view()

```php
public function view($viewFile, $viewData = [], $viewFileBaseDir = "Views", $templateId = "page", $viewFileDir = null)
```

视图响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `string` | — | 渲染的视图文件，相对于$viewFileBaseDir目录 |
| `$viewData` | `array` | `[]` | 渲染的数据 |
| `$viewFileBaseDir` | `string` | `"Views"` | 视图文件所在的目录，相对于根目录 |
| `$templateId` | `string` | `"page"` | 模板ID，用于缓存模板 |
| `$viewFileDir` | `string` | `null` | 视图文件根目录，默认是基于Path::root()的，也就是当前项目的根目录，但是有时候可能需要渲染别的项目的视图文件，可通过该参数来修改 |

### redirect()

```php
public function redirect($to = null, $statusCode = 302)
```

重定向响应

返回 `ResponseRedirect` 实例，用于控制器内快速发起跳转（Laravel 风格）。
返回值需由 `data()` 方法 `return`，框架据此输出 3xx 响应。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$to` | `string|null` | `null` | 初始目标地址（可选，也可后续链式 `->route()`/`->back()` 等） |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |

### proxy()

```php
public function proxy($url, $downloadFileName = null, $cacheControl = "no-cache", $forceDownload = false)
```

远程资源代理响应

由服务端取回远程资源并**流式转发**给客户端，用于浏览器自己取不了的协议（如 `ftp://`）。
只应传入存储磁盘产出的 URL；可代理的协议、超时与体积上限见 [ResponseProxy](/php/api/foundation/http/response/response-proxy)。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string` | — | 远程资源地址（**必须来自存储磁盘**） |
| `$downloadFileName` | `string|null` | `null` | 输出文件名 |
| `$cacheControl` | `string` | `"no-cache"` | HTTP 缓存控制值 |
| `$forceDownload` | `boolean` | `false` | 是否强制附件下载（下载端点用；默认按 MIME 决定 inline/attachment） |

## 同目录

- [AuthController](/php/api/foundation/controller/auth-controller)
- [Controller](/php/api/foundation/controller/controller)
- [ControllerBody](/php/api/foundation/controller/controller-body)
- [ControllerQuery](/php/api/foundation/controller/controller-query)

