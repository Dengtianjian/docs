# WechatPayProductApi

`kernel\Modules\WechatPay\V3\WechatPayProductApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayProductApi.php`

> 微信支付 APIv3 支付产品基类

## 声明

```php
class WechatPayProductApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

APIv3 的下单接口按支付产品分路径（/v3/pay/transactions/jsapi|app|h5|native），
但**下单之后的接口对所有产品完全一样**：查单、关单只认商户订单号或微信支付订单号，
路径里不带产品。这些共用接口收在本类，
各产品类（[JSAPI](/php/api/modules/wechatpay/v3/products/jsapi) 等）继承它、只实现自己差异化的下单。

退款同样与支付产品无关（路径 /v3/refund/domestic/refunds 不带产品），
但已独立成 `WechatPayRefundApi`，不在本类。

合单下单同样按产品分路径（/v3/combine-transactions/{产品}），故 `combine` 也在本基类，
由子类声明的 `$product` 决定路径；而合单共用的查单/关单不属于任何单一产品，
收在 `WechatPayCombineApi`——与「产品下单 / 产品共用接口」的分工一致。

子类必须声明 `$product`，并提供自己的下单方法。

方法返回约定：成功返回微信响应数据（数组；关单这类无响应体的接口返回 true），失败返回 false，
错误信息见 getError()；判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$product` | `string|null` | protected | 产品在接口路径中的标识（jsapi / app / h5 / native），由子类声明 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`queryByOutTradeNo()`](#querybyouttradeno) | 查询订单（按商户订单号） |
| [`queryByTransactionId()`](#querybytransactionid) | 查询订单（按微信支付订单号） |
| [`close()`](#close) | 关闭订单 |
| [`combine()`](#combine) | 合单下单 |

### queryByOutTradeNo()

```php
public function queryByOutTradeNo($outTradeNo)
```

查询订单（按商户订单号）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outTradeNo` | `string` | — | 商户系统内部订单号 |

### queryByTransactionId()

```php
public function queryByTransactionId($transactionId)
```

查询订单（按微信支付订单号）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transactionId` | `string` | — | 微信支付订单号 |

### close()

```php
public function close($outTradeNo)
```

关闭订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outTradeNo` | `string` | — | 商户系统内部订单号 |

### combine()

```php
public function combine($combineOutTradeNo, $subOrders, $periodSeconds = null, $notifyUrl = null)
```

合单下单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$combineOutTradeNo` | `string` | — | 合单商户订单号 |
| `$subOrders` | `array` | — | 子单列表，每项为一个子单报文 |
| `$periodSeconds` | `integer|null` | `null` | 订单有效期（秒）；为 null 时默认 1 小时 |
| `$notifyUrl` | `string|null` | `null` | 支付结果回调地址；为 null 时取商户配置的 notifyUrl |

## 非公开方法

**protected**

- `protected function buildOrderBody($outTradeNo, $total, $description, $periodSeconds = null, $attach = "", $goodsTag = "", $profitSharing = false, $supportFapiao = false, $currency = "CNY")` —— 组装下单报文中各产品共有的字段
- `protected function expireTime($periodSeconds = null)` —— 计算订单过期时间

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

