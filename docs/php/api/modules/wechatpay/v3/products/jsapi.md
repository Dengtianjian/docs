# JSAPI

`kernel\Modules\WechatPay\V3\Products\JSAPI`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/Products/JSAPI.php`

> 微信支付 - JSAPI 支付（公众号支付）

## 声明

```php
class JSAPI extends WechatPayProductApi
```

父类：[WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)

## 概述

除下单外的一切接口（查单、关单、合单下单）都在父类 [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api) 中，
本类只实现 JSAPI 独有的下单与调起参数签名；退款独立在
[WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)。

小程序支付（`MiniProgram`）与 JSAPI 走的是同一个下单接口，只是客户端调起方式不同，
因此那边直接继承本类。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$product` | `string` | protected | 产品在接口路径中的标识 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | JSAPI 下单 |

### order()

```php
public function order($outTradeNo, $openId, $total, $description = "", $periodSeconds = null, $attach = "", $goodsTag = "", $profitSharing = false, $supportFapiao = false, $currency = "CNY")
```

JSAPI 下单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outTradeNo` | `string` | — | 商户系统内部订单号 |
| `$openId` | `string` | — | 支付者的用户标识（同 appid 下的 openid） |
| `$total` | `integer` | — | 订单总金额（分） |
| `$description` | `string` | `""` | 商品描述 |
| `$periodSeconds` | `integer|null` | `null` | 订单有效期（秒）；为 null 时默认 1 小时 |
| `$attach` | `string` | `""` | 附加数据，原样返回 |
| `$goodsTag` | `string` | `""` | 订单优惠标记 |
| `$profitSharing` | `boolean` | `false` | 是否为分账订单 |
| `$supportFapiao` | `boolean` | `false` | 电子发票入口开放标识 |
| `$currency` | `string` | `"CNY"` | 货币类型，默认 CNY |

## 非公开方法

**protected**

- `protected function payParams($prepayId)` —— 把 prepay_id 签成 JSAPI/小程序前端的调起参数

## 同目录

- [APP](/php/api/modules/wechatpay/v3/products/app)
- [H5](/php/api/modules/wechatpay/v3/products/h5)
- [MiniProgram](/php/api/modules/wechatpay/v3/products/mini-program)
- [Native](/php/api/modules/wechatpay/v3/products/native)

