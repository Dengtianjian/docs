# SettingsModel

`kernel\Modules\Setting\SettingsModel`  ·  class

源码：`gstudio_kernel/Modules/Setting/SettingsModel.php`

> 系统设置模型（Setting）

## 声明

```php
class SettingsModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 概述

纯粹的持久化模型：以键值对形式存储系统设置项，值经 serialize() 序列化后存入 `value` 字段。
表结构以 Schema 声明（见 $schema），由 Model 基类在 Provisioner/安装阶段据此自动建表。

设置项的增删改查业务逻辑（含读取时的反序列化、序列化写入、`updated_at` 维护）
已抽取到 `SettingService`，本模型只负责数据存取，不承载业务方法。

表名归属由构造参数决定：`$app->make(SettingsModel::class)` 时容器按类型注入应用，
读写该应用的设置表；直接 `new` 且不传则回落默认应用。
`SettingService` 通过容器取用，归属不必手传。

查询统一走 Model 的查询构建器（scopedBuilder 代理）：first()/get()/exists()/
insert()/update()/where()，每次查询均为全新构建器，条件不会跨调用累积。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `mixed` | `"settings"` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |

### __construct()

```php
public function __construct()
```

## 同目录

- [Setting](/php/api/modules/setting/setting)
- [SettingModule](/php/api/modules/setting/setting-module)

