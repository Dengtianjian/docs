# QCloudAccount

`kernel\Modules\QCloud\QCloudAccount`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudAccount.php`

> 腾讯云账号

## 声明

```php
class QCloudAccount extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

自身即腾讯云账号（SecretId / SecretKey，以及临时凭据必须携带的 SecurityToken），
同时是本模块客户端的**聚合入口**：`api` / `faceId` / `cos` 各自返回
对应业务的客户端对象（按需实例化，每次调用返回新实例）。账号上的凭据是本模块各业务对象
（`QCloudApi` 请求客户端、`QCloudFaceId`、QCloudCos 下的客户端与存储磁盘）
取用凭据的**唯一来源**。

与 [WechatAccount](/php/api/modules/wechat/wechat-account)、[WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant)
对称；「聚合入口」这一角色对应 [WechatMiniProgram](/php/api/modules/wechat/miniprogram/wechat-mini-program)
（微信那边因有公众号 / 小程序两种账号类型而把入口单独拆成薄基类，本模块只有一种账号，
故合并在本类上）。账号负责身份与身份之上的业务入口，**任何请求实现都不在本类**
（见 `QCloudApi`）；存储桶与地域也不属于账号 —— 桶/地域属于存储磁盘的配置，
由调用方另行传入（见 [QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage) 与 `cos`）。

`name` 为账号自定义标识（如 `main` / `cos`）：它**不参与签名**，但它是本模块账号注册表的键 ——
`QCloud::addAccount` 以该值登记，`QCloud::account` 等取用入口按该值查找，
因此要交给模块管理的账号必须有非空标识（腾讯云没有像微信 appId、支付商户号那样的业务自然键，故由调用方自定义）。

已聚合的入口：
- 通用请求客户端（不限定云产品）：api()
- 人脸核身：faceId()
- 对象存储：cos()

使用示例：

```php
$account = new QCloudAccount($secretId, $secretKey, "main");
$account->name();            // "main"
$account->secretId();        // 读取 SecretId
$account->secretKey();       // 读取 SecretKey
$account->securityToken();   // 临时凭据的会话令牌；永久凭据时为 null

$account->faceId()->bankCard2EVerification($name, $bankCard);
$account->cos("ap-guangzhou", "bkt-1250000000")->upload("a/b.png", "/tmp/a.png");
$account->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);

// 或交给模块注册表统一管理（门面见 `QCloud`，模块见 `QCloud`）：
QCloud::addAccount($account);
QCloud::account("main")->faceId()->bankCard2EVerification($name, $bankCard);
```

## 示例

```php
$account = new QCloudAccount($secretId, $secretKey, "main");
$account->name();            // "main"
$account->secretId();        // 读取 SecretId
$account->secretKey();       // 读取 SecretKey
$account->securityToken();   // 临时凭据的会话令牌；永久凭据时为 null

$account->faceId()->bankCard2EVerification($name, $bankCard);
$account->cos("ap-guangzhou", "bkt-1250000000")->upload("a/b.png", "/tmp/a.png");
$account->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);

// 或交给模块注册表统一管理（门面见 {@see QCloud}，模块见 {@see QCloud}）：
QCloud::addAccount($account);
QCloud::account("main")->faceId()->bankCard2EVerification($name, $bankCard);
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | protected | 账号标识 |
| `$secretId` | `string|null` | protected | 云 API 密钥 SecretId |
| `$secretKey` | `string|null` | protected | 云 API 密钥 SecretKey |
| `$securityToken` | `string|null` | protected | 临时凭据的会话令牌（SecurityToken） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化腾讯云账号 |
| [`name()`](#name) | 读写一体：获取或设置账号标识 |
| [`secretId()`](#secretid) | 读写一体：获取或设置 SecretId |
| [`secretKey()`](#secretkey) | 读写一体：获取或设置 SecretKey |
| [`securityToken()`](#securitytoken) | 读写一体：获取或设置临时凭据的会话令牌 |
| [`api()`](#api) | 请求客户端（通用，不限定云产品） |
| [`faceId()`](#faceid) | 人脸核身客户端 |
| [`cos()`](#cos) | 对象存储（COS）客户端 |

### __construct()

```php
public function __construct($secretId, $secretKey, $name = null, $securityToken = null)
```

初始化腾讯云账号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$secretId` | `string|null` | — | 云 API 密钥 SecretId |
| `$secretKey` | `string|null` | — | 云 API 密钥 SecretKey（**不要**输出到日志/响应） |
| `$name` | `string|null` | `null` | 账号标识；不参与签名，但要交给模块注册表管理时不可为空 |
| `$securityToken` | `string|null` | `null` | 临时凭据的会话令牌；永久凭据传 null |

