# XPay

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\XPay`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/XPay.php`

> 虚拟支付（聚合类）

## 声明

```php
class XPay extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「虚拟支付」分类下的接口，按子域拆分为多个子类（接口前缀均为 /xpay）：
- 代币：`Currency`
- 道具：`Goods`
- 订单与账单：`Order`
- 资金与提现：`Funds`
- 签约与扣款：`Contract`
- 投诉处理：`Complaint`
- 文件上传：`File`

使用示例：

```php
$mp->xPay()->currency()->queryUserBalance($openid, ["env" => 0]);
$mp->xPay()->order()->queryWithdrawOrder(["withdraw_no" => $no]);
```

## 示例

```php
$mp->xPay()->currency()->queryUserBalance($openid, ["env" => 0]);
$mp->xPay()->order()->queryWithdrawOrder(["withdraw_no" => $no]);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`currency()`](#currency) | 代币相关接口 |
| [`goods()`](#goods) | 道具相关接口 |
| [`order()`](#order) | 订单与账单相关接口 |
| [`funds()`](#funds) | 资金与提现相关接口 |
| [`contract()`](#contract) | 签约与扣款相关接口 |
| [`complaint()`](#complaint) | 投诉处理相关接口 |
| [`file()`](#file) | 文件上传相关接口 |

### currency()

```php
public function currency()
```

代币相关接口

### goods()

```php
public function goods()
```

道具相关接口

### order()

```php
public function order()
```

订单与账单相关接口

### funds()

```php
public function funds()
```

资金与提现相关接口

### contract()

```php
public function contract()
```

签约与扣款相关接口

### complaint()

```php
public function complaint()
```

投诉处理相关接口

### file()

```php
public function file()
```

文件上传相关接口

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)

