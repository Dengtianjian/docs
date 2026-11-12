# Query

`kernel\Foundation\Database\RDB\Query`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Query.php`

> 数据库查询构建器

## 声明

```php
class Query extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

提供流畅的链式 API 构建 SQL 查询，支持 SELECT / INSERT / UPDATE / DELETE，
以及子查询、联结、聚合函数、分页等高级特性。

使用方式：
```php
// 通过 table() 静态入口创建实例并链式调用
Query::table('users')->where('status', 'active')->get();

// 或直接 new
(new Query('users'))->where('id', 1)->first();
```

## 实例状态（重要）

本实例会保留已构建的查询状态。**仅在执行写操作后自动 reset()**，
读操作（get / first / count 等）执行后不会重置，连续查询会导致条件累积：

```php
$query = Query::table('users');
$query->where('status', 1)->get();
$query->where('age', 18)->get();   // 实为 WHERE status = 1 AND age = 18
```

需要复用时请手动 reset() 或每次新建实例；
涉及 Model 的查询建议走 ModelBuilder，它每次都创建全新的 Query。

## 代码组织（自上而下）

属性（驱动与执行状态 / 查询构建状态 / 参数绑定 / SQL 输出）
→ 构造与驱动 → 查询状态 → 参数绑定 → SQL 生成 → SQL 片段与表达式
→ FROM 与 JOIN → SELECT 字段 → ORDER BY → GROUP BY → LIMIT/OFFSET/分页
→ WHERE 条件 → OR WHERE 条件 → 条件过滤
→ 结果获取 → 聚合函数 → 存在性判断 → 写操作

## 示例

```php
// 通过 table() 静态入口创建实例并链式调用
Query::table('users')->where('status', 'active')->get();

// 或直接 new
(new Query('users'))->where('id', 1)->first();
```

## 示例

```php
$query = Query::table('users');
$query->where('status', 1)->get();
$query->where('age', 18)->get();   // 实为 WHERE status = 1 AND age = 18
```

## 相关

