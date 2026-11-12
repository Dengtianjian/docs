# ForumThreadModel

`kernel\DiscuzX\Models\System\Thread\ForumThreadModel`  ·  class

源码：`gstudio_kernel/DiscuzX/Models/System/Thread/ForumThreadModel.php`

> Discuz 主题表模型

## 声明

```php
class ForumThreadModel extends DiscuzXSystemModel
```

父类：[DiscuzXSystemModel](/php/api/discuzx/models/discuz-x-system-model)

## 概述

对应 Discuz 系统表 `forum_thread`（真实表名含站点 `tablepre` 前缀，由基类补全）。

## 相关

- [DiscuzXSystemModel](/php/api/discuzx/models/discuz-x-system-model) 基类：补 Discuz 表前缀、关闭时间戳自动维护

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `mixed` | `"forum_thread"` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$primaryKey` | `string` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`items()`](#items) | — |

### items()

```php
public function items($tids = null, $subjectKeywords = null, $authorIds = null, $page = 1, $perPage = 10)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tids` | `mixed` | `null` | — |
| `$subjectKeywords` | `mixed` | `null` | — |
| `$authorIds` | `mixed` | `null` | — |
| `$page` | `mixed` | `1` | — |
| `$perPage` | `mixed` | `10` | — |

