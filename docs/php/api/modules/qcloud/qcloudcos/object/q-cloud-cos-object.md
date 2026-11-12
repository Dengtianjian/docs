# QCloudCosObject

`kernel\Modules\QCloud\QCloudCos\Object\QCloudCosObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/QCloudCosObject.php`

> 一个「存储对象」：实例即某个对象键，可以对它做各种操作

## 声明

```php
class QCloudCosObject extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

本目录其它类都是「某一步的参数容器」（`QCloudCosPutObject` 描述 PUT Object 的头、
`QCloudCosMultipartUpload` 编排分块上传…）。本类换了个角度：**它本身就是那个对象** ——
持有一个对象键（以及它的元信息），然后把各操作的参数容器**聚合**到自己身上，
并能按操作名产出「该发什么」（`plan`）。

```php
$object = new QCloudCosObject("images/a.png", "mybucket-1250000000", "ap-guangzhou");

// ① 直接拿某个操作的容器设参数（同一操作反复取到的是同一个实例）
$object->put()->contentType("image/png")->acl("public-read");
$object->get()->range("bytes=0-1023");

// ② 按操作名产出请求计划
$steps = $object->plan("put", "/tmp/a.png");     // → [PUT Object 一步]
$steps = $object->plan("get");                   // → [GET Object 一步]
$steps = $object->plan("upload", "/tmp/big.zip");// → 自动按大小选简单/分块

// ③ 把 HEAD/GET 的响应头回填进来，之后可直接读元信息
$object->fill($responseHeaders);
$object->size();   // Content-Length
$object->etag();   // ETag
```

## ⚠️ 与同目录其它类一致：**不发请求、不做签名**

它产出的是「每一步该发什么」（`method`/`path`/`params`/`headers`/`body`/`successStatuses`）。
其中 `params` 是**参与签名的 URL 参数**（子资源如 `?restore`/`?select`/`?acl`/`?tagging`），
与 `?delete` 同一套机制 —— 必须**同时**进签名与真实 URL。
真正发送由 `\kernel\Modules\QCloud\QCloudCos\QCloudCosClient::execute` 负责；接线即把每步交给它。

`bucket` / `region` 是**可选**的：只在需要自动拼 `x-cos-copy-source`（复制时指向本对象）时才用得上。

文档核对状态：**待核对**（各操作的请求形态沿用对应容器类里的说明；首次接入对真实桶复核）。

## 示例

```php
$object = new QCloudCosObject("images/a.png", "mybucket-1250000000", "ap-guangzhou");

// ① 直接拿某个操作的容器设参数（同一操作反复取到的是同一个实例）
$object->put()->contentType("image/png")->acl("public-read");
$object->get()->range("bytes=0-1023");

// ② 按操作名产出请求计划
$steps = $object->plan("put", "/tmp/a.png");     // → [PUT Object 一步]
$steps = $object->plan("get");                   // → [GET Object 一步]
$steps = $object->plan("upload", "/tmp/big.zip");// → 自动按大小选简单/分块