- `Model` 在 Query 之上提供 ActiveRecord 与类型转换
- `ModelBuilder` 每次查询创建全新 Query，无状态残留

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `table(string|null $tableName = null, AbstractDriver|null $databaseDriver = null)` | 创建 Query 实例并指定表名 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$databaseDriver` | `AbstractDriver` | protected | 数据库驱动实例 |
| `$executeType` | `string` | private | 当前 SQL 操作类型 |
| `$executeReset` | `boolean` | protected | 执行后是否自动重置查询参数 |
| `$options` | `array` | private | 查询选项数组 |
| `$filterNullConditions` | `array` | private | 可空过滤条件集合 |
| `$bindings` | `array` | protected | 参数绑定数组 |
| `$bindingCounter` | `int` | private | 自增绑定计数器 |
| `$sql` | `string` | protected | 当前构建的 SQL 语句 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造查询构建器实例 |
| [`__clone()`](#__clone) | 允许克隆查询实例 |
| [`setDatabaseDriver()`](#setdatabasedriver) | 设置执行 SQL 时使用的数据库驱动 |
| [`getDatabaseDriver()`](#getdatabasedriver) | 获取当前使用的数据库驱动 |
| [`getTableName()`](#gettablename) | 获取当前查询绑定的表名 |
| [`table()`](#table) | 静态工厂：创建 Query 实例并指定表名 |
| [`fill()`](#fill) | 填充执行类型与选项 |
| [`reset()`](#reset) | 重置查询参数 |
| [`bind()`](#bind) | 添加绑定参数 |
| [`addBindings()`](#addbindings) | 批量添加绑定参数 |
| [`getBindings()`](#getbindings) | 获取所有累积的绑定参数 |
| [`getSql()`](#getsql) | 获取当前查询对应的 SQL 语句（调试用） |
| [`writeSql()`](#writesql) | 设置写操作状态并返回 SQL（不执行，供外层获取 SQL 后自行执行） |
| [`raw()`](#raw) | 创建原始 SQL 表达式包装器 |
| [`from()`](#from) | 设置查询的主表 |
| [`fromSub()`](#fromsub) | 设置子查询作为数据源 |
| [`join()`](#join) | 添加 JOIN 子句 |
| [`leftJoin()`](#leftjoin) | 添加 LEFT JOIN 子句 |
| [`rightJoin()`](#rightjoin) | 添加 RIGHT JOIN 子句 |
| [`innerJoin()`](#innerjoin) | 添加 INNER JOIN 子句 |
| [`select()`](#select) | 设置查询字段 |
| [`selectRaw()`](#selectraw) | 设置原始SQL查询字段 |
| [`addSelect()`](#addselect) | 添加查询字段 |
| [`selectSub()`](#selectsub) | 设置子查询作为查询字段 |
| [`distinct()`](#distinct) | 设置去重查询 |
| [`orderBy()`](#orderby) | 设置排序条件 |
| [`orderByRaw()`](#orderbyraw) | 设置原始SQL排序条件 |
| [`orderRandom()`](#orderrandom) | 设置随机排序 |
| [`groupBy()`](#groupby) | 设置分组条件 |
| [`groupByRaw()`](#groupbyraw) | 原始 SQL GROUP BY 子句 |
| [`limit()`](#limit) | 设置查询结果数量限制（LIMIT） |
| [`take()`](#take) | 设置查询结果数量限制（LIMIT 的别名） |
| [`offset()`](#offset) | 设置查询结果的偏移量（OFFSET） |
| [`skip()`](#skip) | 设置查询结果的偏移量（OFFSET 的别名） |
| [`page()`](#page) | 基于页码的便捷分页 |
| [`paginate()`](#paginate) | 分页查询（含总数统计） |
| [`where()`](#where) | 基础 WHERE 条件 |
| [`whereRaw()`](#whereraw) | 原始 SQL WHERE 条件 |
| [`whereBetween()`](#wherebetween) | BETWEEN 范围条件 |
| [`whereNotBetween()`](#wherenotbetween) | NOT BETWEEN 范围条件 |
| [`whereIn()`](#wherein) | IN 列表条件 |
| [`whereNotIn()`](#wherenotin) | NOT IN 列表条件 |
| [`whereNull()`](#wherenull) | IS NULL 条件 |
| [`whereNotNull()`](#wherenotnull) | IS NOT NULL 条件 |
| [`whereLike()`](#wherelike) | LIKE 模糊匹配条件 |
| [`whereNotLike()`](#wherenotlike) | NOT LIKE 不匹配条件 |
| [`whereColumn()`](#wherecolumn) | 列与列比较条件 |
| [`whereDate()`](#wheredate) | 日期条件 |
| [`whereYear()`](#whereyear) | 年份条件 |
| [`whereMonth()`](#wheremonth) | 月份条件 |
| [`whereDay()`](#whereday) | 天数条件 |
| [`whereTime()`](#wheretime) | 时间条件 |
| [`whereHour()`](#wherehour) | 小时条件 |
| [`whereMinute()`](#whereminute) | 分钟条件 |
| [`whereSecond()`](#wheresecond) | 秒数条件 |
| [`whereExists()`](#whereexists) | EXISTS 子查询条件 |
| [`whereNotExists()`](#wherenotexists) | NOT EXISTS 子查询条件 |
| [`orWhere()`](#orwhere) | OR WHERE 条件 |
| [`orWhereRaw()`](#orwhereraw) | OR 原始 SQL WHERE 条件 |
| [`orWhereBetween()`](#orwherebetween) | OR BETWEEN 范围条件 |
| [`orWhereNotBetween()`](#orwherenotbetween) | OR NOT BETWEEN 范围条件 |
| [`orWhereIn()`](#orwherein) | OR IN 列表条件 |
| [`orWhereNotIn()`](#orwherenotin) | OR NOT IN 列表条件 |
| [`orWhereNull()`](#orwherenull) | OR IS NULL 条件 |
| [`orWhereNotNull()`](#orwherenotnull) | OR IS NOT NULL 条件 |
| [`orWhereLike()`](#orwherelike) | OR LIKE 模糊匹配条件 |
| [`orWhereNotLike()`](#orwherenotlike) | OR NOT LIKE 不匹配条件 |
| [`orWhereColumn()`](#orwherecolumn) | OR 列与列比较条件 |
| [`orWhereDate()`](#orwheredate) | OR 日期条件 |
| [`orWhereYear()`](#orwhereyear) | OR 年份条件 |
| [`orWhereMonth()`](#orwheremonth) | OR 月份条件 |
| [`orWhereDay()`](#orwhereday) | OR 天数条件 |
| [`orWhereTime()`](#orwheretime) | OR 时间条件 |
| [`orWhereHour()`](#orwherehour) | OR 小时条件 |
| [`orWhereMinute()`](#orwhereminute) | OR 分钟条件 |
| [`orWhereSecond()`](#orwheresecond) | OR 秒数条件 |
| [`orWhereExists()`](#orwhereexists) | OR EXISTS 子查询条件 |
| [`orWhereNotExists()`](#orwherenotexists) | OR NOT EXISTS 子查询条件 |
| [`whereFilter()`](#wherefilter) | 从数组中批量添加过滤条件，自动跳过空值 |
| [`first()`](#first) | 获取查询结果的第一条记录 |
| [`value()`](#value) | 获取第一条记录的指定列值 |
| [`get()`](#get) | 获取所有查询结果 |
| [`pluck()`](#pluck) | 提取指定列的值作为数组 |
| [`cursor()`](#cursor) | 使用游标（Generator）逐行遍历查询结果 |
| [`chunk()`](#chunk) | 分块处理查询结果 |
| [`chunkById()`](#chunkbyid) | 基于 ID 的分块处理（高性能） |
| [`chunkStream()`](#chunkstream) | 基于 ID 的分块流式处理（生成器） |
| [`count()`](#count) | 统计查询结果数量 |
| [`max()`](#max) | 获取指定列的最大值 |
| [`min()`](#min) | 获取指定列的最小值 |
| [`avg()`](#avg) | 计算指定列的平均值 |
| [`sum()`](#sum) | 计算指定列的总和 |
| [`exists()`](#exists) | 查询是否存在 |
| [`notExists()`](#notexists) | 查询是否不存在 |
| [`insert()`](#insert) | 执行插入操作 |
| [`insertGetId()`](#insertgetid) | 执行插入操作并返回自增 ID |
| [`update()`](#update) | 执行更新操作 |
| [`delete()`](#delete) | 执行删除操作 |

### __construct()

```php
public function __construct($tableName = null, $databaseDriver = null)
```

构造查询构建器实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 表名（可选，也可通过 from() 链式设置） |
| `$databaseDriver` | `AbstractDriver|null` | `null` | 数据库驱动，默认使用当前连接 |

### __clone()

```php
public function __clone()
```

允许克隆查询实例

上级 `BaseObject` 把 `__clone` 私有化以保证单例唯一性，而 Query 是**有状态的可变构建器**：
`paginate` / `chunk` 需要克隆出独立副本来执行 COUNT 等辅助查询，
因此这里重新声明为 public 以便克隆。

克隆语义：**驱动实例有意共享** —— 连接对象不可复制，克隆出的辅助查询必须与原实例走同一条连接；
除此之外的构建状态（options / bindings / sql 等）都是值类型，克隆后两份互不影响。

### setDatabaseDriver()

```php
public function setDatabaseDriver($driver)
```

设置执行 SQL 时使用的数据库驱动

允许动态切换数据库连接，适用于多数据库或读写分离场景

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$driver` | `AbstractDriver` | — | 数据库驱动实例，继承自 [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) |

