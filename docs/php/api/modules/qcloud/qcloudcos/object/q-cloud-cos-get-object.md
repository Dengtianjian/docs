# QCloudCosGetObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosGetObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosGetObject.php`

> GET Object（读取对象）的输入容器

## 声明

```php
class QCloudCosGetObject extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

把读取时可带的请求头写成方法（调用约定见 `AbstractQCloudCosObject`）；
ACL / 存储类型 / meta / SSE 等「目标对象属性」头在 GET 场景无意义，本类不提供。

```php
$get = (new QCloudCosGetObject())
->range("bytes=0-1023")                                  // 断点续传/取片段（成功码 206）
->ifNoneMatch('"abc123"')                                // 条件读取，可省流量
->responseContentDisposition('attachment; filename="a.png"')  // 覆盖响应头（不改对象元数据）
->responseCacheControl("max-age=60");
```

⚠️ 两处与「头」无关、但很容易混淆的输入，**不在本类**：
- **对象版本**：走 URL 参数 `?versionId=…`（不是请求头）；
- **图片处理 / 数据万象**：走 URL 查询参数（如 `?imageMogr2/thumbnail/!50p`、`?ci-process=…`），
且这类参数**不入签**、必须**逐字**拼进 URL（详见相关设计说明）。

⚠️ 文档核对状态：**待核对**（本页头清单依据通用实践整理，尚未逐条对官方 GET Object 页面）。

## 示例

```php
$get = (new QCloudCosGetObject())
->range("bytes=0-1023")                                  // 断点续传/取片段（成功码 206）
->ifNoneMatch('"abc123"')                                // 条件读取，可省流量
->responseContentDisposition('attachment; filename="a.png"')  // 覆盖响应头（不改对象元数据）
->responseCacheControl("max-age=60");
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`range()`](#range) | Range（读取的字节范围） |
| [`trafficLimit()`](#trafficlimit) | x-cos-traffic-limit（本次下载的限速值，bit/s） |
| [`ifModifiedSince()`](#ifmodifiedsince) | If-Modified-Since（对象在该时间**之后**被修改才返回内容） |
| [`ifUnmodifiedSince()`](#ifunmodifiedsince) | If-Unmodified-Since（对象在该时间**之后未被**修改才返回内容） |
| [`ifMatch()`](#ifmatch) | If-Match（对象 ETag 与指定值**一致**才返回内容） |
| [`ifNoneMatch()`](#ifnonematch) | If-None-Match（对象 ETag 与指定值**不一致**才返回内容） |
| [`responseCacheControl()`](#responsecachecontrol) | response-cache-control（覆盖本次响应的 Cache-Control） |
| [`responseContentDisposition()`](#responsecontentdisposition) | response-content-disposition（覆盖本次响应的 Content-Disposition） |
| [`responseContentEncoding()`](#responsecontentencoding) | response-content-encoding（覆盖本次响应的 Content-Encoding） |
| [`responseContentLanguage()`](#responsecontentlanguage) | response-content-language（覆盖本次响应的 Content-Language） |
| [`responseContentType()`](#responsecontenttype) | response-content-type（覆盖本次响应的 Content-Type） |
| [`responseExpires()`](#responseexpires) | response-expires（覆盖本次响应的 Expires） |

### range()

```php
public function range($value = null)
```

Range（读取的字节范围）

形如 `bytes=0-1023`、`bytes=0-`（从偏移读到末尾）；命中时 COS 返回 **206 Partial Content**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### trafficLimit()

```php
public function trafficLimit($value = null)
```

x-cos-traffic-limit（本次下载的限速值，bit/s）

⚠️ 待核对：GET Object 是否支持该头及其取值范围（PUT Object 页给的是 819200–838860800）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### ifModifiedSince()

```php
public function ifModifiedSince($value = null)
```

If-Modified-Since（对象在该时间**之后**被修改才返回内容）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT；不传=读取 |

### ifUnmodifiedSince()

```php
public function ifUnmodifiedSince($value = null)
```

If-Unmodified-Since（对象在该时间**之后未被**修改才返回内容）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC1123 GMT；不传=读取 |

### ifMatch()

```php
public function ifMatch($value = null)
```

If-Match（对象 ETag 与指定值**一致**才返回内容）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

### ifNoneMatch()

```php
public function ifNoneMatch($value = null)
```

If-None-Match（对象 ETag 与指定值**不一致**才返回内容）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | ETag；不传=读取 |

### responseCacheControl()

```php
public function responseCacheControl($value = null)
```

response-cache-control（覆盖本次响应的 Cache-Control）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### responseContentDisposition()

```php
public function responseContentDisposition($value = null)
```

response-content-disposition（覆盖本次响应的 Content-Disposition）

常用于"同一对象按不同文件名下载"，例如 `attachment; filename="new.png"`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### responseContentEncoding()

```php
public function responseContentEncoding($value = null)
```

response-content-encoding（覆盖本次响应的 Content-Encoding）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### responseContentLanguage()

```php
public function responseContentLanguage($value = null)
```

response-content-language（覆盖本次响应的 Content-Language）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### responseContentType()

```php
public function responseContentType($value = null)
```

response-content-type（覆盖本次响应的 Content-Type）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 如 `image/png`；不传=读取 |

### responseExpires()

```php
public function responseExpires($value = null)
```

response-expires（覆盖本次响应的 Expires）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | RFC 2616 日期时间；不传=读取 |

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

