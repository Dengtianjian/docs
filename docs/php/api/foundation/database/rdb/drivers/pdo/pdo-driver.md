# PdoDriver

`kernel\Foundation\Database\RDB\Drivers\PDO\PdoDriver`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Drivers/PDO/PdoDriver.php`

> PDO 数据库驱动 — 关系型数据库的默认后端

## 声明

```php
class PdoDriver extends AbstractDriver
```

父类：[AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver)

## 概述

内核自行建立 PDO 连接，是 [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 的默认实现。
所有与后端无关的编排逻辑（预处理流程、结果读取、SQL 类型判定）都在基类中，本类只实现底层原语。

## 连接入口

连接不在构造期建立：`__construct` 不接收参数，由 `mysql` / `sqlite`
按协议各自拼装 DSN 并完成连接，同一个类因而可承载多种 PDO 协议。

## 错误处理约定

连接属性默认取 `PDO::ATTR_ERRMODE_SILENT`（不取 `PDO::ERRMODE_EXCEPTION`），使失败以
`false` 返回、由 `AbstractDriver::execute` 统一包装为内核 [Error](/php/api/foundation/exception/error)；
同时各原语也捕获 `PDOException` 兜底，因此即便调用方在 `$options` 里覆盖成
`ERRMODE_EXCEPTION`，对外抛出的仍是内核 [Error](/php/api/foundation/exception/error)，不会漏出 `PDOException`。

## 使用方式

```php
// 按实例调用协议方法建立连接
$driver = (new PdoDriver())->mysql('127.0.0.1', 'root', 'pass', 'my_db');
Connections::addDriver($driver, 'default', true);

// SQLite 协议：相对路径按框架根目录解析
$driver = (new PdoDriver())->sqlite('data/app.sqlite');
```

## 示例

```php
// 按实例调用协议方法建立连接
$driver = (new PdoDriver())->mysql('127.0.0.1', 'root', 'pass', 'my_db');
Connections::addDriver($driver, 'default', true);

// SQLite 协议：相对路径按框架根目录解析
$driver = (new PdoDriver())->sqlite('data/app.sqlite');
```

## 相关

- [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 驱动抽象基类（本类的契约与共享逻辑）

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 |
| [`mysql()`](#mysql) | 建立 MySQL 连接 |
| [`sqlite()`](#sqlite) | 建立 SQLite 连接 |
| [`driverName()`](#drivername) | 当前后端标识 |
| [`insertId()`](#insertid) | 获取最后插入的自增 ID |
| [`error()`](#error) | 获取最近一次操作错误信息 |
| [`quote()`](#quote) | 转义字符串用于安全的 SQL 拼接 |
| [`query()`](#query) | 执行一条原始 SQL |
| [`prepare()`](#prepare) | 预处理 SQL 语句 |
| [`beginTransaction()`](#begintransaction) | 开始事务 |
| [`commit()`](#commit) | 提交事务 |
| [`rollBack()`](#rollback) | 回滚事务 |
| [`inTransaction()`](#intransaction) | 检查当前是否处于事务中 |

### __construct()

```php
public function __construct()
```

构造

只创建驱动实例，不建立连接 —— 连接由 `mysql` / `sqlite` 按 scheme 完成。

### mysql()

```php
public function mysql($host, $user, $password, $databaseName, $port = 3306, $charset = "utf8mb4", $options = [])
```

建立 MySQL 连接

DSN 形如 `mysql:host={host};port={port};dbname={databaseName};charset={charset}`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | — | 数据库主机 |
| `$user` | `string` | — | 账号 |
| `$password` | `string` | — | 密码 |
| `$databaseName` | `string` | — | 数据库名 |
| `$port` | `int` | `3306` | 端口，默认 3306 |
| `$charset` | `string` | `"utf8mb4"` | 字符集，默认 utf8mb4 |
| `$options` | `array` | `[]` | 额外的 PDO 连接属性，键为 `PDO::ATTR_*`；同名键优先于内建默认值 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 连接失败时抛出

### sqlite()

```php
public function sqlite($databaseFilePath, $options = [])
```

建立 SQLite 连接

DSN 形如 `sqlite:{数据库文件路径}`，文件不存在时自动创建（PDO SQLite 的默认行为）。
SQLite 全部由此方法承载，**不是**独立后端 —— `driverName` 仍返回
`AbstractDriver::DRIVER_PDO`（库内 sqlite 驱动已废除，故 `DRIVER_SQLITE` 不复存在）。

## 只读打开

PDO 的 SQLite 构造没有 `$flags` 入口，严格只读要经 `$options` 传开库标志：

```php
$driver = (new PdoDriver())->sqlite('data/app.sqlite', [
PDO::SQLITE_ATTR_OPEN_FLAGS => SQLITE3_OPEN_READONLY
]);
```

`SQLITE3_OPEN_READONLY` 由 ext-sqlite3 定义（值为 1），未装该扩展时传字面量即可；
`PDO::SQLITE_ATTR_OPEN_FLAGS` 由 pdo_sqlite 提供。注意**不能**改用 `sqlite:file:…?mode=ro`
这类 URI 写法，原因见 `resolveFilePath`。

```php
$driver = (new PdoDriver())->sqlite('data/app.sqlite', [
PDO::SQLITE_ATTR_OPEN_FLAGS => SQLITE3_OPEN_READONLY
]);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$databaseFilePath` | `string` | — | 数据库文件路径；相对路径按 `Path::root` 解析， |
| `$options` | `array` | `[]` | 额外的 PDO 连接属性，键为 `PDO::ATTR_*`；同名键优先于内建默认值 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 连接失败时抛出

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

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `string` | — | 待转义字符串 |
| `$type` | `int` | `PDO::PARAM_STR` | 参数类型，透传给 PDO |

### query()

```php
public function query($querySQL)
```

执行一条原始 SQL

查询类语句（SELECT / SHOW / DESCRIBE / EXPLAIN）返回 `PDOStatement`，
其余返回受影响行数（取语句的 `rowCount()`）。

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

支持命名（`:name`）和问号（`?`）占位符，同一语句不能混用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `string` | — | SQL 语句模板 |
| `$options` | `array` | `[]` | 语句属性，键为 `PDO::ATTR_*` |

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

### inTransaction()

```php
public function inTransaction()
```

检查当前是否处于事务中

覆写基类默认实现：直接问 PDO 句柄，因此连绕过本驱动的 `beginTransaction()` 也能识别。

## 非公开方法

**protected**

- `protected function connect($dsn, $user = null, $password = null, $options = [])` —— 按 DSN 建立连接

**private**

- `private function resolveFilePath($databaseFilePath)` —— 解析 SQLite 数据库文件路径
- `private function throwDatabaseError()` —— 以内核 Error 抛出最近一次数据库错误

