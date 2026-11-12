# ResponseRedirect

`kernel\Foundation\HTTP\Response\ResponseRedirect`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseRedirect.php`

> 重定向响应

## 声明

```php
class ResponseRedirect extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 概述

参考 Laravel `Illuminate\Routing\Redirector` 的设计，提供链式、语义化的跳转能力：
- `to()`       跳转到任意路径或完整 URL
- `route()`    按命名路由生成 URL 跳转（复用 `Routes::url`）
- `away()`     跳转到外部域名（不强制同域/HTTPS）
- `secure()`   强制以 HTTPS 跳转到当前域名下的路径
- `back()`     回退到上一页（读取 `Referer`，缺失时回退到 fallback）
- `with()`     携带一次性数据（本框架无 Session，数据以 URL 查询参数形式附加到目标地址）
- `withFragment()` 附加 URL 片段（#anchor）

生命周期：跳转方法只「配置」目标与模式，`output()` 时才统一组装最终 URL
（合并 with 数据、片段、协议策略）并发送 `Location` 头与状态码，不输出响应主体。

与父类 `Response::redirect()` 的关系：父类 `redirect()` 是快捷方式（仅设 Location + 状态码）；
本类在其之上提供路由生成、外部跳转、协议策略、数据携带等更完整的能力。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$redirectTo` | `string|null` | protected | 目标地址（已解析为绝对 URL 或外部地址） |
| `$isAway` | `boolean` | protected | 是否为外部跳转（away），外部地址不强制同域与协议策略 |
| `$isSecure` | `boolean` | protected | 是否强制 HTTPS（secure） |
| `$fragment` | `string|null` | protected | URL 片段（# 之后的部分，不含前导 #） |
| `$withData` | `array` | protected | 通过 with() 携带的一次性数据，输出时合并进查询字符串 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建重定向响应 |
| [`to()`](#to) | 跳转到指定地址 |
| [`route()`](#route) | 按命名路由生成 URL 并跳转 |
| [`away()`](#away) | 跳转到外部地址（不强制同域/HTTPS） |
| [`secure()`](#secure) | 以 HTTPS 跳转到当前域名下的路径 |
| [`back()`](#back) | 回退到上一页 |
| [`with()`](#with) | 携带一次性数据 |
| [`withFragment()`](#withfragment) | 附加 URL 片段（锚点） |
| [`output()`](#output) | 输出重定向响应 |

### __construct()

```php
public function __construct($to = null, $statusCode = 302)
```

构建重定向响应

可直接传入初始目标地址与状态码；也可仅 `new self()` 后链式调用 `to()/route()/...`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$to` | `string|null` | `null` | 初始目标地址（可选） |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302（Found） |

### to()

```php
public function to($path, $statusCode = 302, $headers = [])
```

跳转到指定地址

自动将相对路径（不含 `://`）补全为基于当前请求的绝对 URL；
完整 URL（含 `://`）直接采用。可通过 `$headers` 附加额外响应头。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 目标路径或完整 URL |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |
| `$headers` | `array` | `[]` | 附加响应头 [key => value] |

### route()

```php
public function route($name, $parameters = [], $statusCode = 302, $headers = [])
```

按命名路由生成 URL 并跳转

委托 `Routes::url()` 反向生成路由 URL，支持路由参数与域名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 路由名称 |
| `$parameters` | `array` | `[]` | 路由参数 |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |
| `$headers` | `array` | `[]` | 附加响应头 [key => value] |

### away()

```php
public function away($path, $statusCode = 302, $headers = [])
```

跳转到外部地址（不强制同域/HTTPS）

用于跳转到第三方站点，不会对地址做协议或域名归一化。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 外部完整 URL |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |
| `$headers` | `array` | `[]` | 附加响应头 [key => value] |

### secure()

```php
public function secure($path, $statusCode = 302, $headers = [])
```

以 HTTPS 跳转到当前域名下的路径

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 当前域名下的路径（不含协议） |
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |
| `$headers` | `array` | `[]` | 附加响应头 [key => value] |

### back()

```php
public function back($statusCode = 302, $fallback = null, $headers = [])
```

回退到上一页

读取请求头 `Referer`；若缺失则回退到 `$fallback`（默认当前完整 URL）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | `302` | HTTP 状态码，默认 302 |
| `$fallback` | `string|null` | `null` | 回退兜底地址，默认当前请求完整 URL |
| `$headers` | `array` | `[]` | 附加响应头 [key => value] |

### with()

```php
public function with($key, $value = null)
```

携带一次性数据

本框架无 Session 闪存，数据以 URL 查询参数形式附加到目标地址（前端可读、可再次透传）。
支持 `with('key', 'value')` 单条，或 `with(['k1' => 'v1', 'k2' => 'v2'])` 批量。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|array` | — | 数据键名，或关联数组（批量） |
| `$value` | `mixed` | `null` | 数据值（单条模式） |

### withFragment()

```php
public function withFragment($fragment)
```

附加 URL 片段（锚点）

传入值可带或不带前导 `#`，统一在输出时拼为 `#fragment`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fragment` | `string` | — | 片段内容 |

### output()

```php
public function output()
```

输出重定向响应

组装最终 URL（合并 with 数据、片段、协议策略），发送 `Location` 头与状态码，不输出主体。

## 非公开方法

**protected**

- `protected function resolveAbsoluteUrl($path, $secure = false)` —— 将相对路径解析为基于当前请求的绝对 URL
- `protected function buildFinalUrl()` —— 组装最终输出 URL（合并 with 数据与片段、应用协议策略）
- `protected function unparseUrl($parts)` —— 将 parse_url 结果还原为字符串
- `protected function applyHeaders($headers)` —— 批量附加响应头

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseView](/php/api/foundation/http/response/response-view)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