### getDatabaseDriver()

```php
public function getDatabaseDriver()
```

获取当前使用的数据库驱动

返回当前查询构建器绑定的数据库驱动实例，可用于执行原生的 PDO 操作

### getTableName()

```php
public function getTableName()
```

获取当前查询绑定的表名

### table()

```php
public static function table($tableName = null, $databaseDriver = null)
```

静态工厂：创建 Query 实例并指定表名

命名更符合直觉，是 new Query($tableName) 的快捷方式

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 表名 |
| `$databaseDriver` | `AbstractDriver|null` | `null` | 数据库驱动 |

### fill()

```php
public function fill($executeType, $options)
```

填充执行类型与选项

用于子查询或 Model 层注入预构建的查询状态，不经过完整链式调用

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$executeType` | `string` | — | 执行类型 (select/insert/update/delete) |
| `$options` | `array` | — | 选项数组（from、select、conditions 等） |

### reset()

```php
public function reset()
```

重置查询参数

将所有查询选项恢复为初始状态，但保留 from（表名）和 databaseDriver 配置。
受 $this->executeReset 标志控制，若已设为 false 则跳过重置。
通常无需手动调用，executeWrite() 在 INSERT/UPDATE/DELETE 执行后会自动重置。

重置内容包括：
- executeType（操作类型）
- orders（排序）、select 字段、conditions（WHERE 条件）
- pagination（分页）、groupBy、data
- SQL 语句缓存、绑定参数、绑定计数器

### bind()

```php
public function bind($key, $value)
```

添加绑定参数

向查询中添加预处理绑定参数，用于占位符的值替换。
支持命名占位符（:name）和问号占位符（?）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|int` | — | 占位符名称（如 ':id'）或位置索引 |
| `$value` | `mixed` | — | 绑定的值 |

### addBindings()

```php
public function addBindings(array $bindings)
```

批量添加绑定参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$bindings` | `array` | — | 绑定参数数组，键为占位符名称/索引，值为绑定的值 |

### getBindings()

```php
public function getBindings()
```

获取所有累积的绑定参数

### getSql()

```php
public function getSql()
```

获取当前查询对应的 SQL 语句（调试用）

调用 generateSql() 返回完整 SQL 字符串，可用于日志记录或调试。
注意：返回的 SQL 中包含占位符，不会替换为实际值。

### writeSql()

```php
public function writeSql($type, $data = null, $options = [])
```

设置写操作状态并返回 SQL（不执行，供外层获取 SQL 后自行执行）

返回的是**纯 SQL 文本**（值内联在内、不带绑定），调用方自行执行时无法再做参数绑定，
因此 `$data` 只应放可信来源的值；能用 `insert` / `update` 直接执行的场景
请优先用它们 —— 那两个入口的写入值会走占位符绑定。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 操作类型: insert, replace, update, delete |
| `$data` | `mixed` | `null` | 数据（insert/replace/update 需要） |
| `$options` | `array` | `[]` | 额外选项，如 ['insertIsIgnore' => true] |

### raw()

```php
public function raw($sql)
```

创建原始 SQL 表达式包装器

将字符串标记为原始 SQL，插入到查询中时不会被转义或加引号。
适用于需要插入 SQL 函数调用、表达式等场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原始 SQL 表达式 |

### from()

```php
public function from($tableName, $asName = null)
```

设置查询的主表

指定查询操作的目标数据表，支持表别名

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名 |
| `$asName` | `string|null` | `null` | 表别名（可选） |

### fromSub()

```php
public function fromSub($callableOrQuery, $asName = null)
```

设置子查询作为数据源

使用子查询或闭包作为查询的数据源

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callableOrQuery` | `callable|Query` | — | 子查询或闭包 |
| `$asName` | `string|null` | `null` | 子查询别名（可选） |

