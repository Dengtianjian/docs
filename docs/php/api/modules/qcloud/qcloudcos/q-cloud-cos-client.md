# QCloudCosClient

`kernel\Modules\QCloud\QCloudCos\QCloudCosClient`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/QCloudCosClient.php`

> COS 客户端：**真执行**，并决定「用 SDK 还是自己发请求」

## 声明

```php
class QCloudCosClient extends QCloudApi
```

父类：[QCloudApi](/php/api/modules/qcloud/q-cloud-api)

## 概述

定位：本模块里唯一**真正发请求**的地方。它自己**不定义请求形态** —— 请求该长什么样全部由
`Object/` 下的计划类（`QCloudCosObjects` / `QCloudCosMultipartUpload` …）给出，本类只负责
「把计划发出去」：

```php
$client = new QCloudCosClient($account, "ap-guangzhou", "bkt-1250000000");

$client->upload("images/a.png", "/tmp/a.png");   // 真上传（自动按大小选简单/分块）
$client->exists("images/a.png");                 // true / false
$client->download("images/a.png");               // 内容字符串
$client->objectUrl("images/a.png");              // 可访问地址
$client->presignedUrl("images/a.png", 600);      // 预签名 URL

// 也可以拿到「对象句柄」自己拼请求（它只产计划，不发送）
$client->object("images/a.png")->put()->acl("public-read");
$client->objects()->listObjects("images/");
```

## 双驱动（兼容两个环境）

| 驱动 | 触发条件 | 说明 |
|---|---|
| `sdk` | `Qcloud\Cos\Client` 类存在（vendor 里装了 COS SDK） | 走 SDK |
| `http` | 上者不存在（如 DiscuzX 插件环境未加载 vendor） | 自己用 `Curl` + `QCloudCosSignture` 发签名请求 |

可用 `driver` 强制指定（`"sdk"` / `"http"`）以便测试或排障，`usingSdk` 查当前是否走 SDK。

## ⚠️ 验证状态

- **`http` 驱动**已按"签名 + URL + 头 + 错误态"的同款写法实现（见 `sendByHttp`），
并用桩 `Curl` 做过请求形态验证；
- **`sdk` 驱动**的命令名已对照 vendor 里的 SDK 确认（`putObject`/`getObject`/`headObject`/
`deleteObject`/`copyObject`/`listObjects`/`restoreObject`/`uploadPart`/`completeMultipartUpload`…），
但**各命令的数组参数形状未经真机验证**（见 `sendBySdk()` 的注释），首次接入请对真实桶跑一遍。

## 示例

```php
$client = new QCloudCosClient($account, "ap-guangzhou", "bkt-1250000000");

$client->upload("images/a.png", "/tmp/a.png");   // 真上传（自动按大小选简单/分块）
$client->exists("images/a.png");                 // true / false
$client->download("images/a.png");               // 内容字符串
$client->objectUrl("images/a.png");              // 可访问地址
$client->presignedUrl("images/a.png", 600);      // 预签名 URL

