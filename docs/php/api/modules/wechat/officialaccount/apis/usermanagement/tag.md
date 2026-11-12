# Tag

`kernel\Modules\Wechat\OfficialAccount\Apis\UserManagement\Tag`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/UserManagement/Tag.php`

> 用户管理 - 用户标签

## 声明

```php
class Tag extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

公众号可对关注者打标签，并基于标签进行群发、菜单个性化展示等。

注意：列表/删除方法名刻意避开 get()/delete() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 等请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`create()`](#create) | 创建标签 |
| [`getList()`](#getlist) | 获取公众号已创建的标签 |
| [`update()`](#update) | 编辑标签 |
| [`deleteTag()`](#deletetag) | 删除标签 |
| [`getUsers()`](#getusers) | 获取标签下粉丝列表 |
| [`batchTagging()`](#batchtagging) | 批量为用户打标签 |
| [`batchUntagging()`](#batchuntagging) | 批量取消用户标签 |
| [`getUserTags()`](#getusertags) | 获取用户身上的标签列表 |

### create()

```php
public function create($name)
```

创建标签

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 标签名（30 个字符以内） |

### getList()

```php
public function getList()
```

获取公众号已创建的标签

### update()

```php
public function update($id, $name)
```

编辑标签

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `int` | — | 标签 ID |
| `$name` | `string` | — | 新的标签名 |

### deleteTag()

```php
public function deleteTag($id)
```

删除标签

当某个标签下的粉丝超过 10 万时不可删除；标签删除后，粉丝与标签的关系也同时解除。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `int` | — | 标签 ID |

### getUsers()

```php
public function getUsers($tagId, $nextOpenid = null)
```

获取标签下粉丝列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tagId` | `int` | — | 标签 ID |
| `$nextOpenid` | `string|null` | `null` | 第一个拉取的 OPENID，不填默认从头开始拉取 |

### batchTagging()

```php
public function batchTagging($tagId, array $openIds)
```

批量为用户打标签

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tagId` | `int` | — | 标签 ID |
| `$openIds` | `array` | — | 用户 OpenID 列表（每次最多 50 个） |

### batchUntagging()

```php
public function batchUntagging($tagId, array $openIds)
```

批量取消用户标签

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tagId` | `int` | — | 标签 ID |
| `$openIds` | `array` | — | 用户 OpenID 列表 |

### getUserTags()

```php
public function getUserTags($openid)
```

获取用户身上的标签列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 OpenID |

## 同目录

- [Blacklist](/php/api/modules/wechat/officialaccount/apis/usermanagement/blacklist)
- [User](/php/api/modules/wechat/officialaccount/apis/usermanagement/user)
- [UserManagement](/php/api/modules/wechat/officialaccount/apis/usermanagement/user-management)