### join()

```php
public function join($table, $first, $operator, $second, $type = 'INNER')
```

添加 JOIN 子句

在查询中添加 JOIN 关联，支持 INNER/LEFT/RIGHT JOIN 及其 ON 条件。
多次调用可叠加多个 JOIN。ON 条件中的列名自动添加 `` 包围。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$table` | `string` | — | 关联表名，支持 `表名 AS 别名` 格式自动解析 |
| `$first` | `string` | — | ON 条件左侧列名（如 'users.id'） |
| `$operator` | `string` | — | 比较运算符（如 '='） |
| `$second` | `string` | — | ON 条件右侧列名（如 'profiles.user_id'） |
| `$type` | `string` | `'INNER'` | JOIN 类型：'INNER' | 'LEFT' | 'RIGHT'，默认 'INNER' |

### leftJoin()

```php
public function leftJoin($table, $first, $operator, $second)
```

添加 LEFT JOIN 子句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$table` | `string` | — | 关联表名 |
| `$first` | `string` | — | ON 条件左侧 |
| `$operator` | `string` | — | 比较运算符 |
| `$second` | `string` | — | ON 条件右侧 |

### rightJoin()

```php
public function rightJoin($table, $first, $operator, $second)
```

添加 RIGHT JOIN 子句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$table` | `string` | — | 关联表名 |
| `$first` | `string` | — | ON 条件左侧 |
| `$operator` | `string` | — | 比较运算符 |
| `$second` | `string` | — | ON 条件右侧 |

### innerJoin()

```php
public function innerJoin($table, $first, $operator, $second)
```

添加 INNER JOIN 子句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$table` | `string` | — | 关联表名 |
| `$first` | `string` | — | ON 条件左侧 |
| `$operator` | `string` | — | 比较运算符 |
| `$second` | `string` | — | ON 条件右侧 |

### select()

```php
public function select(...$column)
```

设置查询字段

指定要查询的字段列表，支持多个参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `...mixed` | — | 字段名列表 |

### selectRaw()

```php
public function selectRaw($columnSql)
```

设置原始SQL查询字段

使用原始SQL表达式作为查询字段

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$columnSql` | `string` | — | 原始SQL字段表达式 |

### addSelect()

```php
public function addSelect(...$column)
```

添加查询字段

向现有查询字段列表中添加新字段
自动识别字段类型（普通字段、原始SQL、带别名字段、SQL 实例）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `...mixed` | — | 字段名或表达式 |

### selectSub()

```php
public function selectSub($callbackOrQuery, $asName)
```

设置子查询作为查询字段

使用子查询的结果作为查询的一个字段

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callbackOrQuery` | `callable|Query` | — | 子查询或闭包 |
| `$asName` | `string` | — | 字段别名 |

### distinct()

```php
public function distinct(...$column)
```

设置去重查询

查询结果去重，可指定去重字段

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `...mixed` | — | 去重字段列表（可选） |

### orderBy()

```php
public function orderBy($column, $by = "ASC")
```

设置排序条件

按指定字段和方向排序查询结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string|int|Statement` | — | 排序字段：标识符、多字段串、正整数列位或 `raw` 包装的表达式 |
| `$by` | `string` | `"ASC"` | 排序方向，`ASC` 或 `DESC`（大小写不敏感） |

可能抛出：

- [Error](/php/api/foundation/exception/error) 方向不是 ASC / DESC，或字段名含标识符之外的字符

### orderByRaw()

```php
public function orderByRaw($rawSql)
```

设置原始SQL排序条件

使用原始SQL表达式进行排序

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rawSql` | `string` | — | 原始SQL排序表达式 |

### orderRandom()

```php
public function orderRandom($seed = null)
```

设置随机排序

对查询结果进行随机排序

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$seed` | `mixed` | `null` | 随机种子（可选） |

### groupBy()

```php
public function groupBy(...$column)
```

设置分组条件

按指定字段对查询结果进行分组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `...mixed` | — | 分组字段列表 |

### groupByRaw()

```php
public function groupByRaw($rawSql)
```

原始 SQL GROUP BY 子句

使用原始 SQL 表达式设置 GROUP BY 子句的便捷方法
将原始 SQL 包装为 SQL 对象后传递给 groupBy 方法

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rawSql` | `string` | — | 原始 SQL 分组表达式 |

### limit()

```php
public function limit($value)
```

设置查询结果数量限制（LIMIT）

