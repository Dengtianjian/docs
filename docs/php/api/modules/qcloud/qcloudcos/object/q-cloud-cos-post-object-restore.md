# QCloudCosPostObjectRestore

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosPostObjectRestore`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosPostObjectRestore.php`

> POST Object restore（解冻归档/深度归档对象）的输入容器

## 声明

```php
class QCloudCosPostObjectRestore extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

该接口的输入**不是请求头而是请求体 XML**（`POST /＜ObjectKey＞?restore`），所以本类把
「保留天数、解冻优先级」写成方法，并提供 `toXml` 直接产出请求体。
调用约定（不传=读取 / 传值=设置并返回 `$this`）见 `AbstractQCloudCosObject`。

```php
$restore = (new QCloudCosPostObjectRestore())
->days(7)
->tier(QCloudCosPostObjectRestore::TIER_EXPEDITED);

$xml = $restore->toXml();
// <RestoreRequest><Days>7</Days><CASJobParameters><Tier>Expedited</Tier></CASJobParameters></RestoreRequest>
```

要点：`?restore` 是**子资源** ⇒ 必须**同时**参与签名（`q-url-param-list=restore`）并出现在请求 URL 上；
解冻是**异步**的，成功返回 **202**，要等回热完成后才能 GET 到内容；归档对象在回热前读取会失败。

文档核对状态：XML 结构（`RestoreRequest` / `Days` / `CASJobParameters` / `Tier`）依据官方写法整理，
**待与官方 POST Object restore 页面逐条核对**（尤其 `Tier` 的取值大小写：`Expedited`/`Standard`/`Bulk`）。

## 示例

```php
$restore = (new QCloudCosPostObjectRestore())
->days(7)
->tier(QCloudCosPostObjectRestore::TIER_EXPEDITED);

$xml = $restore->toXml();
// <RestoreRequest><Days>7</Days><CASJobParameters><Tier>Expedited</Tier></CASJobParameters></RestoreRequest>
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `TIER_EXPEDITED` | `"Expedited"` | 解冻优先级：加急 |
| `TIER_STANDARD` | `"Standard"` | 解冻优先级：标准 |
| `TIER_BULK` | `"Bulk"` | 解冻优先级：批量 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`days()`](#days) | Days（解冻后副本的保留天数） |
| [`tier()`](#tier) | Tier（解冻优先级） |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜RestoreRequest＞…＜/RestoreRequest＞`） |

### days()

```php
public function days($value = null)
```

Days（解冻后副本的保留天数）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### tier()

```php
public function tier($value = null)
```

Tier（解冻优先级）

取值：`TIER_EXPEDITED` / `TIER_STANDARD` / `TIER_BULK`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜RestoreRequest＞…＜/RestoreRequest＞`）

用 `Arr::toXML` 拼（嵌套关联数组递归成子元素），字符串 `Tier` 逐值转义。
未设置 `Days` 时返回空串（调用方应先设好）。

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
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

