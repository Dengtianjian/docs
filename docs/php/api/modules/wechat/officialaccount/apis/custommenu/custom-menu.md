# CustomMenu

`kernel\Modules\Wechat\OfficialAccount\Apis\CustomMenu\CustomMenu`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/CustomMenu/CustomMenu.php`

> 自定义菜单（聚合类）

## 声明

```php
class CustomMenu extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

聚合微信「自定义菜单」分类下的接口，按子域拆分为多个子类：
- 普通菜单：`Menu`
- 个性化菜单：`PersonalizedMenu`

使用示例：

```php
$oa->customMenu()->menu()->createMenu($menuData);
$oa->customMenu()->personalized()->add($conditionalMenuData);
```

## 示例

```php
$oa->customMenu()->menu()->createMenu($menuData);
$oa->customMenu()->personalized()->add($conditionalMenuData);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`menu()`](#menu) | 普通菜单相关接口（创建/查询/删除/查询自定义菜单配置） |
| [`personalized()`](#personalized) | 个性化菜单相关接口（创建/删除/匹配测试） |

### menu()

```php
public function menu()
```

普通菜单相关接口（创建/查询/删除/查询自定义菜单配置）

### personalized()

```php
public function personalized()
```

个性化菜单相关接口（创建/删除/匹配测试）

## 同目录

- [Menu](/php/api/modules/wechat/officialaccount/apis/custommenu/menu)
- [PersonalizedMenu](/php/api/modules/wechat/officialaccount/apis/custommenu/personalized-menu)

