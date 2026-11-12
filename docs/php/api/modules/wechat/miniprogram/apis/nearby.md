# Nearby

`kernel\Modules\Wechat\Miniprogram\Apis\Nearby`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Nearby.php`

> 附近小程序

## 声明

```php
class Nearby extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「附近小程序」分类，用于管理展示在小程序附近的小程序地点。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addNearbyPoi()`](#addnearbypoi) | 添加地点（POST /wxa/addnearbypoi） |
| [`deleteNearbyPoi()`](#deletenearbypoi) | 删除地点（POST /wxa/delnearbypoi） |
| [`getNearbyPoiList()`](#getnearbypoilist) | 查看地点（GET /wxa/getnearbypoilist） |
| [`setNearbyPoiShowStatus()`](#setnearbypoishowstatus) | 设置展示状态（POST /wxa/setnearbypoishowstatus） |

### addNearbyPoi()

```php
public function addNearbyPoi($data = [])
```

添加地点（POST /wxa/addnearbypoi）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，常用字段：store_name（门店名称）、address（门店地址）、 |

### deleteNearbyPoi()

```php
public function deleteNearbyPoi($poiId)
```

删除地点（POST /wxa/delnearbypoi）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$poiId` | `string` | — | 附近地点 id |

### getNearbyPoiList()

```php
public function getNearbyPoiList($page = 1, $pageRows = 20)
```

查看地点（GET /wxa/getnearbypoilist）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$page` | `int` | `1` | 页码，从 1 开始 |
| `$pageRows` | `int` | `20` | 每页条数 |

### setNearbyPoiShowStatus()

```php
public function setNearbyPoiShowStatus($poiId, $status)
```

设置展示状态（POST /wxa/setnearbypoishowstatus）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$poiId` | `string` | — | 附近地点 id |
| `$status` | `int` | — | 展示状态：0 不展示；1 展示 |

## 同目录

- [Employment](/php/api/modules/wechat/miniprogram/apis/employment)
- [Search](/php/api/modules/wechat/miniprogram/apis/search)
- [StudentIdentity](/php/api/modules/wechat/miniprogram/apis/student-identity)
- [User](/php/api/modules/wechat/miniprogram/apis/user)
- [UserLogin](/php/api/modules/wechat/miniprogram/apis/user-login)