限制查询返回的最大记录数，对应 SQL LIMIT 子句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|Statement` | — | 最多返回的记录数量 |

### take()

```php
public function take($value)
```

设置查询结果数量限制（LIMIT 的别名）

功能与 limit() 完全一致，提供更语义化的方法名

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|Statement` | — | 最多获取的记录数量 |

### offset()

```php
public function offset($value)
```

设置查询结果的偏移量（OFFSET）

跳过指定数量的记录后开始返回结果，对应 SQL OFFSET 子句。
通常与 limit() 配合使用实现分页。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|Statement` | — | 跳过的记录数量（偏移值） |

### skip()

```php
public function skip($value)
```

设置查询结果的偏移量（OFFSET 的别名）

功能与 offset() 完全一致，命名更直观

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|Statement` | — | 跳过的记录数量 |

### page()

```php
public function page($page, $perPage = 10)
```

基于页码的便捷分页

根据页码和每页数量自动计算 offset 值。
等价于同时调用 limit($perPage) 和 offset(($page - 1) * $perPage)。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$page` | `int` | — | 页码，从 1 开始（小于 1 时视为第 1 页） |
| `$perPage` | `int` | `10` | 每页记录数，默认 10 |

### paginate()

```php
public function paginate($params = [])
```

分页查询（含总数统计）

克隆当前查询实例执行 COUNT 统计总数，然后执行当前查询获取当前页数据，
返回包含数据、页码、总数等信息的 Paginator 对象。
需配合 limit()/offset() 或 page() 设置分页参数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | `[]` | 预处理参数，传递给底层 count() 和 get() 调用 |

### where()

```php
public function where($column, $valueOrOperator = null, $value = null)
```

基础 WHERE 条件

支持多种调用方式：
- where('column', 'value')                    // 默认操作符 '='
- where('column', 'operator', 'value')        // 指定操作符
- where(['col1' => 'val1', 'col2' => 'val2']) // 多条件数组
- where(['column','operator',"value'], ['column',"value"]]) // 多条件数组
- where(function ($q) { ... })                 // 闭包分组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `mixed` | — | 列名、条件数组或闭包 |
| `$valueOrOperator` | `mixed` | `null` | 值或操作符 |
| `$value` | `mixed` | `null` | OrOperator 值或操作符 |

### whereRaw()

```php
public function whereRaw($sql)
```

原始 SQL WHERE 条件

直接使用原始SQL表达式作为条件
注意：需要确保SQL的安全性，防止SQL注入

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原始SQL表达式 |

### whereBetween()

```php
public function whereBetween($column, $min, $max)
```

BETWEEN 范围条件

筛选列值在指定区间 [min, max] 内的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$min` | `mixed` | — | 区间最小值 |
| `$max` | `mixed` | — | 区间最大值 |

### whereNotBetween()

```php
public function whereNotBetween($column, $min, $max)
```

NOT BETWEEN 范围条件

筛选列值不在指定区间内的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$min` | `mixed` | — | 区间最小值 |
| `$max` | `mixed` | — | 区间最大值 |

### whereIn()

```php
public function whereIn($column, $valueOrQuery)
```

IN 列表条件

筛选列值在给定值集合或子查询结果中的记录。
数组值会自动生成占位符绑定，防止 SQL 注入。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$valueOrQuery` | `array|Query` | — | IN 的值数组或子查询 |

### whereNotIn()

```php
public function whereNotIn($column, $valueOrQuery)
```

NOT IN 列表条件

筛选列值不在给定值集合或子查询结果中的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$valueOrQuery` | `array|Query` | — | NOT IN 的值数组或子查询 |

### whereNull()

```php
public function whereNull($column)
```

IS NULL 条件

筛选列值为 NULL 的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |

### whereNotNull()

```php
public function whereNotNull($column)
```

IS NOT NULL 条件

筛选列值不为 NULL 的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |

### whereLike()

```php
public function whereLike($column, $value)
```

LIKE 模糊匹配条件

使用 SQL LIKE 进行模式匹配。通配符 % 和 _ 需要在传入值中自行添加。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$value` | `string` | — | 匹配模式（需自行添加 % 和 _ 通配符） |

### whereNotLike()

```php
public function whereNotLike($column, $value)
```

NOT LIKE 不匹配条件

筛选不匹配指定模式的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$value` | `string` | — | 不匹配的模式 |

### whereColumn()

```php
public function whereColumn($column1, $operatorOrColumn2, $column2 = null)
```

列与列比较条件

比较两个列的值，而非列与常量比较。
支持两种调用方式：
- whereColumn('col1', 'col2')              → col1 = col2
- whereColumn('col1', '>', 'col2')         → col1 > col2

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column1` | `string` | — | 第一个列名 |
| `$operatorOrColumn2` | `string` | — | 操作符（3参时）或第二个列名（2参时） |
| `$column2` | `string|null` | `null` | 第二个列名（3参时使用） |

### whereDate()

```php
public function whereDate($column, $operatorOrValue, $value = null)
```

日期条件

