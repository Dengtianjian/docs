# RequestSorting

`kernel\Foundation\HTTP\Request\Extract\RequestSorting`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request/Extract/RequestSorting.php`

> 从请求中提取的排序参数集合

## 声明

```php
class RequestSorting extends DataObject
```

父类：[DataObject](/php/api/foundation/object/data-object)

## 概述

解析请求 query 中的排序相关参数（order / orderBy / orders），
并标记本次请求是否实际传入了任一个排序参数（`sorted`）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$order` | `array` | protected | 单条排序规则 |
| `$orders` | `array` | protected | 多条排序规则 |
| `$sorted` | `boolean` | protected | 本次请求是否传入了任一个排序参数 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 从请求中解析排序参数 |
| [`order()`](#order) | 设置或获取排序的字段 |
| [`orderBy()`](#orderby) | 设置或获取排序的方式 |
| [`orders()`](#orders) | 设置或获取多条排序规则 |
| [`sorted()`](#sorted) | 读取或设置「是否传入了排序参数」 |

### __construct()

```php
public function __construct(Request $R)
```

从请求中解析排序参数

读取 query 中的 order / orderBy / orders（存在才取，缺失则不覆盖默认），
若取到任意排序参数则标记 `sorted` 为 true，最后交由父类按数组填充属性。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 当前请求对象 |

### order()

```php
public function order($fieldName = null)
```

设置或获取排序的字段

读写一体：传 $fieldName 时设置 `order` 的字段名并返回 $this（链式）；不传时返回当前字段名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fieldName` | `string|null` | `null` | 排序字段名称 |

### orderBy()

```php
public function orderBy($sort = null)
```

设置或获取排序的方式

读写一体：传 $sort 时设置 `order` 的排序方式并返回 $this（链式）；不传时返回当前排序方式。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sort` | `string|null` | `null` | 排序方式：DESC、ASC |

### orders()

```php
public function orders($rules = null)
```

设置或获取多条排序规则

读写一体：传 $rules 时设置 `orders` 并返回 $this（链式）；不传时返回当前规则数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rules` | `array|null` | `null` | 关联数组，键是排序的字段名，值为排序方式：DESC、ASC |

### sorted()

```php
public function sorted($flag = null)
```

读取或设置「是否传入了排序参数」

读写一体：传 $flag 时设置 `sorted` 并返回 $this（链式）；不传时返回当前标记。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flag` | `bool|null` | `null` | 设置值 |

## 同目录

- [RequestFiltering](/php/api/foundation/http/request/extract/request-filtering)
- [RequestPagination](/php/api/foundation/http/request/extract/request-pagination)

