# Contract

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Contract`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Contract.php`

> 虚拟支付 - 签约与扣款

## 声明

```php
class Contract extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下订阅/签约扣款相关接口（接口前缀 /xpay）。

说明：本组接口请求体较复杂，统一通过 $data 透传，具体字段以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`querySubscribeContract()`](#querysubscribecontract) | 查询签约关系（POST /xpay/query_subscribe_contract） |
| [`sendSubscribePrePayment()`](#sendsubscribeprepayment) | 预通知扣款（POST /xpay/send_subscribe_pre_payment） |
| [`submitSubscribePayOrder()`](#submitsubscribepayorder) | 发起订阅扣款（POST /xpay/submit_subscribe_pay_order） |
| [`cancelSubscribeContract()`](#cancelsubscribecontract) | 商家解约（POST /xpay/cancel_subscribe_contract） |

### querySubscribeContract()

```php
public function querySubscribeContract($data = [])
```

查询签约关系（POST /xpay/query_subscribe_contract）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如 openid、contract_id 等） |

### sendSubscribePrePayment()

```php
public function sendSubscribePrePayment($data = [])
```

预通知扣款（POST /xpay/send_subscribe_pre_payment）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### submitSubscribePayOrder()

```php
public function submitSubscribePayOrder($data = [])
```

发起订阅扣款（POST /xpay/submit_subscribe_pay_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### cancelSubscribeContract()

```php
public function cancelSubscribeContract($data = [])
```

商家解约（POST /xpay/cancel_subscribe_contract）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

