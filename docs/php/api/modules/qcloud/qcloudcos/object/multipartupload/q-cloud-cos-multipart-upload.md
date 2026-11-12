# QCloudCosMultipartUpload

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosMultipartUpload`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosMultipartUpload.php`

> 分块上传的**聚合/编排类**（把一个文件按分块上传的全流程组织起来）

## 声明

```php
class QCloudCosMultipartUpload
```

## 概述

本目录另外 7 个类各自只描述「某一步的参数」（初始化 / 上传块 / 复制块 / 完成 / 终止 / 列举块 /
列举上传中任务）。本类把它们**聚合**起来，并补上「一个本地文件怎么切成块」这一步，从而能一次性
产出**完整的分步请求计划**（`plan`）。

```php
$upload = new QCloudCosMultipartUpload("images/big.zip");

// 1) 设置各阶段参数（拿到的就是那 7 个容器类，按各自方法设即可）
$upload->initiate()->contentType("application/zip")->storageClass("STANDARD_IA");
$upload->part()->contentMD5("");

// 2) 切块 + 拿到完整计划
$steps = $upload->plan("/tmp/big.zip", 5 * 1024 * 1024);

// 3) 由调用方按计划逐步发请求（见 plan() 的返回结构）
```

⚠️ **本类不发请求、不做签名**：它只产出「每一步应该发什么」。原因是分块上传各步之间有
**运行时的依赖**——`uploadId` 来自「初始化」的响应 XML，`ETag` 来自每个「上传块」的响应头，
都必须回填给后续步骤（用 `uploadId` / `etag`）。因此流程无法在这一层一次性跑完，
只能由持有客户端（能发请求、能读响应）的一方按计划逐步推进。
客户端（`\kernel\Modules\QCloud\QCloudCos\QCloudCosClient::execute`）已能按计划推进，接线就是把每一步的
`method/path/params/headers/body` 交给它。

分块规则（官方）：
- 每块 **1MB – 5GB**，**最后一块可以小于 1MB**；块编号 **1 – 10000**；
- 「完成」时必须按 `PartNumber` **升序**提交各块的 `ETag`（`completeXml` 会自动排序）；
- 小于 1MB 的文件其实用 `PUT Object` 一次传完更划算；**0 字节**文件本类仍会给出 1 个 0 字节的块。

依赖方向：本类**不引用**存储层以免 QCloud → DiscuzX 逆向依赖；
对象键的编码方式与该类的 `encodeObjectName()` 一致（按段 `rawurlencode` + 前导 `/`）。

文档核对状态：**待核对**（分块规则与请求形态按官方分块上传通用写法整理；首次接入对真实桶复核）。

## 示例

