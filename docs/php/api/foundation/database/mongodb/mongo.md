# Mongo

`kernel\Foundation\Database\MongoDB\Mongo`  ·  class

源码：`gstudio_kernel/Foundation/Database/MongoDB/Mongo.php`

## 声明

```php
class Mongo
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $driver` | `mixed` | — | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`driver()`](#driver) | — |
| [`realId()`](#realid) | — |
| [`id()`](#id) | — |
| [`find()`](#find) | — |
| [`findOne()`](#findone) | — |
| [`insert()`](#insert) | — |
| [`update()`](#update) | — |
| [`delete()`](#delete) | — |
| [`command()`](#command) | — |
| [`execCommand()`](#execcommand) | — |
| [`optimParams()`](#optimparams) | — |

### driver()

```php
public static function driver(Driver $driver)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$driver` | `Driver` | — | — |

### realId()

```php
public static function realId(string $id = ""): string
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | `""` | — |

返回：`string`

### id()

```php
public static function id(string $id = ""): \MongoDB\BSON\ObjectId
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | `""` | — |

返回：`\MongoDB\BSON\ObjectId`

### find()

```php
public static function find(string $setName, array $filter = [], array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$filter` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

### findOne()

```php
public static function findOne(string $setName, array $filter = [], array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$filter` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

### insert()

```php
public static function insert(string $setName, array $doc, array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$doc` | `array` | — | — |
| `$options` | `array` | `[]` | — |

### update()

```php
public static function update(string $setName, array $query = [], array $updateData, array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$query` | `array` | `[]` | — |
| `$updateData` | `array` | — | — |
| `$options` | `array` | `[]` | — |

### delete()

```php
public static function delete(string $setName, array $query = [], array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setName` | `string` | — | — |
| `$query` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

### command()

```php
public static function command(array $commands): \MongoDB\Driver\Command
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$commands` | `array` | — | — |

返回：`\MongoDB\Driver\Command`

### execCommand()

```php
public static function execCommand(string $databaseName, array $commands, array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$databaseName` | `string` | — | — |
| `$commands` | `array` | — | — |
| `$options` | `array` | `[]` | — |

### optimParams()

```php
public static function optimParams(array $params): array
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | — | — |

返回：`array`

## 同目录

- [Collection](/php/api/foundation/database/mongodb/collection)
- [Driver](/php/api/foundation/database/mongodb/driver)