// ③ 把 HEAD/GET 的响应头回填进来，之后可直接读元信息
$object->fill($responseHeaders);
$object->size();   // Content-Length
$object->etag();   // ETag
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | protected | — |
| `$lastOperation` | `string|null` | protected | — |
| `$bucket` | `string|null` | protected | — |
| `$region` | `string|null` | protected | — |
| `$attributes` | `array` | protected | — |
| `$containers` | `array` | protected | — |
| `$executor` | `object|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`executor()`](#executor) | 执行器（不传=读取，传值=设置） |
| [`key()`](#key) | 对象键（不传=读取，传值=设置并返回 `$this`） |
| [`bucket()`](#bucket) | 桶名（可选；不传=读取，传值=设置） |
| [`region()`](#region) | 地域（可选；不传=读取，传值=设置） |
| [`path()`](#path) | 对象键编码后的路径（按段 `rawurlencode` + 前导 `/`） |
| [`source()`](#source) | 本对象的 `x-cos-copy-source` 值（复制时作为源） |
| [`fill()`](#fill) | 用响应头回填元信息（HEAD Object / GET Object 的响应头） |
| [`size()`](#size) | 对象大小（来自 `Content-Length`；不传=读取，传值=设置） |
| [`etag()`](#etag) | ETag（来自 `ETag`） |
| [`lastModified()`](#lastmodified) | 最后修改时间（来自 `Last-Modified`） |
| [`contentType()`](#contenttype) | Content-Type |
| [`storageClass()`](#storageclass) | 存储类型（来自 `x-cos-storage-class`） |
| [`meta()`](#meta) | 单个自定义元数据（`x-cos-meta-*`，读取/设置） |
| [`metas()`](#metas) | 全部自定义元数据（后缀 => 值） |
| [`info()`](#info) | 已回填的全部元信息（不含 `metas`） |
| [`put()`](#put) | PUT Object（简单上传）的容器 |
| [`copy()`](#copy) | PUT Object - Copy 的容器 |
| [`post()`](#post) | POST Object（表单上传）的容器 |
| [`get()`](#get) | GET Object 的容器 |
| [`head()`](#head) | HEAD Object 的容器 |
| [`delete()`](#delete) | DELETE Object 的容器（该接口按现行文档无专用请求头） |
| [`options()`](#options) | OPTIONS Object（CORS 预检）的容器 |
| [`restore()`](#restore) | POST Object restore（解冻）的容器 |
| [`select()`](#select) | SELECT Object Content 的容器 |
| [`acl()`](#acl) | PUT Object acl（写 ACL）的容器 |
| [`tagging()`](#tagging) | PUT Object tagging（写标签）的容器 |
| [`multipart()`](#multipart) | 分块上传的编排器（键与本类同步） |
| [`upload()`](#upload) | 「上传对象」调度器（按大小自动选简单/分块，键与本类同步） |
| [`lastOperation()`](#lastoperation) | 最近一次取用的操作名（`get()` / `put()` …） |
| [`run()`](#run) | **执行**某个操作（本类唯一的"发请求"入口） |
| [`operations()`](#operations) | `plan` 支持的操作名 |
| [`plan()`](#plan) | 产出某个操作的请求计划（**不发请求**） |

### __construct()

```php
public function __construct($objectKey = null, $bucket = null, $region = null, $executor = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectKey` | `string|null` | `null` | 对象键 |
| `$bucket` | `string|null` | `null` | 桶名（可选；用于自动拼 `x-cos-copy-source`） |
| `$region` | `string|null` | `null` | 地域（可选） |
| `$executor` | `object|null` | `null` | 执行器（QCloudCosClient，可选）；绑了就能 `->get()->run()` |

### executor()

```php
public function executor($value = null)
```

执行器（不传=读取，传值=设置）

只有**绑定了执行器**（`QCloudCosClient`），`run` 才能真正发请求；
未绑定时 `run` 会记录错误态并返回 `false`。

各操作访问器（`get()` / `put()` …）**无论绑没绑**都返回参数容器（只负责配置），不会变。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `object|null` | `null` | 不传=读取 |

### key()

```php
public function key($value = null)
```

对象键（不传=读取，传值=设置并返回 `$this`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### bucket()

```php
public function bucket($value = null)
```

桶名（可选；不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### region()

```php
public function region($value = null)
```

地域（可选；不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### path()

```php
public function path()
```

对象键编码后的路径（按段 `rawurlencode` + 前导 `/`）

### source()

```php
public function source()
```

本对象的 `x-cos-copy-source` 值（复制时作为源）

需要 `bucket` 与 `region` 都已设置，否则返回 null。

### fill()

```php
public function fill(array $headers)
```

用响应头回填元信息（HEAD Object / GET Object 的响应头）

头名**大小写不敏感**；`x-cos-meta-*` 会自动收进 `metas`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$headers` | `array` | — | 响应头（头名 => 值） |

### size()

```php
public function size($value = null)
```

对象大小（来自 `Content-Length`；不传=读取，传值=设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `integer|null` | `null` | 不传=读取 |

### etag()

```php
public function etag($value = null)
```

ETag（来自 `ETag`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### lastModified()

```php
public function lastModified($value = null)
```

最后修改时间（来自 `Last-Modified`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### contentType()

```php
public function contentType($value = null)
```

Content-Type

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### storageClass()

```php
public function storageClass($value = null)
```

存储类型（来自 `x-cos-storage-class`）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### meta()

```php
public function meta($key, $value = null)
```

单个自定义元数据（`x-cos-meta-*`，读取/设置）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 元数据后缀 |
| `$value` | `string|null` | `null` | 传值=设置；只传 key=读取 |

### metas()

```php
public function metas()
```

全部自定义元数据（后缀 => 值）

### info()

```php
public function info()
```

已回填的全部元信息（不含 `metas`）

### put()

```php
public function put()
```

PUT Object（简单上传）的容器

### copy()

```php
public function copy()
```

PUT Object - Copy 的容器

### post()

```php
public function post()
```

POST Object（表单上传）的容器

### get()

```php
public function get()
```

GET Object 的容器

### head()

```php
public function head()
```

HEAD Object 的容器

### delete()

```php
public function delete()
```

DELETE Object 的容器（该接口按现行文档无专用请求头）

### options()

```php
public function options()
```

OPTIONS Object（CORS 预检）的容器

### restore()

```php
public function restore()
```

POST Object restore（解冻）的容器

### select()

```php
public function select()
```

SELECT Object Content 的容器

### acl()

```php
public function acl()
```

PUT Object acl（写 ACL）的容器

读取 ACL 用 `GET ?acl`，对应的类是 `Object\ACL\QCloudCosGetObjectAcl`（本类不聚合，
因为「读」没有请求参数）。

### tagging()

```php
public function tagging()
```

PUT Object tagging（写标签）的容器

读/删标签分别是 `Object\Tag\QCloudCosGetObjectTagging` / `QCloudCosDeleteObjectTagging`
（都没有请求参数，故本类不聚合）。

### multipart()

```php
public function multipart()
```

分块上传的编排器（键与本类同步）

### upload()

```php
public function upload()
```

「上传对象」调度器（按大小自动选简单/分块，键与本类同步）

### lastOperation()

```php
public function lastOperation()
```

最近一次取用的操作名（`get()` / `put()` …）

取操作容器（如 `$object->get()`）时会记下它 ⇒ 之后 `run` 不传操作名就执行这个。

### run()

```php
public function run($operation = null, $argument = null, $partSize = QCloudCosMultipartUpload::DEFAULT_PART_SIZE)
```

**执行**某个操作（本类唯一的"发请求"入口）

约定：**取操作容器 = 配置**（`get()` / `put()` … 返回的容器只用来设参数），**`run()` = 执行**。

```php
$object = $cos->object("3.png");
$object->get()->range("bytes=0-9");     // 配置（容器）
$result = $object->run();               // 执行**最后取用的**操作（这里是 get）

$result = $object->run("get");          // 也可以显式指定操作名
$ok     = $object->put()->run("/tmp/a.png");   // ← 注意：put() 返回的是容器，run() 在句柄上
```

返回值语义（失败一律 `false`）：
- `get` / `select` ⇒ 响应体（内容字符串）
- `head` / `options` ⇒ 响应头数组
- 其余（`put` / `delete` / `copy` / `restore` / `acl` / `tagging` / `upload` / `multipart`）⇒ `true`

失败时用 `break` 记录错误态并返回 `false` ⇒ 调用方可用 `isError()` /
`getErrorCode()` / `getErrorMessage()` / `getStatusCode()` / `getErrorDetails()` 读详情
（均来自 [AbilityBaseObject](/php/api/foundation/object/ability-base-object)，本类继承它，因此也具备 `forwardBreak`）。

```php
$object = $cos->object("3.png");
$object->get()->range("bytes=0-9");     // 配置（容器）
$result = $object->run();               // 执行**最后取用的**操作（这里是 get）

$result = $object->run("get");          // 也可以显式指定操作名
$ok     = $object->put()->run("/tmp/a.png");   // ← 注意：put() 返回的是容器，run() 在句柄上
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$operation` | `string|null` | `null` | 操作名（见 `operations`）；不传则用 `lastOperation` |
| `$argument` | `string|null` | `null` | 随操作而异（put/upload/multipart 为本地文件；copy 为目标键） |
| `$partSize` | `integer` | `QCloudCosMultipartUpload::DEFAULT_PART_SIZE` | 分块大小（分块类操作生效） |

### operations()

```php
public function operations()
```

`plan` 支持的操作名

### plan()

```php
public function plan($operation, $argument = null, $partSize = QCloudCosMultipartUpload::DEFAULT_PART_SIZE)
```

产出某个操作的请求计划（**不发请求**）

每一步含 `phase / method / path / params / headers / body / successStatuses / note`（分块类
另见 `QCloudCosMultipartUpload::plan()`）。`params` 是**参与签名的 URL 参数**。

`$argument` 的用途随操作而定：
- `put` / `upload` / `multipart`：本地文件路径（必填）
- `copy`：目标对象键（不传则复制到本对象自身路径）
- 其余：不需要

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$operation` | `string` | — | 操作名（见 `operations`） |
| `$argument` | `string|null` | `null` | 随操作而异的参数 |
| `$partSize` | `integer` | `QCloudCosMultipartUpload::DEFAULT_PART_SIZE` | 分块大小（仅 `upload` / `multipart` 生效） |

可能抛出：

- `\InvalidArgumentException` 操作名不支持（或分块类对文件的校验失败）

## 非公开方法

**protected**

- `protected function attribute($name, array $args)` —— 通用元信息读写（不传=读取，传值=设置）
- `protected function container($name, $shortClass, $subNamespace = "")` —— 取（并缓存）某个操作容器
- `protected static function encodePath($objectKey)` —— 对象键编码（按段 `rawurlencode` + 前导 `/`，与存储层 `encodeObjectName()` 同一套规则）

## 同目录

- [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)
- [QCloudCosDeleteMultipleObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-multiple-objects)
- [QCloudCosDeleteObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-delete-object)
- [QCloudCosGetObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-get-object)
- [QCloudCosHeadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-head-object)
- [QCloudCosObjects](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-objects)
- [QCloudCosOptionsObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-options-object)
- [QCloudCosPostObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object)
- [QCloudCosPostObjectRestore](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-post-object-restore)
- [QCloudCosPutObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object)
- [QCloudCosPutObjectCopy](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-put-object-copy)
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

