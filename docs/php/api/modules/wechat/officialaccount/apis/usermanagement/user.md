# User

`kernel\Modules\Wechat\OfficialAccount\Apis\UserManagement\User`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/UserManagement/User.php`

> 用户管理 - 用户信息

## 声明

```php
class User extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

获取关注者列表、用户基本信息与设置用户备注等。

注意：列表/查询方法名刻意避开 get() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`userList()`](#userlist) | 获取用户列表 公众号可通过本接口来获取帐号的关注者列表，关注者列表由一串 OpenID（加密后的微信号，每个用户对每个公众号的 OpenID 是唯一的）组成。一次拉取调用最多拉取 10000 个关注者的 OpenID，可以通过多次拉取的方式来满足需求。 |
| [`getInfo()`](#getinfo) | 获取用户基本信息（单个） |
| [`batchGet()`](#batchget) | 批量获取用户基本信息 |
| [`updateRemark()`](#updateremark) | 设置用户备注名 |

### userList()

```php
public function userList($nextOpenid = null)
```

获取用户列表 公众号可通过本接口来获取帐号的关注者列表，关注者列表由一串 OpenID（加密后的微信号，每个用户对每个公众号的 OpenID 是唯一的）组成。一次拉取调用最多拉取 10000 个关注者的 OpenID，可以通过多次拉取的方式来满足需求。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$nextOpenid` | `string|null` | `null` | 第一个拉取的 OPENID，不填默认从头开始拉取 |

### getInfo()

```php
public function getInfo($openid, $lang = "zh_CN")
```

获取用户基本信息（单个）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户的 OpenID |
| `$lang` | `string` | `"zh_CN"` | 返回国家地区语言版本（zh_CN/zh_TW/en） |

### batchGet()

```php
public function batchGet(array $openIds, $lang = "zh_CN")
```

批量获取用户基本信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openIds` | `array` | — | 用户 OpenID 列表（最多 100 个） |
| `$lang` | `string` | `"zh_CN"` | 返回国家地区语言版本（zh_CN/zh_TW/en） |

### updateRemark()

```php
public function updateRemark($openid, $remark)
```

设置用户备注名

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 OpenID |
| `$remark` | `string` | — | 新的备注名，长度须小于 30 字符 |

## 同目录

- [Blacklist](/php/api/modules/wechat/officialaccount/apis/usermanagement/blacklist)
- [Tag](/php/api/modules/wechat/officialaccount/apis/usermanagement/tag)
- [UserManagement](/php/api/modules/wechat/officialaccount/apis/usermanagement/user-management)

