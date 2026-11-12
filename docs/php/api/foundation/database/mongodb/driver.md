# Driver

`kernel\Foundation\Database\MongoDB\Driver`  ·  class

源码：`gstudio_kernel/Foundation/Database/MongoDB/Driver.php`

## 声明

```php
class Driver
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$instance` | `mixed` | private | — |
| `$config` | `mixed` | private | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`query()`](#query) | — |
| [`id()`](#id) | — |
| [`insert()`](#insert) | — |
| [`update()`](#update) | — |
| [`delete()`](#delete) | — |
| [`commamd()`](#commamd) | — |
| [`execCommand()`](#execcommand) | — |

### __construct()

```php
public function __construct(string $host = "localhost", int $port = 27017, string $username, string $password, string $databaseName, array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | `"localhost"` | — |
| `$port` | `int` | `27017` | — |
| `$username` | `string` | — | — |
| `$password` | `string` | — | — |
| `$databaseName` | `string` | — | — |
| `$options` | `array` | `[]` | — |

### query()

```php
public function query(string $setName, array $filter = [], array $options = []): array
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$filter` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

返回：`array`

### id()

```php
public function id(string $id = ""): \MongoDB\BSON\ObjectId
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | `""` | — |

返回：`\MongoDB\BSON\ObjectId`

### insert()

```php
public function insert(string $setName, array $doc, array $options = []): int
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$doc` | `array` | — | — |
| `$options` | `array` | `[]` | — |

返回：`int`

### update()

```php
public function update(string $setName, array $query = [], array $updateData = [], array $options = []): \MongoDB\Driver\WriteResult
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$query` | `array` | `[]` | — |
| `$updateData` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

返回：`\MongoDB\Driver\WriteResult`

### delete()

```php
public function delete(string $setName, array $query, array $options = []): int
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$query` | `array` | — | — |
| `$options` | `array` | `[]` | — |

返回：`int`

### commamd()

```php
public function commamd(array $commands = [],$options = []): \MongoDB\Driver\Command
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$commands` | `array` | `[]` | — |
| `$options` | `mixed` | `[]` | — |

返回：`\MongoDB\Driver\Command`

### execCommand()

```php
public function execCommand(string $databaseName, \MongoDB\Driver\Command $command, array $options = []): array
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$databaseName` | `string` | — | — |
| `$command` | `\MongoDB\Driver\Command` | — | — |
| `$options` | `array` | `[]` | — |

返回：`array`

## 非公开方法

**private**

- `private function genNamespace(string $extra): string`

## 同目录

- [Collection](/php/api/foundation/database/mongodb/collection)
- [Mongo](/php/api/foundation/database/mongodb/mongo)

