# APP

`kernel\Modules\WechatPay\V3\Products\APP`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/Products/APP.php`

> 微信支付 - APP 支付

## 声明

```php
class APP extends WechatPayProductApi
```

父类：[WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)

## 概述

除下单外的一切接口（查单、关单、合单下单）都在父类 [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api) 中，
本类只实现 APP 独有的下单与调起参数签名；退款独立在
[WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)。

注意 APP 支付的调起签名规则与 JSAPI **不同**：待签串是 `appId\ntimestamp\nnoncestr\nprepayid\n`
（prepayid 不加 `prepay_id=` 前缀），且由**客户端**用相同规则验签后调起微信支付。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$product` | `string` | protected | 产品在接口路径中的标识 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | APP 下单 |

### order()

```php
public function order($outTradeNo, $total, $description = "", $periodSeconds = null, $attach = "", $goodsTag = "", $profitSharing = false, $supportFapiao = false, $currency = "CNY")
```

APP 下单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outTradeNo` | `string` | — | 商户系统内部订单号 |
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

- `protected function payParams($prepayId)` —— 把 prepay_id 签成 APP 客户端的调起参数

## 同目录

- [H5](/php/api/modules/wechatpay/v3/products/h5)
- [JSAPI](/php/api/modules/wechatpay/v3/products/jsapi)
- [MiniProgram](/php/api/modules/wechatpay/v3/products/mini-program)
- [Native](/php/api/modules/wechatpay/v3/products/native)