对日期部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `string` | — | 操作符或值 |
| `$value` | `string` | `null` | 值（当使用三个参数时） |

### whereYear()

```php
public function whereYear($column, $operatorOrValue, $value = null)
```

年份条件

对年份部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereMonth()

```php
public function whereMonth($column, $operatorOrValue, $value = null)
```

月份条件

对月份部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereDay()

```php
public function whereDay($column, $operatorOrValue, $value = null)
```

天数条件

对天数部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereTime()

```php
public function whereTime($column, $operatorOrValue, $value = null)
```

时间条件

对时间部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `string` | — | 操作符或值 |
| `$value` | `string` | `null` | 值（当使用三个参数时） |

### whereHour()

```php
public function whereHour($column, $operatorOrValue, $value = null)
```

小时条件

对小时部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereMinute()

```php
public function whereMinute($column, $operatorOrValue, $value = null)
```

分钟条件

对分钟部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereSecond()

```php
public function whereSecond($column, $operatorOrValue, $value = null)
```

秒数条件

对秒数部分进行比较

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `int|string` | — | 操作符或值 |
| `$value` | `int|string` | `null` | 值（当使用三个参数时） |

### whereExists()

```php
public function whereExists($queryOrCallable)
```

EXISTS 子查询条件

使用 EXISTS 子查询，仅当子查询存在结果时当前记录才被选中。
常用于关联表的存在性判断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryOrCallable` | `Query|callable` | — | 子查询实例或闭包 |

### whereNotExists()

```php
public function whereNotExists($queryOrCallable)
```

NOT EXISTS 子查询条件

使用 NOT EXISTS 子查询，仅当子查询无结果时当前记录才被选中

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryOrCallable` | `Query|callable` | — | 子查询实例或闭包 |

### orWhere()

```php
public function orWhere($column, $valueOrOperator = null, $value = null)
```

OR WHERE 条件

用法与 where() 相同，但使用 OR 连接。
支持闭包分组：传入 callable 时，闭包内的所有条件会自动用括号包裹。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `mixed` | — | 列名、条件数组或闭包 |
| `$valueOrOperator` | `mixed` | `null` | 值或操作符 |
| `$value` | `mixed` | `null` | OrOperator 值或操作符 |

### orWhereRaw()

```php
public function orWhereRaw($sql)
```

OR 原始 SQL WHERE 条件

直接使用原始SQL表达式作为条件，使用 OR 连接
注意：需要确保SQL的安全性，防止SQL注入

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原始SQL表达式 |

### orWhereBetween()

```php
public function orWhereBetween($column, $min, $max)
```

OR BETWEEN 范围条件

以 OR 连接，筛选列值在指定区间内的记录。
用法与 whereBetween() 相同，但使用 OR 连接符。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$min` | `mixed` | — | 区间最小值 |
| `$max` | `mixed` | — | 区间最大值 |

### orWhereNotBetween()

```php
public function orWhereNotBetween($column, $min, $max)
```

OR NOT BETWEEN 范围条件

以 OR 连接，筛选列值不在指定区间内的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$min` | `mixed` | — | 区间最小值 |
| `$max` | `mixed` | — | 区间最大值 |

### orWhereIn()

```php
public function orWhereIn($column, $valueOrQuery)
```

OR IN 列表条件

以 OR 连接，筛选列值在给定值集合中的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$valueOrQuery` | `array|Query` | — | IN 的值数组或子查询 |

### orWhereNotIn()

```php
public function orWhereNotIn($column, $valueOrQuery)
```

OR NOT IN 列表条件

以 OR 连接，筛选列值不在给定值集合中的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$valueOrQuery` | `array|Query` | — | NOT IN 的值数组或子查询 |

### orWhereNull()

```php
public function orWhereNull($column)
```

OR IS NULL 条件

以 OR 连接，筛选列值为 NULL 的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |

### orWhereNotNull()

```php
public function orWhereNotNull($column)
```

OR IS NOT NULL 条件

以 OR 连接，筛选列值不为 NULL 的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |

### orWhereLike()

```php
public function orWhereLike($column, $value)
```

OR LIKE 模糊匹配条件

以 OR 连接，使用 LIKE 进行模糊匹配

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$value` | `mixed` | — | 匹配模式（需自行添加通配符） |

### orWhereNotLike()

```php
public function orWhereNotLike($column, $value)
```

OR NOT LIKE 不匹配条件

以 OR 连接，筛选不匹配指定模式的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$value` | `mixed` | — | 不匹配的模式 |

### orWhereColumn()

```php
public function orWhereColumn($column1, $operatorOrColumn2, $column2 = null)
```

OR 列与列比较条件

