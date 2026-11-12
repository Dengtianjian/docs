# QCloudCosListMultipartUploads

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosListMultipartUploads`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosListMultipartUploads.php`

> List Multipart Uploads（列举进行中的分块上传）的输入容器

## 声明

```php
class QCloudCosListMultipartUploads extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`GET /＜ObjectKey＞?uploads[&prefix=][&delimiter=][&max-uploads=][&key-marker=][&upload-id-marker=][&encoding-type=]`。

- `?uploads` 是**子资源**（参与签名，且必须出现在请求 URL 上）—— 用 `uploads` 设置；
- 其余都是 **URL 参数（参与签名）**。

成功返回 200，响应体为 `＜ListMultipartUploadsResult＞`。

文档核对状态：**待核对**（按官方 List Multipart Uploads 通用写法整理；首次接入对真实桶复核）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploads()`](#uploads) | uploads（子资源标记；设空串即可，如 `$obj->uploads("")`） |
| [`prefix()`](#prefix) | prefix（按对象键前缀过滤） |
| [`delimiter()`](#delimiter) | delimiter（分隔符，用于模拟文件夹层次） |
| [`maxUploads()`](#maxuploads) | max-uploads（单次列举的最大上传数，默认 1000） |
| [`keyMarker()`](#keymarker) | key-marker（分页起点：从上一次返回的 `NextKeyMarker` 取） |
| [`uploadIdMarker()`](#uploadidmarker) | upload-id-marker（分页起点：配合 key-marker 使用） |
| [`encodingType()`](#encodingtype) | encoding-type（对响应中的 delimiter 之后的内容做 URL 编码，如 `url`） |

### uploads()

```php
public function uploads($value = null)
```

uploads（子资源标记；设空串即可，如 `$obj->uploads("")`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取（返回当前值或 null） |

### prefix()

```php
public function prefix($value = null)
```

prefix（按对象键前缀过滤）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### delimiter()

```php
public function delimiter($value = null)
```

delimiter（分隔符，用于模拟文件夹层次）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### maxUploads()

```php
public function maxUploads($value = null)
```

max-uploads（单次列举的最大上传数，默认 1000）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### keyMarker()

```php
public function keyMarker($value = null)
```

key-marker（分页起点：从上一次返回的 `NextKeyMarker` 取）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### uploadIdMarker()

```php
public function uploadIdMarker($value = null)
```

upload-id-marker（分页起点：配合 key-marker 使用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### encodingType()

```php
public function encodingType($value = null)
```

encoding-type（对响应中的 delimiter 之后的内容做 URL 编码，如 `url`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosCompleteMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-complete-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

