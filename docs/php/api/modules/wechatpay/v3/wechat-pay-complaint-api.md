# WechatPayComplaintApi

`kernel\Modules\WechatPay\V3\WechatPayComplaintApi`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/V3/WechatPayComplaintApi.php`

> 微信支付 APIv3 消费者投诉（消费者投诉 2.0）

## 声明

```php
class WechatPayComplaintApi extends WechatPayV3Api
```

父类：`WechatPayV3Api`

## 概述

对应微信支付的**消费者投诉 2.0**（/v3/merchant-service/*）：
主动查询（`queryComplaints` 列表 / `queryComplaint` 详情 /
`queryNegotiationHistory` 协商历史）→ `reply` 回复用户（首次回复后投诉单由
「待处理」转为「处理中」）→ 与用户协商一致后 `complete` 反馈处理完成。
用户申请退款的投诉单还需用 `updateRefundProgress` 给出审批结果（同意后仍要另行用
`WechatPayRefundApi::apply` 发起原路退款）；
详情里 need_immediate_service 为 true 的投诉单走 `replyImmediateService` 的新版消息格式回复。

实时接收投诉：先用 `addNotificationUrl` 配置回调地址，之后投诉产生与状态变更时微信会推送
通知（回调解密用 `WechatPayV3Api::decryptNotifyData`，本类不处理回调）。

回复中要带图片凭证时，先用 `uploadImage` 上传拿到 media_id 再传入（最多 4 张）——
该接口是 multipart 上传，发送与签名由 `WechatPayV3Api::requestUpload` 承担。

详情与列表里的 payer_phone 是**加密字段**，需按微信《如何使用 API 证书解密敏感字段》自行解密。

方法返回约定：成功返回微信响应数据（数组）、失败返回 false，错误信息见 getError()；
回复用户 / 反馈处理完成 / 更新退款审批结果 / 删除回调地址微信返回 HTTP 204 无响应体，
本类统一转成 true（同 `WechatPayProductApi::close`），判断失败请用 `=== false`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`queryComplaints()`](#querycomplaints) | 查询投诉单列表 |
| [`queryComplaint()`](#querycomplaint) | 查询投诉单详情 |
| [`queryNegotiationHistory()`](#querynegotiationhistory) | 查询投诉单协商历史 |
| [`reply()`](#reply) | 回复用户 |
| [`complete()`](#complete) | 反馈处理完成 |
| [`updateRefundProgress()`](#updaterefundprogress) | 更新退款审批结果 |
| [`replyImmediateService()`](#replyimmediateservice) | 回复需要即时服务的投诉单 |
| [`uploadImage()`](#uploadimage) | 上传图片凭证 |
| [`addNotificationUrl()`](#addnotificationurl) | 创建投诉通知回调地址 |
| [`queryNotificationUrl()`](#querynotificationurl) | 查询投诉通知回调地址 |
| [`updateNotificationUrl()`](#updatenotificationurl) | 更新投诉通知回调地址 |
| [`removeNotificationUrl()`](#removenotificationurl) | 删除投诉通知回调地址 |

### queryComplaints()

```php
public function queryComplaints($beginDate, $endDate, $limit = null, $offset = null, $complaintedMchid = null)
```

查询投诉单列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$beginDate` | `string` | — | 投诉发生开始日期，格式 yyyy-MM-dd |
| `$endDate` | `string` | — | 投诉发生结束日期，格式 yyyy-MM-dd（与 $beginDate 跨度 ≤ 30 天） |
| `$limit` | `integer|null` | `null` | 分页大小，范围 [1,50] |
| `$offset` | `integer|null` | `null` | 分页开始位置，从 0 开始计数 |
| `$complaintedMchid` | `string|null` | `null` | 被诉商户号（服务商 / 渠道商查指定子商户时传） |

### queryComplaint()

```php
public function queryComplaint($complaintId)
```

查询投诉单详情

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |

### queryNegotiationHistory()

```php
public function queryNegotiationHistory($complaintId, $limit = null, $offset = null)
```

查询投诉单协商历史

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |
| `$limit` | `integer|null` | `null` | 分页大小，范围 [1,300] |
| `$offset` | `integer|null` | `null` | 分页开始位置，从 0 开始计数 |

### reply()

