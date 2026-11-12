# QCloudCosInitiateMultipartUpload

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosInitiateMultipartUpload`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosInitiateMultipartUpload.php`

> Initiate Multipart Upload（初始化分块上传）的输入容器

## 声明

```php
class QCloudCosInitiateMultipartUpload extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`POST /＜ObjectKey＞?uploads`。
响应体含 `＜InitiateMultipartUploadResult＞＜UploadId＞` —— **后续每个 UploadPart / CompleteMultipartUpload
都要带上这个 UploadId**（它是 URL 参数，参与签名）。

本接口支持的对象级头与「上传对象」一致（基类已提供，直接可用）：`acl()` / 四个 `grant*()` /
`storageClass()` / `meta()` / `tagging()` / 目标对象 SSE 六个头（`serverSideEncryption()`…`sse*()`）。
仅 `Content-Type`（对象的 MIME）是分块场景的必填项、基类没有，这里补上。

文档核对状态：**待核对**（按官方 Initiate Multipart Upload 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`contentType()`](#contenttype) | Content-Type（对象的 MIME，分块上传时通常在初始化阶段指定） |

### contentType()

```php
public function contentType($value = null)
```

Content-Type（对象的 MIME，分块上传时通常在初始化阶段指定）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

