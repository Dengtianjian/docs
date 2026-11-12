# WechatPayApi

`kernel\Modules\WechatPay\WechatPayApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/WechatPayApi.php`

> 微信支付接口客户端基类

## 声明

```php
class WechatPayApi extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

承载各版本接口客户端（[WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)、
`WechatPayV2` 等）共用的能力：身份信息（AppId、商户号）、
接口地址前缀、HTTP 客户端与请求方法。版本之间的差异（签名算法、报文格式）由子类实现
——例如 V3 使用 JSON 报文 + RSA 签名。

与微信模块 [WechatApi](/php/api/modules/wechat/wechat-api) 的分工一致：本类负责「怎么发请求」，
子类负责「发什么、怎么签」。

本类是客户端基类、不是门面：模块的静态入口见门面 `WechatPay`，
商户注册表见 `WechatPay`，商户凭证见 `WechatPayMerchant`。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$apiUrl` | `string|null` | protected | 接口基础地址前缀 |
| `$CURL` | `Curl` | protected | CURL 客户端实例，用于发起 HTTP 请求 |
| `$appId` | `string|null` | protected | 公众平台 AppId |
| `$merchantId` | `string|null` | protected | 微信支付商户号 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化微信支付类 |
| [`getJsonData()`](#getjsondata) | 获取并解析最近一次响应为数组 |

### __construct()

```php
public function __construct($appId, $merchantId)
```

实例化微信支付类

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string` | — | 公众平台 AppId |
| `$merchantId` | `string` | — | 微信支付平台商户号 |

### getJsonData()

```php
public function getJsonData()
```

获取并解析最近一次响应为数组

CURL 客户端在响应为 JSON 时已自动解析为关联数组，此时直接返回；否则再尝试按 JSON 解码。

## 非公开方法

**protected**

- `protected function generateTradeNo()` —— 生成单号
- `protected function generateNonceString()` —— 生成32位随机字符串
- `protected function get($uri, $query = [])` —— 发送 GET 请求到微信支付接口
- `protected function post($uri, $body = [], $query = [])` —— 发送 POST 请求到微信支付接口
- `protected function put($uri, $body = [], $query = [])` —— 发送 PUT 请求到微信支付接口
- `protected function delete($uri, $body = [], $query = [])` —— 发送 DELETE 请求到微信支付接口

## 同目录

- [WechatPay](/php/api/modules/wechatpay/wechat-pay)
- [WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant)
- [WechatPayProvider](/php/api/modules/wechatpay/wechat-pay-provider)