```php
public function reply($complaintId, $complaintedMchid, $responseContent, $responseImages = null, $jumpUrl = null, $jumpUrlText = null, $miniProgramJumpInfo = null)
```

回复用户

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |
| `$complaintedMchid` | `string` | — | 被诉商户号（投诉单详情里的被诉商户号） |
| `$responseContent` | `string` | — | 回复内容，不超过 500 字符 |
| `$responseImages` | `array|null` | `null` | 回复图片，传 `uploadImage` 返回的 media_id，最多 4 张 |
| `$jumpUrl` | `string|null` | `null` | 引导用户跳转的商户客诉处理页地址（HTTPS；属灰度能力） |
| `$jumpUrlText` | `string|null` | `null` | 跳转链接文案，展示在回复内容之后；传了 $jumpUrl 就必须传它 |
| `$miniProgramJumpInfo` | `array|null` | `null` | 跳转小程序信息，含 appid、path、text（属灰度能力） |

### complete()

```php
public function complete($complaintId, $complaintedMchid)
```

反馈处理完成

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |
| `$complaintedMchid` | `string` | — | 被诉商户号 |

### updateRefundProgress()

```php
public function updateRefundProgress($complaintId, $action, $launchRefundDay = null, $rejectReason = null, $rejectMediaList = null, $remark = null)
```

更新退款审批结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |
| `$action` | `string` | — | 审批动作：APPROVE（同意退款）/ REJECT（拒绝退款） |
| `$launchRefundDay` | `integer|null` | `null` | 同意的预计发起退款时间，单位为工作日，0 表示当天 |
| `$rejectReason` | `string|null` | `null` | 拒绝原因，不超过 200 字符 |
| `$rejectMediaList` | `array|null` | `null` | 拒绝的举证图片，传 `uploadImage` 返回的 media_id，最多 4 张 |
| `$remark` | `string|null` | `null` | 需要向微信支付客服反馈的备注信息 |

### replyImmediateService()

```php
public function replyImmediateService($complaintId, $complaintedMchid, $message, $idempotentId)
```

回复需要即时服务的投诉单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$complaintId` | `string` | — | 投诉单号 |
| `$complaintedMchid` | `string` | — | 被诉商户号 |
| `$message` | `array` | — | 消息内容，含 blocks（消息块列表）、sender_identity（MANUAL / MACHINE）、 |
| `$idempotentId` | `string` | — | 幂等 ID，相同 ID 的请求只处理一次，需商户自行生成并保存 |

### uploadImage()

```php
public function uploadImage($filePath, $fileName = null)
```

上传图片凭证

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 图片文件的绝对路径 |
| `$fileName` | `string|null` | `null` | 媒体文件名称，后缀须为 JPG / BMP / PNG；为 null 时取路径中的文件名 |

### addNotificationUrl()

```php
public function addNotificationUrl($url)
```

创建投诉通知回调地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string` | — | 通知地址，仅支持 HTTPS |

### queryNotificationUrl()

```php
public function queryNotificationUrl()
```

查询投诉通知回调地址

### updateNotificationUrl()

```php
public function updateNotificationUrl($url)
```

更新投诉通知回调地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$url` | `string` | — | 新的通知地址，仅支持 HTTPS |

### removeNotificationUrl()

```php
public function removeNotificationUrl()
```

删除投诉通知回调地址

## 非公开方法

**protected**

- `protected function noContentAsTrue($response)` —— 归一「204 无响应体」接口的成功结果

## 同目录

- [WechatPayBillApi](/php/api/modules/wechatpay/v3/wechat-pay-bill-api)
- [WechatPayCombineApi](/php/api/modules/wechatpay/v3/wechat-pay-combine-api)
- [WechatPayProductApi](/php/api/modules/wechatpay/v3/wechat-pay-product-api)
- [WechatPayProfitSharingApi](/php/api/modules/wechatpay/v3/wechat-pay-profit-sharing-api)
- [WechatPayRefundApi](/php/api/modules/wechatpay/v3/wechat-pay-refund-api)
- [WechatPayScoreApi](/php/api/modules/wechatpay/v3/wechat-pay-score-api)
- [WechatPayTransferApi](/php/api/modules/wechatpay/v3/wechat-pay-transfer-api)
- [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)
- [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)

