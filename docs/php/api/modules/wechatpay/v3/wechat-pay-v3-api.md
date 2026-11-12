# WechatPayV3Api

`kernel\Modules\WechatPay\V3\WechatPayV3Api`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayV3Api.php`

> 微信支付 APIv3 请求基类

## 声明

```php
class WechatPayV3Api extends WechatPayApi
```

父类：[WechatPayApi](/php/api/modules/wechatpay/wechat-pay-api)

## 概述

V3 侧各业务接口类的公共基类，与微信模块中「某一侧的 API 基类」
（[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)、
[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)）定位一致：
继承 [WechatPayApi](/php/api/modules/wechatpay/wechat-pay-api) 的「怎么发请求」，在其之上补足 V3 专属的「怎么签、怎么发」——
接口基础地址、JSON 报文约定、RSA(SHA256) 签名、Authorization 鉴权头注入，
multipart 上传（图片凭证），以及回调通知的签名验证与密文解密。

与 V2 的差异（表单/XML 报文 + MD5 签名）不落在这里，由
`\kernel\Modules\WechatPay\WechatPayV2` 自行承担，避免把版本差异混进公共基类。

商户身份与凭证统一由 [WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant) 承载（≡ 微信模块的 [WechatAccount](/php/api/modules/wechat/wechat-account)），
本类只持有其引用、不重复保存 APIv3 密钥、私钥路径、证书序列号与回调地址。

使用示例：

```php
$merchant = new WechatPayMerchant($appId, $mchId);
$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$api = new WechatPayV3Api($merchant);
$api->merchant();  // 取回商户（凭证取用入口）
```

## 示例

```php
$merchant = new WechatPayMerchant($appId, $mchId);
$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$api = new WechatPayV3Api($merchant);
$api->merchant();  // 取回商户（凭证取用入口）
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `AUTH_TAG_LENGTH_BYTE` | `16` | 数据密文最小长度 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$apiUrl` | `string` | protected | 接口基础地址 |
| `$merchant` | `WechatPayMerchant` | protected | 微信支付商户 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化 APIv3 请求基类 |
| [`merchant()`](#merchant) | 获取当前微信支付商户 |
| [`decryptNotifyData()`](#decryptnotifydata) | 解密结果通知的加密数据 |
| [`generateSign()`](#generatesign) | 生成请求签名 |
| [`generateAuthorizationValue()`](#generateauthorizationvalue) | 生成 Authorization 头的取值 |
| [`addAuthorizationToHeader()`](#addauthorizationtoheader) | 将签名写入后续请求的 Authorization 头 |

### __construct()

```php
public function __construct(WechatPayMerchant $merchant)
```

初始化 APIv3 请求基类

身份信息与凭证均取自 $merchant，本类只按 V3 约定配置复用的 CURL 客户端
（JSON 报文 + 固定请求头）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchant` | `WechatPayMerchant` | — | 微信支付商户 |

### merchant()

```php
public function merchant()
```

获取当前微信支付商户

凭证取用入口，与 `\kernel\Modules\Wechat\WechatApi::account` 的分工一致。

### decryptNotifyData()

```php
public function decryptNotifyData($associatedData, $nonceStr, $ciphertext)
```

解密结果通知的加密数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$associatedData` | `string` | — | 附加数据 |
| `$nonceStr` | `string` | — | 随机串 |
| `$ciphertext` | `string` | — | 数据密文,Base64编码后的开启/停用结果数据密文 |

### generateSign()

```php
public function generateSign($uri, $httpRequestMethod = "POST", $time, $nonceStr, $bodyJson)
```

生成请求签名

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 请求的绝对路径（含 /v3 前缀，如 /v3/pay/transactions/jsapi） |
| `$httpRequestMethod` | `string` | `"POST"` | 请求方法，如 POST |
| `$time` | `int|string` | — | 时间戳（秒） |
| `$nonceStr` | `string` | — | 随机串 |
| `$bodyJson` | `string` | — | 请求报文的 JSON 字符串；GET 请求传空字符串 |

### generateAuthorizationValue()

```php
public function generateAuthorizationValue($nonceStr, $time, $sign)
```

生成 Authorization 头的取值

注意返回的是取值本身，不含 `WECHATPAY2-SHA256-RSA2048 ` 认证类型前缀，
拼接由 `addAuthorizationToHeader` 完成。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$nonceStr` | `string` | — | 随机串 |
| `$time` | `int|string` | — | 时间戳（秒） |
| `$sign` | `string` | — | 签名（`generateSign` 的结果） |

### addAuthorizationToHeader()

```php
public function addAuthorizationToHeader($nonceStr, $time, $sign)
```

将签名写入后续请求的 Authorization 头

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$nonceStr` | `string` | — | 随机串 |
| `$time` | `int|string` | — | 时间戳（秒） |
| `$sign` | `string` | — | 签名（`generateSign` 的结果） |

## 非公开方法

**protected**

- `protected function signMessage($message)` —— 用商户私钥对一段原文做 SHA256withRSA 签名
- `protected function request($httpMethod, $uri, $body = [], $query = [], $parseJson = true)` —— 按 APIv3 约定发起一次已签名的请求
- `protected function requestUpload($uri, $meta, $filePath, $fileFieldName = "file", $fields = [])` —— 上传文件（multipart/form-data）
- `protected function handleResponse($response, $parseJson = true)` —— 判定响应结果
- `protected function relativeUri($uri)` —— 把含 /v3 前缀的完整路径转成相对 `$apiUrl` 的路径

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)

