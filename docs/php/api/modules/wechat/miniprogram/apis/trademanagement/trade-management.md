# TradeManagement

`kernel\Modules\Wechat\Miniprogram\Apis\TradeManagement\TradeManagement`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/TradeManagement/TradeManagement.php`

> 小程序交易管理服务（聚合类）

## 声明

```php
class TradeManagement extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「小程序交易管理服务」分类下的接口：
- 订单与发货：`Order`
- 品牌：`Brand`

使用示例：

```php
$mp->tradeManagement()->order()->getOrder(null, $transactionId);
$mp->tradeManagement()->brand()->getStatus();
```

## 示例

```php
$mp->tradeManagement()->order()->getOrder(null, $transactionId);
$mp->tradeManagement()->brand()->getStatus();
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`order()`](#order) | 订单与发货相关接口 |
| [`brand()`](#brand) | 品牌相关接口 |

### order()

```php
public function order()
```

订单与发货相关接口

### brand()

```php
public function brand()
```

品牌相关接口

## 同目录

- [Brand](/php/api/modules/wechat/miniprogram/apis/trademanagement/brand)
- [Order](/php/api/modules/wechat/miniprogram/apis/trademanagement/order)

