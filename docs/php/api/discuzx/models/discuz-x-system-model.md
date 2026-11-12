# DiscuzXSystemModel

`kernel\DiscuzX\Models\DiscuzXSystemModel`  ·  class

源码：`gstudio_kernel/DiscuzX/Models/DiscuzXSystemModel.php`

> DiscuzX 系统表模型基类

## 声明

```php
class DiscuzXSystemModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 概述

面向 Discuz 自带的数据表（`common_*`、`forum_*` 等），把系统表与框架通用模型的两点差异
收敛到基类，子类只需声明**裸表名**：

1. **表名补 Discuz 的 `tablepre` 前缀**：子类把 `$tableName` 写成不带前缀的表名
（如 `common_member`），构造时经 `\DB::table` 解析为真实表名
（站点 `tablepre = 'pre_'` 时即 `pre_common_member`）。
`\DB::table` 是 Discuz 官方入口（`DB::table()` → `db_driver_mysqli::table_name()`），
会连带处理 Discuz 的分表映射。
2. **默认不维护时间戳字段**：关闭 `created_at` / `updated_at` 的自动填充
（`Model::$timestamps` 与 `Model::$queryTimestamps` 一并关闭）。
Discuz 系统表用自身的时间字段命名（如 `dateline`），不遵循本框架的约定，
若开启会在写入时凭空插入不存在的列。

用法：
```php
class CommonMemberModel extends DiscuzXSystemModel
{
public $tableName = "common_member";
protected $primaryKey = "uid";
}
```

⚠️ 主键不会自动识别：Discuz 系统表的主键多为 `uid` / `tid` / `fid` 等业务名，
与父类默认的 `id` 不同，需要子类自行声明 `$primaryKey`（见上例）。

⚠️ 本类依赖 Discuz 运行环境（`\DB::table` 要求 Discuz 的数据库对象已初始化）。
系统表本身也只在 DiscuzX 上下文中使用，故不做环境判定。

## 示例

```php
class CommonMemberModel extends DiscuzXSystemModel
{
public $tableName = "common_member";
protected $primaryKey = "uid";
}
```

## 相关

- [Model](/php/api/foundation/database/rdb/model) 通用关系型模型基类
- `DiscuzXAddonModel` 插件自建表模型基类

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$timestamps` | `bool` | protected | 是否在 `Model::save` 时自动注入 created_at / updated_at |
| `$queryTimestamps` | `bool` | protected | 是否在 insert() / update() 等查询级写操作时自动注入 created_at / updated_at |

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
取到裸表名后交给 `\DB::table` 补上 Discuz 的 `tablepre` 前缀，再交父类完成初始化。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 不含 Discuz 前缀的表名；为空时取子类声明的 `$tableName` |

## 同目录

- [DiscuzXAddonModel](/php/api/discuzx/models/discuz-x-addon-model)

