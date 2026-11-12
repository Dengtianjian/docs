# Complaint

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Complaint`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Complaint.php`

> 虚拟支付 - 投诉处理

## 声明

```php
class Complaint extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下用户投诉处理相关接口（接口前缀 /xpay）。

说明：本组接口请求体较复杂，统一通过 $data 透传，具体字段以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getComplaintList()`](#getcomplaintlist) | 获取投诉列表（POST /xpay/get_complaint_list） |
| [`getComplaintDetail()`](#getcomplaintdetail) | 获取投诉详情（POST /xpay/get_complaint_detail） |
| [`getNegotiationHistory()`](#getnegotiationhistory) | 获取协商历史（POST /xpay/get_negotiation_history） |
| [`responseComplaint()`](#responsecomplaint) | 回复用户（POST /xpay/response_complaint） |
| [`completeComplaint()`](#completecomplaint) | 完成投诉处理（POST /xpay/complete_complaint） |
| [`queryPunishmentReasons()`](#querypunishmentreasons) | 商户被管控原因查询（POST /xpay/query_punishment_reasons） |

### getComplaintList()

```php
public function getComplaintList($data = [])
```

获取投诉列表（POST /xpay/get_complaint_list）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如分页、时间范围等） |

### getComplaintDetail()

```php
public function getComplaintDetail($data = [])
```

获取投诉详情（POST /xpay/get_complaint_detail）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如投诉单号） |

### getNegotiationHistory()

```php
public function getNegotiationHistory($data = [])
```

获取协商历史（POST /xpay/get_negotiation_history）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如投诉单号） |

### responseComplaint()

```php
public function responseComplaint($data = [])
```

回复用户（POST /xpay/response_complaint）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如投诉单号、回复内容、图片等） |

### completeComplaint()

```php
public function completeComplaint($data = [])
```

完成投诉处理（POST /xpay/complete_complaint）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如投诉单号） |

### queryPunishmentReasons()

```php
public function queryPunishmentReasons($data = [])
```

商户被管控原因查询（POST /xpay/query_punishment_reasons）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

## 同目录

- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

