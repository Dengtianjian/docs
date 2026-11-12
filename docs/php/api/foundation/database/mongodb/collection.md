# Collection

`kernel\Foundation\Database\MongoDB\Collection`  ·  class

源码：`gstudio_kernel/Foundation/Database/MongoDB/Collection.php`

## 声明

```php
class Collection
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$collectionName` | `mixed` | `""` | — |
| `static $instance` | `mixed` | `null` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`instance()`](#instance) | — |
| [`id()`](#id) | — |
| [`realId()`](#realid) | — |
| [`find()`](#find) | — |
| [`findOne()`](#findone) | — |
| [`insert()`](#insert) | — |
| [`update()`](#update) | — |
| [`delete()`](#delete) | — |
| [`exist()`](#exist) | — |
| [`command()`](#command) | — |
| [`execCommand()`](#execcommand) | — |

### instance()

```php
public static function instance()
```

### id()

```php
public function id(string $id = ""): \MongoDB\BSON\ObjectId
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | `""` | — |

返回：`\MongoDB\BSON\ObjectId`

### realId()

```php
public function realId(string $id): string
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | — |

返回：`string`

### find()

```php
public function find(array $filter = [], array $options = [], bool $associative = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filter` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |
| `$associative` | `bool` | `false` | — |

### findOne()

```php
public function findOne(array $filter = [], array $options = [], bool $associative = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filter` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |
| `$associative` | `bool` | `false` | — |

### insert()

```php
public function insert(array $doc = [], array $options = []): int
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$doc` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

返回：`int`

### update()

```php
public function update(array $query = [], array $updateData, array $options = []): \MongoDB\Driver\WriteResult
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `array` | `[]` | — |
| `$updateData` | `array` | — | — |
| `$options` | `array` | `[]` | — |

返回：`\MongoDB\Driver\WriteResult`

### delete()

```php
public function delete(array $query = [], array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `array` | `[]` | — |
| `$options` | `array` | `[]` | — |

### exist()

```php
public function exist(array $filter): bool
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filter` | `array` | — | — |

返回：`bool`

### command()

```php
public function command(array $commands): \MongoDB\Driver\Command
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$commands` | `array` | — | — |

返回：`\MongoDB\Driver\Command`

### execCommand()

```php
public function execCommand(array $commands, array $options = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$commands` | `array` | — | — |
| `$options` | `array` | `[]` | — |

## 同目录

- [Driver](/php/api/foundation/database/mongodb/driver)
- [Mongo](/php/api/foundation/database/mongodb/mongo)

