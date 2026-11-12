# QCloudCosUploadPartCopy

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosUploadPartCopy`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosUploadPartCopy.php`

> Upload Part - Copy（通过复制已有对象或其一部分来生成分块）的输入容器

## 声明

```php
class QCloudCosUploadPartCopy extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`PUT /＜ObjectKey＞?partNumber=N&uploadId=X`。
`partNumber` / `uploadId` 是 **URL 参数（参与签名）**。

头（与 PUT Object - Copy 同源对象参数）：
- `x-cos-copy-source`：源对象，格式 `{bucket}.cos.{region}.myqcloud.com/{已编码源键}`
- `x-cos-copy-source-Range`：源字节范围，如 `bytes=0-1023`
- `x-cos-copy-source-SSE-Customer-*`：**源对象**用 SSE-C 加密时需要（注意是带 `copy-source-`
前缀的版本，与「目标对象 SSE-C」的 `x-cos-server-side-encryption-customer-*` 不同）

文档核对状态：**待核对**（按官方 Upload Part - Copy 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`partNumber()`](#partnumber) | partNumber（分块编号，URL 参数） |
| [`uploadId()`](#uploadid) | uploadId（本次分块上传的 ID，URL 参数） |
| [`copySource()`](#copysource) | x-cos-copy-source（源对象路径） |
| [`copySourceRange()`](#copysourcerange) | x-cos-copy-source-Range（源字节范围） |
| [`copySourceCustomerAlgorithm()`](#copysourcecustomeralgorithm) | x-cos-copy-source-SSE-Customer-Algorithm（源对象 SSE-C 算法，固定 AES256） |
| [`copySourceCustomerKey()`](#copysourcecustomerkey) | x-cos-copy-source-SSE-Customer-Key（源对象 SSE-C 密钥，Base64） |
| [`copySourceCustomerKeyMD5()`](#copysourcecustomerkeymd5) | x-cos-copy-source-SSE-Customer-Key-MD5（源对象 SSE-C 密钥 MD5，Base64） |

### partNumber()

```php
public function partNumber($value = null)
```

partNumber（分块编号，URL 参数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### uploadId()

```php
public function uploadId($value = null)
```

uploadId（本次分块上传的 ID，URL 参数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySource()

```php
public function copySource($value = null)
```

x-cos-copy-source（源对象路径）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceRange()

```php
public function copySourceRange($value = null)
```

x-cos-copy-source-Range（源字节范围）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceCustomerAlgorithm()

```php
public function copySourceCustomerAlgorithm($value = null)
```

x-cos-copy-source-SSE-Customer-Algorithm（源对象 SSE-C 算法，固定 AES256）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceCustomerKey()

```php
public function copySourceCustomerKey($value = null)
```

x-cos-copy-source-SSE-Customer-Key（源对象 SSE-C 密钥，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceCustomerKeyMD5()

```php
public function copySourceCustomerKeyMD5($value = null)
```

x-cos-copy-source-SSE-Customer-Key-MD5（源对象 SSE-C 密钥 MD5，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)

