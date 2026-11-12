# QCloudCosObjects

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosObjects`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosObjects.php`

> 桶级操作入口：持有 bucket / region，**按传入的对象名去操作**

## 声明

```php
class QCloudCosObjects
```

## 概述

与 `QCloudCosObject` 的区别：后者是「一个实例 = 一个对象」（绑定键），
本类是「一个实例 = 一个桶」（**不绑定任何对象**），每次操作都靠传入对象名 ——
适合"一次处理很多对象"的场景（批量删、列举、按名字搬运）。

```php
$objects = new QCloudCosObjects("bkt-1250000000", "ap-guangzhou");

$objects->upload("images/a.png", "/tmp/a.png");      // 自动按大小选简单/分块
$objects->download("images/a.png", "bytes=0-1023");  // 取片段
$objects->copy("a.png", "backup/a.png");             // 自动补 x-cos-copy-source
$objects->move("a.png", "archive/a.png");            // 复制 + 删源（COS 无原生 move）
$objects->listObjects("images/", ["max-keys" => 100]);
$objects->delete("images/a.png");
$objects->exists("images/a.png");
$objects->metadata("images/a.png");
$objects->restore("cold.zip", 7, "Expedited");

$objects->objectUrl("images/a.png");    // 真算出可访问地址（无需签名）
$objects->presignedUrl("images/a.png"); // 给了签名器 ⇒ 真算出完整签名 URL
```

## ⚠️ 只产出计划，不发请求

每个操作方法返回的是**步骤数组**（`phase/method/path/params/headers/body/successStatuses/note`），
不是执行结果。只有两个 URL 方法是"真算"的（纯字符串/签名计算，**不涉及 HTTP**）：
- `objectUrl`：拼接可访问地址（公共读对象可直接用）；
- `presignedUrl`：**传入签名器**时算出完整签名 URL；没传签名器时返回"待签参数"，
交给调用方自己的签名器处理。

`params` 里的都是**参与签名的 URL 参数**（子资源如 `?restore`、业务参数如 `prefix`/`max-keys`），
必须**同时**进签名与真实 URL。

文档核对状态：**待核对**（各操作的请求形态沿用对应容器类的说明；首次接入对真实桶复核）。

## 示例

