# MysqliStatement

`kernel\Foundation\Database\RDB\Drivers\Mysqli\MysqliStatement`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Drivers/Mysqli/MysqliStatement.php`

> mysqli 语句包装器 — 把 mysqli 的句柄适配成 PDOStatement 的调用面

## 声明

```php
class MysqliStatement
```

## 概述

mysqli 没有 PDOStatement 那样的统一语句对象：直查（`mysqli::query()`）返回 `mysqli_result`，
预处理（`mysqli::prepare()`）返回 `mysqli_stmt`，两者方法名互不相同。本类把这两种句柄统一包装成
[AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver) 需要的调用面（`bindValue` / `execute` / `fetch` / `fetchAll` /
`fetchColumn` / `fetchObject` / `rowCount`），因此基类与上层的 Query / DB / Model 无需感知后端差异。

## 两种模式

| 构造入参 | 模式 | 说明 |
|---|---|---|
| `mysqli_stmt` | 预处理模式 | 需先 `bindValue()` 再 `execute()`；命名占位符由 `normalizeNamedPlaceholders` 改写为问号并给出位置映射 |
| `mysqli_result` | 直查模式 | 结果集已就绪，`execute()` 为空操作 |

## 命名占位符

mysqli 只认问号（`?`）占位符，而内核 Query 的 IN 条件会生成命名占位符（如 `:__bind_0`），
因此预处理前必须改写；改写逻辑见 `normalizeNamedPlaceholders`。

## 读取结果集的前置条件

预处理模式要拿到结果集依赖 `mysqli_stmt::get_result()`（即 mysqlnd 扩展）。该函数不可用时
本类会在读取结果时抛出内核错误，而不是静默返回空结果。

## 相关

- `MysqliDriver` mysqli 后端驱动

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$connection` | `\mysqli` | private | 连接句柄 |
| `$statement` | `\mysqli_stmt|null` | private | 预处理语句（预处理模式） |
| `$result` | `\mysqli_result|null` | private | 结果集（直查模式，或预处理执行后取得） |
| `$namedPositions` | `array` | private | 命名占位符 => 位置列表（1 起） |
| `$boundValues` | `array` | private | 位置 => 待绑定值 |
| `$executed` | `bool` | private | 是否已执行 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 包装一个 mysqli 句柄 |
| [`bindValue()`](#bindvalue) | 绑定一个参数 |
| [`execute()`](#execute) | 执行语句 |
| [`fetch()`](#fetch) | 读取一行 |
| [`fetchAll()`](#fetchall) | 读取全部行 |
| [`fetchColumn()`](#fetchcolumn) | 读取当前行指定列的值 |
| [`fetchObject()`](#fetchobject) | 读取一行并映射为对象 |
| [`rowCount()`](#rowcount) | 受影响行数 |
| [`normalizeNamedPlaceholders()`](#normalizenamedplaceholders) | 把命名占位符改写成 mysqli 支持的问号占位符 |

### __construct()

```php
public function __construct($connection, $source, $namedPositions = [])
```

包装一个 mysqli 句柄

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$connection` | `\mysqli` | — | 连接句柄 |
| `$source` | `\mysqli_stmt|\mysqli_result` | — | 预处理语句或已就绪的结果集 |
| `$namedPositions` | `array` | `[]` | 命名占位符 => 位置列表（1 起），仅预处理模式需要 |

### bindValue()

```php
public function bindValue($param, $value, $type = PDO::PARAM_STR)
```

绑定一个参数

键为字符串时按命名占位符处理（经 `normalizeNamedPlaceholders` 得到的位置逐一绑定），
键为整数时按问号占位符的 1 起位置处理。mysqli 的 `bind_param` 要求引用传值，因此这里只记录
值，统一到 `execute` 时再绑定。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$param` | `string|int` | — | 命名占位符（如 `:__bind_0`）或问号占位符的位置（1 起） |
| `$value` | `mixed` | — | 绑定的值 |
| `$type` | `int` | `PDO::PARAM_STR` | 参数类型，仅用于保持与 PDOStatement 一致的签名，mysqli 按值推断 |

### execute()

```php
public function execute($params = null)
```

执行语句

直查模式下结果集已就绪，本方法为空操作并返回 true。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array|null` | `null` | 一次性绑定的参数，键为命名占位符或问号位置 |

### fetch()

```php
public function fetch($mode = PDO::FETCH_ASSOC, $cursorOrientation = null, $cursorOffset = 0)
```

读取一行

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mode` | `int` | `PDO::FETCH_ASSOC` | 获取模式，支持 `PDO::FETCH_ASSOC` / `PDO::FETCH_NUM` / |
| `$cursorOrientation` | `int|null` | `null` | 游标方向，mysqli 无对应物，忽略 |
| `$cursorOffset` | `int` | `0` | 游标偏移，mysqli 无对应物，忽略 |

### fetchAll()

```php
public function fetchAll($mode = PDO::FETCH_ASSOC, $callback = null)
```

读取全部行

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mode` | `int` | `PDO::FETCH_ASSOC` | 获取模式；传入 `PDO::FETCH_FUNC` 时第二参须为回调， |
| `$callback` | `callable|null` | `null` | FETCH_FUNC 模式下的行处理回调 |

### fetchColumn()

```php
public function fetchColumn($column = 0)
```

读取当前行指定列的值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$column` | `int` | `0` | 列索引，默认 0 |

### fetchObject()

```php
public function fetchObject($class = "stdClass", $constructorArgs = [])
```

读取一行并映射为对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `string` | `"stdClass"` | 目标类名，默认 stdClass |
| `$constructorArgs` | `array` | `[]` | 构造函数参数 |

### rowCount()

```php
public function rowCount()
```

受影响行数

预处理模式取 `affected_rows`（写操作受影响的行数），直查模式取结果集行数。

### normalizeNamedPlaceholders()

```php
public static function normalizeNamedPlaceholders($sql)
```

把命名占位符改写成 mysqli 支持的问号占位符

按「引用状态机」扫描：单引号 / 双引号 / 反引号包裹的片段一律原样透传（并处理 `\` 转义与引号
双写），因此 `'10:30:00'` 这类值里的冒号不会被误判成占位符；不在引用内的 `:` 仅当后随字母或
下划线时才视为命名占位符，故 `::` 也不会被误改写。

同名占位符出现多次时，改写后的每个位置都会记录，绑定一次即覆盖全部位置。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sql` | `string` | — | 原始 SQL |

## 非公开方法

**private**

- `private function getResult()` —— 取得结果集，必要时先执行语句
- `private function getBindType($value)` —— 获取值对应的 mysqli 绑定类型字符
- `private static function isPlaceholderStart($char)` —— 判断字符能否作为命名占位符的首字符
- `private static function isPlaceholderChar($char)` —— 判断字符能否作为命名占位符的后续字符

## 同目录

- [MysqliDriver](/php/api/foundation/database/rdb/drivers/mysqli/mysqli-driver)