以 OR 连接，比较两个列的值。
支持两种调用方式：
- orWhereColumn('col1', 'col2')              → col1 = col2
- orWhereColumn('col1', '>', 'col2')         → col1 > col2

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column1` | `string` | — | 第一个列名 |
| `$operatorOrColumn2` | `string` | — | 操作符（3参时）或第二个列名（2参时） |
| `$column2` | `string|null` | `null` | 第二个列名（3参时使用） |

### orWhereDate()

```php
public function orWhereDate($column, $operatorOrValue, $value = null)
```

OR 日期条件

对日期部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereYear()

```php
public function orWhereYear($column, $operatorOrValue, $value = null)
```

OR 年份条件

对年份部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereMonth()

```php
public function orWhereMonth($column, $operatorOrValue, $value = null)
```

OR 月份条件

对月份部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereDay()

```php
public function orWhereDay($column, $operatorOrValue, $value = null)
```

OR 天数条件

对天数部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereTime()

```php
public function orWhereTime($column, $operatorOrValue, $value = null)
```

OR 时间条件

对时间部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereHour()

```php
public function orWhereHour($column, $operatorOrValue, $value = null)
```

OR 小时条件

对小时部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereMinute()

```php
public function orWhereMinute($column, $operatorOrValue, $value = null)
```

OR 分钟条件

对分钟部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereSecond()

```php
public function orWhereSecond($column, $operatorOrValue, $value = null)
```

OR 秒数条件

对秒数部分进行比较，使用 OR 连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 列名 |
| `$operatorOrValue` | `mixed` | — | 操作符或值 |
| `$value` | `mixed` | `null` | 值（当使用三个参数时） |

### orWhereExists()

```php
public function orWhereExists($queryOrCallable)
```

OR EXISTS 子查询条件

以 OR 连接，使用 EXISTS 子查询进行存在性判断

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryOrCallable` | `Query|callable` | — | 子查询实例或闭包 |

### orWhereNotExists()

```php
public function orWhereNotExists($queryOrCallable)
```

OR NOT EXISTS 子查询条件

以 OR 连接，使用 NOT EXISTS 子查询判断不存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$queryOrCallable` | `Query|callable` | — | 子查询实例或闭包 |

### whereFilter()

```php
public function whereFilter($data, $operator = "AND")
```

从数组中批量添加过滤条件，自动跳过空值

接收关联数组（如 $_GET），将键作为字段名、值作为条件值，
自动过滤值为 null、空字符串的项，仅添加有效条件。
适用于前端传入的搜索/筛选参数场景，无需控制器逐个判断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 关联数组，键为字段名，值为条件值 |
| `$operator` | `string` | `"AND"` | 逻辑连接符（AND/OR），默认 AND |

### first()

```php
public function first($params = [])
```

获取查询结果的第一条记录

自动添加 LIMIT 1 约束后执行查询，返回第一条记录。
若没有匹配记录，返回 false。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | `[]` | 预处理参数，用于 SQL 中的占位符替换 |

### value()

```php
public function value($column, $params = [])
```

获取第一条记录的指定列值

查询第一条记录并直接返回指定列的值，无需手动访问数组。
记录不存在或列名不存在时返回 null。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要获取值的列名 |
| `$params` | `array` | `[]` | 预处理参数 |

### get()

```php
public function get($params = [])
```

获取所有查询结果

执行查询并返回所有匹配的记录，每条记录为关联数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | `[]` | 预处理参数，用于 SQL 中的占位符替换 |

### pluck()

```php
public function pluck($column, $indexKey = null, $params = [])
```

提取指定列的值作为数组

查询所有结果并提取指定列的值。可选择使用另一列作为结果数组的键名。
内部使用 PHP 的 array_column() 实现。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要提取值的列名 |
| `$indexKey` | `string|null` | `null` | 作为数组键名的列名（可选，为 null 时使用数字索引） |
| `$params` | `array` | `[]` | 预处理参数 |

### cursor()

```php
public function cursor($params = [])
```

使用游标（Generator）逐行遍历查询结果

创建 PDOStatement 游标逐行取回数据，通过 yield 返回生成器。
适用于处理大量数据时避免一次性加载到内存中，显著降低内存占用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | `[]` | 预处理参数 |

### chunk()

```php
public function chunk($size, $callback)
```

分块处理查询结果

将结果集按指定大小分块，每次回调处理一个数据块。
内部使用 page() + paginate() 实现分页，适用于批量处理。
回调返回 false 可提前中断处理。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$size` | `int` | — | 每块的大小（记录数） |
| `$callback` | `callable` | — | 处理回调，签名: function(array $items, int $page): ?bool |

### chunkById()

```php
public function chunkById($size, $callback, $column = "id")
```

基于 ID 的分块处理（高性能）

使用 WHERE id > lastId 替代 OFFSET，避免大偏移量带来的性能下降。
适用于有自增 ID 主键的大表分块处理。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$size` | `int` | — | 每块的大小 |
| `$callback` | `callable` | — | 处理回调，签名: function(array $items): ?bool |
| `$column` | `string` | `"id"` | 用于分块的递增列名，默认 'id' |

### chunkStream()

```php
public function chunkStream($size, $column = "id")
```

基于 ID 的分块流式处理（生成器）

结合了 chunkById 的高性能（WHERE id > lastId）和 cursor 的生成器模式，
逐条 yield 记录，内存占用极小。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$size` | `int` | — | 每块的大小 |
| `$column` | `string` | `"id"` | 用于分块的递增列名，默认 'id' |

