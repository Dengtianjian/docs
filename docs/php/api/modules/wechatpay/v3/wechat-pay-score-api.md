# WechatPayScoreApi

`kernel\Modules\WechatPay\V3\WechatPayScoreApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayScoreApi.php`

> 微信支付 APIv3 微信支付分

## 声明

```php
class WechatPayScoreApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

对应微信支付的**微信支付分**（/v3/payscore/*）服务订单流程：
创建订单 → 前端用创单返回的 package 拉起支付分确认订单页（用户确认后订单进入进行中）
→ 服务结束完结订单（订单转入待扣款）→ 由支付分自动扣款或 `pay` 催收扣款；
订单进行中还可 `cancel` 取消、`modify` 下调金额，
用户改走其他渠道支付后用 `sync` 同步订单状态。

前提：需先在商户平台开通支付分产品权限、拿到服务 ID（service_id），
并把商户号与 appid 绑定；订单金额与 risk_fund 受「服务 ID 风险金额上限」与服务模式
（先免 / 先享）约束，报文字段须按行业规程传参。

两个回调（确认订单回调通知、支付成功回调通知）由创单时的 notify_url 接收，
报文解密用 `WechatPayV3Api::decryptNotifyData`，本类不处理回调。

退款：微信官方把它挂在支付分 API 列表下，但请求路径就是**通用退款接口**，
统一由 `WechatPayRefundApi` 承担——支付分的原订单标识传 transaction_id 即可，
取自 `query` 结果 collection.details 里的微信支付交易单号。

方法返回约定：成功返回微信响应数据（数组），失败返回 false，错误信息见 getError()；
判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | 创建支付分订单 |
| [`query()`](#query) | 查询支付分订单 |
| [`cancel()`](#cancel) | 取消支付分订单 |
| [`modify()`](#modify) | 修改订单金额 |
| [`complete()`](#complete) | 完结支付分订单 |
| [`sync()`](#sync) | 同步订单状态 |
| [`pay()`](#pay) | 发起催收扣款 |

### order()

```php
public function order($outOrderNo, $serviceId, $serviceIntroduction, $riskFund, $postPayments = null, $timeRange = null, $postDiscounts = null, $location = null, $notifyUrl = null, $attach = null, $device = null)
```

创建支付分订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号，商户号下唯一 |
| `$serviceId` | `string` | — | 服务 ID（32 位数字，支付分权限审核通过后由微信支付运营提供） |
| `$serviceIntroduction` | `string` | — | 服务信息，展示给用户，不超过 20 字符 |
| `$riskFund` | `array` | — | 服务风险金，含 name（风险名称）、amount（风险金额，分）、description（可选） |
| `$postPayments` | `array|null` | `null` | 后付费项目，每项含 name、amount（分）、description、count |
| `$timeRange` | `array|null` | `null` | 服务时间段，含 start_time（支持 OnAccept，表示以用户确认订单时间为开始时间）、 |
| `$postDiscounts` | `array|null` | `null` | 商户优惠，每项含 name、description、amount（分）、count |
| `$location` | `array|null` | `null` | 服务位置，含 start_location、end_location |
| `$notifyUrl` | `string|null` | `null` | 确认订单回调与支付成功回调共用的地址；为 null 时取商户配置的 notifyUrl |
| `$attach` | `string|null` | `null` | 商户数据包，用户不可见，两个回调会原样回传（需自行 urlencode，≤256 字符） |
| `$device` | `array|null` | `null` | 设备信息，含 start_device_id、end_device_id、materiel_no； |

### query()

```php
public function query($outOrderNo, $serviceId, $queryId = null)
```

查询支付分订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$serviceId` | `string` | — | 服务 ID |
| `$queryId` | `string|null` | `null` | 查单 ID（优先于 $outOrderNo） |

### cancel()

```php
public function cancel($outOrderNo, $reason, $serviceId = null)
```

取消支付分订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$reason` | `string` | — | 撤销原因，用户在微信收到的取消消息中可见，不超过 50 字符 |
| `$serviceId` | `string|null` | `null` | 服务 ID |

### modify()

```php
public function modify($outOrderNo, $serviceId, $postPayments, $totalAmount, $reason, $postDiscounts = null, $device = null)
```

修改订单金额

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$serviceId` | `string` | — | 服务 ID |
| `$postPayments` | `array` | — | 刷新后的后付费项目，每项含 name、amount（分）、description、count |
| `$totalAmount` | `integer` | — | 刷新后的收款总金额（分），须等于后付费项目金额和减去优惠金额和 |
| `$reason` | `string` | — | 修改原因，不超过 50 字符 |
| `$postDiscounts` | `array|null` | `null` | 刷新后的商户优惠，最多 30 条 |
| `$device` | `array|null` | `null` | 设备信息，含 start_device_id、end_device_id、materiel_no |

### complete()

```php
public function complete($outOrderNo, $serviceId, $postPayments, $totalAmount, $timeRange = null, $postDiscounts = null, $location = null, $profitSharing = false, $goodsTag = null, $device = null)
```

完结支付分订单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$serviceId` | `string` | — | 服务 ID |
| `$postPayments` | `array` | — | 最终的后付费项目，最多 100 条 |
| `$totalAmount` | `integer` | — | 收款总金额（分），须等于后付费项目金额和减去优惠金额和 |
| `$timeRange` | `array|null` | `null` | 实际服务时间段，含 start_time、end_time 与备注（格式须两端一致） |
| `$postDiscounts` | `array|null` | `null` | 最终使用的商户优惠，最多 30 条 |
| `$location` | `array|null` | `null` | 实际服务位置，含 end_location |
| `$profitSharing` | `boolean` | `false` | true 时订单收款资金冻结待分账（详见 `WechatPayProfitSharingApi`） |
| `$goodsTag` | `string|null` | `null` | 订单优惠标记，代金券配置了该标记时须传 |
| `$device` | `array|null` | `null` | 设备信息，含 start_device_id、end_device_id、materiel_no |

### sync()

```php
public function sync($outOrderNo, $serviceId, $paidTime)
```

同步订单状态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$serviceId` | `string` | — | 服务 ID |
| `$paidTime` | `string` | — | 收款成功时间，支持 yyyyMMddHHmmss 与 yyyyMMdd（后者为当天 0 点）； |

### pay()

```php
public function pay($outOrderNo, $serviceId)
```

发起催收扣款

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outOrderNo` | `string` | — | 商户服务订单号 |
| `$serviceId` | `string` | — | 服务 ID，该服务须具备本接口对应产品的权限 |

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

