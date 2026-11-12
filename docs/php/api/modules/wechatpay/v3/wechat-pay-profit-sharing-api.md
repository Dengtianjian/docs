# WechatPayProfitSharingApi

`kernel\Modules\WechatPay\V3\WechatPayProfitSharingApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayProfitSharingApi.php`

> 微信支付 APIv3 分账

## 声明

```php
class WechatPayProfitSharingApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

覆盖分账的完整流程：请求分账 → 查分账结果 / 查剩余待分金额 → 解冻剩余资金；
以及分账回退（请求回退、查回退结果）、接收方管理（添加/删除）、分账单申请。

前提：下单时须在报文中带 `settle_info.profit_sharing = true`（见
`WechatPayProductApi::buildOrderBody` 的 $profitSharing 参数），否则分账请求会被驳回。

方法返回约定：成功返回微信响应数据（数组），失败返回 false，错误信息见 getError()；
判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | 请求分账 |
| [`queryOrder()`](#queryorder) | 查询分账结果 |
| [`queryAmounts()`](#queryamounts) | 查询剩余待分金额 |
| [`unfreeze()`](#unfreeze) | 解冻剩余资金 |
| [`returnOrder()`](#returnorder) | 请求分账回退 |
| [`queryReturnOrder()`](#queryreturnorder) | 查询分账回退结果 |
| [`addReceiver()`](#addreceiver) | 添加分账接收方 |
| [`deleteReceiver()`](#deletereceiver) | 删除分账接收方 |
| [`bill()`](#bill) | 申请分账账单 |

### order()

```php
public function order($transactionId, $outOrderNo, $receivers, $unfreezeUnsplit = false)
```

请求分账

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transactionId` | `string` | — | 原支付订单的微信支付订单号 |
| `$outOrderNo` | `string` | — | 商户系统内部的分账单号，同一分账单号多次请求等同一次 |
| `$receivers` | `array` | — | 分账接收方列表，每项由微信约定字段组成： |
| `$unfreezeUnsplit` | `boolean` | `false` | true 时剩余未分账金额解冻回分账方；false 时不解冻，可再次分账 |

### queryOrder()

```php
public function queryOrder($outOrderNo, $transactionId)
```

查询分账结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户分账单号 |
| `$transactionId` | `string` | — | 原支付订单的微信支付订单号（微信要求必传） |

### queryAmounts()

```php
public function queryAmounts($transactionId)
```

查询剩余待分金额

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transactionId` | `string` | — | 原支付订单的微信支付订单号 |

### unfreeze()

```php
public function unfreeze($transactionId, $outOrderNo, $description = "")
```

解冻剩余资金

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transactionId` | `string` | — | 原支付订单的微信支付订单号 |
| `$outOrderNo` | `string` | — | 商户分账单号（与原分账单号一致） |
| `$description` | `string` | `""` | 解冻说明 |

### returnOrder()

```php
public function returnOrder($outOrderNo, $outReturnNo, $returnMchid, $amount, $description = "")
```

请求分账回退

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 原分账单的商户分账单号 |
| `$outReturnNo` | `string` | — | 商户回退单号，商户系统内部唯一 |
| `$returnMchid` | `string` | — | 回退方商户号（实际出资退款的商户号） |
| `$amount` | `integer` | — | 回退金额（分） |
| `$description` | `string` | `""` | 回退原因 |

### queryReturnOrder()

```php
public function queryReturnOrder($outReturnNo, $outOrderNo)
```

查询分账回退结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outReturnNo` | `string` | — | 商户回退单号 |
| `$outOrderNo` | `string` | — | 原分账单的商户分账单号（微信要求必传） |

### addReceiver()

```php
public function addReceiver($type, $account, $name = null, $relationType = null)
```

添加分账接收方

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 接收方类型：MERCHANT_ID / PERSONAL_OPENID / PERSONAL_SUB_OPENID |
| `$account` | `string` | — | 接收方账号（商户号或 openid） |
| `$name` | `string|null` | `null` | 接收方姓名/商户全称（已加密；非必填，视类型而定） |
| `$relationType` | `string|null` | `null` | 与分账方的关系类型，如 SERVICE_PROVIDER、STORE、STAFF 等 |

### deleteReceiver()

```php
public function deleteReceiver($type, $account)
```

删除分账接收方

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 接收方类型：MERCHANT_ID / PERSONAL_OPENID / PERSONAL_SUB_OPENID |
| `$account` | `string` | — | 接收方账号（商户号或 openid） |

### bill()

```php
public function bill($billDate, $tarType = null)
```

申请分账账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$billDate` | `string` | — | 账单日期，格式 yyyy-MM-DD |
| `$tarType` | `string|null` | `null` | 压缩类型，传 GZIP 时下载地址返回的是压缩包；默认不压缩 |

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

