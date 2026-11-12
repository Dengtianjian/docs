# QCloudCosUploadObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosUploadObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosUploadObject.php`

> 「上传对象」的**调度类**：按文件大小自动选择**简单上传**还是**分块上传**

## 声明

```php
class QCloudCosUploadObject
```

## 概述

本目录下 `QCloudCosPutObject` 只描述 PUT Object（简单上传）的请求头，`QCloudCosMultipartUpload`
只负责分块上传的编排。本类把它们**合起来**：给一个本地文件，它按大小决定走哪条路，
并产出对应的请求计划（`plan`）。

```php
$upload = new QCloudCosUploadObject("images/a.png");

// 两条路线共用的参数，先设好（headers 最终由对应容器产出）
$upload->put()->contentType("image/png")->acl("public-read");

// 决定策略并产出计划
$upload->strategy("/tmp/a.png");                 // "simple" 或 "multipart"
$steps = $upload->plan("/tmp/a.png");
```

## 判定规则

| 条件 | 结果 |
|---|---|
| 文件大小 **>** `SIMPLE_MAX_SIZE`（5GB，简单上传硬上限） | **分块**（硬上限优先，`threshold` 调再大也拦不住） |
| 文件大小 **>** `threshold`（默认 = 5GB） | **分块** |
| 其余 | **简单上传**（一次 PUT Object） |

`threshold` 默认取 5GB，即"**只在不得不用时才分块**"。实践中若想换来**断点续传/并发**，
可把阈值调小（如 20MB）：`$upload->threshold(20 * 1024 * 1024)`。

## ⚠️ 与同目录其它类一样：**不发请求、不做签名**

它只产出「该发什么」（见 `plan`）。分块路线还有**运行时依赖**（`uploadId` 来自初始化响应、
`ETag` 来自每个块的响应头），需要用 `multipart` 拿到的实例回填，再取 `QCloudCosMultipartUpload::completeXml`。

文档核对状态：**待核对**（5GB 为 COS 简单上传的普遍上限；分块规则见
[QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)；首次接入对真实桶复核）。

## 示例

```php
$upload = new QCloudCosUploadObject("images/a.png");

// 两条路线共用的参数，先设好（headers 最终由对应容器产出）
$upload->put()->contentType("image/png")->acl("public-read");

// 决定策略并产出计划
$upload->strategy("/tmp/a.png");                 // "simple" 或 "multipart"
$steps = $upload->plan("/tmp/a.png");
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `STRATEGY_SIMPLE` | `"simple"` | 策略：简单上传（PUT Object） |
| `STRATEGY_MULTIPART` | `"multipart"` | 策略：分块上传 |
| `SIMPLE_MAX_SIZE` | `5368709120` | 简单上传（PUT Object）的**硬上限**：5GB，超过就必须分块 |
| `DEFAULT_THRESHOLD` | `5368709120` | 默认分块阈值：与硬上限一致（即"只在不得不用时才分块"） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | protected | — |
| `$threshold` | `integer` | protected | — |
| `$putObject` | `QCloudCosPutObject|null` | protected | — |
| `$multipartUpload` | `QCloudCosMultipartUpload|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`key()`](#key) | 对象键（不传=读取，传值=设置并返回 `$this`） |
| [`threshold()`](#threshold) | 分块阈值（字节；不传=读取，传值=设置并返回 `$this`） |
| [`put()`](#put) | 简单上传的参数容器（PUT Object） |
| [`multipart()`](#multipart) | 分块上传的编排器（键会与本类保持同步） |
| [`strategyForSize()`](#strategyforsize) | 按**已知大小**判定策略（纯逻辑，不碰文件 —— 便于测试与流式场景） |
| [`strategy()`](#strategy) | 判定某个本地文件该走哪条路 |
| [`decide()`](#decide) | 判定并说明依据（比 `strategy` 多给出大小、阈值与原因） |
| [`plan()`](#plan) | 产出该文件的上传计划（**不发请求**） |

### __construct()

```php
public function __construct($objectKey = null, $threshold = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | `null` | 对象键 |
| `$threshold` | `integer|null` | `null` | 分块阈值（字节）；不传用 `DEFAULT_THRESHOLD` |

### key()

```php
public function key($value = null)
```

对象键（不传=读取，传值=设置并返回 `$this`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### threshold()

```php
public function threshold($value = null)
```

分块阈值（字节；不传=读取，传值=设置并返回 `$this`）

文件**大于**该值即走分块。注意 `SIMPLE_MAX_SIZE` 是硬上限，
即使把阈值调到 5GB 以上，超过 5GB 的文件仍然走分块。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### put()

```php
public function put()
```

简单上传的参数容器（PUT Object）

### multipart()

```php
public function multipart()
```

分块上传的编排器（键会与本类保持同步）

分块路线需要用这个实例回填 `uploadId` 与各块 `ETag`。

### strategyForSize()

```php
public function strategyForSize($size)
```

按**已知大小**判定策略（纯逻辑，不碰文件 —— 便于测试与流式场景）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$size` | `integer` | — | 文件字节数 |

### strategy()

```php
public function strategy($localFilePath)
```

判定某个本地文件该走哪条路

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$localFilePath` | `string` | — | 本地文件路径 |

可能抛出：

- `\InvalidArgumentException` 文件不存在或不可读

### decide()

```php
public function decide($localFilePath)
```

判定并说明依据（比 `strategy` 多给出大小、阈值与原因）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$localFilePath` | `string` | — | 本地文件路径 |

可能抛出：

- `\InvalidArgumentException` 文件不存在或不可读

### plan()

```php
public function plan($localFilePath, $partSize = QCloudCosMultipartUpload::DEFAULT_PART_SIZE)
```

产出该文件的上传计划（**不发请求**）

- 简单上传：返回 **1 步**，`phase = "put"`（PUT Object，请求体是整个文件内容）；
- 分块上传：直接返回 `QCloudCosMultipartUpload::plan` 的步骤
（`initiate` → 各 `part` → `complete`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$localFilePath` | `string` | — | 本地文件路径 |
| `$partSize` | `integer` | `QCloudCosMultipartUpload::DEFAULT_PART_SIZE` | 分块大小（仅分块路线生效） |

可能抛出：

- `\InvalidArgumentException` 文件不存在或不可读；分块路线同 {@see QCloudCosMultipartUpload::split()}

## 非公开方法

**protected**

- `protected function fileSize($localFilePath)` —— 取文件大小（顺带校验可读）
- `protected static function encodePath($objectKey)` —— 对象键编码（按段 `rawurlencode` + 前导 `/`，与存储层 `encodeObjectName()` 同一套规则）
- `protected static function humanSize($bytes)` —— 字节数转人类可读（仅用于 `decide` 的说明文字）

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)

