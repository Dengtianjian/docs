# Curl

`kernel\Foundation\HTTP\Curl`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Curl.php`

> cURL HTTP 客户端封装

## 声明

```php
class Curl
```

## 概述

基于 PHP 原生 cURL 扩展实现，提供链式（Fluent）API，同时兼容 PHP 8 下的
CurlHandle 对象句柄（判句柄存活统一使用 is_object()，不可用 is_resource()）。

## 基本用法

采用"先配置、后发送"的两段式链式调用：

```php
use kernel\Foundation\HTTP\Curl;

// 方式一：静态工厂 + 链式发送（发送方法内部自动调用 send()）
$result = Curl::init()
->url('https://api.example.com/users')
->data(['name' => '张三'])
->headers(['X-Token' => 'abc'])
->post()                       // 立即发送 POST
->responseData();              // 读取响应（JSON 自动解析为数组）

// 方式二：new 实例 + 手动 send()
$curl = new Curl();
$curl->url('https://api.example.com/users')->data(['page' => 1]);
$curl->send();
echo $curl->statusCode();          // 200
var_dump($curl->responseHeaders()); // 响应头
```

## 请求流程

1. 构造时 curl_init() 创建句柄。
2. 通过 url()/data()/headers()/cookie()/json()/sslCert() 等配置请求。
3. 调用 get()/post()/put()/patch()/delete()/head()/connect()/file() 之一发送
（发送方法内部会调用 send() 并返回 $this，便于继续链式读响应）。
4. 通过 responseData()/responseHeaders()/statusCode() 读取结果，
失败时通过 errorNo()/error() 获取 curl 错误号/错误信息。

## 支持的请求方法

| 方法            | HTTP 动词   | 说明                                            |
|-----------------|-------------|-------------------------------------------------|
| get()           | GET         | 查询参数自动拼接至 URL                           |
| post()          | POST        | 表单或 JSON 请求体（默认）                       |
| put()           | PUT         | 可整体替换请求体                                 |
| patch()         | PATCH       | 可整体替换请求体                                 |
| delete()        | DELETE      | 可携带请求体                                     |
| head()          | HEAD        | 无请求体，仅响应头                               |
| connect()       | CONNECT     | 代理隧道建连                                     |
| file()/upload() | POST/multipart | 文件上传（multipart/form-data）                |

## 响应读取

- responseData()：响应体，Content-Type 为 JSON 时自动 json_decode 为数组
- getData()：responseData() 的别名，兼容旧用法
- responseHeaders()：响应头（关联数组）
- statusCode()：HTTP 状态码（请求失败时为 0）
- errorNo()/error()：curl 错误号 / 错误信息

## 注意事项

- Content-Type 会按请求类型自动强制覆盖，无需手动设置：
文件上传 → multipart/form-data；GET/HEAD → 移除；JSON → application/json；
否则 → application/x-www-form-urlencoded。
- 同一实例可 reset() 重置配置后复用（句柄保留），适合循环批量请求。
- 不要在请求失败后依赖 responseData()，应优先判断 errorNo()/statusCode()。

## 示例

```php
use kernel\Foundation\HTTP\Curl;

// 方式一：静态工厂 + 链式发送（发送方法内部自动调用 send()）
$result = Curl::init()
->url('https://api.example.com/users')
->data(['name' => '张三'])
->headers(['X-Token' => 'abc'])
->post()                       // 立即发送 POST
->responseData();              // 读取响应（JSON 自动解析为数组）

