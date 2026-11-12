# AbstractDriver

`kernel\Foundation\Database\RDB\Drivers\AbstractDriver`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Drivers/AbstractDriver.php`

> 关系型数据库驱动抽象基类 — 数据库操作的底层引擎

## 声明

```php
class AbstractDriver
```

## 概述

本类定义驱动必须提供的「底层原语」，并在基类中实现所有与后端无关的编排逻辑
（预处理流程、结果读取、SQL 类型判定、错误包装），因此**新增后端只需实现原语**。

## 两种后端

| 后端 | 实现类 | 连接来源 |
|---|---|---|
| `pdo`（默认） | `PdoDriver` | 内核按主机 / 账号 / 密码建立 PDO 连接；SQLite 走同一类的 `PdoDriver::sqlite` |
| `mysqli` | `MysqliDriver` | 按主机 / 账号 / 密码建立连接，也可**包装已有** `mysqli` 连接（如 Discuz 的 `\DB::object()->curlink`） |

当前后端用 `driverName` 判断，返回 `DRIVER_PDO` / `DRIVER_MYSQLI`。
SQLite **不是**独立后端 —— 它由 PDO 后端的 `sqlite:` DSN 承载，`driverName()` 同样返回 `pdo`。

## 职责范围

- **连接管理**：`getConnection` 暴露原生句柄（`PDO` / `mysqli`）
- **SQL 执行**：`query` 自动区分查询类（返回可读取的结果对象）与写操作（返回受影响行数）
- **预处理**：`prepare` + `bindValues` + `execute` 完整参数绑定流程，
`bindValues` 自动根据 PHP 值类型推断绑定类型
- **便捷查询**：`fetch` / `fetchAll` / `fetchColumn` /
`fetchObject` / `fetchFunc`，统一支持传参预处理与直查两种模式
- **事务**：`beginTransaction` / `commit` / `rollBack` / `inTransaction`

## 使用方式

驱动通常不直接使用，而是通过 `Connections` 注册后由 [DB](/php/api/foundation/database/rdb/db) 门面、
[Query](/php/api/foundation/database/rdb/query) 构建器、[Model](/php/api/foundation/database/rdb/model)
等上层组件间接调用。需要底层操作时才直接用：

```php
$driver = (new PdoDriver())->mysql('127.0.0.1', 'root', 'pass', 'my_db');
$rows  = $driver->fetchAll('SELECT * FROM users WHERE status = ?', [1]);
$count = $driver->fetchColumn('SELECT COUNT(*) FROM users');

// 复用外部已有的 mysqli 连接
$driver = new MysqliDriver(\DB::object()->curlink);

// SQLite（由 PDO 后端承载；相对路径按框架根目录解析，文件不存在则自动创建）
$driver = (new PdoDriver())->sqlite('data/app.sqlite');
```

## 示例

```php
$driver = (new PdoDriver())->mysql('127.0.0.1', 'root', 'pass', 'my_db');
$rows  = $driver->fetchAll('SELECT * FROM users WHERE status = ?', [1]);
$count = $driver->fetchColumn('SELECT COUNT(*) FROM users');

// 复用外部已有的 mysqli 连接
$driver = new MysqliDriver(\DB::object()->curlink);

