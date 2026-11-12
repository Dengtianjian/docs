# PersonalizedMenu

`kernel\Modules\Wechat\OfficialAccount\Apis\CustomMenu\PersonalizedMenu`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/CustomMenu/PersonalizedMenu.php`

> 自定义菜单 - 个性化菜单

## 声明

```php
class PersonalizedMenu extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

个性化菜单可根据用户标签、性别、客户端版本等条件为不同用户群展示不同菜单。
个性化菜单的查询可复用 `Menu::getMenu`（响应中的 conditionalmenu 字段）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`add()`](#add) | 创建个性化菜单 |
| [`delete()`](#delete) | 删除个性化菜单 |
| [`tryMatch()`](#trymatch) | 测试个性化菜单匹配结果 |

### add()

```php
public function add($menuData)
```

创建个性化菜单

菜单结构在普通菜单基础上增加 matchrule（匹配规则），如 tag_id、sex、
client_platform_type、country、province、city、language 等。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$menuData` | `array` | — | 含 button 与 matchrule 的菜单数据 |

### delete()

```php
public function delete($menuId)
```

删除个性化菜单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$menuId` | `int|string` | — | 菜单 ID（menuid） |

### tryMatch()

```php
public function tryMatch($userId)
```

测试个性化菜单匹配结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userId` | `string` | — | 用户标识，可以是粉丝的 OpenID，也可以是粉丝的微信号 |

## 同目录

- [CustomMenu](/php/api/modules/wechat/officialaccount/apis/custommenu/custom-menu)
- [Menu](/php/api/modules/wechat/officialaccount/apis/custommenu/menu)

