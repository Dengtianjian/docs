# Statement

`kernel\Foundation\Database\RDB\Statement`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Statement.php`

> SQL 语句生成器 — 底层结构化条件到 SQL 字符串的转换引擎

## 声明

```php
class Statement
```

## 概述

Statement 是 ORM 的 SQL 生成层，负责将 Query 构建器产生的结构化条件数组
转换为合法的 SQL 字符串片段。所有方法均为静态方法，无状态、无副作用。

## 核心职责

- **查询构建**：SELECT 字段、FROM 子句、WHERE 条件、ORDER BY、GROUP BY、LIMIT/OFFSET
- **数据操作**：INSERT、UPDATE、BATCH UPDATE、DELETE、INCREMENT/DECREMENT
- **字面量拼接**：PHP 值 → SQL 片段（`format`/`batchFormat`），自动处理
NULL、布尔、数组（JSON/序列化）、Query 子查询、Statement 实例

## 值 vs 标识符

本类只做**字面量拼接**，不做转义 —— 转义能力在驱动层，不在这一层。因此：

- **值**（比较值、LIKE 模式、IN 列表、写入的字段值）由 `Query` 在组装时转成占位符
（如 `:__bind_0`）并登记进 `Query::$bindings`，执行时经驱动的预处理绑定传入，
值不参与 SQL 解析；
- 直接调用本类的静态方法（如 Statement::where()）时没有绑定上下文，值只能内联进 SQL，
调用方须自行保证这些值来自可信来源；
- **标识符**（表名、列名、别名、排序 / 分组字段）与 DDL 片段无法参数化，仍由本类用反引号
或引号包裹后拼接，需由调用方保证其来自代码而非用户输入（`Query::orderBy` 已内置校验）。

## 使用方式

大部分情况下你不需要直接使用 Statement，而是通过 Query 构建器间接调用。
少数需要原生 SQL 片段或自定义 SQL 生成的场景可直接使用：

```php
// 直接生成 SQL 片段
Statement::from('users', 'u');       // `users` AS `u`
Statement::where($conditions);       // WHERE 子句字符串
Statement::insert('logs', $data);    // INSERT INTO ...

// 通过 DB::raw() 快捷创建 Statement 实例嵌入 Query
DB::table('orders')->where('created_at', '>', DB::raw('NOW()'));
```

## 条件类型参考

WHERE 条件支持类型：`comparsion` | `raw` | `sub` | `nullValue` |
`rangeTesting` | `patternMatching` | `columnComparsion` | `func` | `boolean`

## 示例

```php
// 直接生成 SQL 片段
Statement::from('users', 'u');       // `users` AS `u`
Statement::where($conditions);       // WHERE 子句字符串
Statement::insert('logs', $data);    // INSERT INTO ...

// 通过 DB::raw() 快捷创建 Statement 实例嵌入 Query
DB::table('orders')->where('created_at', '>', DB::raw('NOW()'));
```

## 相关

- `Query::addWhere` 查询构建器 — 条件数组的组装层
- [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 关系型数据库驱动 — SQL 执行层

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$comparisonOperators` | `array` | `[ "=", "<>", "!=", "＞", "<", "<=", "＞=",`… | 比较运算符 |
| `$operators` | `array` | `[ "IS NULL", "NOT IS NULL", "BETWEEN", "`… | 运算符 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$baseSQL` | `string` | protected | 基础 SQL |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化 Statement 类 |
| [`getSql()`](#getsql) | 获取 SQL |
| [`format()`](#format) | 格式化数据（拼接为 SQL 字面量，**不做转义**） |
| [`batchFormat()`](#batchformat) | 批量格式化 遍历数组，每个元素都调用 `format` |
| [`from()`](#from) | 生成 FROM 子句 |
| [`where()`](#where) | 生成 WHERE 子句 |
| [`order()`](#order) | 排序 SQL 生成s |
| [`pagination()`](#pagination) | 生成 LIMIT / OFFSET 子句 |
| [`insert()`](#insert) | 生成插入 SQL 支持单行和批量插入，自动检测数据格式： - 单行：['col1' => 'val1', 'col2' => 'val2'] - 批量：[['col1' => 'val1'], ['col1' => 'val2']] |
| [`update()`](#update) | 生成 UPDATE SQL |
| [`batchUpdate()`](#batchupdate) | 生成批量更新 SQL |
| [`delete()`](#delete) | 生成 DELETE SQL |
| [`selectField()`](#selectfield) | 选择语句的字段 SQL 生成 |
| [`increment()`](#increment) | 生成字段自增 SQL |
| [`decrement()`](#decrement) | 生成字段自减 SQL |
| [`groupBy()`](#groupby) | 生成 group by 语句 |
| [`join()`](#join) | 生成 JOIN 子句 |

### __construct()

```php
public function __construct($baseSQL = null)
```

实例化 Statement 类

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$baseSQL` | `string` | `null` | 基础 SQL |

