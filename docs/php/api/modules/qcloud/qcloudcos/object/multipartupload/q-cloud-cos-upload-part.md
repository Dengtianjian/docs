# QCloudCosUploadPart

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosUploadPart`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosUploadPart.php`

> Upload Part（上传分块）的输入容器

## 声明

```php
class QCloudCosUploadPart extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`PUT /＜ObjectKey＞?partNumber=N&uploadId=X`。

`partNumber` / `uploadId` 是 **URL 参数（参与签名）** —— 必须**同时**出现在签名的 `q-url-param-list`
与真实请求 URL 上（接线时归入 `$options['params']`）。

头：`Content-MD5`（可选，校验块完整性）、`Content-Length`（块字节数）、
`x-cos-server-side-encryption-customer-*`（SSE-C，逐块覆盖密钥 —— 基类已提供
`customerAlgorithm()` / `customerKey()` / `customerKeyMD5()`）。

请求体（块的二进制数据）由**发送层单独传入**，本容器只持有头与 URL 参数。

文档核对状态：**待核对**（按官方 Upload Part 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`partNumber()`](#partnumber) | partNumber（分块编号，从 1 开始，URL 参数） |
| [`uploadId()`](#uploadid) | uploadId（本次分块上传的 ID，URL 参数） |
| [`contentMD5()`](#contentmd5) | Content-MD5（块的 MD5 的 Base64 值，可选校验） |
| [`contentLength()`](#contentlength) | Content-Length（块的字节数） |

### partNumber()

```php
public function partNumber($value = null)
```

partNumber（分块编号，从 1 开始，URL 参数）

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

### contentMD5()

```php
public function contentMD5($value = null)
```

Content-MD5（块的 MD5 的 Base64 值，可选校验）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentLength()

```php
public function contentLength($value = null)
```

Content-Length（块的字节数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

