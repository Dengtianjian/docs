# Funds

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Funds`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Funds.php`

> 虚拟支付 - 资金与提现

## 声明

```php
class Funds extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下广告金、账户余额、提现相关接口（接口前缀 /xpay）。

说明：本组接口请求体较复杂，统一通过 $data 透传，具体字段以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`queryTransferAccount()`](#querytransferaccount) | 查询广告金充值账户（POST /xpay/query_transfer_account） |
| [`queryAdverFunds()`](#queryadverfunds) | 查询广告金发放记录（POST /xpay/query_adver_funds） |
| [`createFundsBill()`](#createfundsbill) | 充值广告金（POST /xpay/create_funds_bill） |
| [`bindTransferAccount()`](#bindtransferaccount) | 绑定广告金充值账户（POST /xpay/bind_transfer_accout） |
| [`queryFundsBill()`](#queryfundsbill) | 查询广告金充值记录（POST /xpay/query_funds_bill） |
| [`queryRecoverBill()`](#queryrecoverbill) | 查询广告金回收记录（POST /xpay/query_recover_bill） |
| [`queryBizBalance()`](#querybizbalance) | 查询商家账户可提现余额（POST /xpay/query_biz_balance） |
| [`createWithdrawOrder()`](#createwithdraworder) | 创建提现单（POST /xpay/create_withdraw_order） |
| [`queryWithdrawOrder()`](#querywithdraworder) | 查询提现单（POST /xpay/query_withdraw_order） |

### queryTransferAccount()

```php
public function queryTransferAccount($data = [])
```

查询广告金充值账户（POST /xpay/query_transfer_account）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryAdverFunds()

```php
public function queryAdverFunds($data = [])
```

查询广告金发放记录（POST /xpay/query_adver_funds）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### createFundsBill()

```php
public function createFundsBill($data = [])
```

充值广告金（POST /xpay/create_funds_bill）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### bindTransferAccount()

```php
public function bindTransferAccount($data = [])
```

绑定广告金充值账户（POST /xpay/bind_transfer_accout）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryFundsBill()

```php
public function queryFundsBill($data = [])
```

查询广告金充值记录（POST /xpay/query_funds_bill）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryRecoverBill()

```php
public function queryRecoverBill($data = [])
```

查询广告金回收记录（POST /xpay/query_recover_bill）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryBizBalance()

```php
public function queryBizBalance($data = [])
```

查询商家账户可提现余额（POST /xpay/query_biz_balance）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### createWithdrawOrder()

```php
public function createWithdrawOrder($data = [])
```

创建提现单（POST /xpay/create_withdraw_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryWithdrawOrder()

```php
public function queryWithdrawOrder($data = [])
```

查询提现单（POST /xpay/query_withdraw_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如提现单号） |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

