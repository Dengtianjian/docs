# QCloudCosDeleteMultipleObjects

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosDeleteMultipleObjects`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosDeleteMultipleObjects.php`

> DELETE Multiple Objects（批量删除）的输入容器

## 声明

```php
class QCloudCosDeleteMultipleObjects extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

该接口的输入**主要不是请求头，而是请求体 XML**（`POST /?delete`），所以本类把「要删哪些对象、
是否静默、每个对象的版本」写成方法，并提供一个 `toXml` 直接产出请求体。
调用约定（不传=读取 / 传值=设置并返回 `$this`）见 `AbstractQCloudCosObject`。

```php
$delete = (new QCloudCosDeleteMultipleObjects())
->keys(["images/a.png", "images/b.png"])
->quiet(true);

$xml = $delete->toXml();
// <Delete><Quiet>true</Quiet><Object><Key>images/a.png</Key></Object><Object><Key>images/b.png</Key></Object></Delete>
```

要点：`?delete` 是**子资源** ⇒ 它必须**同时**参与签名（`q-url-param-list=delete`）并出现在请求 URL 上；
一次最多 **1000** 个对象；成功返回 200，响应体是 `＜DeleteResult＞` XML（`Quiet` 为 true 时只回失败项）。

⚠️ 文档核对状态：**待核对**。两处尤其要核：① 每个对象是否支持 `＜VersionId＞`（本类已按支持实现）；
② 请求体是否**必须**带 `Content-MD5`（若必须，调用方需用 `contentMD5` 设上）。

## 示例

```php
$delete = (new QCloudCosDeleteMultipleObjects())
->keys(["images/a.png", "images/b.png"])
->quiet(true);

$xml = $delete->toXml();
// <Delete><Quiet>true</Quiet><Object><Key>images/a.png</Key></Object><Object><Key>images/b.png</Key></Object></Delete>
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`quiet()`](#quiet) | Quiet（静默模式：只返回删除失败的对象） |
| [`keys()`](#keys) | 待删除的对象键列表（**必选**） |
| [`versions()`](#versions) | 指定某个待删对象的版本（与 `keys` 配套，键 => 版本 ID 的映射） |
| [`contentMD5()`](#contentmd5) | Content-MD5（请求体 MD5，Base64） |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜Delete＞…＜/Delete＞`） |

### quiet()

```php
public function quiet($value = null)
```

Quiet（静默模式：只返回删除失败的对象）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `boolean|null` | `null` | 不传=读取（返回布尔或 null） |

### keys()

```php
public function keys($keys = null)
```

待删除的对象键列表（**必选**）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keys` | `array|null` | `null` | 对象键数组；不传=读取 |

### versions()

```php
public function versions($versions = null)
```

指定某个待删对象的版本（与 `keys` 配套，键 => 版本 ID 的映射）

⚠️ 待核对：`＜Object＞` 内是否支持 `＜VersionId＞`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$versions` | `array|null` | `null` | 对象键 => 版本 ID；不传=读取 |

### contentMD5()

```php
public function contentMD5($value = null)
```

Content-MD5（请求体 MD5，Base64）

⚠️ 待核对是否必填；若调用方自行产出 XML，可用 `base64_encode(md5($xml, true))` 计算。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | Base64 形式；不传=读取 |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜Delete＞…＜/Delete＞`）

用 `Arr::toXML` 拼：`Keys` 是列表 ⇒ 会展开成**重复的同名子元素**
（`＜Object＞＜Key＞…＜/Key＞＜/Object＞`）；字符串由本方法逐值转义（`$contentWrap = false`）。

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
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

