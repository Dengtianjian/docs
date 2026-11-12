# QCloudCosPutObjectCopy

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosPutObjectCopy`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosPutObjectCopy.php`

> PUT Object - Copy（复制对象）的输入容器

## 声明

```php
class QCloudCosPutObjectCopy extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

把该接口的专用请求头、条件复制头、目标对象元数据头、ACL 头、SSE 头都写成方法，
调用约定（不传=读取 / 传值=设置并返回 `$this`）见 `AbstractQCloudCosObject`。

```php
$copy = (new QCloudCosPutObjectCopy())
->copySource("srv-1250000001.cos.ap-shanghai.myqcloud.com/example-%E8%85%BE%E8%AE%AF%E4%BA%91.jpg")
->replaceMetadata()                        // = metadataDirective("Replaced")
->contentType("image/jpeg")
->acl(QCloudCosPutObjectCopy::ACL_PUBLIC_READ);
```

⚠️ 三条来自官方文档、实现/排障时必须知道的规则：
1. **HTTP 200 不代表成功** —— 若错误发生在「复制执行期间」，仍返回 200 OK，错误信息在**响应体**里，
必须解析响应体判断成败（本类不管请求，仅提醒调用方）；
2. **默认不继承源对象的存储类型 / ACL / SSE** —— 除非显式指定，目标对象是标准存储、继承桶 ACL、不加密；
3. **目标与源是同一个对象（即只改元数据）时，`x-cos-metadata-directive` 必须为 `Replaced`**；
改标签时同理必须 `x-cos-tagging-directive: Replaced`。

其他要点：建议对象大小 1MB–5GB（更大用 Upload Part - Copy）；`x-cos-copy-source` 里的对象键需
URL encode，可用 `?versionId=` 指定源版本；**全球加速域名 / 用于全球加速源站的自定义域名不能作为 Copy 源**；
源桶需 `cos:GetObject`、目标桶需 `cos:PutObject`（或源对象公有读）。

文档核对状态：**已按官方文档逐条核对**（PUT Object - Copy，product/436/10881，页面更新 2026-05-29）。
该页**未列出** `x-cos-traffic-limit` ⇒ 本类不提供该方法（不按其他接口推断）。

## 示例

```php
$copy = (new QCloudCosPutObjectCopy())
->copySource("srv-1250000001.cos.ap-shanghai.myqcloud.com/example-%E8%85%BE%E8%AE%AF%E4%BA%91.jpg")
->replaceMetadata()                        // = metadataDirective("Replaced")
->contentType("image/jpeg")
->acl(QCloudCosPutObjectCopy::ACL_PUBLIC_READ);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`copySource()`](#copysource) | x-cos-copy-source（**必选**：源对象地址） |
| [`metadataDirective()`](#metadatadirective) | x-cos-metadata-directive（是否复制源对象元数据） |
| [`replaceMetadata()`](#replacemetadata) | 便捷：`metadataDirective("Replaced")`（要在请求头里指定目标对象元数据时必须先设它） |
| [`taggingDirective()`](#taggingdirective) | x-cos-tagging-directive（是否复制源对象标签） |
| [`replaceTagging()`](#replacetagging) | 便捷：`taggingDirective("Replaced")` |
| [`copySourceIfModifiedSince()`](#copysourceifmodifiedsince) | x-cos-copy-source-If-Modified-Since（源对象在该时间**之后**被修改才复制） |
| [`copySourceIfUnmodifiedSince()`](#copysourceifunmodifiedsince) | x-cos-copy-source-If-Unmodified-Since（源对象在该时间**之后未被**修改才复制） |
| [`copySourceIfMatch()`](#copysourceifmatch) | x-cos-copy-source-If-Match（源对象 ETag 与指定值**一致**才复制） |
| [`copySourceIfNoneMatch()`](#copysourceifnonematch) | x-cos-copy-source-If-None-Match（源对象 ETag 与指定值**不一致**才复制） |
| [`cacheControl()`](#cachecontrol) | Cache-Control（目标对象缓存指令）；**仅当 `metadataDirective=Replaced` 时才可用** |
| [`contentDisposition()`](#contentdisposition) | Content-Disposition（目标对象下载/预览行为）；**仅 `Replaced` 时可用** |
| [`contentEncoding()`](#contentencoding) | Content-Encoding（目标对象编码格式）；**仅 `Replaced` 时可用** |
| [`contentType()`](#contenttype) | Content-Type（目标对象 MIME）；**仅 `Replaced` 时可用** |
| [`expires()`](#expires) | Expires（目标对象缓存失效时间）；**仅 `Replaced` 时可用** |
| [`copySourceCustomerAlgorithm()`](#copysourcecustomeralgorithm) | x-cos-copy-source-server-side-encryption-customer-algorithm（源对象 SSE-C 算法） |
| [`copySourceCustomerKey()`](#copysourcecustomerkey) | x-cos-copy-source-server-side-encryption-customer-key（源对象 SSE-C 密钥，Base64） |
| [`copySourceCustomerKeyMD5()`](#copysourcecustomerkeymd5) | x-cos-copy-source-server-side-encryption-customer-key-MD5（源对象 SSE-C 密钥 MD5，Base64） |
| [`copySourceSseCustomer()`](#copysourcessecustomer) | 便捷：一次设置源对象的 SSE-C 三个头 |

### copySource()

```php
public function copySource($value = null)
```

x-cos-copy-source（**必选**：源对象地址）

取值：`<源桶>.cos.<源地域>.myqcloud.com/＜URL 编码后的对象键>`；
需要指定源版本时追加 `?versionId=＜VersionId＞`。
**注意**：全球加速域名或用于全球加速源站的自定义域名不支持作为 Copy 源。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### metadataDirective()

```php
public function metadataDirective($value = null)
```

x-cos-metadata-directive（是否复制源对象元数据）

取值：`AbstractQCloudCosObject::DIRECTIVE_COPY`（默认，沿用源对象元数据）/
`AbstractQCloudCosObject::DIRECTIVE_REPLACED`（以本次请求头里的元数据作为目标对象元数据）。
**只改同一个对象的元数据时必须为 `Replaced`**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### replaceMetadata()

```php
public function replaceMetadata()
```

便捷：`metadataDirective("Replaced")`（要在请求头里指定目标对象元数据时必须先设它）

### taggingDirective()

```php
public function taggingDirective($value = null)
```

x-cos-tagging-directive（是否复制源对象标签）

取值：`Copy`（默认）/ `Replaced`；**只改同一个对象的标签时必须为 `Replaced`**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### replaceTagging()

```php
public function replaceTagging()
```

便捷：`taggingDirective("Replaced")`

### copySourceIfModifiedSince()

```php
public function copySourceIfModifiedSince($value = null)
```

x-cos-copy-source-If-Modified-Since（源对象在该时间**之后**被修改才复制）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT，如 `Tue, 08 Jun 2021 06:19:53 GMT`；不传=读取 |

### copySourceIfUnmodifiedSince()

```php
public function copySourceIfUnmodifiedSince($value = null)
```

x-cos-copy-source-If-Unmodified-Since（源对象在该时间**之后未被**修改才复制）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT；不传=读取 |

### copySourceIfMatch()

```php
public function copySourceIfMatch($value = null)
```

x-cos-copy-source-If-Match（源对象 ETag 与指定值**一致**才复制）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

### copySourceIfNoneMatch()

```php
public function copySourceIfNoneMatch($value = null)
```

x-cos-copy-source-If-None-Match（源对象 ETag 与指定值**不一致**才复制）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

### cacheControl()

```php
public function cacheControl($value = null)
```

Cache-Control（目标对象缓存指令）；**仅当 `metadataDirective=Replaced` 时才可用**

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentDisposition()

```php
public function contentDisposition($value = null)
```

Content-Disposition（目标对象下载/预览行为）；**仅 `Replaced` 时可用**

取值：`inline` / `attachment` / `attachment; filename="a.jpg"`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentEncoding()

```php
public function contentEncoding($value = null)
```

Content-Encoding（目标对象编码格式）；**仅 `Replaced` 时可用**

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentType()

```php
public function contentType($value = null)
```

Content-Type（目标对象 MIME）；**仅 `Replaced` 时可用**

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 如 `image/jpeg`；不传=读取 |

### expires()

```php
public function expires($value = null)
```

Expires（目标对象缓存失效时间）；**仅 `Replaced` 时可用**

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC 2616 日期时间；不传=读取 |

### copySourceCustomerAlgorithm()

```php
public function copySourceCustomerAlgorithm($value = null)
```

x-cos-copy-source-server-side-encryption-customer-algorithm（源对象 SSE-C 算法）

源对象使用 SSE-C 时**必选**；目前仅支持 `AES256`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceCustomerKey()

```php
public function copySourceCustomerKey($value = null)
```

x-cos-copy-source-server-side-encryption-customer-key（源对象 SSE-C 密钥，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceCustomerKeyMD5()

```php
public function copySourceCustomerKeyMD5($value = null)
```

x-cos-copy-source-server-side-encryption-customer-key-MD5（源对象 SSE-C 密钥 MD5，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### copySourceSseCustomer()

```php
public function copySourceSseCustomer($key, $keyMD5)
```

便捷：一次设置源对象的 SSE-C 三个头

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | Base64 形式的密钥 |
| `$keyMD5` | `string` | — | Base64 形式的密钥 MD5 |

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
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

