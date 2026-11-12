# Brand

`kernel\Modules\Wechat\Miniprogram\Apis\TradeManagement\Brand`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/TradeManagement/Brand.php`

> 小程序交易管理服务 - 品牌

## 声明

```php
class Brand extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序交易管理服务」分类下的品牌申请与状态查询接口。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`apply()`](#apply) | 品牌申请（POST /wxa/sec/famousbrand/apply） |
| [`getStatus()`](#getstatus) | 小程序品牌申请状态查询（POST /wxa/sec/famousbrand/get_status） |

### apply()

```php
public function apply($data = [])
```

品牌申请（POST /wxa/sec/famousbrand/apply）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段以官方文档为准 |

### getStatus()

```php
public function getStatus($data = [])
```

小程序品牌申请状态查询（POST /wxa/sec/famousbrand/get_status）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段以官方文档为准 |

## 同目录

- [Order](/php/api/modules/wechat/miniprogram/apis/trademanagement/order)
- [TradeManagement](/php/api/modules/wechat/miniprogram/apis/trademanagement/trade-management)

