# MysqliDriver

`kernel\Foundation\Database\RDB\Drivers\Mysqli\MysqliDriver`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Drivers/Mysqli/MysqliDriver.php`

> mysqli 数据库驱动 — 复用已有连接或自行建连的关系型后端

## 声明

```php
class MysqliDriver extends AbstractDriver
```

父类：[AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver)

## 概述

首参是 `\mysqli` 实例时**包装**它（不建连、不改其字符集）；首参是字符串时**按连接参数自建连接**，
参数顺序与 `\kernel\Foundation\Database\RDB\Drivers\PDO\PdoDriver::__construct` 一致：

```php
// 自行建连
Connections::addDriver(new MysqliDriver('127.0.0.1', 'root', 'pass', 'my_db', 3306));

// 复用 Discuz 已建好的连接
Connections::addDriver(new MysqliDriver(\DB::object()->curlink));
```

复用模式是 Discuz! X 环境下的典型用法：数据库由 Discuz 自己连接，内核直接借用它的句柄，
从而让内核的 Query / DB / Model 能在 Discuz 已建好的连接上执行。

## 与 PDO 后端的差异

| 差异点 | 说明 |
|---|---|
| 命名占位符 | mysqli 只认问号（`?`）占位符，命名占位符由 `MysqliStatement::normalizeNamedPlaceholders` 在执行前改写 |

## 事务状态

mysqli 没有 `inTransaction()`，本驱动沿用 `AbstractDriver::inTransaction` 的默认实现
（读标记位），因此只反映**本驱动自己开启的事务**：若外层（如 Discuz 自身）已在事务中，本类并不知情。

## 示例

```php
// 自行建连
Connections::addDriver(new MysqliDriver('127.0.0.1', 'root', 'pass', 'my_db', 3306));

// 复用 Discuz 已建好的连接
Connections::addDriver(new MysqliDriver(\DB::object()->curlink));
```

## 相关

- `MysqliStatement` mysqli 语句包装器
- [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 驱动抽象基类（本类的契约与共享逻辑）

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 建立或包装 mysqli 连接 |
| [`driverName()`](#drivername) | 当前后端标识 |
| [`insertId()`](#insertid) | 获取最后插入的自增 ID |
| [`error()`](#error) | 获取最近一次操作错误信息 |
| [`quote()`](#quote) | 转义字符串用于安全的 SQL 拼接 |
| [`query()`](#query) | 执行一条原始 SQL |
| [`prepare()`](#prepare) | 预处理 SQL 语句 |
| [`beginTransaction()`](#begintransaction) | 开始事务 |
| [`commit()`](#commit) | 提交事务 |
| [`rollBack()`](#rollback) | 回滚事务 |

### __construct()

```php
public function __construct($hostOrConnection, $user = null, $password = null, $databaseName = null, $port = 3306, $charset = "utf8mb4")
```

建立或包装 mysqli 连接

首参传 `\mysqli` 实例时直接包装（不建连，也不改动它的字符集）；传字符串时按连接参数自行建连。

```php
new MysqliDriver('127.0.0.1', 'root', 'pass', 'my_db', 3306);   // 自行建连
new MysqliDriver(\DB::object()->curlink);                       // 复用已有连接
```

```php
new MysqliDriver('127.0.0.1', 'root', 'pass', 'my_db', 3306);   // 自行建连
new MysqliDriver(\DB::object()->curlink);                       // 复用已有连接
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$hostOrConnection` | `\mysqli|string` | — | mysqli 连接实例，或数据库主机 |
| `$user` | `string|null` | `null` | 账号（自行建连时使用） |
| `$password` | `string|null` | `null` | 密码（自行建连时使用） |
| `$databaseName` | `string|null` | `null` | 数据库名（自行建连时使用） |
| `$port` | `int|null` | `3306` | 端口，默认 3306（自行建连时使用） |
| `$charset` | `string` | `"utf8mb4"` | 字符集，默认 utf8mb4（仅自行建连时设置） |

可能抛出：

- [Error](/php/api/foundation/exception/error) 入参既非 mysqli 连接又非主机名，或自行建连/设置字符集失败时抛出

### driverName()

```php
public function driverName()
```

当前后端标识

### insertId()

```php
public function insertId()
```

获取最后插入的自增 ID

### error()

```php
public function error()
```

获取最近一次操作错误信息

### quote()

```php
public function quote($string, $type = PDO::PARAM_STR)
```

转义字符串用于安全的 SQL 拼接

mysqli 没有参数类型的概念，统一按字符串转义并补上单引号，与 `PDO::quote()` 的输出形态一致。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `string` | — | 待转义字符串 |
| `$type` | `int` | `PDO::PARAM_STR` | 参数类型，仅用于保持签名一致，mysqli 忽略 |

### query()

```php
public function query($querySQL)
```

执行一条原始 SQL

查询类语句（SELECT / SHOW / DESCRIBE / EXPLAIN）返回可读取结果的
`MysqliStatement`，其余返回受影响行数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$querySQL` | `string` | — | SQL 语句 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### prepare()

```php
public function prepare($query, $options = [])
```

预处理 SQL 语句

支持问号（`?`）与命名（`:name`）占位符：命名占位符会先被改写为问号，并记录位置映射，
供 `MysqliStatement::bindValue` 按名绑定。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句模板 |
| `$options` | `array` | `[]` | 语句选项，mysqli 无对应物，忽略 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### beginTransaction()

```php
public function beginTransaction()
```

开始事务

可能抛出：

- [Error](/php/api/foundation/exception/error)

### commit()

```php
public function commit()
```

提交事务

可能抛出：

- [Error](/php/api/foundation/exception/error)

### rollBack()

```php
public function rollBack()
```

回滚事务

可能抛出：

- [Error](/php/api/foundation/exception/error)

## 非公开方法

**private**

- `private function runQuery($sql)` —— 执行一条 SQL，失败时抛内核错误
- `private function throwDatabaseError()` —— 以内核 Error 抛出最近一次数据库错误

## 同目录

- [MysqliStatement](/php/api/foundation/database/rdb/drivers/mysqli/mysqli-statement)

