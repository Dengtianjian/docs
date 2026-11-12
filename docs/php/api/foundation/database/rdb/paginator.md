# Paginator

`kernel\Foundation\Database\RDB\Paginator`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Paginator.php`

> 分页结果封装

## 声明

```php
class Paginator extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

Paginator 由 Query::paginate() 自动创建并返回，封装了分页查询的
结果数据和元信息（页码、每页条数、总条数），提供统一的数据访问接口。

## 获取方式

```php
$paginator = DB::table('users')->where('status', 1)->paginate(['page' => 2, 'perPage' => 15]);

// 遍历当前页数据
foreach ($paginator->getItems() as $item) { ... }

// 获取分页元信息
$paginator->getPage();      // 当前页码
$paginator->getTotal();     // 总条数
$paginator->getPageSize();  // 当前页实际数据量
```

## 安全边界

`getFirstItem()` / `getLastItem()` 在数据为空时返回 `null` 而非触发 PHP 警告。

## 示例

```php
$paginator = DB::table('users')->where('status', 1)->paginate(['page' => 2, 'perPage' => 15]);

// 遍历当前页数据
foreach ($paginator->getItems() as $item) { ... }

// 获取分页元信息
$paginator->getPage();      // 当前页码
$paginator->getTotal();     // 总条数
$paginator->getPageSize();  // 当前页实际数据量
```

## 相关

- `Query::paginate` 查询构建器分页方法

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$page` | `int` | private | 当前页码 |
| `$perPage` | `int` | private | 每页获取的数量 |
| `$total` | `int` | private | 总条数 |
| `$pageSize` | `int` | private | 当前页的数据条数 |
| `$items` | `array` | private | 当前页的数据 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造分页结果 |
| [`getPage()`](#getpage) | 当前页码 |
| [`getPerPage()`](#getperpage) | 每页获取的条数 |
| [`getTotal()`](#gettotal) | 总条数 |
| [`getPageSize()`](#getpagesize) | 当前页获取到的数据数量 |
| [`getItems()`](#getitems) | 获取数据 |
| [`setItems()`](#setitems) | 设置当前页数据（用于 eager loading 注入 Model 实例） |
| [`getFirstItem()`](#getfirstitem) | 获取当前页第一条数据 |
| [`getLastItem()`](#getlastitem) | 获取当前页最后一条数据 |
| [`toArray()`](#toarray) | 将分页数据导出为数组 |

### __construct()

```php
public function __construct($pageItems, $page, $perPage, $total)
```

构造分页结果

通常由 Query::paginate() 自动调用，也可手动构造用于特殊场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pageItems` | `array` | — | 当前页的数据数组 |
| `$page` | `array` | — | Items 当前页的数据数组 |
| `$perPage` | `int` | — | 每页获取的条数 |
| `$total` | `int` | — | 总条数 |

### getPage()

```php
public function getPage()
```

当前页码

### getPerPage()

```php
public function getPerPage()
```

每页获取的条数

### getTotal()

```php
public function getTotal()
```

总条数

### getPageSize()

```php
public function getPageSize()
```

当前页获取到的数据数量

### getItems()

```php
public function getItems()
```

获取数据

### setItems()

```php
public function setItems(array $items)
```

设置当前页数据（用于 eager loading 注入 Model 实例）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$items` | `array` | — | — |

### getFirstItem()

```php
public function getFirstItem()
```

获取当前页第一条数据

### getLastItem()

```php
public function getLastItem()
```

获取当前页最后一条数据

### toArray()

```php
public function toArray()
```

将分页数据导出为数组

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

