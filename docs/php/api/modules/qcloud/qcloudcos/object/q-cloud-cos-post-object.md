# QCloudCosPostObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosPostObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosPostObject.php`

> POST Object（表单上传）的输入容器

## 声明

```php
class QCloudCosPostObject extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

⚠️ 与其它容器类不同：POST Object 的对象属性、ACL、加密等**走表单字段**（`form-data` 的 key），
而不是 HTTP 请求头 —— 所以本类用 `fields` 取结果（内容语义与 `all` 相同）。

⚠️ **文档核对状态：未核对**。抓取官方「POST Object」页时拿到的是「PUT Object acl」页（链接不对），
因此本类的字段清单**依据的是通用实践与相邻接口**，尚未逐条对过官方页面 ⇒ 首次接入前请对着
「POST Object」文档核一遍（尤其回调字段的**连字符风格**：`callbackBody` 无连字符，而
`callback-var` 有连字符，这类细节最容易写错）。

```php
$post = (new QCloudCosPostObject())
->key("images/a.png")
->contentType("image/png")                    // 表单字段：描述「对象」的 MIME
->acl(QCloudCosPostObject::ACL_PUBLIC_READ)
->meta("author", "gstudio")
->successActionStatus(204);
```

几条容易搞混的（同名不同义）：
- **`Content-Type`**：作为 **HTTP 头**必须是 `multipart/form-data; boundary=…`（描述整个请求体，
由 cURL 自动生成，**不要**手设）；作为**表单字段**才是**对象自身**的 MIME 类型 —— 本类管的是后者；
- **`Content-MD5`**：作为 HTTP 头校验整个请求体；作为表单字段校验**对象内容**（实践中通常只用后者）；
- **`policy` 与 `q-*` 签名字段**：由签名/上传逻辑生成（客户端侧尚未实现 POST 表单直传，见 [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)），
本类虽提供 `policy()` 等方法，但正常流程不需要手动设。

## 示例

```php
$post = (new QCloudCosPostObject())
->key("images/a.png")
->contentType("image/png")                    // 表单字段：描述「对象」的 MIME
->acl(QCloudCosPostObject::ACL_PUBLIC_READ)
->meta("author", "gstudio")
->successActionStatus(204);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`fields()`](#fields) | 取出全部表单字段（与 `all` 等价，语义更贴合 POST Object） |
| [`key()`](#key) | key（**必选**：对象键 / 文件名） |
| [`policy()`](#policy) | policy（Base64 编码的策略；使用签名时必选） |
| [`contentType()`](#contenttype) | Content-Type（**表单字段**：对象自身的 MIME 类型） |
| [`contentMD5()`](#contentmd5) | Content-MD5（**表单字段**：对象内容的 MD5，Base64） |
| [`securityToken()`](#securitytoken) | x-cos-security-token（临时密钥的会话令牌；用临时密钥上传时必填） |
| [`successActionStatus()`](#successactionstatus) | success_action_status（上传成功时返回给客户端的状态码） |
| [`trafficLimit()`](#trafficlimit) | x-cos-traffic-limit（本次上传的限速值，bit/s） |
| [`callback()`](#callback) | callback（上传成功后的回调 URL，Base64 编码的 JSON） |
| [`callbackBody()`](#callbackbody) | callbackBody（回调内容模板） |
| [`callbackBodyType()`](#callbackbodytype) | callbackBodyType（回调 body 的类型，如 `application/json`） |
| [`callbackHost()`](#callbackhost) | callbackHost（回调请求携带的 Host 头） |
| [`callbackVar()`](#callbackvar) | callback-var（回调变量，JSON） |
| [`picOperations()`](#picoperations) | Pic-Operations（图片处理参数，Base64 编码的 JSON） |

### fields()

```php
public function fields()
```

取出全部表单字段（与 `all` 等价，语义更贴合 POST Object）

### key()

```php
public function key($value = null)
```

key（**必选**：对象键 / 文件名）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### policy()

```php
public function policy($value = null)
```

policy（Base64 编码的策略；使用签名时必选）

通常由上传逻辑根据 policy JSON 生成，无需手工设置。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentType()

```php
public function contentType($value = null)
```

Content-Type（**表单字段**：对象自身的 MIME 类型）

⚠️ 与 HTTP 头的 `Content-Type`（必须是 `multipart/form-data; boundary=…`，由 cURL 生成）**不同义**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 如 `image/png`；不传=读取 |

### contentMD5()

```php
public function contentMD5($value = null)
```

Content-MD5（**表单字段**：对象内容的 MD5，Base64）

COS 会用它校验对象内容。可用 `\kernel\Modules\QCloud\QCloudCos\Object\QCloudCosPutObject::contentMD5Base64` 同款方式计算。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | Base64 形式；不传=读取 |

### securityToken()

```php
public function securityToken($value = null)
```

x-cos-security-token（临时密钥的会话令牌；用临时密钥上传时必填）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### successActionStatus()

```php
public function successActionStatus($value = null)
```

success_action_status（上传成功时返回给客户端的状态码）

常用 `200` / `201` / `204`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### trafficLimit()

```php
public function trafficLimit($value = null)
```

x-cos-traffic-limit（本次上传的限速值，bit/s）

⚠️ 待核对：该字段在 POST Object 中是否支持、以及取值范围（PUT Object 页给的是 819200–838860800）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### callback()

```php
public function callback($value = null)
```

callback（上传成功后的回调 URL，Base64 编码的 JSON）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### callbackBody()

```php
public function callbackBody($value = null)
```

callbackBody（回调内容模板）

⚠️ 待核对字段名（注意与其他回调字段的连字符风格可能不一致）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### callbackBodyType()

```php
public function callbackBodyType($value = null)
```

callbackBodyType（回调 body 的类型，如 `application/json`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### callbackHost()

```php
public function callbackHost($value = null)
```

callbackHost（回调请求携带的 Host 头）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### callbackVar()

```php
public function callbackVar($value = null)
```

callback-var（回调变量，JSON）

⚠️ 字段名带连字符（与上面的 `callbackBody` 风格不一致），待核对。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### picOperations()

```php
public function picOperations($value = null)
```

Pic-Operations（图片处理参数，Base64 编码的 JSON）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

