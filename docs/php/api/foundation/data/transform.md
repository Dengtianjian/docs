# Transform

`kernel\Foundation\Data\Transform`  ·  class

源码：`gstudio_kernel/Foundation/Data/Transform.php`

> 数据转换器 — 纯函数流转管道

## 声明

```php
class Transform
```

## 概述

将客户端传入的 _transform 参数解析为标准化的转换器调用链，
通过白名单校验后，依次调用 handler 上的转换器方法（Data In, Data Out）。

## GET 语法
_transform=withGroup:categoryId
_transform=limitFields:id,title,withGroup:author_id

## POST 语法（JSON body）
"_transform": ["withGroup", {"limit": [10]}]

## 转换器方法签名
function name($data, ...$args): mixed

## 方法一览

| 方法 | 说明 |
|---|---|
| [`parse()`](#parse) | 解析原始 _transform 输入为标准化格式 |
| [`apply()`](#apply) | 对数据依次执行转换器链（白名单校验 + 纯函数串联） |

### parse()

```php
public static function parse($raw): array
```

解析原始 _transform 输入为标准化格式

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$raw` | `string|array` | — | 原始 _transform 值 |

返回：`array` —— array 标准化数组：[{"name": "...", "args": [...]}, ...]

### apply()

```php
public static function apply(array $transforms, array $whitelist, $handler, $data)
```

对数据依次执行转换器链（白名单校验 + 纯函数串联）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$transforms` | `array` | — | 标准化后的转换器列表 [{name, args}] |
| `$whitelist` | `array` | — | 允许调用的转换器名称白名单 |
| `$handler` | `object` | — | 持有转换器方法的对象实例 |
| `$data` | `mixed` | — | 待处理的原始数据 |

## 非公开方法

**private**

- `private static function normalize(array $raw): array` —— 标准化数组格式的 _transform（POST body）
- `private static function parseString(string $input): array` —— 解析 GET _transform 字符串

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)

