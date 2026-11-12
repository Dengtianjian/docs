# Cors

`kernel\Foundation\HTTP\Cors`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Cors.php`

> CORS 辅助类

## 声明

```php
class Cors
```

## 概述

集中实现跨域相关的纯计算（origin 校验/归一化、配置解析、响应头装配），
与具体中间件解耦，便于其它需要判定跨域的场景复用。

设计约定：
- 仅从请求头 Origin 读取来源；畸形/伪造（缺 scheme+host）一律视为非同源。
- 允许来源支持 "*"、逗号分隔字符串、数组三种配置形态。
- allowMethods/allowHeaders/exposeHeaders 同样支持 "*"、逗号分隔字符串、数组三种形态（"*" 即通配），
配置为字符串时原样输出，不再要求必须是数组。
- 命中白名单时精确回显请求 origin（便于配合 credentials）；未命中不输出 Allow-Origin 头。
- 同源判断：`originOf` 取规范化 origin（丢 path/query、默认端口归一、host 小写），
`isSameOrigin` 按 scheme+host+port 全等比较，`currentOrigin` 推导本站 origin；
供「该请求是否本站发起」这类判定（如免 token 的同源 ajax）复用，与 CORS 白名单逻辑相互独立。

配置键（cors.*，未配置时用 DEFAULTS）：
- allowOrigin   允许来源，默认 "*"
- allowMethods  允许方法，默认 GET/POST/PUT/DELETE/PATCH/OPTIONS
- allowHeaders  允许请求头，默认 ["Authorization"]
- exposeHeaders 允许暴露响应头，默认 ["x-auth-token","x-auth-token-expires-at"]
- maxAge        预检缓存秒数，默认 86400
- allowCredentials 是否允许凭据，true 时输出 Allow-Credentials
- 开发模式（mode=development）下不做来源限制：任意合法 origin 一律放行（回显该 origin），
便于本地联调时错误响应也能被浏览器读取
- headers()/applyTo()/emit()：同一套头部计算，分别供「装配到 Response」「直接 header() 输出」使用

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `DEFAULTS` | `[ "allowOrigin" => "*", "allowMethods" => ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], "allowHeaders" => ["authorization", "content-type", "x-requested-with"], "exposeHeaders" => ["x-auth-token", "x-auth-token-expires-at"], "maxAge" => 86400, "allowCredentials" => false, ]` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`config()`](#config) | 读取 cors 配置项（带默认值） |
| [`isValidOrigin()`](#isvalidorigin) | 校验 origin 是否为合法「scheme://host」形式 |
| [`normalizeOrigin()`](#normalizeorigin) | 归一化 origin：去掉尾部斜杠、host 转小写，便于精确比对 |
| [`originOf()`](#originof) | 从 URL / origin 中取出「scheme://host[:port]」（同源比较用） |
| [`requestOrigin()`](#requestorigin) | 取当前请求的来源（Origin 头，缺失时退化为 Referer） |
| [`currentOrigin()`](#currentorigin) | 当前站点的 origin（`scheme://host[:port]`） |
| [`isSameOrigin()`](#issameorigin) | 判断给定来源与本站是否同源 |
| [`allowOrigins()`](#alloworigins) | 解析允许来源配置为归一化数组 |
| [`resolveAllowOrigin()`](#resolvealloworigin) | 计算最终回写的 Access-Control-Allow-Origin 值 |
| [`isDevelopment()`](#isdevelopment) | 是否开发模式（mode=development） |
| [`headers()`](#headers) | 计算全部 CORS 响应头（key => value） |
| [`applyTo()`](#applyto) | 将 CORS 响应头应用到 Response |
| [`emit()`](#emit) | 直接输出 CORS 响应头（header()） |

### config()

```php
public static function config(string $key)
```

读取 cors 配置项（带默认值）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | — |

### isValidOrigin()

```php
public static function isValidOrigin(string $origin): bool
```

校验 origin 是否为合法「scheme://host」形式

HTTP_ORIGIN 可被非浏览器客户端伪造任意字符串，缺 scheme 或 host 的
无法构成有效跨域来源，按非同源处理。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$origin` | `string` | — | — |

返回：`bool` —— bool

### normalizeOrigin()

```php
public static function normalizeOrigin(string $origin): string
```

归一化 origin：去掉尾部斜杠、host 转小写，便于精确比对

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$origin` | `string` | — | — |

返回：`string` —— string

### originOf()

```php
public static function originOf($url)
```

从 URL / origin 中取出「scheme://host[:port]」（同源比较用）

与 `normalizeOrigin` 的区别：本方法**丢掉** path / query / fragment，并把默认端口归一化
（`http://a.com:80` ≡ `http://a.com`、`https://a.com:443` ≡ `https://a.com`），host 转小写。
协议相对地址（`//a.com/x`）按当前请求的协议补全。
缺 scheme 或 host（相对地址、畸形地址）一律返回 null。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string|null` | — | URL 或 origin |

### requestOrigin()

```php
public static function requestOrigin()
```

取当前请求的来源（Origin 头，缺失时退化为 Referer）

### currentOrigin()

```php
public static function currentOrigin()
```

当前站点的 origin（`scheme://host[:port]`）

优先用 `URL::baseURL`（读 REQUEST_SCHEME + HTTPS + HTTP_HOST）；
该函数的 REQUEST_SCHEME 在某些 SAPI 下缺失，此时退化为按 `$_SERVER['HTTPS']` 判协议 + `HTTP_HOST`。
非 Web 上下文（HTTP_HOST 缺失，如 CLI）返回 null。

### isSameOrigin()

```php
public static function isSameOrigin($url = null, $currentOrigin = null)
```

判断给定来源与本站是否同源

同源 = scheme + host + port 三者全等（默认端口已归一化，host 大小写不敏感），
即浏览器同源策略的判定方式。

注意（保守策略）：来源缺失、相对地址、畸形地址、或取不到本站 origin 时一律返回 **false**。
若调用方希望「无 Origin/Referer 头视为非跨域」（如 [GlobalCorsMiddleware](/php/api/middlewares/global-cors-middleware) 的约定），
请自行先用 `requestOrigin` 判断头是否存在，再调用本方法。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string|null` | `null` | 要判断的来源或 URL；不传/为空时取当前请求头 Origin（缺失时退化为 Referer） |
| `$currentOrigin` | `string|null` | `null` | 本站 origin；不传时按当前请求推导（见 `currentOrigin`） |

### allowOrigins()

```php
public static function allowOrigins(): array
```

解析允许来源配置为归一化数组

- 数组   → 直接使用
- "*"    → ["*"]
- 字符串 → 按逗号拆分并去空白（#1 兜底由 DEFAULTS 提供）

返回：`array` —— string[]

### resolveAllowOrigin()

```php
public static function resolveAllowOrigin($requestOrigin)
```

计算最终回写的 Access-Control-Allow-Origin 值

- 请求无合法 Origin      → null（不发送该头）
- origin 命中白名单/通配  → 回显该 origin
- 未命中               → null（不发送该头，而非空字符串脏头）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$requestOrigin` | `string|null` | — | 取自请求头 Origin 的值（可为 null） |

### isDevelopment()

```php
public static function isDevelopment(): bool
```

是否开发模式（mode=development）

开发模式下 CORS 不做来源限制：任意合法 origin 均放行，便于本地联调。
配置未加载或读取失败时按非开发模式处理（保守），避免误放开线上。

返回：`bool` —— bool

### headers()

```php
public static function headers($requestOrigin): array
```

计算全部 CORS 响应头（key => value）

供 applyTo()（写入 Response）与 emit()（直接 header() 输出）复用，
避免两处重复装配逻辑。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$requestOrigin` | `string|null` | — | 请求头 Origin 值（可为 null） |

返回：`array` —— array＜string,string＞

### applyTo()

```php
public static function applyTo(Response $response, $requestOrigin): Response
```

将 CORS 响应头应用到 Response

后置使用：先拿到 Response 再调用本方法补充头。非白名单来源不输出
Access-Control-Allow-Origin（符合规范），但其它 Access-Control-* 常驻头仍会设置。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$response` | `Response` | — | — |
| `$requestOrigin` | `string|null` | — | 请求头 Origin 值（可为 null） |

返回：`Response` —— \kernel\Foundation\HTTP\Response

### emit()

```php
public static function emit($requestOrigin)
```

直接输出 CORS 响应头（header()）

用于拿不到 Response 的场景：全局异常处理器在输出错误响应前补 CORS 头，
使「抛异常 → 错误响应」同样带上跨域头，浏览器才能读到报错内容。
PHP header() 会累积，随后 Response::output() 输出的头部不会覆盖这些 CORS 头。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$requestOrigin` | `string|null` | — | 请求头 Origin 值（可为 null） |

## 非公开方法

**private**

- `private static function toHeaderList($value): string` —— 将 allowMethods/allowHeaders/exposeHeaders 配置归一化为响应头字符串

## 同目录

- [Curl](/php/api/foundation/http/curl)
- [Request](/php/api/foundation/http/request)
- [Response](/php/api/foundation/http/response)
- [URL](/php/api/foundation/http/url)

