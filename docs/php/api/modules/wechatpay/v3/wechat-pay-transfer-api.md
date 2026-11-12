# WechatPayTransferApi

`kernel\Modules\WechatPay\V3\WechatPayTransferApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayTransferApi.php`

> 微信支付 APIv3 商家转账

## 声明

```php
class WechatPayTransferApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

对应微信支付的**新版商家转账**（/v3/fund-app/mch-transfer/*，2024 年起）：
发起转账 → 商户单号/微信单号查单 → 必要时撤销 → 申请电子回单。
注意与「商家转账到零钱」旧版接口（/v3/transfer/batches）不是同一套，旧版未在此实现。

收款模式有两种。微信没有「模式开关」字段，而是两套并列的接口：
- **用户确认模式**：`transfer`，收款人须在微信侧确认后才到账；
- **用户授权免确认模式**：用户授权一次，之后可免确认直接到账，对应
`preTransferWithAuthorization`（下单，并在用户确认收款时顺带引导授权）、
`applyAuthorization`（单独发起一次授权）、`queryAuthorization`（查授权结果）、
`closeAuthorization`（解除授权）、`transferWithAuthorization`（对已授权用户转账）。

前提：需先在商户平台开通「商家转账」并配置转账场景（transfer_scene_id）、
单笔金额较大的还需传入加密后的收款人姓名；各转账方法还须按场景传入报备信息
（transfer_scene_report_infos，见 `buildTransferBody`）。

方法返回约定：成功返回微信响应数据（数组），失败返回 false，错误信息见 getError()；
判断失败请用 `=== false`，详见 `WechatPayV3Api::request`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`transfer()`](#transfer) | 发起商家转账（用户确认模式） |
| [`preTransferWithAuthorization()`](#pretransferwithauthorization) | 发起转账并完成免确认收款授权 |
| [`transferWithAuthorization()`](#transferwithauthorization) | 用户授权后转账（免确认收款） |
| [`applyAuthorization()`](#applyauthorization) | 发起免确认收款授权 |
| [`queryAuthorization()`](#queryauthorization) | 商户单号查询授权结果 |
| [`closeAuthorization()`](#closeauthorization) | 解除免确认收款授权 |
| [`queryByOutBillNo()`](#querybyoutbillno) | 商户单号查询转账单 |
| [`queryByTransferBillNo()`](#querybytransferbillno) | 微信单号查询转账单 |
| [`cancel()`](#cancel) | 撤销转账 |
| [`elecsign()`](#elecsign) | 申请转账电子回单 |
| [`queryElecsign()`](#queryelecsign) | 查询转账电子回单 |

### transfer()

```php
public function transfer($outBillNo, $openid, $transferAmount, $transferRemark, $transferSceneId, $userName = null, $notifyUrl = null, $userRecvPerception = null, $sceneReportInfos = null)
```

发起商家转账（用户确认模式）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号，商户系统内部唯一 |
| `$openid` | `string` | — | 收款用户的 openid（须与商户 appid 同主体） |
| `$transferAmount` | `integer` | — | 转账金额（分） |
| `$transferRemark` | `string` | — | 转账备注，展示给用户 |
| `$transferSceneId` | `string` | — | 转账场景 ID，如 1000 现金营销、1001 佣金报酬、1005 公益补助 |
| `$userName` | `string|null` | `null` | 收款人姓名（已加密；单笔大额时微信要求传入） |
| `$notifyUrl` | `string|null` | `null` | 转账结果回调地址；为 null 时不回调，只能靠查单 |
| `$userRecvPerception` | `string|null` | `null` | 用户收款时感知的收款说明，如「现金奖励」 |
| `$sceneReportInfos` | `array|null` | `null` | 转账场景报备信息，每项含 info_type、info_content（见 `buildTransferBody`） |

### preTransferWithAuthorization()

```php
public function preTransferWithAuthorization($outBillNo, $openid, $transferAmount, $transferRemark, $transferSceneId, $authorizationInfo, $userName = null, $notifyUrl = null, $userRecvPerception = null, $sceneReportInfos = null)
```

发起转账并完成免确认收款授权

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号，商户系统内部唯一 |
| `$openid` | `string` | — | 收款用户的 openid（须与商户 appid 同主体） |
| `$transferAmount` | `integer` | — | 转账金额（分） |
| `$transferRemark` | `string` | — | 转账备注，展示给用户 |
| `$transferSceneId` | `string` | — | 转账场景 ID，如 1000 现金营销、1001 佣金报酬、1005 公益补助 |
| `$authorizationInfo` | `array` | — | 免确认收款授权信息（微信标为可选，本方法即为此而设，故必传），含： |
| `$userName` | `string|null` | `null` | 收款人姓名（已加密；单笔大额时微信要求传入） |
| `$notifyUrl` | `string|null` | `null` | 转账结果回调地址；为 null 时不回调，只能靠查单 |
| `$userRecvPerception` | `string|null` | `null` | 用户收款时感知的收款说明，如「现金奖励」 |
| `$sceneReportInfos` | `array|null` | `null` | 转账场景报备信息，每项含 info_type、info_content（见 `buildTransferBody`） |

### transferWithAuthorization()

```php
public function transferWithAuthorization($outBillNo, $transferAmount, $transferRemark, $transferSceneId, $outAuthorizationNo = null, $authorizationId = null, $userName = null, $userRecvPerception = null, $sceneReportInfos = null)
```

用户授权后转账（免确认收款）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号，商户系统内部唯一 |
| `$transferAmount` | `integer` | — | 转账金额（分） |
| `$transferRemark` | `string` | — | 转账备注，展示给用户 |
| `$transferSceneId` | `string` | — | 转账场景 ID，须与授权时用的场景一致 |
| `$outAuthorizationNo` | `string|null` | `null` | 商户侧授权单号 |
| `$authorizationId` | `string|null` | `null` | 微信免确认收款授权单号 |
| `$userName` | `string|null` | `null` | 收款人姓名（已加密；单笔大额时微信要求传入） |
| `$userRecvPerception` | `string|null` | `null` | 用户收款时感知的收款说明 |
| `$sceneReportInfos` | `array|null` | `null` | 转账场景报备信息，每项含 info_type、info_content（本接口微信标为必填） |

### applyAuthorization()

```php
public function applyAuthorization($outAuthorizationNo, $openid, $transferSceneId, $userDisplayName, $authorizationNotifyUrl, $userRecvPerception = null, $sceneInfo = null)
```

发起免确认收款授权

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outAuthorizationNo` | `string` | — | 商户侧授权单号（商户系统内部唯一，一个用户账号对应唯一一个生效中的授权） |
| `$openid` | `string` | — | 收款用户的 openid（须与商户 appid 同主体） |
| `$transferSceneId` | `string` | — | 转账场景 ID |
| `$userDisplayName` | `string` | — | 用户展示名称（授权详情中的「开通账号」，不支持非 UTF8 字符与表情） |
| `$authorizationNotifyUrl` | `string` | — | 授权结果回调地址，HTTPS、不能携带参数 |
| `$userRecvPerception` | `string|null` | `null` | 用户收款时感知的收款说明 |
| `$sceneInfo` | `array|null` | `null` | 场景信息，含 client_ip、device_id、device_type（IOS / ANDROID / HARMONY / OTHER） |

