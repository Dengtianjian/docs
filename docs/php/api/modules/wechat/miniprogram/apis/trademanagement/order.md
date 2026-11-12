# Order

`kernel\Modules\Wechat\Miniprogram\Apis\TradeManagement\Order`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/TradeManagement/Order.php`

> 小程序交易管理服务 - 订单

## 声明

```php
class Order extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序交易管理服务」分类下的发货信息录入、订单查询等接口。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploadShippingInfo()`](#uploadshippinginfo) | 发货信息录入（POST /wxa/sec/order/upload_shipping_info） |
| [`uploadCombinedShippingInfo()`](#uploadcombinedshippinginfo) | 发货信息合单录入（POST /wxa/sec/order/upload_combined_shipping_info） |
| [`getOrder()`](#getorder) | 查询订单发货状态（POST /wxa/sec/order/get_order） |
| [`getOrderList()`](#getorderlist) | 查询订单列表（POST /wxa/sec/order/get_order_list） |
| [`notifyConfirmReceive()`](#notifyconfirmreceive) | 确认收货提醒（POST /wxa/sec/order/notify_confirm_receive） |
| [`setMsgJumpPath()`](#setmsgjumppath) | 消息跳转路径设置（POST /wxa/sec/order/set_msg_jump_path） |
| [`isTradeManaged()`](#istrademanaged) | 查询小程序是否已开通发货信息管理服务（POST /wxa/sec/order/is_trade_managed） |
| [`isTradeManagementConfirmationCompleted()`](#istrademanagementconfirmationcompleted) | 查询小程序是否已完成交易结算管理确认（POST /wxa/sec/order/is_trade_management_confirmation_completed） |
| [`opSpecialOrder()`](#opspecialorder) | 特殊发货报备（POST /wxa/sec/order/opspecialorder） |
| [`setWxaTradeTypeCgi()`](#setwxatradetypecgi) | 小程序交易类型变更申请（POST /wxa/sec/order/setwxatradetypecgi） |

### uploadShippingInfo()

```php
public function uploadShippingInfo($orderKey, $logisticsType, $shippingList = [], $deliveryMode = 1, $isAllDelivered = true, $uploadTime = null, $payer = null)
```

发货信息录入（POST /wxa/sec/order/upload_shipping_info）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$orderKey` | `array` | — | 订单信息，形如 |
| `$logisticsType` | `int` | — | 物流模式：1 实体物流；2 虚拟商品；3 用户自提；4 同城配送 |
| `$shippingList` | `array` | `[]` | 物流信息列表，元素形如 |
| `$deliveryMode` | `int` | `1` | 发货模式：1 统一发货；2 分拆发货 |
| `$isAllDelivered` | `bool` | `true` | 是否已全部发货（分拆发货模式下必填） |
| `$uploadTime` | `int|null` | `null` | 发货时间（Unix 时间戳，秒），不传时由微信取当前时间 |
| `$payer` | `array|null` | `null` | 支付者信息，形如 ["openid" => "用户 openid"] |

### uploadCombinedShippingInfo()

```php
public function uploadCombinedShippingInfo($data = [])
```

发货信息合单录入（POST /wxa/sec/order/upload_combined_shipping_info）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段（如 order_key、combined_shipping_list 等）以官方文档为准 |

### getOrder()

```php
public function getOrder($orderId = null, $transactionId = null, $outTradeNo = null, $mchid = null)
```

查询订单发货状态（POST /wxa/sec/order/get_order）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$orderId` | `string|null` | `null` | 微信支付单号 |
| `$transactionId` | `string|null` | `null` | 微信支付订单号 |
| `$outTradeNo` | `string|null` | `null` | 商户订单号（需同时传 $mchid） |
| `$mchid` | `string|null` | `null` | 微信支付商户号 |

### getOrderList()

```php
public function getOrderList($data = [])
```

查询订单列表（POST /wxa/sec/order/get_order_list）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段（如 order_state、order_time_range、page_size、last_index 等）以官方文档为准 |

### notifyConfirmReceive()

```php
public function notifyConfirmReceive($transactionId = null, $merchantId = null, $subMerchantId = null, $outTradeNo = null)
```

确认收货提醒（POST /wxa/sec/order/notify_confirm_receive）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transactionId` | `string|null` | `null` | 微信支付订单号 |
| `$merchantId` | `string|null` | `null` | 商户号（与 $subMerchantId、$outTradeNo 一并使用） |
| `$subMerchantId` | `string|null` | `null` | 子商户号（服务商模式） |
| `$outTradeNo` | `string|null` | `null` | 商户订单号 |

### setMsgJumpPath()

```php
public function setMsgJumpPath($path)
```

消息跳转路径设置（POST /wxa/sec/order/set_msg_jump_path）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 小程序内跳转路径（需已发布） |

### isTradeManaged()

```php
public function isTradeManaged()
```

查询小程序是否已开通发货信息管理服务（POST /wxa/sec/order/is_trade_managed）

### isTradeManagementConfirmationCompleted()

```php
public function isTradeManagementConfirmationCompleted()
```

查询小程序是否已完成交易结算管理确认（POST /wxa/sec/order/is_trade_management_confirmation_completed）

### opSpecialOrder()

```php
public function opSpecialOrder($data = [])
```

特殊发货报备（POST /wxa/sec/order/opspecialorder）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段以官方文档为准 |

### setWxaTradeTypeCgi()

```php
public function setWxaTradeTypeCgi($data = [])
```

小程序交易类型变更申请（POST /wxa/sec/order/setwxatradetypecgi）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段以官方文档为准 |

## 同目录

- [Brand](/php/api/modules/wechat/miniprogram/apis/trademanagement/brand)
- [TradeManagement](/php/api/modules/wechat/miniprogram/apis/trademanagement/trade-management)

