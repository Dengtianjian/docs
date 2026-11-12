# Semantic

`kernel\Modules\Wechat\OfficialAccount\Apis\Intelligent\Semantic`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Intelligent/Semantic.php`

> 智能接口 - 语义理解

## 声明

```php
class Semantic extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

基于微信语义理解服务，将用户自然语言解析为结构化的意图与服务结果。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`search()`](#search) | 语义理解（搜索） |

### search()

```php
public function search($query, $category, $appId = null, $uid = null, $latitude = null, $longitude = null, $city = null, $region = null)
```

语义理解（搜索）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | 用户输入的文本（不能为空，长度限制以官方文档为准） |
| `$category` | `string` | — | 需要调用的服务类别，多个以逗号分隔，如 "flight,hotel" |
| `$appId` | `string|null` | `null` | 公众号 AppId，不传时取当前账号的 AppId |
| `$uid` | `string|null` | `null` | 用户唯一标识（可选） |
| `$latitude` | `string|null` | `null` | 纬度（可选） |
| `$longitude` | `string|null` | `null` | 经度（可选） |
| `$city` | `string|null` | `null` | 城市（可选） |
| `$region` | `string|null` | `null` | 区域（可选） |

## 同目录

- [Intelligent](/php/api/modules/wechat/officialaccount/apis/intelligent/intelligent)
- [Voice](/php/api/modules/wechat/officialaccount/apis/intelligent/voice)

