# WechatPayCombineApi

`kernel\Modules\WechatPay\V3\WechatPayCombineApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayCombineApi.php`

> 微信支付 APIv3 合单支付公共接口

## 声明

```php
class WechatPayCombineApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

合单支付的下单按产品分路径（`WechatPayProductApi::combine`），
但下单之后的查单与关单对所有产品完全一样——只认合单商户订单号，路径里不带产品，
这与单笔支付侧 `WechatPayProductApi` 之于 [JSAPI](/php/api/modules/wechatpay/v3/products/jsapi)
的分工完全对称。

方法返回约定：成功返回微信响应数据（数组；关单这类无响应体的接口返回 true），失败返回 false，
错误信息见 getError()；判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`query()`](#query) | 合单查询订单 |
| [`close()`](#close) | 合单关闭订单 |

### query()

```php
public function query($combineOutTradeNo)
```

合单查询订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$combineOutTradeNo` | `string` | — | 合单商户订单号 |

### close()

```php
public function close($combineOutTradeNo)
```

合单关闭订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$combineOutTradeNo` | `string` | — | 合单商户订单号 |

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

