# Schema

`kernel\Foundation\Database\RDB\Schema`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Schema.php`

> 表字段定义

## 声明

```php
class Schema
```

## 概述

流式 API 定义单个字段的类型、约束等属性，最终生成字段 SQL。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$name` | `string` | private | 字段名 |
| `$type` | `string` | private | 字段的 SQL 类型，如 INT、VARCHAR、TEXT 等 |
| `$length` | `int|null` | private | 类型长度/宽度，如 INT(11) 中的 11 |
| `$precision` | `int` | private | DECIMAL 类型的总位数 |
| `$scale` | `int` | private | DECIMAL 类型的小数位数 |
| `$nullable` | `bool` | private | 是否允许 NULL，默认 true（允许） |
| `$autoIncrement` | `bool` | private | 是否自增 |
| `$default` | `mixed` | private | 默认值，未显式设置时为 null |
| `$hasDefault` | `bool` | private | 是否显式调用过 default()，用于区分「DEFAULT NULL」与「不设 DEFAULT」 |
| `$comment` | `string` | private | 字段注释/COMMENT |
| `$unsigned` | `bool` | private | 是否无符号（仅对整数/浮点类型生效） |
| `$unique` | `bool` | private | 是否唯一索引 |
| `$primary` | `bool` | private | 是否主键 |
| `$index` | `bool` | private | 是否普通索引 |
| `$indexName` | `string|null` | private | 索引名称，null 时自动生成为 idx_{字段名} |
| `$values` | `array|null` | private | ENUM 类型的可选值列表 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 |
| [`bigint()`](#bigint) | BIGINT 大整数 |
| [`int()`](#int) | INT 整数 |
| [`tinyint()`](#tinyint) | TINYINT 小整数 |
| [`smallint()`](#smallint) | SMALLINT 短整数 |
| [`mediumint()`](#mediumint) | MEDIUMINT 中等整数 |
| [`varchar()`](#varchar) | VARCHAR 变长字符串 |
| [`char()`](#char) | CHAR 定长字符串 |
| [`text()`](#text) | TEXT 长文本（最大 64KB） |
| [`mediumtext()`](#mediumtext) | MEDIUMTEXT 中等文本（最大 16MB） |
| [`longtext()`](#longtext) | LONGTEXT 超大文本（最大 4GB） |
| [`datetime()`](#datetime) | DATETIME 日期时间 |
| [`timestamp()`](#timestamp) | TIMESTAMP 时间戳 |
| [`date()`](#date) | DATE 日期 |
| [`time()`](#time) | TIME 时间 |
| [`decimal()`](#decimal) | DECIMAL 定点数 |
| [`float()`](#float) | FLOAT 单精度浮点数 |
| [`double()`](#double) | DOUBLE 双精度浮点数 |
| [`json()`](#json) | JSON 类型 |
| [`bool()`](#bool) | 布尔类型（映射为 TINYINT(1)） |
| [`timestamp_ms()`](#timestamp_ms) | TIMESTAMP_MS 毫秒级时间戳（存储为 VARCHAR） |
| [`unixtime()`](#unixtime) | UNIXTIME 秒级 Unix 时间戳（存储为 INT UNSIGNED，库中即整数） |
| [`unixtime_ms()`](#unixtime_ms) | UNIXTIME_MS 毫秒级 Unix 时间戳（存储为 BIGINT UNSIGNED，库中即整数） |
| [`blob()`](#blob) | BLOB 二进制大对象 |
| [`enum()`](#enum) | ENUM 枚举类型 |
| [`autoIncrement()`](#autoincrement) | 自增（自动设置 unsigned） |
| [`nullable()`](#nullable) | 是否允许 NULL |
| [`comment()`](#comment) | 字段注释 |
| [`unsigned()`](#unsigned) | 无符号（仅整数/浮点类型有效） |
| [`unique()`](#unique) | 唯一索引 |
| [`primary()`](#primary) | 主键 |
| [`index()`](#index) | 普通索引 |
| [`getName()`](#getname) | 获取字段名 |
| [`isAutoIncrement()`](#isautoincrement) | 是否自增 |
| [`isPrimary()`](#isprimary) | 是否主键 |
| [`isUnique()`](#isunique) | 是否唯一索引 |
| [`isIndex()`](#isindex) | 是否普通索引 |
| [`getIndexName()`](#getindexname) | 获取索引名称（未自定义时自动生成 idx_{字段名}） |
| [`getPhpType()`](#getphptype) | 获取字段对应的 PHP 类型 |
| [`toSQL()`](#tosql) | 生成字段定义 SQL（单列） |
| [`createTableSQL()`](#createtablesql) | 从 Schema 数组生成完整的 CREATE TABLE SQL |

### __construct()

```php
public function __construct($name)
```

构造

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 字段名 |

### bigint()

```php
public function bigint($length = 20)
```

BIGINT 大整数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `20` | 显示宽度，默认 20 |

### int()

```php
public function int($length = 11)
```

INT 整数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `11` | 显示宽度，默认 11 |

### tinyint()

```php
public function tinyint($length = 4)
```

TINYINT 小整数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `4` | 显示宽度，默认 4 |

### smallint()

```php
public function smallint($length = 6)
```

SMALLINT 短整数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `6` | 显示宽度，默认 6 |

### mediumint()

```php
public function mediumint($length = 9)
```

MEDIUMINT 中等整数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `9` | 显示宽度，默认 9 |

### varchar()

```php
public function varchar($length = 255)
```

VARCHAR 变长字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `255` | 最大长度，默认 255 |

### char()

```php
public function char($length = 1)
```

CHAR 定长字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `1` | 长度，默认 1 |

### text()

```php
public function text()
```

TEXT 长文本（最大 64KB）

### mediumtext()

```php
public function mediumtext()
```

MEDIUMTEXT 中等文本（最大 16MB）

### longtext()

```php
public function longtext()
```

LONGTEXT 超大文本（最大 4GB）

### datetime()

```php
public function datetime()
```

DATETIME 日期时间

### timestamp()

```php
public function timestamp()
```

TIMESTAMP 时间戳

### date()

```php
public function date()
```

DATE 日期

### time()

```php
public function time()
```

TIME 时间

### decimal()

```php
public function decimal($precision = 10, $scale = 2)
```

DECIMAL 定点数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$precision` | `int` | `10` | 精度（总位数），默认 10 |
| `$scale` | `int` | `2` | 小数位数，默认 2 |

### float()

```php
public function float()
```

FLOAT 单精度浮点数

### double()

```php
public function double()
```

DOUBLE 双精度浮点数

### json()

```php
public function json()
```

JSON 类型

### bool()

```php
public function bool()
```

布尔类型（映射为 TINYINT(1)）

### timestamp_ms()

```php
public function timestamp_ms($length = 26)
```

TIMESTAMP_MS 毫秒级时间戳（存储为 VARCHAR）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$length` | `int` | `26` | 长度，默认 26（兼容 Y-m-d H:i:s.u） |

### unixtime()

```php
public function unixtime()
```

UNIXTIME 秒级 Unix 时间戳（存储为 INT UNSIGNED，库中即整数）

与 timestamp() 的区别：timestamp() 库中存 'Y-m-d H:i:s' 格式化字符串，
本方法库中直接存整数秒值，PHP 侧读写的都是 int。

自动无符号（时间戳非负），上限 2106-02-07（INT UNSIGNED）。

### unixtime_ms()

```php
public function unixtime_ms()
```

UNIXTIME_MS 毫秒级 Unix 时间戳（存储为 BIGINT UNSIGNED，库中即整数）

与 timestamp_ms() 的区别：timestamp_ms() 库中存 'Y-m-d H:i:s.v' 格式化字符串，
本方法库中直接存整数毫秒值，PHP 侧读写的都是 int。

自动无符号（时间戳非负），13 位需 BIGINT 承载。

### blob()

```php
public function blob()
```

BLOB 二进制大对象

### enum()

```php
public function enum(array $values)
```

ENUM 枚举类型

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$values` | `array` | — | 可选值列表 |

### autoIncrement()

```php
public function autoIncrement()
```

自增（自动设置 unsigned）

### nullable()

```php
public function nullable($val = true)
```

是否允许 NULL

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$val` | `bool` | `true` | true=允许（默认），false=NOT NULL |

### comment()

```php
public function comment($text)
```

字段注释

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | — | — |

### unsigned()

```php
public function unsigned()
```

无符号（仅整数/浮点类型有效）

### unique()

```php
public function unique()
```

唯一索引

### primary()

```php
public function primary()
```

主键

### index()

```php
public function index($name = null)
```

普通索引

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | `null` | 索引名称，默认自动生成 idx_{字段名} |

### getName()

```php
public function getName()
```

获取字段名

### isAutoIncrement()

```php
public function isAutoIncrement()
```

是否自增

### isPrimary()

```php
public function isPrimary()
```

是否主键

### isUnique()

```php
public function isUnique()
```

是否唯一索引

### isIndex()

```php
public function isIndex()
```

是否普通索引

### getIndexName()

```php
public function getIndexName()
```

获取索引名称（未自定义时自动生成 idx_{字段名}）

### getPhpType()

```php
public function getPhpType()
```

获取字段对应的 PHP 类型

映射规则：
- JSON              → 'array'
- TINYINT(1)        → 'bool'
- INT/BIGINT 等     → 'int'
- FLOAT/DOUBLE      → 'float'
- UNIXTIME          → 'unixtime'      （库中整数秒，PHP int）
- UNIXTIME_MS       → 'unixtime_ms'   （库中整数毫秒，PHP int）
- DATETIME/TIMESTAMP(带毫秒精度) → 'timestamp_ms'
- DATETIME/TIMESTAMP             → 'timestamp'
- DATE              → 'date'
- 其余               → 'string'

### toSQL()

```php
public function toSQL()
```

生成字段定义 SQL（单列）

例如：`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键'

### createTableSQL()

```php
public static function createTableSQL($tableName, $columns)
```

从 Schema 数组生成完整的 CREATE TABLE SQL

自动处理 PRIMARY KEY、UNIQUE KEY、INDEX，
使用 InnoDB + utf8mb4；含 AUTO_INCREMENT 列时追加 AUTO_INCREMENT=1。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 表名（含前缀） |
| `$columns` | `Schema[]` | — | 字段定义数组 |

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

