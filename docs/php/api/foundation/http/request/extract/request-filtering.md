# RequestFiltering

`kernel\Foundation\HTTP\Request\Extract\RequestFiltering`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request/Extract/RequestFiltering.php`

> 从请求中提取的筛选参数集合

## 声明

```php
class RequestFiltering extends DataObject
```

父类：[DataObject](/php/api/foundation/object/data-object)

## 概述

解析请求 query 中的筛选相关参数（filter / search），
并标记本次请求是否实际传入了任一个筛选参数（`filtered`）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$filter` | `array` | protected | 筛选条件 |
| `$search` | `string|null` | protected | 模糊搜索关键词 |
| `$filtered` | `boolean` | protected | 本次请求是否传入了任一个筛选参数 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 从请求中解析筛选参数 |
| [`filter()`](#filter) | 设置或获取单条筛选条件 |
| [`search()`](#search) | 设置或获取模糊搜索关键词 |
| [`filtered()`](#filtered) | 读取或设置「是否传入了筛选参数」 |

### __construct()

```php
public function __construct(Request $R)
```

从请求中解析筛选参数

读取 query 中的 filter / search（存在才取，缺失则不覆盖默认），
若取到任意筛选参数则标记 `filtered` 为 true，最后交由父类按数组填充属性。

filter 支持逗号分隔的多条 `字段:值`，例如 `status:active,type:post`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 当前请求对象 |

### filter()

```php
public function filter($field = null, $value = null)
```

设置或获取单条筛选条件

读写一体：
- 仅传 $field 时返回该字段的筛选值（不存在返回 null）；
- 传 $field 与 $value 时设置该字段的值并返回 $this（链式）；
- 两者都不传时返回全部筛选条件数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$field` | `string|null` | `null` | 字段名 |
| `$value` | `mixed` | `null` | 筛选值 |

### search()

```php
public function search($keyword = null)
```

设置或获取模糊搜索关键词

读写一体：传 $keyword 时设置 `search` 并返回 $this（链式）；不传时返回当前关键词。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keyword` | `string|null` | `null` | 搜索关键词 |

### filtered()

```php
public function filtered($flag = null)
```

读取或设置「是否传入了筛选参数」

读写一体：传 $flag 时设置 `filtered` 并返回 $this（链式）；不传时返回当前标记。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flag` | `bool|null` | `null` | 设置值 |

## 同目录

- [RequestPagination](/php/api/foundation/http/request/extract/request-pagination)
- [RequestSorting](/php/api/foundation/http/request/extract/request-sorting)

