# Native

`kernel\Modules\WechatPay\V3\Products\Native`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/Products/Native.php`

> 微信支付 - Native 支付

## 声明

```php
class Native extends WechatPayProductApi
```

父类：[WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)

## 概述

除下单外的一切接口（查单、关单、合单下单）都在父类
[WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api) 中，退款独立在
[WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)。

Native 支付下单只需把返回的 `code_url` 生成二维码供用户扫码，不需要再签调起参数，
因此本类不重写任何签名逻辑。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$product` | `string` | protected | 产品在接口路径中的标识 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | Native 下单 |

### order()

```php
public function order($outTradeNo, $total, $description = "", $periodSeconds = null, $attach = "", $goodsTag = "", $profitSharing = false, $supportFapiao = false, $currency = "CNY")
```

Native 下单

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

## 同目录

- [APP](/php/api/modules/wechatpay/v3/products/app)
- [H5](/php/api/modules/wechatpay/v3/products/h5)
- [JSAPI](/php/api/modules/wechatpay/v3/products/jsapi)
- [MiniProgram](/php/api/modules/wechatpay/v3/products/mini-program)

