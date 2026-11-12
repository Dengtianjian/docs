# QCloudCosCompleteMultipartUpload

`kernel\Modules\QCloud\QCloudCos\Object\MultipartUpload\QCloudCosCompleteMultipartUpload`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/MultipartUpload/QCloudCosCompleteMultipartUpload.php`

> Complete Multipart Upload（完成分块上传）的输入容器

## 声明

```php
class QCloudCosCompleteMultipartUpload extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`POST /＜ObjectKey＞?uploadId=X`。
请求体 XML：
```xml
<CompleteMultipartUpload>
<Part><PartNumber>1</PartNumber><ETag>"etag1"</ETag></Part>
<Part><PartNumber>2</PartNumber><ETag>"etag2"</ETag></Part>
</CompleteMultipartUpload>
```
`uploadId` 是 **URL 参数（参与签名）**；`ETag` 取各 UploadPart 响应头里的 `ETag`（带不带引号均可，
COS 以实际为准）。

文档核对状态：**待核对**（按官方 Complete Multipart Upload 通用写法整理；首次接入对真实桶复核）。

## 示例

```php
<CompleteMultipartUpload>
<Part><PartNumber>1</PartNumber><ETag>"etag1"</ETag></Part>
<Part><PartNumber>2</PartNumber><ETag>"etag2"</ETag></Part>
</CompleteMultipartUpload>
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploadId()`](#uploadid) | uploadId（本次分块上传的 ID，URL 参数） |
| [`part()`](#part) | 追加一个分块（PartNumber => ETag） |
| [`parts()`](#parts) | 批量设置分块清单 |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜CompleteMultipartUpload＞…＜/CompleteMultipartUpload＞`） |

### uploadId()

```php
public function uploadId($value = null)
```

uploadId（本次分块上传的 ID，URL 参数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### part()

```php
public function part($partNumber, $etag)
```

追加一个分块（PartNumber => ETag）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$partNumber` | `integer` | — | 分块编号（从 1 开始） |
| `$etag` | `string` | — | 该分块的 ETag（可带引号） |

### parts()

```php
public function parts(array $parts)
```

批量设置分块清单

支持两种写法：
- 列表对：`[[1, "etag1"], [2, "etag2"]]`
- 关联数组（含 `PartNumber` / `ETag` 键）：`[["PartNumber" => 1, "ETag" => "etag1"], …]`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$parts` | `array` | — | 分块清单 |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜CompleteMultipartUpload＞…＜/CompleteMultipartUpload＞`）

用 `Arr::toXML` 拼：`Part` 是列表 ⇒ 展开成重复同名子元素；字符串逐值转义。

## 同目录

- [QCloudCosAbortMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-abort-multipart-upload)
- [QCloudCosInitiateMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-initiate-multipart-upload)
- [QCloudCosListMultipartUploads](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-multipart-uploads)
- [QCloudCosListParts](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-list-parts)
- [QCloudCosMultipartUpload](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-multipart-upload)
- [QCloudCosUploadPart](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part)
- [QCloudCosUploadPartCopy](/php/api/modules/qcloud/qcloudcos/object/multipartupload/q-cloud-cos-upload-part-copy)

