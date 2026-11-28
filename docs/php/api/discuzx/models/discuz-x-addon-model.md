# DiscuzAddonModel

`kernel\Discuz\Models\DiscuzAddonModel`  ·  class

源码：`gstudio_kernel/Discuz/Models/DiscuzAddonModel.php`

> Discuz 插件表模型基类

## 声明

```php
class DiscuzAddonModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 概述

面向插件**自建自用**的数据表：子类只声明裸表名，构造时经
`Model::platformTableName` 交给平台规则拼成 `{应用id}_{表名}`。

应用 id 取**本模型所属的应用**（`Model::app`），因此本类要求当前应用已启动。

与 `DiscuzSystemModel` 的分工：
- 本类：插件自建表，表名以应用 id 打头；
- `DiscuzSystemModel`：Discuz 系统表，补站点 `tablepre`、不打应用 id。

⚠️ 子类始终只声明后半段（如 `addons`）即可；完整表名或已带 `gstudio` 前缀的写法
由平台表名规则处理，不要在本类之上再拼一次。

## 示例

```php
class AddonModel extends DiscuzAddonModel
{
public $tableName = "addons";   // → gstudio_devaddon_addons
}
```

## 相关

- [Model](/php/api/foundation/database/rdb/model) 通用关系型模型基类
- `DiscuzSystemModel` Discuz 系统表模型基类

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 |

### __construct()

```php
public function __construct($tableName = null)
```

构造

表名解析顺序：入参 → 子类声明的 `$tableName` → `Model::getDefaultTableName` 按类名推断。
取到裸表名后经 `Model::platformTableName` 按平台规则拼上应用 id 前缀，再交父类完成初始化。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 不含应用前缀的表名；为空时取子类声明的 `$tableName` |

## 同目录

- [DiscuzSystemModel](/php/api/discuzx/models/discuz-x-system-model)