// 方式二：new 实例 + 手动 send()
$curl = new Curl();
$curl->url('https://api.example.com/users')->data(['page' => 1]);
$curl->send();
echo $curl->statusCode();          // 200
var_dump($curl->responseHeaders()); // 响应头
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$requestUrl` | `string` | protected | 请求地址 |
| `$curlHeaders` | `array` | protected | 请求头集合 |
| `$curlDatas` | `array` | protected | 请求体 |
| `$curlMethod` | `string` | protected | 请求方法：get/post/put/patch/delete/head/file 等 |
| `$curlTimeout` | `int` | protected | 请求超时时间（秒） |
| `$curlConnectTimeout` | `int` | protected | 连接超时时间（秒），0 表示不单独设置 |
| `$isJson` | `bool` | protected | 请求体是否为 JSON |
| `$curlCookie` | `array` | protected | Cookie 数据 |
| `$uploadFile` | `array` | protected | 上传文件集合，key 为表单字段名，value 为 CURLFile 或文件路径 |
| `$bypassSslVerification` | `bool` | protected | 是否跳过 SSL 证书校验 |
| `$sslCertType` | `string` | protected | 客户端 SSL 证书类型 |
| `$sslCertFilePath` | `string|null` | protected | 客户端 SSL 证书文件路径 |
| `$sslKeyType` | `string` | protected | 客户端 SSL 密钥类型 |
| `$sslKeyFilePath` | `string|null` | protected | 客户端 SSL 密钥文件路径 |
| `$curlOptions` | `array` | protected | 可传递的额外 cURL 选项 |
| `$responseData` | `mixed` | protected | 响应数据（JSON 自动解析为数组） |
| `$curlErrorMsg` | `string|null` | protected | cURL 错误信息 |
| `$curlErrorNo` | `int|null` | protected | cURL 错误码 |
| `$responseHeadersData` | `array` | protected | 响应头集合 |
| `$responseStatusCode` | `int` | protected | HTTP 响应状态码 |
| `$proxy` | `array` | protected | 代理设置 |
| `$curlInstance` | `\CurlHandle|\resource|null` | protected | cURL 句柄（PHP 8 下为 CurlHandle 对象） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造函数 |
| [`init()`](#init) | 创建实例（静态工厂） |
| [`url()`](#url) | 设置请求地址 |
| [`get()`](#get) | 设置请求方法为 GET 并发送 |
| [`post()`](#post) | 设置请求方法为 POST 并发送 |
| [`put()`](#put) | 设置请求方法为 PUT 并发送 |
| [`patch()`](#patch) | 设置请求方法为 PATCH 并发送 |
| [`delete()`](#delete) | 设置请求方法为 DELETE 并发送 |
| [`head()`](#head) | 设置请求方法为 HEAD 并发送 |
| [`connect()`](#connect) | 设置请求方法为 CONNECT 并发送 |
| [`file()`](#file) | 文件上传（multipart/form-data） |
| [`upload()`](#upload) | 注册一个上传文件 |
| [`clearUploadFiles()`](#clearuploadfiles) | 清空已注册的上传文件 |
| [`data()`](#data) | 设置请求体数据 |
| [`headers()`](#headers) | 设置请求头 |
| [`cookie()`](#cookie) | 设置 Cookie |
| [`json()`](#json) | 设置请求体是否为 JSON |
| [`timeout()`](#timeout) | 设置超时时间 |
| [`connectTimeout()`](#connecttimeout) | 设置连接超时时间 |
| [`referer()`](#referer) | 设置 Referer |
| [`userAgent()`](#useragent) | 设置 User-Agent |
| [`encoding()`](#encoding) | 设置 Accept-Encoding |
| [`followLocation()`](#followlocation) | 设置是否跟随重定向 |
| [`basicAuth()`](#basicauth) | 设置 HTTP Basic 认证 |
| [`proxy()`](#proxy) | 设置代理 |
| [`https()`](#https) | 设置 HTTPS 相关选项 |
| [`sslCert()`](#sslcert) | 设置客户端 SSL 证书 |
| [`sslKey()`](#sslkey) | 设置客户端 SSL 密钥 |
| [`options()`](#options) | 传递额外 cURL 选项 |
| [`reset()`](#reset) | 重置请求配置（保留句柄复用） |
| [`send()`](#send) | 发送请求（由各请求方法自动调用，也可手动触发） |
| [`pause()`](#pause) | 暂停请求（挂起当前句柄） |
| [`close()`](#close) | 关闭并释放 cURL 句柄 |
| [`curlInstance()`](#curlinstance) | 获取 cURL 句柄 |
| [`responseData()`](#responsedata) | 获取响应体 |
| [`responseHeaders()`](#responseheaders) | 获取响应头 |
| [`statusCode()`](#statuscode) | 获取 HTTP 响应状态码 |
| [`errorNo()`](#errorno) | 获取 cURL 错误码 |
| [`error()`](#error) | 获取 cURL 错误信息 |
| [`getData()`](#getdata) | 获取响应数据（responseData 别名） |
| [`__destruct()`](#__destruct) | — |

### __construct()

```php
public function __construct()
```

构造函数

创建 cURL 句柄。PHP 8 下 curl_init() 返回 \CurlHandle 对象，
因此后续判句柄存活统一使用 is_object() 而非 is_resource()。

### init()

```php
public static function init()
```

创建实例（静态工厂）

返回 new static()，支持子类继承时返回子类实例。适合无需复用句柄、
一次性发起请求的场景（例如 Router 中的快速 HTTP 调用）。

```php
$res = Curl::init()->url($url)->post()->getData();
```

```php
$res = Curl::init()->url($url)->post()->getData();
```

### url()

```php
public function url($url, $query = [])
```

设置请求地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string` | — | 请求地址 |
| `$query` | `array` | `[]` | 可选查询参数（会自动以 ? / & 拼接到 URL） |

