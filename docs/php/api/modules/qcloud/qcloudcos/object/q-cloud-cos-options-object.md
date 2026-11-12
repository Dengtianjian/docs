# QCloudCosOptionsObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosOptionsObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosOptionsObject.php`

> OPTIONS Object（CORS 预检）的输入容器

## 声明

```php
class QCloudCosOptionsObject extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

把预检请求要带的三个头写成方法（调用约定见 `AbstractQCloudCosObject`）：
`Origin` / `Access-Control-Request-Method` / `Access-Control-Request-Headers`。

```php
$options = (new QCloudCosOptionsObject())
->origin("https://example.com")
->accessControlRequestMethod("PUT")
->requestHeaders(["content-type", "x-cos-acl"]);
```

结果（**响应**头，不是本类的输入）：`Access-Control-Allow-Origin` / `-Methods` / `-Headers` /
`-Expose-Headers` / `-Max-Age`。**没有这些响应头 ⇒ 桶未配置对应的跨域规则**（预检失败多半是桶规则问题）。

文档核对状态：本类的三个头即 COS `OPTIONS Object` 的标准 CORS 预检头，与仓内既有实现一致
（客户端侧尚未实现 CORS 预检，见 [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)）。

## 示例

```php
$options = (new QCloudCosOptionsObject())
->origin("https://example.com")
->accessControlRequestMethod("PUT")
->requestHeaders(["content-type", "x-cos-acl"]);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`origin()`](#origin) | Origin（**必选**：预检来源） |
| [`accessControlRequestMethod()`](#accesscontrolrequestmethod) | Access-Control-Request-Method（**必选**：预检的目标方法） |
| [`accessControlRequestHeaders()`](#accesscontrolrequestheaders) | Access-Control-Request-Headers（预检的请求头名列表） |
| [`requestHeaders()`](#requestheaders) | 便捷：传入头名数组，自动拼成逗号分隔（并统一小写） |

### origin()

```php
public function origin($value = null)
```

Origin（**必选**：预检来源）

如 `https://example.com`；必须是完整来源（scheme + host + 可选端口），不能带路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### accessControlRequestMethod()

```php
public function accessControlRequestMethod($value = null)
```

Access-Control-Request-Method（**必选**：预检的目标方法）

如 `GET` / `PUT` / `POST`（前端直传场景通常是 PUT 或 POST）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### accessControlRequestHeaders()

```php
public function accessControlRequestHeaders($value = null)
```

Access-Control-Request-Headers（预检的请求头名列表）

值形如 `content-type, x-cos-acl`；用 `requestHeaders` 可自动拼。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### requestHeaders()

```php
public function requestHeaders(array $headerNames)
```

便捷：传入头名数组，自动拼成逗号分隔（并统一小写）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$headerNames` | `array` | — | 头名数组，如 ["content-type", "x-cos-acl"] |

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