// 也可以拿到「对象句柄」自己拼请求（它只产计划，不发送）
$client->object("images/a.png")->put()->acl("public-read");
$client->objects()->listObjects("images/");
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `DRIVER_SDK` | `"sdk"` | 驱动：走官方 SDK |
| `DRIVER_HTTP` | `"http"` | 驱动：自己发签名 HTTP 请求 |
| `HOST_PATTERN` | `"https://%s.cos.%s.myqcloud.com"` | 默认域名格式（HTTPS） |
| `DEFAULT_EXPIRES` | `300` | 默认签名有效期（秒） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$bucket` | `string|null` | protected | — |
| `$region` | `string|null` | protected | — |
| `$driver` | `string` | protected | — |
| `$signer` | `QCloudCosSignture|null` | protected | — |
| `$sdkClient` | `object|null` | protected | — |
| `$objects` | `QCloudCosObjects|null` | protected | — |
| `$objectHandles` | `array` | protected | — |
| `$expires` | `integer` | protected | — |
| `$lastResults` | `array` | protected | — |
| `$lastParsed` | `array|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 参数顺序与 `QCloudCosSignture` 保持一致：**region 在前、bucket 在后** （`new QCloudCosClient($account, "ap-guangzhou", "bkt-1250000000")`）。 |
| [`detectDriver()`](#detectdriver) | 自动检测该用哪个驱动 |
| [`bucket()`](#bucket) | 桶名（不传=读取，传值=设置） |
| [`region()`](#region) | 地域（不传=读取，传值=设置） |
| [`host()`](#host) | 桶域名（不传=读取，传值=设置） |
| [`driver()`](#driver) | 当前驱动（不传=读取，传值=设置；应为 `DRIVER_SDK` 或 `DRIVER_HTTP`） |
| [`usingSdk()`](#usingsdk) | 是否走 SDK |
| [`expires()`](#expires) | 签名有效期（秒；不传=读取，传值=设置） |
| [`signer()`](#signer) | 签名器（http 驱动用） |
| [`sdk()`](#sdk) | SDK 客户端（sdk 驱动用，懒加载） |
| [`objects()`](#objects) | 桶级计划器（**不绑定对象**，靠传对象名操作） |
| [`object()`](#object) | 取某个对象的句柄（**绑定键**，同一键返回同一实例） |
| [`objectUrl()`](#objecturl) | 对象可访问地址（公共读对象可直接用） |
| [`presignedUrl()`](#presignedurl) | 预签名 URL（本类已持有签名器 ⇒ 一定是完整 URL 字符串） |
| [`upload()`](#upload) | 上传对象（自动按大小选简单/分块） |
| [`download()`](#download) | 下载对象 |
| [`copy()`](#copy) | 复制对象 |
| [`move()`](#move) | 移动对象（复制 + 删源，**非原子**） |
| [`delete()`](#delete) | 删除对象 |
| [`exists()`](#exists) | 判断对象是否存在（**只有 200 才算存在**；403/404 都算不存在） |
| [`metadata()`](#metadata) | 查询对象元数据（**响应头数组**） |
| [`listObjects()`](#listobjects) | 列举对象（桶级） |
| [`lastParsed()`](#lastparsed) | 最近一次 `listObjects` 的**完整解析结果**（含 `IsTruncated` / `NextMarker` / `KeyCount` 等） |
| [`restore()`](#restore) | 恢复归档对象（解冻） |
| [`lastResults()`](#lastresults) | 最近一次操作的**全部步骤**原始结果 |
| [`lastResult()`](#lastresult) | 最近一次操作的**最后一步**原始结果（没有则 null） |
| [`lastError()`](#lasterror) | 最近一次操作最后一步的错误信息（成功或无记录时为 null） |
| [`execute()`](#execute) | 执行一批步骤（**分块上传靠它把 uploadId / ETag 串起来**） |
| [`send()`](#send) | 发送一步（按驱动分发） |

### __construct()

```php
public function __construct(QCloudAccount $account, $region, $bucket, $host = null, $driver = null)
```

参数顺序与 `QCloudCosSignture` 保持一致：**region 在前、bucket 在后** （`new QCloudCosClient($account, "ap-guangzhou", "bkt-1250000000")`）。

凭据（SecretId / SecretKey / SecurityToken）一律取自 `$account`；
`QCloudCosSignture` 是纯计算器、刻意不依赖账号类型，故由本类把凭据拆开传给它。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 腾讯云账号，提供 SecretId / SecretKey 等凭据 |
| `$region` | `string` | — | 地域（如 `ap-guangzhou`） |
| `$bucket` | `string` | — | 桶名（含 APPID，如 `bkt-1250000000`） |
| `$host` | `string|null` | `null` | 桶域名；不传按 `HOST_PATTERN` 拼 |
| `$driver` | `string|null` | `null` | 强制驱动（`DRIVER_SDK` / `DRIVER_HTTP`）；不传自动检测 |

### detectDriver()

```php
public static function detectDriver()
```

自动检测该用哪个驱动

### bucket()

```php
public function bucket($value = null)
```

桶名（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### region()

```php
public function region($value = null)
```

地域（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### host()

```php
public function host($value = null)
```

桶域名（不传=读取，传值=设置）

注意：`QCloudApi` 基类只有 `protected $host` 属性、**没有** `host()` 方法，所以这里补一个。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### driver()

```php
public function driver($value = null)
```

当前驱动（不传=读取，传值=设置；应为 `DRIVER_SDK` 或 `DRIVER_HTTP`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### usingSdk()

```php
public function usingSdk()
```

是否走 SDK

### expires()

```php
public function expires($value = null)
```

签名有效期（秒；不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### signer()

```php
public function signer()
```

签名器（http 驱动用）

### sdk()

```php
public function sdk()
```

SDK 客户端（sdk 驱动用，懒加载）

可能抛出：

- `\RuntimeException` 当前环境没有装 COS SDK

### objects()

```php
public function objects()
```

桶级计划器（**不绑定对象**，靠传对象名操作）

### object()

```php
public function object($objectName)
```

取某个对象的句柄（**绑定键**，同一键返回同一实例）

它只产计划，不发送；要真执行请用本类的 `upload/download/...`，或用 `execute`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### objectUrl()

```php
public function objectUrl($objectName)
```

对象可访问地址（公共读对象可直接用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### presignedUrl()

```php
public function presignedUrl($objectName, $expires = 1800, $httpMethod = "get", array $urlParams = [], array $headers = [])
```

预签名 URL（本类已持有签名器 ⇒ 一定是完整 URL 字符串）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$expires` | `integer` | `1800` | 有效期（秒） |
| `$httpMethod` | `string` | `"get"` | 入签方法（须与实际使用一致） |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数 |
| `$headers` | `array` | `[]` | 参与签名的请求头 |

### upload()

```php
public function upload($objectName, $localFilePath, array $headers = [], $partSize = QCloudCosMultipartUpload::DEFAULT_PART_SIZE)
```

上传对象（自动按大小选简单/分块）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$localFilePath` | `string` | — | 本地文件 |
| `$headers` | `array` | `[]` | 额外请求头（简单上传路线） |
| `$partSize` | `integer` | `QCloudCosMultipartUpload::DEFAULT_PART_SIZE` | 分块大小 |

### download()

```php
public function download($objectName, $range = null, $saveToPath = null)
```

下载对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$range` | `string|null` | `null` | Range（如 `bytes=0-1023`） |
| `$saveToPath` | `string|null` | `null` | 传入则落盘并返回写入字节数 |

### copy()

```php
public function copy($sourceObjectName, $destinationObjectName, array $headers = [])
```

复制对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourceObjectName` | `string` | — | 源对象键 |
| `$destinationObjectName` | `string` | — | 目标对象键 |
| `$headers` | `array` | `[]` | 额外请求头 |

### move()

```php
public function move($sourceObjectName, $destinationObjectName, array $headers = [])
```

移动对象（复制 + 删源，**非原子**）

两步**都成功**才算成功；任一步失败返回 false（哪一步失败见 `lastResults` 的 `phase`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourceObjectName` | `string` | — | 源对象键 |
| `$destinationObjectName` | `string` | — | 目标对象键 |
| `$headers` | `array` | `[]` | 复制那一步的额外请求头 |

### delete()

```php
public function delete($objectName)
```

删除对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### exists()

```php
public function exists($objectName)
```

判断对象是否存在（**只有 200 才算存在**；403/404 都算不存在）

⚠️ 注意本方法返回的 `false` 不代表"请求失败"——"不存在"与"没权限"都是 `false`，
需要区分请配合 `lastResults` 看状态码。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### metadata()

```php
public function metadata($objectName)
```

查询对象元数据（**响应头数组**）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### listObjects()

```php
public function listObjects($prefix = null, array $params = [])
```

列举对象（桶级）

响应体是 XML（`＜ListBucketResult＞`），这里用 `Str::fromXml` 解析后**直接返回
`＜Contents＞`（对象列表）**，不再吐整个 `ListBucketResult`：

```php
$items = $cos->listObjects("images/", ["max-keys" => 100]);
// [["Key" => "images/a.png", "Size" => "1024", "ETag" => "\"aaa\"", …], …]
```

**永远返回列表**（SimpleXML 的老歧义已归一化）：只有一个 `＜Contents＞` 时也返回
`[那个对象]`，一个都没有（空桶）时返回 `[]`（**解析成功 ≠ 失败**）。

⚠️ 分页信息（`IsTruncated` / `NextMarker` / `KeyCount` / `CommonPrefixes` …）不在返回值里，
需要时用 `lastParsed` 取完整解析结果。

```php
$items = $cos->listObjects("images/", ["max-keys" => 100]);
// [["Key" => "images/a.png", "Size" => "1024", "ETag" => "\"aaa\"", …], …]
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string|null` | `null` | 前缀 |
| `$params` | `array` | `[]` | 其它参数（max-keys / delimiter / marker …） |

### lastParsed()

```php
public function lastParsed()
```

最近一次 `listObjects` 的**完整解析结果**（含 `IsTruncated` / `NextMarker` / `KeyCount` 等）

### restore()

```php
public function restore($objectName, $days = 30, $tier = "Standard")
```

恢复归档对象（解冻）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$days` | `integer` | `30` | 保留天数 |
| `$tier` | `string` | `"Standard"` | 解冻优先级 |

### lastResults()

```php
public function lastResults()
```

最近一次操作的**全部步骤**原始结果

形如 `[["phase" => "put", "result" => ["ok","status","body","headers","error"]], …]`。
操作方法的返回值是语义化的（true/false/内容），需要状态码、响应头、`request-id` 等细节时用它。

### lastResult()

```php
public function lastResult()
```

最近一次操作的**最后一步**原始结果（没有则 null）

### lastError()

```php
public function lastError()
```

最近一次操作最后一步的错误信息（成功或无记录时为 null）

### execute()

```php
public function execute(array $steps, $localFilePath = null)
```

执行一批步骤（**分块上传靠它把 uploadId / ETag 串起来**）

计划里的 `initiate` 会返回 `uploadId`、每个 `part` 会返回 `ETag`，它们要回填给后续步骤 ——
本方法自动完成这个回填，所以分块上传可以一次跑完。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$steps` | `array` | — | 步骤数组（来自计划类） |
| `$localFilePath` | `string|null` | `null` | 本地文件（分块上传的 `part` 步骤需要它来读对应字节区间） |

### send()

```php
public function send(array $step, $body = null)
```

发送一步（按驱动分发）

统一返回：`["ok" => bool, "status" => int, "body" => mixed, "headers" => array, "error" => string|null]`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$step` | `array` | — | 步骤 |
| `$body` | `string|null` | `null` | 请求体（分块/表单等；`put` 阶段走文件流时可为 null） |

## 非公开方法

**protected**

- `protected function ok(array $results)` —— 全部步骤是否都成功
- `protected function first(array $results)` —— 取第一步的结果（单步操作常用）
- `protected static function contentsOf(array $parsed)` —— 从 `ListBucketResult` 的解析结果里取对象列表，并**统一成列表**
- `protected function sendByHttp(array $step, $body = null)` —— 自己发签名 HTTP 请求（http 驱动）
- `protected function sendBySdk(array $step, $body = null)` —— 走官方 SDK（sdk 驱动）
- `protected function bodyForStep(array $step, $localFilePath = null)` —— 某一步该带的请求体（分块上传时按 offset/length 读对应字节）
- `protected function completeBody(array $etags)` —— 用真实 ETag 重建「完成分块上传」的请求体
- `protected static function pickUploadId($body)` —— 从响应体里取出 UploadId（分块上传初始化）
- `protected static function pickXmlValue($text, $tag)` —— 从文本里取某个 XML 标签的值（不依赖 simplexml 扩展）
- `protected static function parsePartsXml($xml)` —— 从「完成分块上传」的 XML 里解析出分块清单（SDK 分支用）
- `protected static function pickHeader($headers, $name)` —— 大小写不敏感地取响应头

## 同目录

- [QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage)
- [QCloudCosSignture](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-signture)

