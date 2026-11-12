# Goods

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\Goods`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/Goods.php`

> 虚拟支付 - 道具

## 声明

```php
class Goods extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下道具（商品）批量上传与发布相关接口（接口前缀 /xpay）。

说明：本组接口请求体较复杂，统一通过 $data 透传，具体字段以官方文档为准。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`startUploadGoods()`](#startuploadgoods) | 批量上传道具（POST /xpay/start_upload_goods） |
| [`queryUploadGoods()`](#queryuploadgoods) | 查询批量上传道具任务（POST /xpay/query_upload_goods） |
| [`startPublishGoods()`](#startpublishgoods) | 启动批量发布道具任务（POST /xpay/start_publish_goods） |
| [`queryPublishGoods()`](#querypublishgoods) | 查询批量发布道具任务（POST /xpay/query_publish_goods） |

### startUploadGoods()

```php
public function startUploadGoods($data = [])
```

批量上传道具（POST /xpay/start_upload_goods）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryUploadGoods()

```php
public function queryUploadGoods($data = [])
```

查询批量上传道具任务（POST /xpay/query_upload_goods）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如任务 id） |

### startPublishGoods()

```php
public function startPublishGoods($data = [])
```

启动批量发布道具任务（POST /xpay/start_publish_goods）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

### queryPublishGoods()

```php
public function queryPublishGoods($data = [])
```

查询批量发布道具任务（POST /xpay/query_publish_goods）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准（如任务 id） |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [File](/php/api/modules/wechat/miniprogram/apis/xpay/file)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

