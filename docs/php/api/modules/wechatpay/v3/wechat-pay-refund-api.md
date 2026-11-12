# WechatPayRefundApi

`kernel\Modules\WechatPay\V3\WechatPayRefundApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayRefundApi.php`

> 微信支付 APIv3 退款

## 声明

```php
class WechatPayRefundApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

对应微信支付的**退款产品**（/v3/refund/domestic/refunds*），官方该产品下共四个接口：
`apply` 申请退款 → `query` 查退款结果 → 若状态为 ABNORMAL（原路退款失败，
例如用户银行卡作废 / 冻结）再用 `applyAbnormal` 发起异常退款
（退到用户银行卡或商户侧银行账户）；剩余一个是退款结果通知回调，
由申请时传入的 notify_url 接收、报文解密用 `WechatPayV3Api::decryptNotifyData`，
本类不处理回调。

本类从 `WechatPayProductApi` 中抽出独立成类：退款请求路径不带支付产品，
任何产品下单的订单都用同一套退款接口（详见 `WechatPayProductApi` 的类注释），
支付分订单退款走的也是这两个接口——原订单标识传 transaction_id 即可，
取自查单结果 collection.details（见 `WechatPayScoreApi::query`）。

方法返回约定：成功返回微信响应数据（数组），失败返回 false，错误信息见 getError()；
判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`apply()`](#apply) | 申请退款（正常退款） |
| [`applyAbnormal()`](#applyabnormal) | 发起异常退款（正常退款走到 ABNORMAL 后的处理） |
| [`query()`](#query) | 查询单笔退款 |

### apply()

```php
public function apply($outRefundNo, $refundAmount, $totalAmount, $outTradeNo = null, $transactionId = null, $reason = "", $notifyUrl = null, $fundsAccount = null, $amountFrom = null, $goodsDetail = null)
```

申请退款（正常退款）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outRefundNo` | `string` | — | 商户退款单号（商户系统内部唯一，只能是数字、大小写字母、`_-|@`） |
| `$refundAmount` | `integer` | — | 退款金额（分），不能超过原订单支付金额 |
| `$totalAmount` | `integer` | — | 原订单金额（分） |
| `$outTradeNo` | `string|null` | `null` | 原商户订单号 |
| `$transactionId` | `string|null` | `null` | 原微信支付订单号 |
| `$reason` | `string` | `""` | 退款原因；部分退款且金额 ≤ 1 元时不在退款消息中体现 |
| `$notifyUrl` | `string|null` | `null` | 退款结果回调地址；为 null 时取商户配置的 notifyUrl |
| `$fundsAccount` | `string|null` | `null` | 退款资金来源：AVAILABLE（仅旧资金流商户适用，从可用余额出资， |
| `$amountFrom` | `array|null` | `null` | 退款出资账户及金额，每项含 account（AVAILABLE 可用余额 / |
| `$goodsDetail` | `array|null` | `null` | 退款商品，每项含 merchant_goods_id、unit_price、refund_amount、 |

### applyAbnormal()

```php
public function applyAbnormal($refundId, $outRefundNo, $type, $bankType = null, $bankAccount = null, $realName = null)
```

发起异常退款（正常退款走到 ABNORMAL 后的处理）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$refundId` | `string` | — | 微信支付退款单号（申请退款时返回的 refund_id，非商户退款单号） |
| `$outRefundNo` | `string` | — | 商户退款单号（申请退款时传入的那个） |
| `$type` | `string` | — | 异常退款处理方式：USER_BANK_CARD（退款到用户银行卡）/ |
| `$bankType` | `string|null` | `null` | 开户银行标识，退到用户时必传 |
| `$bankAccount` | `string|null` | `null` | 收款银行卡号（已加密），退到用户时必传 |
| `$realName` | `string|null` | `null` | 收款用户姓名（已加密），退到用户时必传 |

### query()

```php
public function query($outRefundNo)
```

查询单笔退款

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outRefundNo` | `string` | — | 商户退款单号 |

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

