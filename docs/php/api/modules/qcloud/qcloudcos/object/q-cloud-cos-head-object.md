# QCloudCosHeadObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosHeadObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosHeadObject.php`

> HEAD Object（取对象元信息）的输入容器

## 声明

```php
class QCloudCosHeadObject extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

只发 HEAD、**不返回内容**，因此可带的输入比 GET 少：主要是条件头和 SSE-C（解密元信息时需要）。
调用约定见 `AbstractQCloudCosObject`。

```php
$head = (new QCloudCosHeadObject())
->ifNoneMatch('"abc123"');        // 未变更则 304，省一次传输
```

与 `QCloudCosGetObject` 的差别：
- HEAD **没有** `Range`（不返回内容，无区间可分）；
- `response-*` 覆盖头是否适用于 HEAD **待核对** ⇒ 本类**未提供**（如确认支持可补，加一行即可）。

⚠️ 文档核对状态：**待核对**（本页头清单依据通用实践整理，尚未逐条对官方 HEAD Object 页面）。

## 示例

```php
$head = (new QCloudCosHeadObject())
->ifNoneMatch('"abc123"');        // 未变更则 304，省一次传输
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`ifModifiedSince()`](#ifmodifiedsince) | If-Modified-Since（对象在该时间**之后**被修改才返回） |
| [`ifUnmodifiedSince()`](#ifunmodifiedsince) | If-Unmodified-Since（对象在该时间**之后未被**修改才返回） |
| [`ifMatch()`](#ifmatch) | If-Match（对象 ETag 与指定值**一致**才返回） |
| [`ifNoneMatch()`](#ifnonematch) | If-None-Match（对象 ETag 与指定值**不一致**才返回） |

### ifModifiedSince()

```php
public function ifModifiedSince($value = null)
```

If-Modified-Since（对象在该时间**之后**被修改才返回）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT；不传=读取 |

### ifUnmodifiedSince()

```php
public function ifUnmodifiedSince($value = null)
```

If-Unmodified-Since（对象在该时间**之后未被**修改才返回）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT；不传=读取 |

### ifMatch()

```php
public function ifMatch($value = null)
```

If-Match（对象 ETag 与指定值**一致**才返回）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

### ifNoneMatch()

```php
public function ifNoneMatch($value = null)
```

If-None-Match（对象 ETag 与指定值**不一致**才返回）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