### queryAuthorization()

```php
public function queryAuthorization($outAuthorizationNo, $displayPackageInfo = false)
```

商户单号查询授权结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outAuthorizationNo` | `string` | — | 商户侧授权单号 |
| `$displayPackageInfo` | `boolean` | `false` | true 时响应返回 package_info，用于再次调起用户授权信息页（有效期 10 分钟） |

### closeAuthorization()

```php
public function closeAuthorization($outAuthorizationNo)
```

解除免确认收款授权

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outAuthorizationNo` | `string` | — | 商户侧授权单号 |

### queryByOutBillNo()

```php
public function queryByOutBillNo($outBillNo)
```

商户单号查询转账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号 |

### queryByTransferBillNo()

```php
public function queryByTransferBillNo($transferBillNo)
```

微信单号查询转账单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transferBillNo` | `string` | — | 微信转账单号 |

### cancel()

```php
public function cancel($outBillNo)
```

撤销转账

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号 |

### elecsign()

```php
public function elecsign($outBillNo)
```

申请转账电子回单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号 |

### queryElecsign()

```php
public function queryElecsign($outBillNo)
```

查询转账电子回单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outBillNo` | `string` | — | 商户转账单号 |

## 非公开方法

**protected**

- `protected function buildTransferBody($outBillNo, $transferSceneId, $transferAmount, $transferRemark, $userName = null, $userRecvPerception = null, $sceneReportInfos = null)` —— 组装转账报文中三种发起方式共有的字段

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayComplaintApi](/php/api/modules/wechatpay/v3/wechat-pay-complaint-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