### name()

```php
public function name($data = null)
```

读写一体：获取或设置账号标识

依据调用时是否传入参数区分读写：
- 传入参数：设置标识，并返回当前实例以支持链式调用；
- 不传参数：返回当前标识。

```php
$account->name("cos");   // 设置，返回 $account
$account->name();        // 读取，返回 "cos"
```

```php
$account->name("cos");   // 设置，返回 $account
$account->name();        // 读取，返回 "cos"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的账号标识 |

### secretId()

```php
public function secretId($data = null)
```

读写一体：获取或设置 SecretId

依据调用时是否传入参数区分读写：
- 传入参数：设置 SecretId，并返回当前实例以支持链式调用；
- 不传参数：返回当前已设置的 SecretId。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 SecretId |

### secretKey()

```php
public function secretKey($data = null)
```

读写一体：获取或设置 SecretKey

依据调用时是否传入参数区分读写：
- 传入参数：设置 SecretKey，并返回当前实例以支持链式调用；
- 不传参数：返回当前已设置的 SecretKey。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 SecretKey |

### securityToken()

```php
public function securityToken($data = null)
```

读写一体：获取或设置临时凭据的会话令牌

依据调用时是否传入参数区分读写：
- 传入参数：设置令牌，并返回当前实例以支持链式调用；传 null 表示回到永久凭据；
- 不传参数：返回当前令牌。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 SecurityToken |

### api()

```php
public function api($service = null)
```

请求客户端（通用，不限定云产品）

每次调用返回新的客户端实例，客户端自己持有本账号；需要临时凭据时在返回的实例上
自行调用 `QCloudApi::tmpCredentials`。

```php
$account->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);
```

```php
$account->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$service` | `string|null` | `null` | 操作的服务名称（决定请求域名，如 faceid）；null 时由调用方自行指定 host |

### faceId()

```php
public function faceId()
```

人脸核身客户端

### cos()

```php
public function cos($region, $bucket, $host = null, $driver = null)
```

对象存储（COS）客户端

存储桶与地域**不属于账号**（账号只管凭据），故由调用方传入；
参数顺序与 [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client) 保持一致：**region 在前、bucket 在后**。

注意：存储磁盘（[QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage)）不走本方法 ——
它构造时自己接收账号与桶/地域，并由 [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client) 直接建客户端。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$region` | `string` | — | 存储桶所在地区，如 ap-guangzhou |
| `$bucket` | `string` | — | 存储桶名称，形如 bucketName-appid |
| `$host` | `string|null` | `null` | 桶域名；不传按 `QCloudCosClient::HOST_PATTERN` 拼 |
| `$driver` | `string|null` | `null` | 强制驱动（`QCloudCosClient::DRIVER_SDK` / `QCloudCosClient::DRIVER_HTTP`）；不传自动检测 |

## 同目录

- [QCloud](/php/api/modules/qcloud/q-cloud)
- [QCloudApi](/php/api/modules/qcloud/q-cloud-api)
- [QCloudFaceId](/php/api/modules/qcloud/q-cloud-face-id)
- [QCloudProvider](/php/api/modules/qcloud/q-cloud-provider)