### getSql()

```php
public function getSql()
```

获取 SQL

### format()

```php
public static function format($target, $stringQuote = "`", $arrayFormatMethod = "json")
```

格式化数据（拼接为 SQL 字面量，**不做转义**）

只负责拼接：字符串按 `$stringQuote` 左右包围、数组按 `$arrayFormatMethod` 编码、NULL 转
`NULL`、Query / Statement 实例取其 SQL。因此它适用于标识符与 DDL 等无法参数化的位置；
查询中的**值**请交给 `Query` 的占位符绑定（见类注释「值 vs 标识符」）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `mixed` | — | 格式化的数据 |
| `$stringQuote` | `string` | `"`"` | 字符串包围的符号；如果数据是字符串类型，会被该参数的值左右包围，传入 `false` 就不包围；例如 admin ，传入了 "`"符号，输出的数据就是 `admin` |
| `$arrayFormatMethod` | `mixed` | `"json"` | — |

### batchFormat()

```php
public static function batchFormat($target, $stringQuote = "`", $arrayFormatMethod = "json")
```

批量格式化 遍历数组，每个元素都调用 `format`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `array` | — | 被格式化的目标数组 |
| `$stringQuote` | `string` | `"`"` | 字符串包围的符号；如果数据是字符串类型，会被该参数的值左右包围，传入 `false` 就不包围；例如 admin ，传入了 "`"符号，输出的数据就是 `admin` |
| `$arrayFormatMethod` | `mixed` | `"json"` | — |

### from()

```php
public static function from($from, $asName)
```

生成 FROM 子句

支持表名、库.表、子查询等多种 FROM 数据源格式，
自动处理别名（AS）和 `` 包围。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$from` | `string|callable|Query` | — | 数据源：表名字符串、子查询回调或 Query 实例 |
| `$asName` | `string|null` | — | 别名（已含 AS 则跳过） |

### where()

```php
public static function where($conditions)
```

生成 WHERE 子句

遍历结构化条件数组，递归生成完整的 WHERE SQL 字符串。
支持 8 种条件类型，自动处理布尔连接符（AND/OR）的插入。

## 条件数组结构

每个条件项的基本结构：
```
[
'type'    => 'comparsion',  // 条件类型（必填）
'boolean' => 'AND',         // 与前一个条件的连接符，默认 AND。首项自动忽略
'column'  => 'status',      // 列名（raw/sub 类型可选）
'operator'=> '=',           // 运算符（raw/nullValue 可选）
'value'   => 1,             // 值（可为标量/数组/回调/Query）
]
```

## 支持的条件类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `comparsion` | 比较运算 | `status = 1`、`id IN (1,2,3)` |
| `columnComparsion` | 列对列比较 | `updated_at > created_at` |
| `nullValue` | NULL 判断 | `deleted_at IS NULL` |
| `rangeTesting` | 范围测试 | `age BETWEEN 18 AND 60`、`status IN (1,2)` |
| `patternMatching` | 模式匹配 | `name LIKE '%John%'` |
| `func` | 函数条件 | `DATE(created_at) = '2025-01-01'`、`EXISTS(...)` |
| `raw` | 原始 SQL | `FIND_IN_SET(?, tags)` |
| `sub` | 子查询 | `(SELECT COUNT(*) FROM ...)` |
| `boolean` | 纯连接符 | 仅 AND / OR，不产生条件 SQL |

```php
[
'type'    => 'comparsion',  // 条件类型（必填）
'boolean' => 'AND',         // 与前一个条件的连接符，默认 AND。首项自动忽略
'column'  => 'status',      // 列名（raw/sub 类型可选）
'operator'=> '=',           // 运算符（raw/nullValue 可选）
'value'   => 1,             // 值（可为标量/数组/回调/Query）
]
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$conditions` | `array` | — | 结构化条件数组，由 Query::addWhere() 组装 |

### order()

```php
public static function order($orders)
```

排序 SQL 生成s

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$orders` | `array` | — | 排序规则 |

### pagination()

```php
public static function pagination($limit = null, $offset = null)
```

生成 LIMIT / OFFSET 子句

