# QCloudCosListParts

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosListParts`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosListParts.php`

> List Parts（列举已上传的分块）的输入容器

## 声明

```php
class QCloudCosListParts extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`GET /＜ObjectKey＞?uploadId=X[&max-parts=N][&part-number-marker=M]`。
`uploadId` / `max-parts` / `part-number-marker` 都是 **URL 参数（参与签名）**。
成功返回 200，响应体为 `＜ListPartsResult＞`。

文档核对状态：**待核对**（按官方 List Parts 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploadId()`](#uploadid) | uploadId（本次分块上传的 ID，URL 参数） |
| [`maxParts()`](#maxparts) | max-parts（单次列举的最大分块数，默认 1000） |
| [`partNumberMarker()`](#partnumbermarker) | part-number-marker（分页起点：从上一次返回的 `NextPartNumberMarker` 取） |

### uploadId()

```php
public function uploadId($value = null)
```

uploadId（本次分块上传的 ID，URL 参数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### maxParts()

```php
public function maxParts($value = null)
```

max-parts（单次列举的最大分块数，默认 1000）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### partNumberMarker()

```php
public function partNumberMarker($value = null)
```

part-number-marker（分页起点：从上一次返回的 `NextPartNumberMarker` 取）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

