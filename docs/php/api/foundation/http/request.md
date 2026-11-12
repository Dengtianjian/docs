# Request

`kernel\Foundation\HTTP\Request`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request.php`

## 声明

```php
class Request
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `RequestQuery` | `null` | 请求query |
| `$body` | `RequestBody` | `null` | 请求体 |
| `$header` | `RequestHeader` | `null` | 请求头 |
| `$params` | `RequestParams` | `null` | URI参数 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$method` | `string|null` | private | 请求方法（私有存储，经 method() 读取/写入） |
| `$uri` | `string|null` | private | 请求URI（私有存储，经 uri() 读取/写入） |
| `$headers` | `array|null` | private | 归一化后的请求头缓存（小写键名），首次访问时构建 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`method()`](#method) | 获取/设置请求方法 |
| [`uri()`](#uri) | 获取/设置请求URI |
| [`input()`](#input) | 统一读取输入参数 |
| [`hasInput()`](#hasinput) | 是否存在指定输入 |
| [`all()`](#all) | 合并全部输入参数 |
| [`hasFile()`](#hasfile) | 是否存在上传文件 |
| [`file()`](#file) | 获取上传文件 |
| [`isMethod()`](#ismethod) | 是否请求方法等于指定方法 |
| [`isGet()`](#isget) | 是否为 GET 请求 |
| [`isPost()`](#ispost) | 是否为 POST 请求 |
| [`isPut()`](#isput) | 是否为 PUT 请求 |
| [`isDelete()`](#isdelete) | 是否为 DELETE 请求 |
| [`isPatch()`](#ispatch) | 是否为 PATCH 请求 |
| [`path()`](#path) | 获取规范化的请求路径 |
| [`segments()`](#segments) | 获取请求路径的每一段 |
| [`segment()`](#segment) | 获取请求路径的第 index 段（从 0 开始） |
| [`isPath()`](#ispath) | 判断请求路径是否匹配给定模式 |
| [`userAgent()`](#useragent) | 获取 User-Agent 请求头 |
| [`referrer()`](#referrer) | 获取 Referer 请求头 |
| [`scheme()`](#scheme) | 获取请求协议 |
| [`isSecure()`](#issecure) | 是否为 HTTPS 请求 |
| [`host()`](#host) | 获取请求主机名（Host 头优先，缺省取 SERVER_NAME） |
| [`fullUrl()`](#fullurl) | 获取完整请求 URL（scheme://host/path，不含 query） |
| [`cookie()`](#cookie) | 获取 Cookie 值 |
| [`isCli()`](#iscli) | 是否为 CLI 环境 |
| [`ip()`](#ip) | 获取用户IP地址 |
| [`preferredOutputType()`](#preferredoutputtype) | 根据请求头推断客户端期望的输出内容格式，用于响应未显式调用 json()/text()/view() 等时的兜底判断 |
| [`async()`](#async) | 是否是ASYNC请求。该类型请求是服务器自己通过CURL向自己发起的HTTP请求，头部会带有x-async标识 |

### __construct()

```php
public function __construct()
```

### method()

```php
public function method($value = null)
```

获取/设置请求方法

无参调用时返回请求方法（首次调用从 $_SERVER['REQUEST_METHOD'] 延迟解析，dev 模式支持 _method 覆盖）；
传参则写入请求方法并返回。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 请求方法（传入则写入） |

### uri()

```php
public function uri($value = null)
```

获取/设置请求URI

无参调用时返回请求URI（首次调用从 $_SERVER['REQUEST_URI'] 延迟解析，dev 模式支持 uri query 覆盖；
CLI 无 REQUEST_URI 时兜底 "/"）；传参则写入 URI 并返回。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 请求URI（传入则写入） |

### input()

```php
public function input($key, $default = null)
```

统一读取输入参数

按 params（路由参数）→ query → body 的顺序返回第一个存在的值；均不存在返回默认值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名 |
| `$default` | `mixed` | `null` | 默认值 |

### hasInput()

```php
public function hasInput($key)
```

是否存在指定输入

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名 |

### all()

```php
public function all()
```

合并全部输入参数

params（路由参数）优先，依次被 query、body 覆盖；body 非数组时忽略。

### hasFile()

```php
public function hasFile($key = null)
```

是否存在上传文件

不传键时判断是否有任意上传文件；传键时判断指定键是否有有效上传（error 为 UPLOAD_ERR_OK 或 UPLOAD_ERR_NO_FILE 视为无）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 文件键名；null 表示任意上传 |

### file()

```php
public function file($key = null)
```

获取上传文件

不传键时返回全部归一化后的上传文件映射（键名 => 单文件数组）；
传键时返回归一化后的单文件数组，不存在或无效上传返回 null。
归一化后的单文件结构：name/tmp_name/error/size/type/full_path。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 文件键名；null 返回全部 |

### isMethod()

```php
public function isMethod($method)
```

是否请求方法等于指定方法

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 方法名（大小写不敏感） |

### isGet()

```php
public function isGet()
```

是否为 GET 请求

### isPost()

```php
public function isPost()
```

是否为 POST 请求

### isPut()

```php
public function isPut()
```

是否为 PUT 请求

### isDelete()

```php
public function isDelete()
```

是否为 DELETE 请求

### isPatch()

```php
public function isPatch()
```

是否为 PATCH 请求

### path()

```php
public function path()
```

获取规范化的请求路径

去除前导/尾随斜杠（非根路径时）、去除 query 串。

### segments()

```php
public function segments()
```

获取请求路径的每一段

### segment()

```php
public function segment($index)
```

获取请求路径的第 index 段（从 0 开始）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$index` | `int` | — | 段下标 |

