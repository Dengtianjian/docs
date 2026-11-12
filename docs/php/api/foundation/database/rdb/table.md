# Table

`kernel\Foundation\Database\RDB\Table`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Table.php`

> DDL 与表管理基类

## 声明

```php
class Table extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

Table 提供数据库表的 DDL 操作和表结构信息查询能力。它是 Model 的基类，
Model 在其上扩展了 ActiveRecord 操作 + 类型转换 + 软删除等特性。

## 职责范围

- **DDL 操作**：`create()` / `drop()` / `truncate()` / `rename()` / `copy()`（统一返回 bool）
- **建表 SQL 生成**：`buildCreateSQL()` 基于 $schema 生成 CREATE TABLE SQL（不执行）
- **信息查询**：`tableExists()` / `getCreateSQL()` / `getColumns()` / `getIndexes()` / `getStatus()` / `optimize()`
- **表名管理**：`prefix()` 设定全局前缀，`applyPrefix()` 为表名补前缀，`prefixReplaces` 支持前缀占位替换
- **Schema 映射**：`getPhpSchema()` 将 `$schema` 中的 Schema 定义转换为字段→PHP类型映射
- **SQL 执行**：`exec()` / `execQuery()` 底层执行；`select()` / `selectOne()` / `scalar()` 便捷查询

## 代码组织（自上而下）

属性（表基本信息 / 表前缀配置 / 表结构定义）
→ 构造与表名 → DDL → 信息查询 → Schema 类型映射 → 驱动解析 → SQL 执行

## exec 与 select 的分工

| 方法 | 底层 | 结果集 | 适用 |
|------|------|--------|------|
| `exec($sql)` | `PDO::exec` | 否，返回行数 | INSERT/UPDATE/DELETE/DDL |
| `execQuery($sql)` | `PDO::query` | 是，PDOStatement | 需自行控制取数 |
| `select($sql, $bindings)` | `PDO::query` + fetchAll | 是，array | 读多行（推荐） |

`SHOW` / `OPTIMIZE TABLE` 返回的是结果集，故信息查询方法一律走 `select()`。

## 表前缀机制

前缀是**实例属性**，由 `prefix()` 显式设定（不再读取配置）。未加前缀的表名保留在
`$rawTableName`，设定前缀时据其重新推导带前缀的 `$tableName`：

$table = new UserModel();
$table->prefix('pre_');          // 设定并立即应用到 $tableName
$table->prefix();                // 读取当前前缀

表名拼接由 `applyPrefix()` 完成；子类可通过 `$prefixReplaces` 属性对前缀中的占位符做动态替换。

## 继承关系

```
Table (DDL + 信息查询)
└── Model (ActiveRecord + casts + 软删除)
```

## 示例

```php
Table (DDL + 信息查询)
└── Model (ActiveRecord + casts + 软删除)
```

## 相关

