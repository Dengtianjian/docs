# QCloudCosSignture

`kernel\Modules\QCloud\QCloudCos\QCloudCosSignture`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/QCloudCosSignture.php`

> 腾讯云 COS 请求签名器（q-sign-* 系列，COS 签名 v5）

## 声明

```php
class QCloudCosSignture
```

## 概述

**不继承任何类**：本类是**纯计算**（凭据 + 请求要素 → 签名参数），不参与 HTTP 发送，
所以只自带 4 个属性（`secretId` / `secretKey` / `securityToken` / `host`）。
说明：此前继承过旧的 `QCloud` 门面（该门面已删除），它构造会 `new Curl()`，还会带来
`get()` / `post()` / `generateAuthorizaion()`（那是 TC3-HMAC，与 COS 的 `q-*` 是两套算法）
等与 COS 签名无关的方法 —— 本类**一个都没用到**，故已解耦（无任何类型依赖，构造签名不变）。

产出
`q-sign-algorithm` / `q-ak` / `q-sign-time` / `q-key-time` / `q-header-list` /
`q-signature` / `q-url-param-list` 这组查询参数，由调用方拼到 URL 上，用于私有对象访问或前端直传。

与 [StorageSignature](/php/api/modules/storage/storage-signature)（`sign-*` 系列，站内文件路由用）
是两套**并行**实现 ── `object2List()` / `object2String()` / `getObjectKeys()` 三个工具方法在两边各有一份。

构造参数中：`$host` 非空 ⇒ 把 host 头纳入签名（见 `$signHost`）；
`$securityToken` 非空 ⇒ 返回值会多一个 `x-cos-security-token`（临时密钥场景）。

注意：类名里的 `Signture` 是 **Signature 的拼写笔误**（历史遗留，涉及文件名与多处引用，本次未改）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$secretId` | `string|null` | protected | — |
| `$secretKey` | `string|null` | protected | — |
| `$securityToken` | `string|null` | protected | — |
| `$host` | `string|null` | protected | — |
| `$signHost` | `boolean` | protected | 是否把 host 头纳入签名 |
| `$signHeader` | `array` | protected | 允许参与签名的头部白名单（键名小写） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 COS 签名器 |
| [`createAuthorization()`](#createauthorization) | 生成 COS 请求签名（授权参数） |

### __construct()

```php
public function __construct($secretId, $secretKey, $host = null, $securityToken = null)
```

构造 COS 签名器

凭据（`$secretId` / `$secretKey`）与 `$host` / `$securityToken` 全部由本类自己保存
（**不再**交给父类 —— 本类已不继承任何类）。

⚠️ **构造签名已简化**：原先第 3/4 参是 `$region` / `$bucket`，但 COS 签名**根本不需要**它们
（要签的路径由 `createAuthorization` 的 `$objectName` 提供），属于死参数 ⇒ 已移除。
现签名：`__construct($secretId, $secretKey, $host = null, $securityToken = null)`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$secretId` | `string` | — | 云 API SecretId |
| `$secretKey` | `string` | — | 云 API SecretKey |
| `$host` | `string|null` | `null` | 请求 Host；非空时把 host 头纳入签名，默认 null（不签 host） |
| `$securityToken` | `string|null` | `null` | 临时密钥的会话令牌；非空时返回值带 x-cos-security-token |

### createAuthorization()

```php
public function createAuthorization($objectName, $urlParams = [], $headers = [], $expires = 1800, $httpMethod = "get")
```

生成 COS 请求签名（授权参数）

流程：
1. `KeyTime = "{起始};{结束}"`（起始 = 当前时间，结束 = 起始 + `$expires`），
`SignKey = HMAC-SHA1(KeyTime, secretKey)`；
2. `$signHost` 为真且调用方未传 `host` 头时，补一个 `host`（取本实例的 host）；
3. URL 参数与请求头分别经 `object2List` 排序编码 ⇒ 参数串 / 头串 / 键名串；
头部先筛一遍：`x-cos-` 开头的一律参与签名，其余必须在 `$signHeader` 白名单里，否则跳过；
4. `HttpString = "方法\n路径\n参数串\n头串\n"`（参数串与头串转小写、路径 `urldecode`），
`StringToSign = "sha1\nKeyTime\nSHA1(HttpString)\n"`，`Signature = HMAC-SHA1(StringToSign, SignKey)`；
5. 组装 `q-sign-algorithm` / `q-ak` / `q-sign-time` / `q-key-time` / `q-header-list` /
`q-signature` / `q-url-param-list`；传了 `securityToken` 时再加 `x-cos-security-token`；
6. 最后把调用方传入的 `$urlParams` 逐个 `urlencode` **并入**返回值 —— 所以返回数组同时含
签名参数与原始业务参数。

实现现状（未改，勿与注释混淆）：
- `$signAlgorithm` 在方法内**硬编码** `"sha1"`；
- `$urlParamKeys` / `$headerKeys` 赋值后未被使用（见 `getObjectKeys`）；
- 编码方式混用：键名 `urlencode`、值 `rawurlencode`、第 6 步的业务参数 `urlencode`。

主要调用方：`QCloudCOSStorage::createAuthorization`（以及 `QCloudCosClient::presignedUrl`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$objectName` | `string` | — | 对象路径，以 `/` 开头 |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数（同时会并入返回值） |
| `$headers` | `array` | `[]` | 参与签名的请求头 |
| `$expires` | `integer` | `1800` | 签名有效期（秒），默认 1800 |
| `$httpMethod` | `string` | `"get"` | 请求方法，默认 get（内部转小写） |

## 非公开方法

**protected**

- `protected function getObjectKeys($object)` —— 取出对象数组的「键名」列表
- `protected function object2String($object, $skipKeys = [], $keyEncode = true)` —— 对象转「键=值&键=值」字符串
- `protected function object2List($object, $skipKeys = [])` —— 对象转「键名 => 键名=值」列表，并按键名排序

## 同目录

- [QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage)
- [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)

