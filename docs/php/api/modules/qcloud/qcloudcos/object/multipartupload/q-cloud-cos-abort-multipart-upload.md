# QCloudCosAbortMultipartUpload

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosAbortMultipartUpload`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosAbortMultipartUpload.php`

> Abort Multipart Upload（终止分块上传并释放已上传的分块）的输入容器

## 声明

```php
class QCloudCosAbortMultipartUpload extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`DELETE /＜ObjectKey＞?uploadId=X`。`uploadId` 是 **URL 参数（参与签名）**。
成功返回 **204**（无内容）；若 UploadId 不存在或已结束，COS 返回 404。

⚠️ **本接口没有专用请求头/请求体** —— 仅保留 `uploadId()` 一个 URL 参数方法（及基类容器能力）；
保留它是为了让分块上传这一组的接口与 `Object/MultipartUpload` 目录一一对应。

文档核对状态：**待核对**（按官方 Abort Multipart Upload 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploadId()`](#uploadid) | uploadId（本次分块上传的 ID，URL 参数） |

### uploadId()

```php
public function uploadId($value = null)
```

uploadId（本次分块上传的 ID，URL 参数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

