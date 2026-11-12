# WechatPayV3

`kernel\Modules\WechatPay\V3\WechatPayV3`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayV3.php`

> 微信支付 APIv3（聚合入口）

## 声明

```php
class WechatPayV3 extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

自身即 V3 请求基类（`WechatPayV3Api`），同时是所有 V3 接口对象的取用入口：
每个方法返回对应产品或领域的接口对象（按需实例化，每次调用返回新实例），
与微信模块 [WechatOfficialAccount](/php/api/modules/wechat/officialaccount/wechat-official-account) 的聚合方式一致。

已聚合的入口：
- 支付产品：jsapi()、app()、h5()、native()、miniProgram()
—— 各产品对象继承 `WechatPayProductApi`，既有本产品下单，也有查单/关单等通用接口
- 合单：combine() —— 合单查单/关单；合单下单在各产品对象上（`WechatPayProductApi::combine`）
- 账单：bill()
- 退款：refund() —— 与支付产品无关，独立成 `WechatPayRefundApi`
- 分账：profitSharing()
- 商家转账：transfer()
- 微信支付分：score()
- 消费者投诉：complaint()

商户身份与凭证由 [WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant) 在构造时注入，
例如 `new WechatPayV3($merchant)`。

使用示例：

```php
$pay = new WechatPayV3($merchant);

$jsapi = $pay->jsapi();                        // 保留实例：失败时错误信息记在它身上
$params = $jsapi->order($outTradeNo, $openId, 100, "测试商品"); // 成功=调起参数，失败=false
if ($params === false) {
$jsapi->getErrorMessage();
}

$jsapi->queryByOutTradeNo($outTradeNo);        // 查单
$pay->refund()->apply($outRefundNo, 100, 100, $outTradeNo);  // 申请退款
$pay->combine()->query($combineOutTradeNo);    // 合单查单
$pay->bill()->tradeBill("2026-10-01");         // 申请交易账单
$pay->profitSharing()->order($transactionId, $outOrderNo, $receivers);
$pay->transfer()->transfer($outBillNo, $openId, 100, "新会员奖励", "1001");
$pay->score()->order($outOrderNo, $serviceId, "充电宝租借", $riskFund);
$pay->complaint()->queryComplaints("2026-10-01", "2026-10-11");
```

## 示例

```php
$pay = new WechatPayV3($merchant);

$jsapi = $pay->jsapi();                        // 保留实例：失败时错误信息记在它身上
$params = $jsapi->order($outTradeNo, $openId, 100, "测试商品"); // 成功=调起参数，失败=false
if ($params === false) {
$jsapi->getErrorMessage();
}

$jsapi->queryByOutTradeNo($outTradeNo);        // 查单
$pay->refund()->apply($outRefundNo, 100, 100, $outTradeNo);  // 申请退款
$pay->combine()->query($combineOutTradeNo);    // 合单查单
$pay->bill()->tradeBill("2026-10-01");         // 申请交易账单
$pay->profitSharing()->order($transactionId, $outOrderNo, $receivers);
$pay->transfer()->transfer($outBillNo, $openId, 100, "新会员奖励", "1001");
$pay->score()->order($outOrderNo, $serviceId, "充电宝租借", $riskFund);
$pay->complaint()->queryComplaints("2026-10-01", "2026-10-11");
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`jsapi()`](#jsapi) | JSAPI 支付（公众号支付） |
| [`app()`](#app) | APP 支付 |
| [`h5()`](#h5) | H5 支付 |
| [`native()`](#native) | Native 支付 |
| [`miniProgram()`](#miniprogram) | 小程序支付 |
| [`combine()`](#combine) | 合单支付（合单查询订单、合单关闭订单） |
| [`bill()`](#bill) | 账单（申请交易账单、申请资金账单、下载账单） |
| [`refund()`](#refund) | 退款（申请退款、查询单笔退款、发起异常退款） |
| [`profitSharing()`](#profitsharing) | 分账 |
| [`transfer()`](#transfer) | 商家转账（新版） |
| [`score()`](#score) | 微信支付分（服务订单创建、完结、查单、催收扣款等） |
| [`complaint()`](#complaint) | 消费者投诉（消费者投诉 2.0：查询、回复、反馈处理完成、回调地址管理等） |

### jsapi()

```php
public function jsapi()
```

JSAPI 支付（公众号支付）

### app()

```php
public function app()
```

APP 支付

### h5()

```php
public function h5()
```

H5 支付

### native()

```php
public function native()
```

Native 支付

### miniProgram()

```php
public function miniProgram()
```

小程序支付

与 JSAPI 是同一个下单接口，差别只在客户端调起方式，见 [MiniProgram](/php/api/modules/wechatpay/v3/products/mini-program)。

### combine()

```php
public function combine()
```

合单支付（合单查询订单、合单关闭订单）

合单下单不在这里，在各产品对象上（如 `$pay->jsapi()->combine(...)`）。

### bill()

```php
public function bill()
```

账单（申请交易账单、申请资金账单、下载账单）

### refund()

```php
public function refund()
```

退款（申请退款、查询单笔退款、发起异常退款）

退款与支付产品无关：请求路径不带产品，任何产品下单的订单都用同一套接口，
支付分订单退款走的也是它，故不挂在各产品对象上。

### profitSharing()

```php
public function profitSharing()
```

分账

### transfer()

```php
public function transfer()
```

商家转账（新版）

### score()

```php
public function score()
```

微信支付分（服务订单创建、完结、查单、催收扣款等）

### complaint()

```php
public function complaint()
```

消费者投诉（消费者投诉 2.0：查询、回复、反馈处理完成、回调地址管理等）

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