```php
$upload = new QCloudCosMultipartUpload("images/big.zip");

// 1) 设置各阶段参数（拿到的就是那 7 个容器类，按各自方法设即可）
$upload->initiate()->contentType("application/zip")->storageClass("STANDARD_IA");
$upload->part()->contentMD5("");

// 2) 切块 + 拿到完整计划
$steps = $upload->plan("/tmp/big.zip", 5 * 1024 * 1024);

// 3) 由调用方按计划逐步发请求（见 plan() 的返回结构）
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `MIN_PART_SIZE` | `1048576` | 单块最小字节数（最后一块除外） |
| `DEFAULT_PART_SIZE` | `5242880` | 默认分块大小：5MB |
| `MAX_PARTS` | `10000` | 一次分块上传允许的最大块数 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | protected | — |
| `$uploadId` | `string|null` | protected | — |
| `$containers` | `array` | protected | — |
| `$etags` | `array` | protected | — |
| `$parts` | `array` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`key()`](#key) | 对象键（不传=读取，传值=设置并返回 `$this`） |
| [`uploadId()`](#uploadid) | UploadId（不传=读取，传值=设置并返回 `$this`） |
| [`path()`](#path) | 对象键编码后的路径（按段 `rawurlencode`，带前导 `/`） |
| [`initiate()`](#initiate) | 「初始化分块上传」的参数容器（POST ?uploads） |
| [`part()`](#part) | 「上传分块」的参数容器（PUT ?partNumber&uploadId） |
| [`partCopy()`](#partcopy) | 「复制分块」的参数容器（PUT ?partNumber&uploadId + x-cos-copy-source） |
| [`complete()`](#complete) | 「完成分块上传」的参数容器（POST ?uploadId + XML 体） |
| [`abort()`](#abort) | 「终止分块上传」的参数容器（DELETE ?uploadId） |
| [`listParts()`](#listparts) | 「列举已上传分块」的参数容器（GET ?uploadId） |
| [`listMultipartUploads()`](#listmultipartuploads) | 「列举进行中的分块上传」的参数容器（GET ?uploads） |
| [`split()`](#split) | 把本地文件切成若干块（只算偏移与长度，**不读内容**） |
| [`parts()`](#parts) | 最近一次 `split` 的切块结果（未切过则返回空数组） |
| [`etag()`](#etag) | 记录/读取某个块的 ETag（来自该块上传响应头里的 `ETag`） |
| [`etags()`](#etags) | 全部已记录的 ETag（PartNumber => ETag） |
| [`completeXml()`](#completexml) | 产出「完成分块上传」的请求体 XML（按 PartNumber **升序**） |
| [`plan()`](#plan) | 产出「把这个文件分块上传」的完整分步计划（**不发请求**） |

### __construct()

```php
public function __construct($objectKey = null, $uploadId = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | `null` | 对象键（原始，带不带前导 `/` 均可） |
| `$uploadId` | `string|null` | `null` | 已存在的 UploadId（继续一次未完成的上传时传入） |

### key()

```php
public function key($value = null)
```

对象键（不传=读取，传值=设置并返回 `$this`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### uploadId()

```php
public function uploadId($value = null)
```

UploadId（不传=读取，传值=设置并返回 `$this`）

由「初始化」响应 XML 里的 `＜UploadId＞` 回填；后续每个块与「完成」都要带它。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### path()

```php
public function path()
```

对象键编码后的路径（按段 `rawurlencode`，带前导 `/`）

### initiate()

```php
public function initiate()
```

「初始化分块上传」的参数容器（POST ?uploads）

### part()

```php
public function part()
```

「上传分块」的参数容器（PUT ?partNumber&uploadId）

### partCopy()

```php
public function partCopy()
```

「复制分块」的参数容器（PUT ?partNumber&uploadId + x-cos-copy-source）

### complete()

```php
public function complete()
```

「完成分块上传」的参数容器（POST ?uploadId + XML 体）

### abort()

```php
public function abort()
```

「终止分块上传」的参数容器（DELETE ?uploadId）

### listParts()

```php
public function listParts()
```

「列举已上传分块」的参数容器（GET ?uploadId）

### listMultipartUploads()

```php
public function listMultipartUploads()
```

「列举进行中的分块上传」的参数容器（GET ?uploads）

### split()

```php
public function split($localFilePath, $partSize = self::DEFAULT_PART_SIZE)
```

把本地文件切成若干块（只算偏移与长度，**不读内容**）

返回形如 `[["partNumber" => 1, "offset" => 0, "length" => 5242880], …]`。
块编号从 1 开始、连续递增；最后一块长度可能小于 `$partSize`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$localFilePath` | `string` | — | 本地文件路径 |
| `$partSize` | `integer` | `self::DEFAULT_PART_SIZE` | 每块字节数（≥ `MIN_PART_SIZE`） |

可能抛出：

- `\InvalidArgumentException` 文件不可读 / 块大小过小 / 块数超过 {@see MAX_PARTS}

### parts()

```php
public function parts()
```

最近一次 `split` 的切块结果（未切过则返回空数组）

### etag()

```php
public function etag($partNumber, $etag = null)
```

记录/读取某个块的 ETag（来自该块上传响应头里的 `ETag`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$partNumber` | `integer` | — | 块编号 |
| `$etag` | `string|null` | `null` | 传值=记录；只传块编号=读取 |

### etags()

```php
public function etags()
```

全部已记录的 ETag（PartNumber => ETag）

### completeXml()

```php
public function completeXml($uploadId = null)
```

产出「完成分块上传」的请求体 XML（按 PartNumber **升序**）

用 `QCloudCosCompleteMultipartUpload::toXml` 拼；未记录任何 ETag 时返回空串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uploadId` | `string|null` | `null` | 覆盖 UploadId（不传则用 `uploadId` 里的值，仅用于设置容器） |

### plan()

```php
public function plan($localFilePath, $partSize = self::DEFAULT_PART_SIZE)
```

产出「把这个文件分块上传」的完整分步计划（**不发请求**）

每一步的结构：
```
[
"phase"      => "initiate" | "part" | "complete",
"method"     => "POST" | "PUT",
"path"       => "/images/big.zip",        // 已编码
"params"     => ["uploads" => ""],        // 参与签名的 URL 参数
"headers"    => ["Content-Type" => …],    // 该阶段容器里已设置的头
"body"       => null | "<xml…>",          // 请求体；块的二进制数据另见 offset/length
"partNumber" => 1,                        // 仅 part 阶段
"offset"     => 0, "length" => 5242880,   // 仅 part 阶段：本地文件的读取范围
"needs"      => ["uploadId"],             // 该步依赖的前置值（尚未具备时见 pending）
"pending"    => true,                     // 为 true 表示缺少 uploadId，需先跑上一步并回填
"note"       => "…",                      // 该步要从响应里取什么回填
]
```

```php
[
"phase"      => "initiate" | "part" | "complete",
"method"     => "POST" | "PUT",
"path"       => "/images/big.zip",        // 已编码
"params"     => ["uploads" => ""],        // 参与签名的 URL 参数
"headers"    => ["Content-Type" => …],    // 该阶段容器里已设置的头
"body"       => null | "<xml…>",          // 请求体；块的二进制数据另见 offset/length
"partNumber" => 1,                        // 仅 part 阶段
"offset"     => 0, "length" => 5242880,   // 仅 part 阶段：本地文件的读取范围
"needs"      => ["uploadId"],             // 该步依赖的前置值（尚未具备时见 pending）
"pending"    => true,                     // 为 true 表示缺少 uploadId，需先跑上一步并回填
"note"       => "…",                      // 该步要从响应里取什么回填
]
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$localFilePath` | `string` | — | 本地文件路径 |
| `$partSize` | `integer` | `self::DEFAULT_PART_SIZE` | 每块字节数 |

可能抛出：

- `\InvalidArgumentException` 同 {@see split()}

## 非公开方法

**protected**

- `protected function container($shortClass)` —— 取（并缓存）某个容器实例 —— 聚合的关键：同一阶段反复取到的是同一个实例
- `protected static function encodePath($objectKey)` —— 对象键编码（按段 `rawurlencode` + 前导 `/`，与存储层的 `encodeObjectName()` 同一套规则）

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