### get()

```php
public function get($query = [])
```

设置请求方法为 GET 并发送

发送 GET 请求。传入的 $query 会与 url() 中已拼接的查询参数合并追加到 URL；
若通过 data() 设置了请求体，也会一并拼接到 URL 查询串（GET 不携带请求体）。

```php
$res = Curl::init()->url('https://api.example.com/users')->get(['page' => 1])->responseData();
```

```php
$res = Curl::init()->url('https://api.example.com/users')->get(['page' => 1])->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `array` | `[]` | 可选查询参数（追加到 URL 查询串） |

### post()

```php
public function post($body = null)
```

设置请求方法为 POST 并发送

发送 POST 请求。默认使用 data() 设置的请求体；若传入 $body 则整体替换。
请求体序列化方式取决于 json()：
- json(true)（默认）→ application/json + json_encode
- json(false) → application/x-www-form-urlencoded + http_build_query

```php
$res = Curl::init()
->url('https://api.example.com/users')
->data(['name' => '张三', 'age' => 20])
->post()
->responseData();
```

```php
$res = Curl::init()
->url('https://api.example.com/users')
->data(['name' => '张三', 'age' => 20])
->post()
->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$body` | `array|string|null` | `null` | 请求体；null 表示使用 data() 设置的数据 |

### put()

```php
public function put($body = null)
```

设置请求方法为 PUT 并发送

发送 PUT 请求，用于整体更新资源。默认使用 data() 设置的请求体，
传入 $body 则整体替换（与 PATCH 的"部分更新"语义相对）。

```php
$res = Curl::init()
->url('https://api.example.com/users/1')
->put(['name' => '李四'])
->responseData();
```

```php
$res = Curl::init()
->url('https://api.example.com/users/1')
->put(['name' => '李四'])
->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$body` | `array|string|null` | `null` | 请求体；null 表示使用 data() 设置的数据 |

### patch()

```php
public function patch($body = null)
```

设置请求方法为 PATCH 并发送

发送 PATCH 请求，用于部分更新资源。默认使用 data() 设置的请求体，
传入 $body 则整体替换。

```php
$res = Curl::init()
->url('https://api.example.com/users/1')
->patch(['age' => 21])
->responseData();
```

```php
$res = Curl::init()
->url('https://api.example.com/users/1')
->patch(['age' => 21])
->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$body` | `array|string|null` | `null` | 请求体；null 表示使用 data() 设置的数据 |

### delete()

```php
public function delete($body = null)
```

设置请求方法为 DELETE 并发送

发送 DELETE 请求，删除资源。部分服务允许携带请求体，可通过 data()
或 $body 参数设置；大多数服务忽略请求体。

```php
$res = Curl::init()->url('https://api.example.com/users/1')->delete()->responseData();
```

```php
$res = Curl::init()->url('https://api.example.com/users/1')->delete()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$body` | `array|string|null` | `null` | 请求体；null 表示使用 data() 设置的数据 |

### head()

```php
public function head()
```

设置请求方法为 HEAD 并发送

发送 HEAD 请求，仅获取响应头（不返回响应体），常用于探测资源存在性、
读取响应头元信息等。通过 CURLOPT_NOBODY 实现。

```php
$res = Curl::init()->url('https://api.example.com/files/1')->head();
$status = $res->statusCode();          // 200 表示存在
$length = $res->responseHeaders()['Content-Length'] ?? null;
```

```php
$res = Curl::init()->url('https://api.example.com/files/1')->head();
$status = $res->statusCode();          // 200 表示存在
$length = $res->responseHeaders()['Content-Length'] ?? null;
```

### connect()

```php
public function connect()
```

设置请求方法为 CONNECT 并发送

发送 CONNECT 请求，用于建立 HTTP 代理隧道（TLS 通过代理）。仅当目标
服务通过代理建立 CONNECT 隧道时使用，一般场景较少涉及。

### file()

```php
public function file($filePath = null, $fieldName = 'file', $fileName = null, $mimeType = '')
```

文件上传（multipart/form-data）

两种用法：
1. 直接传入文件路径 + 字段名，随后调用 post()（或 send()）触发上传；
2. 先 upload() 注册多个 CURLFile、data() 设置普通表单字段，再 file() 声明
本次为上传并触发。

注意：file() 本身**不会自动发送**，仅将请求方法标记为 multipart 上传，
必须由后续的 post()/send() 真正发起请求。

```php
// 用法一：直接传路径上传单文件
$res = Curl::init()
->url('https://api.example.com/upload')
->file('/path/to/a.jpg')
->post()
->responseData();