- `Model` 子类，提供 ActiveRecord 能力
- `Schema` 字段定义类，配合 $this->schema 定义表结构

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$schema` | `Schema[]` | `[]` | 表结构定义（DDL 用） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | protected | 数据表名称（含前缀） |
| `$rawTableName` | `string` | protected | 数据表名称（不含前缀） |
| `$databaseDriver` | `string|null` | protected | 该表固定使用的数据库驱动名 |
| `$prefixReplaces` | `array` | protected | 表前缀占位替换 |
| `$prefix` | `string` | protected | 表前缀 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`prefix()`](#prefix) | 读取或设置表前缀 |
| [`applyPrefix()`](#applyprefix) | 为表名追加前缀（表名拼接） |
| [`tableName()`](#tablename) | 获取当前表名 |
| [`create()`](#create) | 创建表 |
| [`buildCreateSQL()`](#buildcreatesql) | 根据 $this->schema 生成建表 SQL（不执行） |
| [`drop()`](#drop) | 删除表 |
| [`truncate()`](#truncate) | 清空表（保留结构，重置自增） |
| [`rename()`](#rename) | 重命名表 |
| [`copy()`](#copy) | 复制表 |
| [`tableExists()`](#tableexists) | 表是否存在 |
| [`getCreateSQL()`](#getcreatesql) | 获取建表 DDL |
| [`getColumns()`](#getcolumns) | 获取表字段结构 |
| [`getIndexes()`](#getindexes) | 获取表索引 |
| [`getStatus()`](#getstatus) | 获取表状态信息 |
| [`optimize()`](#optimize) | 优化表（整理碎片，回收空间） |
| [`getPhpSchema()`](#getphpschema) | 将 $schema 中的 Schema 对象转换为字段 → PHP 类型映射 |
| [`exec()`](#exec) | 执行原生 SQL（写操作 / DDL） |
| [`execQuery()`](#execquery) | 执行原生 SQL（通用，返回结果集对象） |
| [`select()`](#select) | 执行原生 SQL 并取回全部结果行 |
| [`selectOne()`](#selectone) | 执行原生 SQL 并取回第一行 |
| [`scalar()`](#scalar) | 执行原生 SQL 并取回单个标量值 |
| [`insertId()`](#insertid) | 获取最后插入的自增 ID |

### __construct()

```php
public function __construct($tableName = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 数据表名称 |

### prefix()

```php
public function prefix($val = null)
```

读取或设置表前缀

读写一体：传 $val 时设定前缀，并据 `$rawTableName` 立即重算带前缀的 `$tableName`；
不传时返回当前前缀。例如：

$table->prefix("pre_");   // 设定并应用
$table->prefix();         // 读取

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$val` | `string|null` | `null` | 要设置的前缀；null 表示仅读取 |

### applyPrefix()

```php
public function applyPrefix($tableName)
```

为表名追加前缀（表名拼接）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 不含前缀的表名；为空时原样返回 |

### tableName()

```php
public function tableName()
```

获取当前表名

### create()

```php
public function create()
```

创建表

根据 $this->schema 生成 CREATE TABLE SQL 并执行。

### buildCreateSQL()

```php
public function buildCreateSQL()
```

根据 $this->schema 生成建表 SQL（不执行）

与 getCreateSQL() 的区别：
- getCreateSQL() 经 SHOW CREATE TABLE 返回数据库实际的建表语句；
- 本方法基于 PHP 侧 $this->schema（Schema 定义）生成 SQL，不会触碰数据库，
适用于预览建表语句、调试、单元测试等场景。

### drop()

```php
public function drop()
```

删除表

### truncate()

```php
public function truncate()
```

清空表（保留结构，重置自增）

### rename()

```php
public function rename($newName)
```

重命名表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$newName` | `string` | — | 新表名（不含前缀，自动补充） |

### copy()

```php
public function copy($newName, $withData = false)
```

复制表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$newName` | `string` | — | 新表名（不含前缀） |
| `$withData` | `bool` | `false` | 是否连带数据，默认仅复制结构 |

### tableExists()

```php
public function tableExists()
```

表是否存在

### getCreateSQL()

```php
public function getCreateSQL()
```

获取建表 DDL

### getColumns()

```php
public function getColumns()
```

获取表字段结构

### getIndexes()

```php
public function getIndexes()
```

获取表索引

### getStatus()

```php
public function getStatus()
```

获取表状态信息

### optimize()

```php
public function optimize()
```

优化表（整理碎片，回收空间）

MySQL 的 OPTIMIZE TABLE 会**返回结果集**（含 Table / Op / Msg_type / Msg_text 四列），
而不是受影响行数，因此这里用 select() 取回结果，并逐行检查 Msg_type 是否出错。

### getPhpSchema()

```php
public function getPhpSchema()
```

将 $schema 中的 Schema 对象转换为字段 → PHP 类型映射

### exec()

```php
public function exec($sql)
```

执行原生 SQL（写操作 / DDL）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原生 SQL（不支持参数绑定，需自行转义） |

### execQuery()

```php
public function execQuery($sql)
```

执行原生 SQL（通用，返回结果集对象）

仅当需要自行控制取数方式时使用；绝大多数场景请用 select() / selectOne()。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原生 SQL |

### select()

```php
public function select($sql, $bindings = [])
```

执行原生 SQL 并取回全部结果行

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原生 SQL，可用 `?` 或 `:name` 占位符 |
| `$bindings` | `array` | `[]` | 绑定参数（预处理，防 SQL 注入） |

### selectOne()

```php
public function selectOne($sql, $bindings = [])
```

执行原生 SQL 并取回第一行

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原生 SQL |
| `$bindings` | `array` | `[]` | 绑定参数 |

### scalar()

```php
public function scalar($sql, $bindings = [])
```

执行原生 SQL 并取回单个标量值

适用于 COUNT / MAX / SUM 等单值查询。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原生 SQL |
| `$bindings` | `array` | `[]` | 绑定参数 |

### insertId()

```php
public function insertId()
```

获取最后插入的自增 ID

## 非公开方法

**protected**

- `protected function resolveDatabaseDriver()` —— 解析本表要使用的数据库驱动

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)

