# ResponseProxy

`kernel\Foundation\HTTP\Response\ResponseProxy`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseProxy.php`

> 远程资源代理响应（服务端中转输出）

## 声明

```php
class ResponseProxy extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 概述

用途：把**浏览器自己取不了**的远程资源（如 `ftp://` / `ftps://`）由服务端取回后流式转发给客户端，
这样即使不做 302 跳转也能在浏览器内预览/下载 —— 现代浏览器（Chrome / Edge / Firefox）都已移除
FTP 支持，302 到 `ftp://` 只会失败或交给外部客户端。

与 `ResponseFile` 的区别：后者只接受**本地绝对路径**；本类接受**远程 URL**，边读边发，
不会把整份资源读进内存。本类不需要 Request（既不处理 Range，也不读请求参数）。

安全与限制（重要）：
- 只应传入**由存储磁盘产出**的 URL（`\kernel\Modules\Storage\Drivers\AbstractStorage::url`）；
切勿把用户输入直接传进来，否则等于给站点开了一个 SSRF 跳板；
- 协议白名单见 `canProxy`（默认 `ftp` / `ftps`，可用配置扩展）；
- 超时与体积上限见 `proxyTimeout` / `proxyMaxSize`（配置 `storage.*` 可覆盖）；
- 不做 Range（响应 `Accept-Ranges: none`）：代理出来的资源不支持拖动进度/断点续传；
- `text/html`、`image/svg+xml`、XML、JS 等**可执行类型强制转为附件下载**，
避免远程（可能是用户上传的）内容在**本站源**下内联执行造成 XSS。

配置键（`storage.*`，未配置时用下方常量默认值）：
- `remoteProxyProtocols` 允许代理的协议列表（数组，或逗号分隔字符串），默认 `["ftp","ftps"]`
- `remoteProxyTimeout`   连接/读取超时（秒），默认 10
- `remoteProxyMaxSize`   单次最大转发体积（字节），默认 20MB；远端已声明长度时先返回 413，长度未知时截断

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `DEFAULT_TIMEOUT` | `10` | 默认连接/读取超时（秒） |
| `DEFAULT_MAX_SIZE` | `20971520` | 默认单次最大转发体积（20MB，字节） |
| `SAMPLE_SIZE` | `8192` | 用于 MIME 探测的采样字节数 |
| `CHUNK_SIZE` | `8192` | 单次读取块大小（字节） |
| `DEFAULT_PROTOCOLS` | `["ftp", "ftps"]` | 默认允许代理的协议 |
| `UNSAFE_INLINE_TYPES` | `[ "text/html", "application/xhtml+xml", "image/svg+xml", "text/xml", "application/xml", "application/javascript", "text/javascript", "application/x-shockwave-flash", ]` | 内联输出会带来 XSS 风险、因此强制转为附件下载的 MIME 类型 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$url` | `string` | protected | 远程资源地址 |
| `$fileName` | `string` | protected | 输出给客户端时的文件名 |
| `$cacheControl` | `string` | protected | HTTP 缓存控制值 |
| `$forceDownload` | `boolean` | protected | 是否强制以附件下载 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造代理响应 |
| [`canProxy()`](#canproxy) | 判断该地址能否由服务端代理取回 |
| [`output()`](#output) | 输出远程资源（流式转发） |

### __construct()

```php
public function __construct($url, $downloadFileName = null, $cacheControl = "no-cache", $forceDownload = false)
```

构造代理响应

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string` | — | 远程资源地址（**必须来自存储磁盘**，见类注释的安全说明） |
| `$downloadFileName` | `string|null` | `null` | 输出文件名；不传时取 URL 路径的 basename |
| `$cacheControl` | `string` | `"no-cache"` | HTTP 缓存控制值 |
| `$forceDownload` | `boolean` | `false` | 是否强制附件下载（默认 false = 按 MIME 决定 inline/attachment） |

### canProxy()

```php
public static function canProxy($url)
```

判断该地址能否由服务端代理取回

两个条件同时满足才返回 true：
1. 协议在允许列表内（`storage/remoteProxyProtocols`，默认 ftp / ftps）；
2. 当前 PHP 已注册该协议的流包装器（`stream_get_wrappers`）—— 没注册就取不回来，
此时应让调用方回退到 302 跳转等其它方式，而不是发出注定失败的代理。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string|null` | — | 待判断的地址 |

### output()

```php
public function output()
```

输出远程资源（流式转发）

顺序：打开远程流（带超时）→ 远端声明长度超限则 413 → 采样首块探测 MIME → 发头 →
先输出采样块再循环分块输出（客户端断开或达到体积上限即停止）。

## 非公开方法

**protected**

- `protected static function proxyProtocols()` —— 解析允许代理的协议列表
- `protected static function proxyTimeout()` —— 连接/读取超时（秒，配置 storage/remoteProxyTimeout）
- `protected static function proxyMaxSize()` —— 单次最大转发体积（字节，配置 storage/remoteProxyMaxSize）
- `protected static function config($key, $default)` —— 读取 storage.* 配置（带默认值）
- `protected static function remoteContentLength($headers)` —— 从远端响应头里取内容长度
- `protected static function detectMimeType($sample)` —— 依据内容采样探测 MIME 类型

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