// 用法二：混合普通字段 + 多文件
$curl = Curl::init()->url('https://api.example.com/upload');
$curl->upload('pic1', '/path/a.jpg');
$curl->upload('pic2', '/path/b.png');
$curl->data(['title' => '相册']);
$res = $curl->file()->post()->responseData();
```

```php
// 用法一：直接传路径上传单文件
$res = Curl::init()
->url('https://api.example.com/upload')
->file('/path/to/a.jpg')
->post()
->responseData();

// 用法二：混合普通字段 + 多文件
$curl = Curl::init()->url('https://api.example.com/upload');
$curl->upload('pic1', '/path/a.jpg');
$curl->upload('pic2', '/path/b.png');
$curl->data(['title' => '相册']);
$res = $curl->file()->post()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string|null` | `null` | 文件路径（可选，可直接上传单文件） |
| `$fieldName` | `string|null` | `'file'` | 表单字段名（默认 "file"） |
| `$fileName` | `string|null` | `null` | 上传文件名（默认取路径 basename） |
| `$mimeType` | `string|null` | `''` | 文件 MIME 类型（默认由 curl 推断） |

### upload()

```php
public function upload($fieldName, $filePath, $fileName = null, $mimeType = '')
```

注册一个上传文件

将文件注册到上传集合（不触发发送），可多次调用上传多个文件。
之后通过 file() 或 post() 触发 multipart/form-data 上传。

```php
$curl = Curl::init()->url($url);
$curl->upload('file', '/path/a.jpg');
$curl->data(['note' => 'hello']);
$res = $curl->file()->post()->responseData();
```

```php
$curl = Curl::init()->url($url);
$curl->upload('file', '/path/a.jpg');
$curl->data(['note' => 'hello']);
$res = $curl->file()->post()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fieldName` | `string` | — | 表单字段名（服务端 $_FILES 的 key） |
| `$filePath` | `string` | — | 文件绝对路径 |
| `$fileName` | `string` | `null` | 上传文件名（默认取路径 basename） |
| `$mimeType` | `string` | `''` | 文件 MIME 类型（默认由 curl 推断） |

### clearUploadFiles()

```php
public function clearUploadFiles()
```

清空已注册的上传文件

upload()/file() 注册的文件在 send() 时会被并入请求体，并把该次请求强制为
multipart/form-data，且**发送后不会自动移除**：复用同一实例继续发 JSON / 表单请求
前必须调用本方法，否则 CURLFile 会被带进下一次请求（请求体变成 multipart）。

与之配套的还需按需恢复 json(true)/json(false)——send() 遇到上传会把 isJson 置为 false。

```php
$curl->clearUploadFiles()->json(true);   // 上传结束后回到 JSON 请求模式
```

```php
$curl->clearUploadFiles()->json(true);   // 上传结束后回到 JSON 请求模式
```

### data()

```php
public function data($data)
```

设置请求体数据

为请求设置主体数据。序列化规则由 json() 决定：
- json(true)（默认）：关联数组会 json_encode 为 JSON 字符串；
- json(false)：数组会 http_build_query 为表单串；
- 字符串：原样作为请求体。
对 GET 请求，data() 设置的数据会自动拼接到 URL 查询串。

```php
$curl = Curl::init()->url($url)->data(['a' => 1, 'b' => 2]);
```

```php
$curl = Curl::init()->url($url)->data(['a' => 1, 'b' => 2]);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array|string` | — | 请求体数据 |

### headers()

```php
public function headers($headers)
```

设置请求头

与现有请求头合并（同名覆盖）。类默认请求头为：
- Accept: application/json, text/javascript 等
- Content-Type: application/json
其中 Content-Type 会在 send() 中按请求类型强制覆盖。

```php
$curl = Curl::init()->url($url)->headers(['Authorization' => 'Bearer xxxx']);
```

```php
$curl = Curl::init()->url($url)->headers(['Authorization' => 'Bearer xxxx']);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$headers` | `array` | — | 请求头集合（key 为请求头名，value 为值） |

### cookie()

```php
public function cookie($cookies)
```

设置 Cookie

与现有 Cookie 合并（同名覆盖）。发送时自动拼接为 "k1=v1; k2=v2"。

```php
$curl = Curl::init()->url($url)->cookie(['session_id' => 'abc123']);
```

```php
$curl = Curl::init()->url($url)->cookie(['session_id' => 'abc123']);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$cookies` | `array` | — | Cookie 集合 |

### json()

```php
public function json($isJson = true)
```

设置请求体是否为 JSON

控制请求体的序列化方式及 Content-Type：
- true（默认）：请求体 json_encode，Content-Type 为 application/json；
- false：请求体 http_build_query，Content-Type 为 application/x-www-form-urlencoded。
文件上传时该开关会被自动忽略（强制 multipart/form-data）。

```php
// 发送表单格式请求体
$res = Curl::init()->url($url)->data(['k' => 'v'])->json(false)->post();
```

```php
// 发送表单格式请求体
$res = Curl::init()->url($url)->data(['k' => 'v'])->json(false)->post();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$isJson` | `bool` | `true` | 是否 JSON 编码 |

### timeout()

```php
public function timeout($timeout = 60)
```

设置超时时间

设置整个请求（含连接与传输）的最长耗时，超过即中止并置为请求失败。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$timeout` | `int` | `60` | 超时秒数（默认 60） |

