# StorageSignature

`kernel\Modules\Storage\StorageSignature`  ·  class

源码：`gstudio_kernel/Modules/Storage/StorageSignature.php`

> 文件访问签名器（仿腾讯云 COS 签名 v2 算法）

## 声明

```php
class StorageSignature extends BaseObject
```

父类：[BaseObject](/php/api/foundation/object/base-object)

## 概述

为私有文件 URL 提供「时效 + 防篡改」的授权能力，整体流程对齐 COS 的签名方案：
- 以密钥对 `KeyTime`（起始;结束）做 HMAC 得到 SignKey；
- 将 URL 参数 / 请求头按键名排序、编码后各自拼成字符串（url-param-list / header-list）；
- 以 `HTTP方法\n文件路径\n参数串\n头串[\naction]` 做 SHA1 得到 HttpString，再组装 StringToSign 做最终 HMAC 得到 Signature。

对外暴露两个入口：
- `createAuthorization`：签发方调用，生成授权参数字典（sign-algorithm / sign-time / key-time / header-list / signature / url-param-list，**带 action 时额外多一个同级参数 action**），由 Storage 拼到 URL 上；
- `verifyAuthorization`：验签方调用，用相同算法重算签名并比对。

关于 `action`（动作限定）：
- 它是一个与 `sign-algorithm` **同级**的授权参数，用于把签名限定到具体动作（如 preview / download / info），
避免"同一文件、同一 HTTP 方法"的签名被拿到别的端点复用；
- **只有签发与验签双方都带 action 时它才参与签名计算** —— 不带 action 时载荷与旧版逐字节一致，
历史签名继续有效；带上 action 的签名则会多一行，因此有/无 action 的签名互不通用；
- 验签侧 `matchAction` 支持传**字符串**（精确匹配，忽略大小写）或**数组**（允许集合，命中其一即可）。

注意：本类为通用 HMAC-SHA1 签名实现，本身不绑定具体云厂商；子类（如 QCloudCosSignture）可在其基础上补充 host / token 等字段。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $signAlgorithm` | `string` | `"sha1"` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$signatureKey` | `string|null` | protected | — |
| `$signHeader` | `array` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造签名器 |
| [`getSignAlgorithm()`](#getsignalgorithm) | 获取当前使用的签名哈希算法 |
| [`matchAction()`](#matchaction) | 判断「请求携带的 action」是否被允许 |
| [`createAuthorization()`](#createauthorization) | 制作授权信息（签发） |
| [`verifyAuthorization()`](#verifyauthorization) | 验证签名是否正确（验签） |

### __construct()

```php
public function __construct($signatureKey)
```

构造签名器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$signatureKey` | `string` | — | 签名密钥，用于 HMAC 加盐 |

### getSignAlgorithm()

```php
public static function getSignAlgorithm()
```

获取当前使用的签名哈希算法

### matchAction()

```php
public static function matchAction($expected, $actual)
```

判断「请求携带的 action」是否被允许

供验签方声明"本次请求允许哪些动作"，`$expected` 支持两种形态：
- **字符串**：与请求里的 action 完全一致（**忽略大小写**，与入签时的处理保持一致）才通过；
- **数组**（非关联数组）：请求里的 action 命中其一即通过；
- `null` / `""` / 空数组：**不做限制**（用于兼容不带 action 的历史签名）。

注意：本方法只管"允许不允许"，action 是否**参与签名计算**由调用方把它传给
`verifyAuthorization` 决定（否则限定动作形同虚设）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$expected` | `string|array|null` | — | 允许的 action（字符串或数组） |
| `$actual` | `string|null` | — | 请求携带的 action |

### createAuthorization()

```php
public function createAuthorization($fileKey, $urlParams = [], $headers = [], $expires = 600, $httpMethod = "get", $action = null)
```

制作授权信息（签发）

生成一组可直接拼到文件 URL 上的授权参数字典：
`sign-algorithm` / `sign-time` / `key-time` / `header-list` / `signature` / `url-param-list`；
**传了 $action 时额外返回一个同级参数 `action`**（不带则不返回，保持与旧版一致）。
其中 sign-time 与 key-time 为 `起始;结束`（当前时间起 $expires 秒内有效），
signature 由 `generateSignature` 计算，`url-param-list` 经 rawurlencode 编码。

注意：返回值是**关联数组**（供调用方自行并入 URL query），并非已拼接的字符串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键（路径） |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数 |
| `$headers` | `array` | `[]` | 参与签名的请求头 |
| `$expires` | `integer` | `600` | 有效期，秒级数值，默认 600 |
| `$httpMethod` | `string` | `"get"` | 请求方法，默认 get |
| `$action` | `string|null` | `null` | 动作标识，默认 null（不限定动作）；传入后写入授权参数并参与签名 |

### verifyAuthorization()

```php
public function verifyAuthorization($signature, $fileKey, $startTime, $endTime, $urlParams = [], $headers = [], $httpMethod = "get", $action = null)
```

验证签名是否正确（验签）

用与签发完全相同的参数与算法（`generateSignature`）重算签名，
再与传入的 $signature 做严格相等比对。任何参数（文件键 / 有效期 / 参数 / 头 / 方法 / action）
不一致都会导致验证失败。

注意：这里的 `$action` 必须是**请求实际携带的那个值**（不是允许集合）——
它只参与签名计算；"这个值允不允许"由调用方用 `matchAction` 自行判定
（见 `\kernel\Modules\Storage\StorageModule::verifySignature`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$signature` | `string` | — | 待验证的签名串 |
| `$fileKey` | `string` | — | 文件键（路径） |
| `$startTime` | `int` | — | 签名有效期起始时间（Unix 时间戳） |
| `$endTime` | `int` | — | 签名有效期结束时间（Unix 时间戳） |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数 |
| `$headers` | `array` | `[]` | 参与签名的请求头 |
| `$httpMethod` | `string` | `"get"` | 请求方法，默认 get |
| `$action` | `string|null` | `null` | 请求实际携带的 action，默认 null |

## 非公开方法

**protected**

- `protected function getObjectKeys($object)` —— 提取对象中的「键名」列表
- `protected function object2String($object, $skipKeys = [], $keyEncode = true)` —— 对象转字符串，每个键值对以 & 连接
- `protected function object2List($object, $skipKeys = [])` —— 对象转「键名=值」列表，并按键名排序
- `protected function generateSignature($fileKey, $startTime, $endTime, $urlParams = [], $headers = [], $httpMethod = "get", $action = null)` —— 生成签名（核心算法）

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [Storage](/php/api/modules/storage/storage)
- [StorageFile](/php/api/modules/storage/storage-file)
- [StorageModule](/php/api/modules/storage/storage-module)
- [StorageProvider](/php/api/modules/storage/storage-provider)
- [StorageURL](/php/api/modules/storage/storage-url)

