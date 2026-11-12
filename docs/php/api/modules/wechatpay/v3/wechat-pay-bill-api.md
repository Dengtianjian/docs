# WechatPayBillApi

`kernel\Modules\WechatPay\V3\WechatPayBillApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayBillApi.php`

> 微信支付 APIv3 账单

## 声明

```php
class WechatPayBillApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

APIv3 的账单是「先申请、再下载」两步：申请接口返回 `download_url`，再按该地址下载文件。
本类把两步都收齐——申请交易账单、申请资金账单、下载账单。

注意：下载账单返回的是**账单文件本身**（CSV 文本，或 GZIP 压缩后的二进制），不是 JSON，
因此 `download` 走非 JSON 分支、直接给出原始响应内容。
分账单（申请分账账单）属于分账领域，见 `WechatPayProfitSharingApi::bill`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`tradeBill()`](#tradebill) | 申请交易账单 |
| [`fundFlowBill()`](#fundflowbill) | 申请资金账单 |
| [`download()`](#download) | 下载账单 |

### tradeBill()

```php
public function tradeBill($billDate, $billType = "ALL", $tarType = null)
```

申请交易账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$billDate` | `string` | — | 账单日期，格式 yyyy-MM-DD |
| `$billType` | `string` | `"ALL"` | 账单类型：ALL（默认，全部）/ SUCCESS（支付成功）/ REFUND（退款）/ RECHARGE_REFUND（充值退款） |
| `$tarType` | `string|null` | `null` | 压缩类型，传 GZIP 时下载地址返回的是压缩包；默认不压缩 |

### fundFlowBill()

```php
public function fundFlowBill($billDate, $accountType = "BASIC", $tarType = null)
```

申请资金账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$billDate` | `string` | — | 账单日期，格式 yyyy-MM-DD |
| `$accountType` | `string` | `"BASIC"` | 资金账户类型：BASIC（默认，基本账户）/ OPERATION（运营账户）/ ALL（全部账户） |
| `$tarType` | `string|null` | `null` | 压缩类型，传 GZIP 时下载地址返回的是压缩包；默认不压缩 |

### download()

```php
public function download($downloadUrl)
```

下载账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$downloadUrl` | `string` | — | 申请账单接口返回的 download_url |

## 非公开方法

**protected**

- `protected function withTarType($query, $tarType)` —— 按需补上 tar_type 查询参数（内部使用）

## 同目录

- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