### connectTimeout()

```php
public function connectTimeout($timeout = 0)
```

设置连接超时时间

仅限制建立 TCP/TLS 连接的耗时，传输阶段仍受 timeout() 控制。
为 0 时不单独设置（走系统/curl 默认）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$timeout` | `int` | `0` | 连接超时秒数，0 表示不单独设置 |

### referer()

```php
public function referer($referer)
```

设置 Referer

设置请求的 Referer 请求头（来源页面地址），部分服务会校验来源。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$referer` | `string` | — | 来源地址 |

### userAgent()

```php
public function userAgent($userAgent)
```

设置 User-Agent

设置请求的 User-Agent 请求头，用于标识客户端类型/版本。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userAgent` | `string` | — | 用户代理字符串 |

### encoding()

```php
public function encoding($encoding = 'gzip, deflate')
```

设置 Accept-Encoding

设置请求的 Accept-Encoding 请求头，声明支持的内容编码，如 gzip/deflate。
注意：curl 在未显式设置时默认会自动解压 gzip 响应，设置后需自行处理解压。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$encoding` | `string` | `'gzip` | 编码类型，如 "gzip, deflate" |
| `$deflate'` | `mixed` | — | — |

### followLocation()

```php
public function followLocation($follow = true)
```

设置是否跟随重定向