### count()

```php
public function count($column = "*", $params = [])
```

统计查询结果数量

执行 COUNT 聚合查询，统计满足条件的记录数量
可以指定统计的列，默认为统计所有记录数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | `"*"` | 要统计的列名，默认为 "*" 表示所有记录 |
| `$params` | `mixed` | `[]` | — |

### max()

```php
public function max($column, $params = [])
```

获取指定列的最大值

执行 MAX 聚合查询，返回指定列中的最大值
适用于数值、日期等可比较的数据类型

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要计算最大值的列名 |
| `$params` | `array` | `[]` | 预处理参数 |

### min()

```php
public function min($column, $params = [])
```

获取指定列的最小值

执行 MIN 聚合查询，返回指定列中的最小值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要计算最小值的列名 |
| `$params` | `array` | `[]` | 预处理参数 |

### avg()

```php
public function avg($column, $params = [])
```

计算指定列的平均值

执行 AVG 聚合查询，返回指定列中所有值的算术平均值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要计算平均值的列名 |
| `$params` | `array` | `[]` | 预处理参数 |

### sum()

```php
public function sum($column, $params = [])
```

计算指定列的总和

执行 SUM 聚合查询，返回指定列中所有值的总和

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `string` | — | 要计算总和的列名 |
| `$params` | `array` | `[]` | 预处理参数 |

### exists()

```php
public function exists($params = [])
```

查询是否存在

将当前查询包装为 EXISTS 子查询，高效判断是否有满足条件的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `mixed` | `[]` | — |

### notExists()

```php
public function notExists($params = [])
```

查询是否不存在

将当前查询包装为 NOT EXISTS 子查询，判断是否没有满足条件的记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `mixed` | `[]` | — |

### insert()

```php
public function insert($data, $isReplaceInto = false, $isIgnore = false, $returnId = false, $params = [])
```

执行插入操作

支持单行和批量插入，自动检测数据格式：
- 单行：['col1' => 'val1', 'col2' => 'val2']
- 批量：[['col1' => 'val1'], ['col1' => 'val2']]

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 插入数据 |
| `$isReplaceInto` | `bool` | `false` | 是否使用 REPLACE INTO，默认 false |
| `$isIgnore` | `bool` | `false` | 是否使用 INSERT IGNORE，默认 false |
| `$returnId` | `bool` | `false` | 是否返回自增 ID 而非执行结果，默认 false |
| `$params` | `mixed` | `[]` | — |

### insertGetId()

```php
public function insertGetId($data, $isReplaceInto = false, $isIgnore = false, $params = [])
```

执行插入操作并返回自增 ID

insert() 的便捷方法，插入成功后直接返回自增 ID

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 插入数据 |
| `$isReplaceInto` | `bool` | `false` | 是否使用 REPLACE INTO，默认 false |
| `$isIgnore` | `bool` | `false` | 是否使用 INSERT IGNORE，默认 false |
| `$params` | `mixed` | `[]` | — |

### update()

```php
public function update($data, $params = [])
```

执行更新操作

更新当前查询表的数据，必须结合 where() 指定更新范围，否则会更新全表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 要更新的字段和值，键为字段名，值为新值 |
| `$params` | `mixed` | `[]` | — |

### delete()

```php
public function delete($params = [])
```

执行删除操作

删除当前查询表的数据，必须结合 where() 指定删除范围，否则会删除全表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `mixed` | `[]` | — |

## 非公开方法

**protected**

- `protected function generateSql()` —— 根据当前选项生成完整 SQL 语句
- `protected function addWhere($column, $operator = null, $value = null, $boolean = "AND", $funcName = null, $type = "comparsion")` —— 核心条件添加方法

**private**

- `private function generateBindingKey()` —— 生成唯一的内部占位符名称
- `private function generateBindingValue($value)` —— 为一个值生成占位符并登记绑定
- `private function bindWriteValues($data)` —— 把写入数据里的值换成占位符绑定
- `private function bindWriteRowValues($row)` —— 把单行写入数据里的值换成占位符绑定
- `private function mergeBindings($params)` —— 合并累积的绑定参数与传入参数
- `private function resolveWhereArgs($op, $val, $argc)` —— 解析 where/orWhere 的 2/3 参数重载
- `private function addDateWhere($func, $column, $operator, $value, $boolean = "AND")` —— 日期/时间函数条件通用方法
- `private function aggregate($func, $column, $params = [])` —— 聚合查询通用方法
- `private function countBySubQuery($params = [])` —— 通过子查询统计行数
- `private function checkExists($not, $params = [])` —— EXISTS / NOT EXISTS 查询通用方法
- `private function executeWrite($params = [])` —— 执行写操作（INSERT/UPDATE/DELETE）的通用方法

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

