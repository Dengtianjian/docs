# URL

`kernel\Foundation\HTTP\URL`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/URL.php`

> URL 统一资源定位器类

## 声明

```php
class URL
```

## 概述

提供 URL 的解析、构建、读写与规范化能力：
- 通过 `parseURL()` 将字符串解析为各组成部分，并在构造时填充到实例属性；
- 通过 `buildURL()` / `buildQuery()` 反向拼装 URL 与查询字符串；
- 实例支持链式修改协议、主机、路径、端口、参数等，再由 `toString()` 还原为完整 URL；
- 提供 `current()` / `fromCurrent()` 读取并解析当前请求 URL；
- 提供 `domain()` 静态方法获取当前请求归一化域名（小写、去端口、去 IPv6 方括号）；
- 提供 `normalizeDomain()` 对域名做路由级归一化（小写、去端口、去 IPv6 方括号）。

所有组成部分在解析缺失时统一置为 `null`（而非空字符串），避免下标访问警告。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string|null` | `null` | — |
| `$origin` | `string|null` | `null` | — |
| `$port` | `int|null` | `null` | — |
| `$user` | `string|null` | `null` | — |
| `$password` | `string|null` | `null` | — |
| `$pathName` | `string|null` | `null` | — |
| `$protocol` | `string|null` | `null` | — |
| `$queryString` | `string|null` | `null` | — |
| `$queryParams` | `array` | `[]` | — |
| `$fragment` | `string|null` | `null` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$URL` | `string|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建 URL 类实例 |
| [`baseURL()`](#baseurl) | — |
| [`isAbsoluteURL()`](#isabsoluteurl) | 判断是否为「带 URL 前缀的绝对地址」，而非本地文件路径 |
| [`parseURL()`](#parseurl) | 解析 URL 为结构化数组 |
| [`parseQueryString()`](#parsequerystring) | 解析查询字符串为键值对数组 |
| [`buildQuery()`](#buildquery) | 由关联数组构建查询字符串 |
| [`buildURL()`](#buildurl) | 由各部分拼装完整 URL |
| [`combinedPathName()`](#combinedpathname) | 组合多个路径段为一个归一化路径 |
| [`toString()`](#tostring) | 字符串化URL所有参数，也就是把所有参数组合成一个URL |
| [`__toString()`](#__tostring) | — |
| [`setProtocol()`](#setprotocol) | 设置协议 |
| [`setHost()`](#sethost) | 设置主机 |
| [`setPath()`](#setpath) | 设置路径（保留已有 query/fragment） |
| [`setPort()`](#setport) | 设置端口 |
| [`setFragment()`](#setfragment) | 设置hash片段 |
| [`isHttps()`](#ishttps) | 是否 HTTPS 协议 |
| [`getDomain()`](#getdomain) | 获取去掉 www. 前缀的域名 |
| [`getBase()`](#getbase) | 获取站点根地址（protocol://host，不含路径） |
| [`queryParam()`](#queryparam) | 设置（写入）查询参数，支持两种调用形态： |
| [`getQueryParam()`](#getqueryparam) | 获取请求参数 |
| [`hasQueryParam()`](#hasqueryparam) | 是否存在请求参数 |
| [`removeQueryParam()`](#removequeryparam) | 移除请求参数 |
| [`clearQueryParams()`](#clearqueryparams) | 清空请求参数 |
| [`current()`](#current) | 获取当前请求的完整 URL |
| [`fromCurrent()`](#fromcurrent) | 从当前请求构造 URL 实例 |
| [`domain()`](#domain) | 获取当前请求的域名（归一化） |
| [`normalizeDomain()`](#normalizedomain) | 归一化域名（小写 + 剥端口 + 去 IPv6 方括号） |

### __construct()

```php
public function __construct($URL = null)
```

构建 URL 类实例

解析传入的 URL 字符串，并将各组成部分写入对应的公开属性。
传入 `null` 时所有属性保持默认值（多为 `null`），可后续通过 setter 逐项赋值再 `toString()`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$URL` | `string|null` | `null` | 待解析的 URL 字符串，为空则仅初始化属性 |

### baseURL()

```php
public static function baseURL()
```

### isAbsoluteURL()

```php
public static function isAbsoluteURL($url)
```

判断是否为「带 URL 前缀的绝对地址」，而非本地文件路径

这是**纯语法**判断（只认 RFC 3986 的协议前缀，不是子串包含）：
- `http://` / `https://` / `ftp://` / `ftps://` / `sftp://` / `oss://` … → true（任意协议都算）
- `//host/path`（协议相对地址）→ true —— 它指向外部主机，同样不该按本地路径处理
- `/data/http/a.png`（本地路径里恰好含 "http"）、`C:/data/a.png`（Windows 盘符）→ false

注意：本方法**不判可达性**、也不校验 URL 合法性 —— `file://`、自造协议同样返回 true。
名字用 absolute 而非 remote，正是为了避免让人误以为它会去连接主机（要判"能否取回"请用
`\kernel\Foundation\HTTP\Response\ResponseProxy::canProxy`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string|null` | — | 待判断的地址 |

### parseURL()

```php
public static function parseURL($URL)
```

解析 URL 为结构化数组

使用 PHP 内置 `parse_url()` 拆解 URL，并对缺失的组成部分统一返回 `null`。
`origin` 字段按标准语义计算为 `scheme://host[:port]`（仅当 scheme 与 host 同时存在时）。
`query` 部分会进一步经 `parseQueryString()` 解析为关联数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$URL` | `string` | — | URL 地址 |

### parseQueryString()

```php
public static function parseQueryString($queryString)
```

解析查询字符串为键值对数组

以 `&` 分割参数，每段再以首个 `=` 拆分为键与值。
无 `=` 的参数（如 `?a&b`）其值退化为空字符串；键与值均经 `urldecode` + `rawurldecode` 双重解码。
空字符串或非字符串入参直接返回空数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryString` | `string|null` | — | 查询字符串（不含前导 `?`） |

### buildQuery()

```php
public static function buildQuery($queryParams, $encode = true)
```

由关联数组构建查询字符串

遍历参数拼装 `key=value`，以 `&` 连接。当键为数值时退化为「裸参数」：
以值作为键名、值置空（即 `value=`），仅输出键名本身。
`$encode` 为 true 时对键与值调用 `rawurlencode`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryParams` | `array` | — | 请求参数键值对 |
| `$encode` | `boolean` | `true` | 是否对键值进行编码（默认 true） |

### buildURL()

```php
public static function buildURL($host = "", $pathName = "", $queryParams = [], $fragment = null, $protocol = "https", $port = null, $user = null, $password = null)
```

由各部分拼装完整 URL

各片段空值时会自动省略对应段（如 `$port` 为空则不拼 `:port`）。
userinfo 按 `user:pass@` 形式拼接，仅存在用户名时也会附加 `@`。
查询参数经 `buildQuery()` 生成，且自动加前导 `?`（仅当非空）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | `""` | 主机名 |
| `$pathName` | `string` | `""` | 路径（会自动补前导 `/`） |
| `$queryParams` | `array` | `[]` | 查询参数键值对 |
| `$fragment` | `string|null` | `null` | hash 片段（自动补前导 `#`） |
| `$protocol` | `string` | `"https"` | 协议（默认 `https`） |
| `$port` | `int|null` | `null` | 端口（自动补前导 `:`） |
| `$user` | `string|null` | `null` | 用户名（userinfo 段） |
| `$password` | `string|null` | `null` | 密码（userinfo 段） |

### combinedPathName()

```php
public static function combinedPathName(...$paths)
```

组合多个路径段为一个归一化路径

过滤空段，并去除每段首尾的斜杠/反斜杠，再以单斜杠拼接，天然避免段间重复斜杠。
最后用正则仅折叠「非协议冒号后」的连续斜杠，避免误伤 `https://host` 中的合法双斜杠。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$paths` | `...string[]` | — | 路径元素（可变参数） |

### toString()

```php
public function toString()
```

字符串化URL所有参数，也就是把所有参数组合成一个URL

### __toString()

```php
public function __toString()
```

### setProtocol()

```php
public function setProtocol($protocol)
```

设置协议

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$protocol` | `string` | — | 协议 |

### setHost()

```php
public function setHost($host)
```

设置主机

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | — | 主机 |

### setPath()

```php
public function setPath($pathName)
```

设置路径（保留已有 query/fragment）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pathName` | `string` | — | 路径 |

### setPort()

```php
public function setPort($port)
```

设置端口

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$port` | `int|null` | — | 端口 |

### setFragment()

```php
public function setFragment($fragment)
```

设置hash片段

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fragment` | `string|null` | — | hash片段 |

### isHttps()

```php
public function isHttps()
```

是否 HTTPS 协议

### getDomain()

```php
public function getDomain()
```

获取去掉 www. 前缀的域名

### getBase()

```php
public function getBase()
```

获取站点根地址（protocol://host，不含路径）

### queryParam()

```php
public function queryParam($value, $key = null)
```

设置（写入）查询参数，支持两种调用形态：

1. 批量数组：`queryParam(['a' => '1', 'b'])`，以键值对写入；
数值键（如 `'b'`）退化为裸参数，键名即参数名、值置空。
2. 单参数：
- 同时传 `$key` 与 `$value`：写入 `$queryParams[$key] = $value`；
- 仅传 `$value`（或 `$value` 为真且 `$key` 为空）：把 `$value` 当作裸参数键名（解码后）写入，值置空。

注意：当 `$value` 为空串且未提供 `$key` 时不会写入（避免写入空键）。
所有写入均返回 `$this`，可链式调用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array` | — | 参数值或批量参数数组 |
| `$key` | `string|null` | `null` | 参数名（单参数形态下） |

### getQueryParam()

```php
public function getQueryParam($key, $default = null)
```

获取请求参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 参数名 |
| `$default` | `mixed` | `null` | 缺省默认值 |

### hasQueryParam()

```php
public function hasQueryParam($key)
```

是否存在请求参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 参数名 |

### removeQueryParam()

```php
public function removeQueryParam($key)
```

移除请求参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 参数名 |

### clearQueryParams()

```php
public function clearQueryParams()
```

清空请求参数

### current()

```php
public static function current()
```

获取当前请求的完整 URL

基于 `$_SERVER` 推导：先经 `baseURL()` 取得 `scheme://host`，再拼接 `REQUEST_URI`（含路径、query 与 fragment）。
在 CLI 或非 Web 上下文（`REQUEST_SCHEME`/`HTTP_HOST` 缺失）下 `baseURL()` 返回空串，此时本方法返回空串。

### fromCurrent()

```php
public static function fromCurrent()
```

从当前请求构造 URL 实例

### domain()

```php
public static function domain()
```

获取当前请求的域名（归一化）

从 `$_SERVER['HTTP_HOST']` 读取当前请求主机，经 `normalizeDomain()` 归一化
（小写、去端口、去 IPv6 方括号）后返回，可直接用于路由匹配与域名比对，
与 `Route::domain()` 注册侧、`Router::route()` 消费侧归一化口径保持一致。

CLI / 非 Web 上下文（`HTTP_HOST` 缺失）下返回 `null`。

### normalizeDomain()

```php
public static function normalizeDomain($domain)
```

归一化域名（小写 + 剥端口 + 去 IPv6 方括号）

Host 头按 RFC 不区分大小写，且可能携带端口（api.example.com:8080）或
IPv6 方括号形式（[::1]:8080）。域名路由在注册与匹配两侧都经此法归一，
保证域名组注册的小写无端口形式能命中任意大小写/带端口的请求 Host。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$domain` | `string` | — | 原始域名 |

## 同目录

- [Cors](/php/api/foundation/http/cors)
- [Curl](/php/api/foundation/http/curl)
- [Request](/php/api/foundation/http/request)
- [Response](/php/api/foundation/http/response)

