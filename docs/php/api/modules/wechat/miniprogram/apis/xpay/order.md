# Order

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Order`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Order.php`

> 虚拟支付 - 订单与账单

## 声明

```php
class Order extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下订单退款、账单下载相关接口（接口前缀 /xpay）。

说明：本组接口请求体较复杂，统一通过 $data 透传，具体字段以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`downloadBill()`](#downloadbill) | 下载小程序账单（POST /xpay/download_bill） |
| [`refundOrder()`](#refundorder) | 启动订单退款任务（POST /xpay/refund_order） |
| [`startDownloadOrder()`](#startdownloadorder) | 下载支付订单（POST /xpay/start_download_order） |
| [`queryDownloadOrder()`](#querydownloadorder) | 查询下载订单任务（POST /xpay/query_download_order） |
| [`downloadIosSettlementBill()`](#downloadiossettlementbill) | 下载虚拟支付 ios 月结账单（POST /xpay/download_ios_settlement_bill） |
| [`downloadAdverfundsOrder()`](#downloadadverfundsorder) | 下载广告金对应的商户订单信息（POST /xpay/download_adverfunds_order） |

### downloadBill()

```php
public function downloadBill($data = [])
```

下载小程序账单（POST /xpay/download_bill）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如账单日期等） |

### refundOrder()

```php
public function refundOrder($data = [])
```

启动订单退款任务（POST /xpay/refund_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如订单号、退款金额等） |

### startDownloadOrder()

```php
public function startDownloadOrder($data = [])
```

下载支付订单（POST /xpay/start_download_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryDownloadOrder()

```php
public function queryDownloadOrder($data = [])
```

查询下载订单任务（POST /xpay/query_download_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如任务 id） |

### downloadIosSettlementBill()

```php
public function downloadIosSettlementBill($data = [])
```

下载虚拟支付 ios 月结账单（POST /xpay/download_ios_settlement_bill）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### downloadAdverfundsOrder()

```php
public function downloadAdverfundsOrder($data = [])
```

下载广告金对应的商户订单信息（POST /xpay/download_adverfunds_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

