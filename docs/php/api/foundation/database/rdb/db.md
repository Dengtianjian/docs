# DB

`kernel\Foundation\Database\RDB\DB`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/DB.php`

> 数据库操作门面 — 参考 Laravel DB 风格

## 声明

```php
class DB
```

## 概述

提供两套 API：
1. Query Builder: DB::table('users')->where('id', 1)->first()
2. 原生 SQL（带参数绑定）: DB::select('SELECT * FROM users WHERE id = ?', [1])

------------------------------------------------------------------
原生 SQL API 分三层
------------------------------------------------------------------

| 层级 | 方法 | 参数绑定 | 查询日志 | 返回结果 |
|------|------|---------|---------|---------|
| 便捷层（推荐） | `select` `selectOne` `scalar` `insert` `update` `delete` | 支持 | 否 | 数组 / 标量 / 行数 |
| 通用语句层 | `statement` `affectingStatement` `unprepared` | 支持 | 否 | bool / 行数 |
| 底层直查层 | `query` `exec` `prepare` `execute` | 视方法而定 | **是** | PDOStatement / 行数 |

底层直查层不做绑定判断，直接转发驱动，因此自由度最高但也最危险；
日常请用便捷层。

门面一律使用 `connection` 指定的**当前连接**，不接受逐方法的驱动参数；
需要把操作钉在某个驱动上时，请直接持有驱动实例（`Connections::getDriver`）
或用 `Table`（它按 `$databaseDriver` 自行取驱动执行原生 SQL）。

------------------------------------------------------------------
代码组织（自上而下）
------------------------------------------------------------------

属性 → 连接管理 → Query Builder 入口
→ 原生 SQL（读 / 写 / 通用语句）→ 原始表达式
→ 底层直查 → 连接信息 → 事务 → 查询日志

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $queryLog` | `array` | `[]` | — |
| `static $loggingQueries` | `bool` | `false` | — |
| `static $listeners` | `array` | `[]` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`connection()`](#connection) | 切换或获取数据库连接 |
| [`getConnection()`](#getconnection) | 获取当前连接的原生句柄 |
| [`table()`](#table) | 创建 Query 实例（Query Builder 入口） |
| [`select()`](#select) | 执行 SELECT 查询并返回全部结果 |
| [`selectOne()`](#selectone) | 执行 SELECT 查询并返回第一条记录 |
| [`scalar()`](#scalar) | 执行 SELECT 查询并返回单个标量值 |
| [`insert()`](#insert) | 执行 INSERT 语句 |
| [`insertGetId()`](#insertgetid) | 执行 INSERT 并返回自增 ID |
| [`update()`](#update) | 执行 UPDATE 语句，返回受影响行数 |
| [`delete()`](#delete) | 执行 DELETE 语句，返回受影响行数 |
| [`statement()`](#statement) | 执行任意 SQL 语句（不返回结果集） |
| [`affectingStatement()`](#affectingstatement) | 执行任意 SQL 语句并返回受影响行数 |
| [`unprepared()`](#unprepared) | 执行原始 SQL（不经过预处理绑定） |
| [`raw()`](#raw) | 创建原始 SQL 表达式，用于 Query Builder 中的片段注入 |
| [`query()`](#query) | 执行 SQL 查询。SELECT 返回 PDOStatement，写操作返回受影响行数 |
| [`exec()`](#exec) | 执行 SQL 并仅返回受影响行数（不返回结果集，比 query() 更高效） |
| [`prepare()`](#prepare) | 预处理 SQL 语句 |
| [`execute()`](#execute) | 预处理 + 绑定 + 执行 SELECT 返回 PDOStatement，其余返回受影响行数 |
| [`quote()`](#quote) | 转义字符串 |
| [`insertId()`](#insertid) | 最后插入的自增 ID |
| [`error()`](#error) | 最近一次操作错误信息 |
| [`errno()`](#errno) | 最近一次操作 SQLSTATE 错误码 |
| [`begin()`](#begin) | 开始事务 |
| [`commit()`](#commit) | 提交事务 |
| [`rollback()`](#rollback) | 回滚事务 |
| [`transaction()`](#transaction) | 事务闭包执行（支持重试） |
| [`inTransaction()`](#intransaction) | 是否在事务中 |
| [`enableQueryLog()`](#enablequerylog) | 开启查询日志 |
| [`disableQueryLog()`](#disablequerylog) | 关闭查询日志 |
| [`getQueryLog()`](#getquerylog) | 获取查询日志 |
| [`flushQueryLog()`](#flushquerylog) | 清空查询日志 |
| [`listen()`](#listen) | 注册查询监听器 |

### connection()

```php
public static function connection($name = null)
```

切换或获取数据库连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | `null` | 连接名称，为 null 时使用默认连接 |

### getConnection()

```php
public static function getConnection()
```

获取当前连接的原生句柄

### table()

```php
public static function table($tableName = null)
```

创建 Query 实例（Query Builder 入口）

门面一律走**当前连接**，不接受驱动参数。需要把某次查询钉在指定驱动上时，
直接用 `Query::table($tableName, $driver)` 或 `new Query($tableName, $driver)`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string|null` | `null` | 表名 |

### select()

```php
public static function select($query, $bindings = [])
```

执行 SELECT 查询并返回全部结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句，支持 ? 或 :name 占位符 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### selectOne()

```php
public static function selectOne($query, $bindings = [])
```

执行 SELECT 查询并返回第一条记录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句，支持 ? 或 :name 占位符 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### scalar()

```php
public static function scalar($query, $bindings = [])
```

执行 SELECT 查询并返回单个标量值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句，支持 ? 或 :name 占位符 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### insert()

```php
public static function insert($query, $bindings = [])
```

执行 INSERT 语句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | INSERT SQL，支持 ? 或 :name 占位符 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### insertGetId()

```php
public static function insertGetId($query, $bindings = [])
```

执行 INSERT 并返回自增 ID

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | INSERT SQL |
| `$bindings` | `array` | `[]` | 参数绑定 |

### update()

```php
public static function update($query, $bindings = [])
```

执行 UPDATE 语句，返回受影响行数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | UPDATE SQL |
| `$bindings` | `array` | `[]` | 参数绑定 |

### delete()

```php
public static function delete($query, $bindings = [])
```

执行 DELETE 语句，返回受影响行数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | DELETE SQL |
| `$bindings` | `array` | `[]` | 参数绑定 |

### statement()

```php
public static function statement($query, $bindings = [])
```

执行任意 SQL 语句（不返回结果集）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### affectingStatement()

```php
public static function affectingStatement($query, $bindings = [])
```

执行任意 SQL 语句并返回受影响行数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句 |
| `$bindings` | `array` | `[]` | 参数绑定 |

### unprepared()

```php
public static function unprepared($query)
```

执行原始 SQL（不经过预处理绑定）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | 原始 SQL |

### raw()

```php
public static function raw($value)
```

创建原始 SQL 表达式，用于 Query Builder 中的片段注入

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 原始 SQL 片段 |

### query()

```php
public static function query($sql)
```

执行 SQL 查询。SELECT 返回 PDOStatement，写操作返回受影响行数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | SQL 语句 |

### exec()

```php
public static function exec($sql)
```

执行 SQL 并仅返回受影响行数（不返回结果集，比 query() 更高效）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | SQL 语句 |

### prepare()

```php
public static function prepare($query, $options = [])
```

预处理 SQL 语句

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 模板 |
| `$options` | `array` | `[]` | PDOStatement 选项 |

### execute()

```php
public static function execute($query, $params = [])
```

预处理 + 绑定 + 执行 SELECT 返回 PDOStatement，其余返回受影响行数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 模板 |
| `$params` | `array` | `[]` | 绑定参数 |

### quote()

```php
public static function quote($string, $type = \PDO::PARAM_STR)
```

转义字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `string` | — | 待转义字符串 |
| `$type` | `int` | `\PDO::PARAM_STR` | PDO::PARAM_* |

### insertId()

```php
public static function insertId()
```

最后插入的自增 ID

### error()

```php
public static function error()
```

最近一次操作错误信息

### errno()

```php
public static function errno()
```

最近一次操作 SQLSTATE 错误码

### begin()

```php
public static function begin()
```

开始事务

### commit()

```php
public static function commit()
```

提交事务

### rollback()

```php
public static function rollback()
```

回滚事务

### transaction()

```php
public static function transaction(callable $callback, $attempts = 1)
```

事务闭包执行（支持重试）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 事务闭包，接收 [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 实例 |
| `$attempts` | `int` | `1` | 死锁重试次数，默认 1 |

可能抛出：

- `\Exception`

### inTransaction()

```php
public static function inTransaction()
```

是否在事务中

### enableQueryLog()

```php
public static function enableQueryLog()
```

开启查询日志

### disableQueryLog()

```php
public static function disableQueryLog()
```

关闭查询日志

### getQueryLog()

```php
public static function getQueryLog()
```

获取查询日志

### flushQueryLog()

```php
public static function flushQueryLog()
```

清空查询日志

### listen()

```php
public static function listen(callable $callback)
```

注册查询监听器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | function($query, $bindings, $time) |

## 非公开方法

**private**

- `private static function causedByDeadlock($e)` —— 判断异常是否由死锁导致（供 transaction() 重试判定使用）
- `private static function logQuery($query, $bindings = [])` —— 记录一条查询（内部使用）

## 同目录

- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