只给 offset 不给 limit 时，MySQL 不接受裸 `OFFSET`，
此时补上「不限制行数」的 LIMIT 上限值（MySQL / MariaDB 官方推荐写法）。
两个参数都为空时返回空字符串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$limit` | `int|Statement|null` | `null` | 获取的条数 |
| `$offset` | `int|Statement|null` | `null` | 跳过的条数 |

### insert()

```php
public static function insert($tableName, $data, $isReplaceInto = false, $isIgnore = false)
```

生成插入 SQL 支持单行和批量插入，自动检测数据格式： - 单行：['col1' => 'val1', 'col2' => 'val2'] - 批量：[['col1' => 'val1'], ['col1' => 'val2']]

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$data` | `array` | — | 插入数据 |
| `$isReplaceInto` | `bool` | `false` | 是否使用 REPLACE INTO |
| `$isIgnore` | `bool` | `false` | 是否使用 INSERT IGNORE |

### update()

```php
public static function update($tableName, $data, $extraStatement = "")
```

生成 UPDATE SQL

根据关联数组生成 SET 子句，null 值自动转为 NULL，可附加额外条件（WHERE/ORDER/LIMIT）。

```php
Statement::update('users', ['name' => 'Bob', 'status' => 1], 'WHERE id = 5');
// UPDATE users SET `name`='Bob',`status`=1 WHERE id = 5

Statement::update('users', ['deleted_at' => null], 'WHERE id = 1');
// UPDATE users SET `deleted_at`=NULL WHERE id = 1
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$data` | `array` | — | 要更新的字段键值对，如 ['name' => 'Alice', 'status' => 1] |
| `$extraStatement` | `string` | `""` | 额外 SQL 片段（如 WHERE id = 1），不含 UPDATE/SET 关键字 |

### batchUpdate()

```php
public static function batchUpdate($tableName, $fields, $datas, $extraStatement = "")
```

生成批量更新 SQL

通过 REPLACE INTO 实现批量更新，适用于多条记录的一次性更新操作。
注意：REPLACE INTO 会删除旧行再插入新行，因此未指定的字段将丢失或被设为默认值。

```php
Statement::batchUpdate('users',
['id', 'name', 'status'],
[[1, 'Alice', 1], [2, 'Bob', 0], [3, 'Carol', 1]]
);
// REPLACE INTO users (`id`,`name`,`status`) VALUES (1,'Alice',1),(2,'Bob',0),(3,'Carol',1);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$fields` | `array` | — | 字段名列表，如 ['id', 'name', 'status'] |
| `$datas` | `array` | — | 二维数据数组，每行按 $fields 的顺序排列值 |
| `$extraStatement` | `string` | `""` | 额外 SQL 片段（拼接在 REPLACE INTO 之后） |

### delete()

```php
public static function delete($tableName, $condition)
```

生成 DELETE SQL

```php
Statement::delete('users', 'WHERE id = 1');
// DELETE FROM users WHERE id = 1
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$condition` | `string` | — | 条件子句（含 WHERE），由 Query 构建好传入 |

### selectField()

```php
public static function selectField($fields, $distinct = false)
```

选择语句的字段 SQL 生成

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fields` | `array` | — | 查询的字段名称 |
| `$distinct` | `boolean` | `false` | 查询唯一 |

### increment()

```php
public static function increment($tableName, $field, $value)
```

生成字段自增 SQL

在数据库层面执行字段加法，避免并发读写的数据竞争问题。
生成的 SQL 不含 WHERE 条件，实际使用时由 Query 拼接。

```php
Statement::increment('articles', 'view_count', 1);
// UPDATE `articles` SET `view_count` = view_count+1
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$field` | `string` | — | 字段名 |
| `$value` | `int|float` | — | 增量值 |

### decrement()

```php
public static function decrement($tableName, $field, $value)
```

生成字段自减 SQL

与 increment 对称，在数据库层面执行字段减法。

```php
Statement::decrement('inventory', 'stock', 5);
// UPDATE `inventory` SET `stock` = stock-5
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$field` | `string` | — | 字段名 |
| `$value` | `int|float` | — | 减量值 |

### groupBy()

```php
public static function groupBy($fieldNames)
```

生成 group by 语句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fieldNames` | `array` | — | 分组的字段名 |

### join()

```php
public static function join($joins)
```

生成 JOIN 子句

将结构化 JOIN 数组转为 SQL 片段，自动处理表名 `` 包围、
表别名（AS）和 ON 条件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$joins` | `array` | — | 格式与 Query::$options['joins'] 一致： |

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Table](/php/api/foundation/database/rdb/table)

