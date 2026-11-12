# QCloudCosSelectObjectContent

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosSelectObjectContent`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosSelectObjectContent.php`

> SELECT Object Content（用 SQL 查询对象内容）的输入容器

## 声明

```php
class QCloudCosSelectObjectContent extends AbstractQCloudCosObject
```

父类：`AbstractQCloudCosObject`

## 概述

该接口的输入**不是请求头而是请求体 XML**（`POST /＜ObjectKey＞?select`），所以本类把
SQL 表达式、序列化配置、进度事件写成方法，并提供 `toXml` 直接产出请求体。
调用约定（不传=读取 / 传值=设置并返回 `$this`）见 `AbstractQCloudCosObject`。

```php
$select = (new QCloudCosSelectObjectContent())
->expression("SELECT * FROM COSObject WHERE _1 = '1'")
->inputSerialization(QCloudCosSelectObjectContent::SERIALIZATION_CSV)
->outputSerialization(["JSON" => ["Type" => "LINES"]]);

$xml = $select->toXml();
```

⚠️ 两个必须知道的点：
1. **响应不是普通 XML**：COS 返回的是**事件流分块数据**（含 Records / Stats / End 等事件），
需要按 event-stream 协议自己拆帧（客户端侧尚未实现 SELECT，见 [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)）；
2. `?select` 是**子资源** ⇒ 必须**同时**参与签名（`q-url-param-list=select`）并出现在请求 URL 上。

文档核对状态：XML 结构（`SelectRequest` / `Expression` / `ExpressionType` / `InputSerialization` /
`OutputSerialization` / `RequestProgress`）依据官方写法整理，**待与官方 SELECT Object Content 页面逐条核对**。

## 示例

```php
$select = (new QCloudCosSelectObjectContent())
->expression("SELECT * FROM COSObject WHERE _1 = '1'")
->inputSerialization(QCloudCosSelectObjectContent::SERIALIZATION_CSV)
->outputSerialization(["JSON" => ["Type" => "LINES"]]);

$xml = $select->toXml();
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `EXPRESSION_TYPE_SQL` | `"SQL"` | 表达式类型：SQL |
| `SERIALIZATION_CSV` | `["CSV" => ""]` | 序列化配置预设：CSV（无附加参数） |
| `SERIALIZATION_JSON_LINES` | `["JSON" => ["Type" => "LINES"]]` | 序列化配置预设：JSON（按行） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`expression()`](#expression) | Expression（**必选**：SQL 表达式） |
| [`expressionType()`](#expressiontype) | ExpressionType（表达式类型，默认 SQL） |
| [`inputSerialization()`](#inputserialization) | InputSerialization（输入序列化配置，数组） |
| [`outputSerialization()`](#outputserialization) | OutputSerialization（输出序列化配置，数组） |
| [`requestProgress()`](#requestprogress) | RequestProgress（是否返回进度事件） |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜SelectRequest＞…＜/SelectRequest＞`） |

### expression()

```php
public function expression($value = null)
```

Expression（**必选**：SQL 表达式）

表名固定为 `COSObject`，如 `SELECT * FROM COSObject WHERE _1 = '1'`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### expressionType()

```php
public function expressionType($value = null)
```

ExpressionType（表达式类型，默认 SQL）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### inputSerialization()

```php
public function inputSerialization($value = null)
```

InputSerialization（输入序列化配置，数组）

默认 `SERIALIZATION_CSV`；细配置示例：`["CSV" => ["FileHeaderInfo" => "USE"]]`、
`["CompressionType" => "GZIP", "CSV" => ""]`、`["JSON" => ["Type" => "LINES"]]`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `array|null` | `null` | 不传=读取 |

### outputSerialization()

```php
public function outputSerialization($value = null)
```

OutputSerialization（输出序列化配置，数组）

默认 `SERIALIZATION_CSV`；也可用 `SERIALIZATION_JSON_LINES`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `array|null` | `null` | 不传=读取 |

### requestProgress()

```php
public function requestProgress($value = null)
```

RequestProgress（是否返回进度事件）

`true` ⇒ XML 里加 `＜RequestProgress＞＜Enabled＞true＜/Enabled＞＜/RequestProgress＞`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `boolean|null` | `null` | 不传=读取（返回布尔或 null） |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜SelectRequest＞…＜/SelectRequest＞`）

用 `Arr::toXML` 拼：`Expression` / `ExpressionType` 逐值转义后写入，
两个序列化配置按调用方给的数组原样递归展开（与官方文档的 XML 结构一致）。
未设置 `Expression` 时返回空串。

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
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

