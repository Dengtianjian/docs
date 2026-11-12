# RequestPagination

`kernel\Foundation\HTTP\Request\Extract\RequestPagination`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request/Extract/RequestPagination.php`

> 从请求中提取的分页参数集合

## 声明

```php
class RequestPagination extends DataObject
```

父类：[DataObject](/php/api/foundation/object/data-object)

## 概述

解析请求 query 中的分页相关参数（page / perPage / limit / skip），
并标记本次请求是否实际传入了任一分页参数（`paginated`）。

分页字段通过父类 [DataObject](/php/api/foundation/object/data-object) 的魔术属性读写，例如：
- 读取：`$pagination->page`、`$pagination->perPage`
- 设置：`$pagination->page = 2`、`$pagination->perPage = 20`
其中 limit 与 perPage 始终同步为同一值。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$page` | `int` | protected | 页数 |
| `$perPage` | `int` | protected | 每页条数 |
| `$skip` | `int` | protected | 查询时跳过前面指定条数的记录 |
| `$limit` | `int|null` | protected | 每页条数（limit 别名） |
| `$paginated` | `boolean` | protected | 本次请求是否传入了任一分页参数 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 从请求中解析分页参数 |
| [`paginated()`](#paginated) | 读取或设置「是否传入了分页参数」 |

### __construct()

```php
public function __construct(Request $R)
```

从请求中解析分页参数

读取 query 中的 page / limit / perPage / skip（存在才取，缺失则不覆盖默认），
若取到任意分页参数则标记 `paginated` 为 true，最后交由父类按数组填充属性。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | 当前请求对象 |

### paginated()

```php
public function paginated($flag = null)
```

读取或设置「是否传入了分页参数」

读写一体：传 $flag 时设置 `paginated` 并返回 $this（链式）；不传时返回当前标记。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flag` | `bool|null` | `null` | 设置值 |

## 同目录

- [RequestFiltering](/php/api/foundation/http/request/extract/request-filtering)
- [RequestSorting](/php/api/foundation/http/request/extract/request-sorting)

