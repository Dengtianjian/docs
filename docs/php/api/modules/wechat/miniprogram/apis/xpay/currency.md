# Currency

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Currency`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Currency.php`

> 虚拟支付 - 代币

## 声明

```php
class Currency extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下与代币（游戏币/虚拟币）相关的接口（接口前缀 /xpay）。

说明：$extra 用于透传接口的附加字段（如 env、user_ip、appid 等），具体以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`queryUserBalance()`](#queryuserbalance) | 查询代币余额（POST /xpay/query_user_balance） |
| [`currencyPay()`](#currencypay) | 扣减代币（POST /xpay/currency_pay） |
| [`queryOrder()`](#queryorder) | 查询创建的订单（POST /xpay/query_order） |
| [`cancelCurrencyPay()`](#cancelcurrencypay) | 代币支付退款（POST /xpay/cancel_currency_pay） |
| [`presentCurrency()`](#presentcurrency) | 代币赠送（POST /xpay/present_currency） |
| [`notifyProvideGoods()`](#notifyprovidegoods) | 通知已发货完成（POST /xpay/notify_provide_goods） |

### queryUserBalance()

```php
public function queryUserBalance($openid, $extra = [])
```

查询代币余额（POST /xpay/query_user_balance）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$extra` | `array` | `[]` | 附加参数，如 ["env" => 0, "user_ip" => "1.2.3.4"] |

### currencyPay()

```php
public function currencyPay($openid, $amount, $billNo, $extra = [])
```

扣减代币（POST /xpay/currency_pay）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$amount` | `int` | — | 扣减数量 |
| `$billNo` | `string` | — | 业务订单号，需保证唯一 |
| `$extra` | `array` | `[]` | 附加参数，如 ["env" => 0] |

### queryOrder()

```php
public function queryOrder($openid, $billNo, $extra = [])
```

查询创建的订单（POST /xpay/query_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$billNo` | `string` | — | 业务订单号 |
| `$extra` | `array` | `[]` | 附加参数，以官方文档为准 |

### cancelCurrencyPay()

```php
public function cancelCurrencyPay($openid, $billNo, $extra = [])
```

代币支付退款（POST /xpay/cancel_currency_pay）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$billNo` | `string` | — | 业务订单号 |
| `$extra` | `array` | `[]` | 附加参数，以官方文档为准 |

### presentCurrency()

```php
public function presentCurrency($openid, $amount, $billNo, $extra = [])
```

代币赠送（POST /xpay/present_currency）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$amount` | `int` | — | 赠送数量 |
| `$billNo` | `string` | — | 业务订单号，需保证唯一 |
| `$extra` | `array` | `[]` | 附加参数，以官方文档为准 |

### notifyProvideGoods()

```php
public function notifyProvideGoods($data = [])
```

通知已发货完成（POST /xpay/notify_provide_goods）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如 openid、bill_no、order_id 等） |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

