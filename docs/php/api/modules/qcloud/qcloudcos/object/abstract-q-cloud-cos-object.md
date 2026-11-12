# AbstractQCloudCosObject

`kernel\Modules\QCloud\QCloudCos\Object\AbstractQCloudCosObject`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/AbstractQCloudCosObject.php`

> COS 对象操作的「输入容器」基类

## 声明

```php
class AbstractQCloudCosObject
```

## 概述

各操作（PutObject / GetObject / MultipartUpload…）的专用请求头、ACL 头、表单字段、请求体字段
都写成方法，统一遵循同一套约定：

- **不传值 = 读取**：`$obj->storageClass()` 返回当前值（未设置返回 null）
- **传值 = 设置**：`$obj->storageClass("STANDARD_IA")` 写入并返回 `$this`，可链式

实现要点：子类（或 trait）方法一行即可 —— `return $this->item("x-cos-storage-class", func_get_args());`。
用 `func_get_args()` 判断"有没有传参"，而不是 `$value === null` ⇒ **显式传 null/空串也算设置**，
不会与"读取"混淆。

每个子类通过 `all` 交出「已设置项」的字典（键名就是最终的头名/字段名/参数名），
交给请求层拼接；因此"没设就不发"是天然成立的，不需要额外判断。

## 能力分区（按 COS 文档的接口分类，各自独立成命名空间）

| 能力 | 位置 | 说明 |
|---|---|---|
| 容器本体 | 本类 | `item()` / `all()` / `isEmpty()` / `clear()` / `merge()` |
| **访问控制（ACL）** | [QCloudCosObjectAclTrait](/php/api/modules/qcloud/qcloudcos/object/acl/q-cloud-cos-object-acl-trait)（`Object\ACL`） | `acl()` / 四个 `grant*()` / 静态 `grantId()` |
| **对象标签** | [QCloudCosObjectTagTrait](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-object-tag-trait)（`Object\Tag`） | `tagging()` / `tag()` |
| 对象属性 / 元数据 / 加密 | 本类 | `storageClass()` / `forbidOverwrite()` / `meta()` / `metas()` / `allMetas()` / SSE 六个头 + `sse*()` |

两个能力用 **trait** 组合进来（PHP 单继承 ⇒ 需要跨类复用的能力只能用 trait），因此
**所有**输入容器都天然具备 ACL 与标签方法；不需要的容器不调用即可（"没设就不发"）。
ACL 预设常量留在本类：**PHP 7 的 trait 不能声明常量**。

## 与签名/请求的关系

配合 [QCloudCosSignture](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-signture) 使用时必须注意：
`x-cos-` 开头的头**一律参与签名**；常规头（`Cache-Control` / `Content-Type` / `Range` 等）
命中签名器白名单时也会入签 ⇒ 容器产出的内容必须**同时**用于「签名」与「真实请求」，两边逐字一致。

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `ACL_DEFAULT` | `"default"` | ACL：继承权限（默认） |
| `ACL_PRIVATE` | `"private"` | ACL：私有读写 |
| `ACL_PUBLIC_READ` | `"public-read"` | ACL：公有读私有写 |
| `STORAGE_STANDARD` | `"STANDARD"` | — |
| `STORAGE_STANDARD_IA` | `"STANDARD_IA"` | — |
| `STORAGE_ARCHIVE` | `"ARCHIVE"` | — |
| `STORAGE_DEEP_ARCHIVE` | `"DEEP_ARCHIVE"` | — |
| `STORAGE_MAZ_STANDARD` | `"MAZ_STANDARD"` | — |
| `STORAGE_MAZ_STANDARD_IA` | `"MAZ_STANDARD_IA"` | — |
| `STORAGE_MAZ_ARCHIVE` | `"MAZ_ARCHIVE"` | — |
| `STORAGE_INTELLIGENT_TIERING` | `"INTELLIGENT_TIERING"` | — |
| `STORAGE_MAZ_INTELLIGENT_TIERING` | `"MAZ_INTELLIGENT_TIERING"` | — |
| `DIRECTIVE_COPY` | `"Copy"` | 元数据/标签复制指令：沿用源对象 |
| `DIRECTIVE_REPLACED` | `"Replaced"` | 元数据/标签复制指令：以本次请求指定值替换 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$items` | `array` | protected | 已设置的项（头名/字段名 => 值） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`all()`](#all) | 取出全部已设置项（键名即最终的头名/字段名） |
| [`isEmpty()`](#isempty) | 是否一项都没设置 |
| [`clear()`](#clear) | 清空全部已设置项（复用同一实例做多次请求时必须调它，否则上次的值会泄漏到下次） |
| [`merge()`](#merge) | 批量并入原始键值（后写覆盖先写） |
| [`storageClass()`](#storageclass) | x-cos-storage-class（对象存储类型，默认 STANDARD） |
| [`forbidOverwrite()`](#forbidoverwrite) | x-cos-forbid-overwrite（未开版本控制的桶里是否禁止覆盖同名对象） |
| [`meta()`](#meta) | x-cos-meta-[后缀]（自定义元数据，单个键的读取/设置） |
| [`metas()`](#metas) | 批量设置自定义元数据 |
| [`allMetas()`](#allmetas) | 读取全部已设置的自定义元数据（后缀 => 值） |
| [`serverSideEncryption()`](#serversideencryption) | x-cos-server-side-encryption（服务端加密方式） |
| [`kmsKeyId()`](#kmskeyid) | x-cos-server-side-encryption-cos-kms-key-id（SSE-KMS 的 KMS 密钥 ID） |
| [`kmsContext()`](#kmscontext) | x-cos-server-side-encryption-context（SSE-KMS 的加密上下文，Base64） |
| [`customerAlgorithm()`](#customeralgorithm) | x-cos-server-side-encryption-customer-algorithm（SSE-C 算法，固定 AES256） |
| [`customerKey()`](#customerkey) | x-cos-server-side-encryption-customer-key（SSE-C 密钥，Base64） |
| [`customerKeyMD5()`](#customerkeymd5) | x-cos-server-side-encryption-customer-key-MD5（SSE-C 密钥 MD5，Base64） |
| [`sseCos()`](#ssecos) | 便捷：启用 SSE-COS（COS 托管密钥） |
| [`sseKms()`](#ssekms) | 便捷：启用 SSE-KMS（KMS 托管密钥） |
| [`sseCustomer()`](#ssecustomer) | 便捷：启用 SSE-C（客户自备密钥） |

### all()

```php
public function all()
```

取出全部已设置项（键名即最终的头名/字段名）

### isEmpty()

```php
public function isEmpty()
```

是否一项都没设置

### clear()

```php
public function clear()
```

清空全部已设置项（复用同一实例做多次请求时必须调它，否则上次的值会泄漏到下次）

### merge()

```php
public function merge(array $items)
```

批量并入原始键值（后写覆盖先写）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$items` | `array` | — | 键名 => 值 |

### storageClass()

```php
public function storageClass($value = null)
```

x-cos-storage-class（对象存储类型，默认 STANDARD）

取值见本类 `STORAGE_*` 常量；部分类型仅特定地域开放，MAZ 与智能分层需在桶上开启。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### forbidOverwrite()

```php
public function forbidOverwrite($value = null)
```

x-cos-forbid-overwrite（未开版本控制的桶里是否禁止覆盖同名对象）

`true` ⇒ 禁止覆盖（存在同名对象时返回 409 `FileAlreadyExists`）；不携带或 `false` ⇒ 覆盖。
**桶开启版本控制时该头无效**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `boolean|null` | `null` | 不传=读取（返回布尔或 null） |

### meta()

```php
public function meta($key, $value = null)
```

x-cos-meta-[后缀]（自定义元数据，单个键的读取/设置）

后缀规则（官方）：支持**减号 `-`、数字、小写字母 a-z**；大写会被转成小写；
**后缀不支持下划线 `_`**（元数据的「值」可以）；单条 ≤ 2KB。
本方法只做**小写化**，其余规则不校验（保持"纯容器"）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 元数据后缀（如 `via`） |
| `$value` | `string|null` | `null` | 传值=设置；只传 $key=读取 |

### metas()

```php
public function metas(array $metas)
```

批量设置自定义元数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$metas` | `array` | — | 后缀 => 值 |

### allMetas()

```php
public function allMetas()
```

读取全部已设置的自定义元数据（后缀 => 值）

### serverSideEncryption()

```php
public function serverSideEncryption($value = null)
```

x-cos-server-side-encryption（服务端加密方式）

SSE-COS 用 `AES256`（`sseCos`）；SSE-KMS 用 `cos/kms`（`sseKms`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### kmsKeyId()

```php
public function kmsKeyId($value = null)
```

x-cos-server-side-encryption-cos-kms-key-id（SSE-KMS 的 KMS 密钥 ID）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### kmsContext()

```php
public function kmsContext($value = null)
```

x-cos-server-side-encryption-context（SSE-KMS 的加密上下文，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | Base64 字符串；不传=读取 |

### customerAlgorithm()

```php
public function customerAlgorithm($value = null)
```

x-cos-server-side-encryption-customer-algorithm（SSE-C 算法，固定 AES256）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### customerKey()

```php
public function customerKey($value = null)
```

x-cos-server-side-encryption-customer-key（SSE-C 密钥，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### customerKeyMD5()

```php
public function customerKeyMD5($value = null)
```

x-cos-server-side-encryption-customer-key-MD5（SSE-C 密钥 MD5，Base64）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### sseCos()

```php
public function sseCos()
```

便捷：启用 SSE-COS（COS 托管密钥）

### sseKms()

```php
public function sseKms($keyId, $context = null)
```

便捷：启用 SSE-KMS（KMS 托管密钥）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keyId` | `string` | — | KMS 密钥 ID |
| `$context` | `string|null` | `null` | Base64 形式的加密上下文；不传则不带头 |

### sseCustomer()

```php
public function sseCustomer($key, $keyMD5)
```

便捷：启用 SSE-C（客户自备密钥）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | Base64 形式的密钥 |
| `$keyMD5` | `string` | — | Base64 形式的密钥 MD5 |

## 非公开方法

**protected**

- `protected function item($name, array $args)` —— get/set 通用实现（子类与各 trait 的方法一行调用）

## 同目录

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
- [QCloudCosSelectObjectContent](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-select-object-content)
- [QCloudCosUploadObject](/php/api/modules/qcloud/qcloudcos/object/q-cloud-cos-upload-object)