是否自动跟随 3xx 重定向（CURLOPT_FOLLOWLOCATION）。默认关闭；
若目标接口会 301/302 跳转，需开启以免拿到跳转页而非最终响应。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$follow` | `bool` | `true` | 是否跟随重定向（默认 true） |

### basicAuth()

```php
public function basicAuth($username, $password)
```

设置 HTTP Basic 认证

发送 `Authorization: Basic base64(user:pass)` 请求头，用于 HTTP Basic 认证。
通过 CURLOPT_USERPWD + CURLAUTH_BASIC 实现（由 curl 自动 base64 编码）。

```php
$res = Curl::init()->url($url)->basicAuth('admin', 'secret')->get()->responseData();
```

```php
$res = Curl::init()->url($url)->basicAuth('admin', 'secret')->get()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$username` | `string` | — | 用户名 |
| `$password` | `string` | — | 密码 |

### proxy()

```php
public function proxy($options = [])
```

设置代理

配置 HTTP 代理。传入选项与默认配置合并，可用键：
open / url / port / username / password。username/password 可空。

```php
$res = Curl::init()->url($url)
->proxy(['open' => true, 'url' => 'http://proxy.example.com', 'port' => '8080'])
->get()->responseData();
```

```php
$res = Curl::init()->url($url)
->proxy(['open' => true, 'url' => 'http://proxy.example.com', 'port' => '8080'])
->get()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$options` | `array` | `[]` | 代理配置，至少包含 open 与 url |

### https()

```php
public function https($verify = true)
```

设置 HTTPS 相关选项

控制是否校验服务端 SSL 证书。默认校验；仅当调试自签名/内部测试证书时
才应传 false 跳过校验（生产环境切勿关闭，存在中间人攻击风险）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$verify` | `bool` | `true` | 是否校验 SSL 证书（默认 true），false 表示跳过校验 |

### sslCert()

```php
public function sslCert($filePath, $type = 'PEM')
```

设置客户端 SSL 证书

为需要双向 TLS 认证（mTLS）的服务端设置客户端证书。
需配合 sslKey() 使用（微信支付证书、企业内部 mTLS 接口等场景）。

```php
$res = Curl::init()->url($url)
->sslCert('/path/apiclient_cert.pem')
->sslKey('/path/apiclient_key.pem')
->post()->responseData();
```

