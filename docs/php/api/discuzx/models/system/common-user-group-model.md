# CommonUserGroupModel

`kernel\DiscuzX\Models\System\CommonUserGroupModel`  ·  class

源码：`gstudio_kernel/DiscuzX/Models/System/CommonUserGroupModel.php`

> Discuz 用户组表模型

**无方法**

## 声明

```php
class CommonUserGroupModel extends DiscuzXSystemModel
```

父类：[DiscuzXSystemModel](/php/api/discuzx/models/discuz-x-system-model)

## 概述

对应 Discuz 系统表 `common_usergroup`（真实表名含站点 `tablepre` 前缀，由基类补全）。

## 相关

- [DiscuzXSystemModel](/php/api/discuzx/models/discuz-x-system-model) 基类：补 Discuz 表前缀、关闭时间戳自动维护

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `mixed` | `"common_usergroup"` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$primaryKey` | `string` | protected | — |

## 方法

本类没有公开方法。

## 同目录

- [CommonMemberModel](/php/api/discuzx/models/system/common-member-model)
- [CommonSettingModel](/php/api/discuzx/models/system/common-setting-model)