```php
$objects = new QCloudCosObjects("bkt-1250000000", "ap-guangzhou");

$objects->upload("images/a.png", "/tmp/a.png");      // 自动按大小选简单/分块
$objects->download("images/a.png", "bytes=0-1023");  // 取片段
$objects->copy("a.png", "backup/a.png");             // 自动补 x-cos-copy-source
$objects->move("a.png", "archive/a.png");            // 复制 + 删源（COS 无原生 move）
$objects->listObjects("images/", ["max-keys" => 100]);
$objects->delete("images/a.png");
$objects->exists("images/a.png");
$objects->metadata("images/a.png");
$objects->restore("cold.zip", 7, "Expedited");

$objects->objectUrl("images/a.png");    // 真算出可访问地址（无需签名）
$objects->presignedUrl("images/a.png"); // 给了签名器 ⇒ 真算出完整签名 URL
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `HOST_PATTERN` | `"https://%s.cos.%s.myqcloud.com"` | 默认域名格式（HTTPS） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$bucket` | `string|null` | protected | — |
| `$region` | `string|null` | protected | — |
| `$host` | `string|null` | protected | — |
| `$signer` | `QCloudCosSignture|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`bucket()`](#bucket) | 桶名（不传=读取，传值=设置） |
| [`region()`](#region) | 地域（不传=读取，传值=设置） |
| [`host()`](#host) | 桶域名（不传=读取，传值=设置） |
| [`signer()`](#signer) | 签名器（不传=读取，传值=设置） |
| [`path()`](#path) | 对象键编码后的路径（按段 `rawurlencode` + 前导 `/`） |
| [`source()`](#source) | 拼出 `x-cos-copy-source` 需要的值（**不含**协议头） |
| [`upload()`](#upload) | 上传对象：按文件大小自动选**简单上传**或**分块上传** |
| [`download()`](#download) | 下载对象（GET Object） |
| [`copy()`](#copy) | 复制对象（PUT Object - Copy）—— 自动补 `x-cos-copy-source` |
| [`move()`](#move) | 移动对象 = **复制 + 删除源**（COS 没有原生的 move） |
| [`delete()`](#delete) | 删除对象（DELETE Object） |
| [`exists()`](#exists) | 判断对象是否存在（HEAD Object） |
| [`metadata()`](#metadata) | 查询对象元数据（HEAD Object）—— 元信息在**响应头**里 |
| [`listObjects()`](#listobjects) | 列举对象（GET Bucket，**桶级**，不是某个对象） |
| [`restore()`](#restore) | 恢复归档对象（POST Object restore） |
| [`objectUrl()`](#objecturl) | 对象的可访问地址（**真算**；公共读对象可直接使用） |
| [`presignedUrl()`](#presignedurl) | 生成预签名 URL（**真算**，不需要发请求） |

### __construct()

```php
public function __construct($bucket, $region, $host = null, $signer = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$bucket` | `string` | — | 桶名（含 APPID，如 `bkt-1250000000`） |
| `$region` | `string` | — | 地域（如 `ap-guangzhou`） |
| `$host` | `string|null` | `null` | 桶域名；不传则按 `HOST_PATTERN` 拼 |
| `$signer` | `QCloudCosSignture|null` | `null` | 签名器（可选，用于生成预签名 URL） |

### bucket()

```php
public function bucket($value = null)
```

桶名（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### region()

```php
public function region($value = null)
```

地域（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### host()

```php
public function host($value = null)
```

桶域名（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### signer()

```php
public function signer($value = null)
```

签名器（不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `QCloudCosSignture|null` | `null` | 不传=读取 |

### path()

```php
public function path($objectName)
```

对象键编码后的路径（按段 `rawurlencode` + 前导 `/`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 原始对象键 |

### source()

```php
public function source($objectName)
```

拼出 `x-cos-copy-source` 需要的值（**不含**协议头）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### upload()

```php
public function upload($objectName, $localFilePath, array $headers = [], $partSize = QCloudCosMultipartUpload::DEFAULT_PART_SIZE)
```

上传对象：按文件大小自动选**简单上传**或**分块上传**

委托 `QCloudCosUploadObject`（它会按大小决策）；`$headers` 会并入简单上传的
请求头（如 `x-cos-acl` / `Content-Type`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$localFilePath` | `string` | — | 本地文件路径 |
| `$headers` | `array` | `[]` | 额外的请求头（仅简单上传路线生效） |
| `$partSize` | `integer` | `QCloudCosMultipartUpload::DEFAULT_PART_SIZE` | 分块大小（分块路线生效） |

可能抛出：

- `\InvalidArgumentException` 文件不存在/不可读、块大小非法（同 {@see QCloudCosUploadObject）}

### download()

```php
public function download($objectName, $range = null, array $headers = [])
```

下载对象（GET Object）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$range` | `string|null` | `null` | HTTP Range，如 `bytes=0-1023`；不传取整个对象 |
| `$headers` | `array` | `[]` | 额外的请求头（如 `If-Match`、`response-content-type` 等） |

### copy()

```php
public function copy($sourceObjectName, $destinationObjectName, array $headers = [])
```

复制对象（PUT Object - Copy）—— 自动补 `x-cos-copy-source`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourceObjectName` | `string` | — | 源对象键 |
| `$destinationObjectName` | `string` | — | 目标对象键 |
| `$headers` | `array` | `[]` | 额外的请求头（如 `x-cos-metadata-directive`；已给的 `x-cos-copy-source` 不会被覆盖） |

### move()

```php
public function move($sourceObjectName, $destinationObjectName, array $headers = [])
```

移动对象 = **复制 + 删除源**（COS 没有原生的 move）

⚠️ 这不是原子操作：两步之间失败会留下"已复制但未删源"的中间态，
调用方需按返回的 `phase` 逐步执行并自行处理失败（如回滚：删掉目标）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourceObjectName` | `string` | — | 源对象键 |
| `$destinationObjectName` | `string` | — | 目标对象键 |
| `$headers` | `array` | `[]` | 复制那一步的额外请求头 |

### delete()

```php
public function delete($objectName)
```

删除对象（DELETE Object）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### exists()

```php
public function exists($objectName)
```

判断对象是否存在（HEAD Object）

判定口径：**只有 200 才算存在**；403（没权限）与 404（不存在）都算"不存在"。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### metadata()

```php
public function metadata($objectName)
```

查询对象元数据（HEAD Object）—— 元信息在**响应头**里

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### listObjects()

```php
public function listObjects($prefix = null, array $params = [])
```

列举对象（GET Bucket，**桶级**，不是某个对象）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string|null` | `null` | 前缀过滤（如 `images/`） |
| `$params` | `array` | `[]` | 其它 URL 参数：`delimiter` / `marker` / `max-keys` / `encoding-type` |

### restore()

```php
public function restore($objectName, $days = 30, $tier = "Standard")
```

恢复归档对象（POST Object restore）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$days` | `integer` | `30` | 解冻后副本保留天数 |
| `$tier` | `string` | `"Standard"` | 解冻优先级：`Expedited` / `Standard` / `Bulk` |

### objectUrl()

```php
public function objectUrl($objectName)
```

对象的可访问地址（**真算**；公共读对象可直接使用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |

### presignedUrl()

```php
public function presignedUrl($objectName, $expires = 1800, $httpMethod = "get", array $urlParams = [], array $headers = [])
```

生成预签名 URL（**真算**，不需要发请求）

- **传了签名器**（构造时或 `signer` 设置）⇒ 返回完整签名 URL 字符串；
- **没传签名器** ⇒ 返回"待签参数"数组（`path`/`method`/`expires`/`urlParams`/`headers`/`baseUrl`），
交给调用方自己的签名器算出 `q-*` 后拼到 `baseUrl` 上。

注意：签名里 `$httpMethod` 与实际使用方式**必须一致**，否则 COS 判签名不符。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象键 |
| `$expires` | `integer` | `1800` | 有效期（秒） |
| `$httpMethod` | `string` | `"get"` | 入签的 HTTP 方法 |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数（子资源/业务参数） |
| `$headers` | `array` | `[]` | 参与签名的请求头 |

## 非公开方法

**protected**

- `protected static function encodePath($objectName)` —— 对象键编码（按段 `rawurlencode` + 前导 `/`，与存储层 `encodeObjectName()` 同一套规则）

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-object)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

