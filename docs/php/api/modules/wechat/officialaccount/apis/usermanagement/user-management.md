# UserManagement

`kernel\Modules\Wechat\OfficialAccount\Apis\UserManagement\UserManagement`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/UserManagement/UserManagement.php`

> 用户管理（聚合类）

## 声明

```php
class UserManagement extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

聚合微信「用户管理」分类下的接口，按子域拆分为多个子类：
- 用户信息：`User`（关注者列表、用户基本信息、备注）
- 用户标签：`Tag`（标签增删改查、批量打标签）
- 黑名单：`Blacklist`

使用示例：

```php
$oa->userManagement()->user()->userList();
$oa->userManagement()->tag()->getUsers($tagId);
$oa->userManagement()->blacklist()->batchAdd([$openid]);
```

## 示例

```php
$oa->userManagement()->user()->userList();
$oa->userManagement()->tag()->getUsers($tagId);
$oa->userManagement()->blacklist()->batchAdd([$openid]);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`user()`](#user) | 用户信息相关接口 |
| [`tag()`](#tag) | 用户标签相关接口 |
| [`blacklist()`](#blacklist) | 黑名单相关接口 |

### user()

```php
public function user()
```

用户信息相关接口

### tag()

```php
public function tag()
```

用户标签相关接口

### blacklist()

```php
public function blacklist()
```

黑名单相关接口

## 同目录

- [Blacklist](/php/api/modules/wechat/officialaccount/apis/usermanagement/blacklist)
- [Tag](/php/api/modules/wechat/officialaccount/apis/usermanagement/tag)
- [User](/php/api/modules/wechat/officialaccount/apis/usermanagement/user)

