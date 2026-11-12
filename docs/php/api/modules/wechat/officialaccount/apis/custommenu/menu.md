# Menu

`kernel\Modules\Wechat\OfficialAccount\Apis\CustomMenu\Menu`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/CustomMenu/Menu.php`

> 自定义菜单 - 普通菜单

## 声明

```php
class Menu extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

微信公众号自定义菜单相关接口。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`createMenu()`](#createmenu) | 创建自定义菜单 |
| [`getMenu()`](#getmenu) | 查询自定义菜单 |
| [`deleteMenu()`](#deletemenu) | 删除自定义菜单 |
| [`getCurrentSelfmenuInfo()`](#getcurrentselfmenuinfo) | 获取自定义菜单配置 |

### createMenu()

```php
public function createMenu($menuData)
```

创建自定义菜单

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$menuData` | `array` | — | 菜单结构数据（button 数组） |

### getMenu()

```php
public function getMenu()
```

查询自定义菜单

返回普通菜单（menu）与个性化菜单（conditionalmenu）。

### deleteMenu()

```php
public function deleteMenu()
```

删除自定义菜单

### getCurrentSelfmenuInfo()

```php
public function getCurrentSelfmenuInfo()
```

获取自定义菜单配置

用于查询菜单的当前配置（包含未通过接口创建、由后台编辑的菜单）。

## 同目录

- [CustomMenu](/php/api/modules/wechat/officialaccount/apis/custommenu/custom-menu)
- [PersonalizedMenu](/php/api/modules/wechat/officialaccount/apis/custommenu/personalized-menu)

