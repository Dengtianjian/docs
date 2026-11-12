# Blacklist

`kernel\Modules\Wechat\OfficialAccount\Apis\UserManagement\Blacklist`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/UserManagement/Blacklist.php`

> 用户管理 - 黑名单

## 声明

```php
class Blacklist extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

拉黑后用户无法接收公众号的群发与模板消息；每个公众号最多拉黑 100000 个用户。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getList()`](#getlist) | 获取黑名单列表 |
| [`batchAdd()`](#batchadd) | 批量拉黑用户 |
| [`batchRemove()`](#batchremove) | 批量取消拉黑用户 |

### getList()

```php
public function getList($beginOpenid = null)
```

获取黑名单列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$beginOpenid` | `string|null` | `null` | 起始 OpenID（分页），不填默认从头开始 |

### batchAdd()

```php
public function batchAdd(array $openIds)
```

批量拉黑用户

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openIds` | `array` | — | 用户 OpenID 列表（每次最多 20 个） |

### batchRemove()

```php
public function batchRemove(array $openIds)
```

批量取消拉黑用户

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openIds` | `array` | — | 用户 OpenID 列表（每次最多 20 个） |

## 同目录

- [Tag](/php/api/modules/wechat/officialaccount/apis/usermanagement/tag)
- [User](/php/api/modules/wechat/officialaccount/apis/usermanagement/user)
- [UserManagement](/php/api/modules/wechat/officialaccount/apis/usermanagement/user-management)