// SQLite（由 PDO 后端承载；相对路径按框架根目录解析，文件不存在则自动创建）
$driver = (new PdoDriver())->sqlite('data/app.sqlite');
```

## 相关

- `PdoDriver` PDO 后端实现（含 SQLite）
- `MysqliDriver` mysqli 后端实现
- `Connections` 多连接管理器
- `DB` 数据库门面（上层统一入口）

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `DRIVER_PDO` | `"pdo"` | 后端标识：PDO |
| `DRIVER_MYSQLI` | `"mysqli"` | 后端标识：mysqli |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$connection` | `\PDO|\mysqli|null` | protected | 原生连接句柄 |
| `$inTransaction` | `bool` | protected | 是否处于本驱动开启的事务中 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`driverName()`](#drivername) | — |
| [`insertId()`](#insertid) | — |
| [`error()`](#error) | — |
| [`quote()`](#quote) | — |
| [`query()`](#query) | — |
| [`prepare()`](#prepare) | — |
| [`beginTransaction()`](#begintransaction) | — |
| [`commit()`](#commit) | — |
| [`rollBack()`](#rollback) | — |
| [`getConnection()`](#getconnection) | 获取原生连接句柄 |
| [`errno()`](#errno) | 获取最近一次操作的 SQLSTATE 错误码 |
| [`exec()`](#exec) | 执行一条不需要结果集的 SQL，返回受影响行数 |
| [`inTransaction()`](#intransaction) | 检查当前是否处于事务中 |
| [`bindValues()`](#bindvalues) | 绑定参数数组到预处理语句 |
| [`execute()`](#execute) | 执行预处理 SQL，完成 prepare → bind → execute 流程 |
| [`fetch()`](#fetch) | 查询单行数据 |
| [`fetchAll()`](#fetchall) | 查询全部数据 |
| [`fetchColumn()`](#fetchcolumn) | 查询单个列的值 |
| [`fetchObject()`](#fetchobject) | 查询并返回对象 |
| [`fetchFunc()`](#fetchfunc) | 通过回调函数处理查询结果 |

### driverName()

```php
public abstract function driverName()
```

### insertId()

```php
public abstract function insertId()
```

### error()

```php
public abstract function error()
```

### quote()

```php
public abstract function quote($string, $type = PDO::PARAM_STR)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `mixed` | — | — |
| `$type` | `mixed` | `PDO::PARAM_STR` | — |

### query()

```php
public abstract function query($querySQL)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `mixed` | — | — |

### prepare()

```php
public abstract function prepare($query, $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `mixed` | — | — |
| `$options` | `mixed` | `[]` | — |

### beginTransaction()

```php
public abstract function beginTransaction()
```

### commit()

```php
public abstract function commit()
```

### rollBack()

```php
public abstract function rollBack()
```

### getConnection()

```php
public function getConnection()
```

获取原生连接句柄

### errno()

```php
public function errno()
```

获取最近一次操作的 SQLSTATE 错误码

直接取 [Error](/php/api/foundation/exception/error) 三元组的首项，因此无需后端各自实现。

### exec()

```php
public function exec($statement)
```

执行一条不需要结果集的 SQL，返回受影响行数

基于 `query` 实现：写语句在部分后端直接返回受影响行数（int），
在另一些后端返回语句对象，此时取其 `rowCount()` 作为受影响行数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statement` | `string` | — | SQL 语句 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### inTransaction()

```php
public function inTransaction()
```

检查当前是否处于事务中

默认读本类的 `$inTransaction` 标记位，由具体驱动在 `beginTransaction` /
`commit` / `rollBack` 中维护；能直接问到底层句柄事务状态的后端可覆写本方法。

### bindValues()

```php
public function bindValues($statement, $params)
```

绑定参数数组到预处理语句

支持命名（`:name`）和问号（`?`）两种占位符，自动根据值类型选择合适的绑定类型。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statement` | `PDOStatement|MysqliStatement` | — | 预处理语句对象 |
| `$params` | `array` | — | 参数数组，命名参数用关联数组，问号占位用索引数组 |

### execute()

```php
public function execute($query, $params = [])
```

执行预处理 SQL，完成 prepare → bind → execute 流程

查询类语句返回语句对象供遍历，其余返回受影响行数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句模板 |
| `$params` | `array` | `[]` | 绑定参数 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### fetch()

```php
public function fetch($querySQL, $params = [], $mode = PDO::FETCH_ASSOC, $cursorOrientation = PDO::FETCH_ORI_NEXT, $cursorOffset = 0)
```

查询单行数据

传入 $params 时走预处理路径，否则走直查路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句或模板 |
| `$params` | `array` | `[]` | 参数绑定数组，为空时直查 |
| `$mode` | `int` | `PDO::FETCH_ASSOC` | 获取模式，默认 PDO::FETCH_ASSOC |
| `$cursorOrientation` | `int` | `PDO::FETCH_ORI_NEXT` | 游标方向 |
| `$cursorOffset` | `int` | `0` | 游标偏移 |

### fetchAll()

```php
public function fetchAll($querySQL, $params = [], $mode = PDO::FETCH_ASSOC)
```

查询全部数据

传入 $params 时走预处理路径，否则走直查路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句或模板 |
| `$params` | `array` | `[]` | 参数绑定数组，为空时直查 |
| `$mode` | `int` | `PDO::FETCH_ASSOC` | 获取模式，默认 PDO::FETCH_ASSOC |

### fetchColumn()

```php
public function fetchColumn($querySQL, $params = [], $column = 0)
```

查询单个列的值

传入 $params 时走预处理路径，否则走直查路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句或模板 |
| `$params` | `array` | `[]` | 参数绑定数组，为空时直查 |
| `$column` | `int` | `0` | 列索引，默认 0 |

### fetchObject()

```php
public function fetchObject($querySQL, $params = [], $class = "stdClass", $constructorArgs = [])
```

查询并返回对象

传入 $params 时走预处理路径，否则走直查路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句或模板 |
| `$params` | `array` | `[]` | 参数绑定数组，为空时直查 |
| `$class` | `string` | `"stdClass"` | 类名，默认 stdClass |
| `$constructorArgs` | `array` | `[]` | 构造函数参数 |

### fetchFunc()

```php
public function fetchFunc($querySQL, $callback, $params = [])
```

通过回调函数处理查询结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句或模板 |
| `$callback` | `callable` | — | 回调函数 |
| `$params` | `array` | `[]` | 参数绑定数组，为空时直查 |

## 非公开方法

**protected**

- `protected function isSelectStatement($sql)` —— 判断 SQL 是否为查询类语句（返回结果集）
- `protected function statementError($statement)` —— 读取预处理语句自身的错误三元组

**private**

- `private function getParamType($value)` —— 获取参数对应的绑定类型常量

## 同目录

- [Connections](/php/api/foundation/database/rdb/drivers/connections)