```php
$res = Curl::init()->url($url)
->sslCert('/path/apiclient_cert.pem')
->sslKey('/path/apiclient_key.pem')
->post()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 客户端证书文件路径 |
| `$type` | `string` | `'PEM'` | 证书类型（PEM/DER/ENG，默认 PEM） |

### sslKey()

```php
public function sslKey($filePath, $type = 'PEM')
```

设置客户端 SSL 密钥

配合 sslCert() 使用，提供客户端证书对应的私钥文件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 密钥文件路径 |
| `$type` | `string` | `'PEM'` | 密钥类型（PEM/DER/ENG，默认 PEM） |

### options()

```php
public function options($options)
```

传递额外 cURL 选项

允许直接注入任意 cURL 选项，覆盖或补充内置默认值（优先级最高）。
注意：CURLOPT_HEADER / CURLOPT_RETURNTRANSFER 等关键选项会被 send() 强制开启，
自定义这些选项可能无法覆盖。

```php
$res = Curl::init()->url($url)
->options([CURLOPT_SSL_VERIFYPEER => false])
->get()->responseData();
```

```php
$res = Curl::init()->url($url)
->options([CURLOPT_SSL_VERIFYPEER => false])
->get()->responseData();
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$options` | `array` | — | cURL 选项集合，key 为 CURLOPT_* 常量，value 为选项值 |

### reset()

```php
public function reset()
```

重置请求配置（保留句柄复用）

将 url/headers/data/method/timeout/cookie/ssl/代理/选项等全部恢复为初始状态，
但**保留 cURL 句柄**以便复用连接。适合同一实例在循环中连续发起多次请求。

```php
$curl = new Curl();
foreach ($urls as $url) {
$data = $curl->url($url)->get()->responseData();
$curl->reset();   // 复用句柄，重置配置
}
```

```php
$curl = new Curl();
foreach ($urls as $url) {
$data = $curl->url($url)->get()->responseData();
$curl->reset();   // 复用句柄，重置配置
}
```

### send()

```php
public function send()
```

发送请求（由各请求方法自动调用，也可手动触发）

执行以下核心流程：
1. 句柄存活检测：若被 close() 释放则重新 curl_init()，保证实例可复用；
2. GET 请求体并入 URL 查询串；
3. 判定是否为文件上传（method 为 file 或 uploadFile 非空），
合并 CURLFile 并强制 multipart/form-data；
4. 按请求类型强制 Content-Type；
5. 收敛请求方法（POST/GET/HEAD/CONNECT/自定义方法）；
6. 序列化请求体（JSON / http_build_query / 原样）；
7. 合并 Cookie、代理、SSL 证书、自定义选项；
8. curl_setopt_array + curl_exec，解析响应头与响应体。

成功时响应体按 Content-Type 或 isJson 自动尝试 json_decode；
失败（curl 层错误）时只写 errorNo()/error()，responseData() 为 null。

### pause()

```php
public function pause($isPause = true)
```

暂停请求（挂起当前句柄）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$isPause` | `bool` | `true` | 是否暂停 |

### close()

```php
public function close()
```

关闭并释放 cURL 句柄

### curlInstance()

```php
public function curlInstance()
```

获取 cURL 句柄

返回当前底层 cURL 句柄，可进行更底层的操作。PHP 8 下为 \CurlHandle 对象，
句柄被 close() 后为 null。判句柄存活应使用 is_object()。

### responseData()

```php
public function responseData()
```

获取响应体

返回响应体内容。若响应 Content-Type 为 JSON（或 json() 开启），
会自动 json_decode 为数组；解析失败时原样返回字符串。

注意：请求失败（curl 层错误）时返回 null，请结合 errorNo()/statusCode() 判断。

### responseHeaders()

```php
public function responseHeaders()
```

获取响应头

返回响应头关联数组（key 为头名，value 为值，均 trim 处理）。
请求失败时为 null。

```php
$headers = $curl->responseHeaders();
$contentType = $headers['Content-Type'] ?? '';
```

```php
$headers = $curl->responseHeaders();
$contentType = $headers['Content-Type'] ?? '';
```

### statusCode()

```php
public function statusCode()
```

获取 HTTP 响应状态码

请求成功返回服务端状态码（如 200/404）；请求失败（未建立连接等）为 0。

### errorNo()

```php
public function errorNo()
```

获取 cURL 错误码

返回 curl_errno() 的错误码（如 CURLE_COULDNT_CONNECT），
请求成功时为 null；URL 未设置时为 -1。

### error()

```php
public function error()
```

获取 cURL 错误信息

返回 curl_error() 的错误描述，请求成功时为 null；URL 未设置时为
"请求地址未设置"。

### getData()

```php
public function getData()
```

获取响应数据（responseData 别名）

与 responseData() 等价，保留用于兼容旧调用方。

### __destruct()

```php
public function __destruct()
```

## 非公开方法

**protected**

- `protected function buildHeaders($headers)` —— 构建请求头数组
- `protected function buildCookie($cookies)` —— 构建 Cookie 字符串
- `protected function appendQuery($url, $params)` —— 拼接查询参数到 URL

## 同目录

- [Cors](/php/api/foundation/http/cors)
- [Request](/php/api/foundation/http/request)
- [Response](/php/api/foundation/http/response)
- [URL](/php/api/foundation/http/url)