### isPath()

```php
public function isPath($pattern, &$params = null)
```

判断请求路径是否匹配给定模式

模式支持 {param} 与 {param:regex} 占位符。纯判断、无副作用：
匹配提取到的参数不写入 $this->params，如需使用可经第三参引用接收。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pattern` | `string` | — | 路径模式，如 "links/{id}" |
| `$params` | `array|null` | `null` | 匹配成功后以引用方式返回提取到的参数映射 |

### userAgent()

```php
public function userAgent()
```

获取 User-Agent 请求头

### referrer()

```php
public function referrer()
```

获取 Referer 请求头

### scheme()

```php
public function scheme()
```

获取请求协议

默认按 $_SERVER['HTTPS'] 判断；当配置了可信代理时才回退 HTTP_X_FORWARDED_PROTO。

### isSecure()

```php
public function isSecure()
```

是否为 HTTPS 请求

### host()

```php
public function host()
```

获取请求主机名（Host 头优先，缺省取 SERVER_NAME）

### fullUrl()

```php
public function fullUrl()
```

获取完整请求 URL（scheme://host/path，不含 query）

### cookie()

```php
public function cookie($key, $default = null)
```

获取 Cookie 值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名 |
| `$default` | `mixed` | `null` | 默认值 |

### isCli()

```php
public function isCli()
```

是否为 CLI 环境

### ip()

```php
public static function ip()
```

获取用户IP地址

默认以 REMOTE_ADDR（TCP 连接的远端地址，不可伪造）为准。
仅当进程配置了可信代理时才回退到 X-Forwarded-For / Client-IP，否则这些头可被客户端任意伪造。
所有候选值都经 filter_var 校验，多值（逗号分隔）取第一个有效 IP。

### preferredOutputType()

```php
public function preferredOutputType()
```

根据请求头推断客户端期望的输出内容格式，用于响应未显式调用 json()/text()/view() 等时的兜底判断

推断顺序：
1. 请求体 Content-Type：application/json（含 +json）-> json；application/xml、text/xml、+xml -> xml；text/html -> html；text/plain -> text
2. Accept 请求头（逗号分隔逐项判定）：application/json -> json；application/xml、text/xml -> xml；text/html -> html；text/plain -> text；通配 MIME 跳过

判断完全基于请求头，不依赖 ajax() 标志。controller 已显式设置输出类型时优先使用控制器返回值，不会走到这里。

### async()

```php
public function async()
```

是否是ASYNC请求。该类型请求是服务器自己通过CURL向自己发起的HTTP请求，头部会带有x-async标识

## 非公开方法

**private**

- `private static function normalize($item)` —— 归一化单个上传项，多文件字段（数组型）展平为单文件数组
- `private static function valid($item)` —— 判断上传项是否有效（存在文件且 error 为 UPLOAD_ERR_OK）
- `private static function validatedIp($ip)` —— 校验并规范化IP地址
- `private function matchesMime($mime, $family)` —— 判定 MIME 类型是否属于给定格式族。
- `private function caseInsensitiveHeader($key)` —— 大小写不敏感地读取请求头
- `private function buildHeaders()` —— 构建归一化的请求头映射（小写键名，下划线转连字符）

## 同目录

- [Cors](/php/api/foundation/http/cors)
- [Curl](/php/api/foundation/http/curl)
- [Response](/php/api/foundation/http/response)
- [URL](/php/api/foundation/http/url)

