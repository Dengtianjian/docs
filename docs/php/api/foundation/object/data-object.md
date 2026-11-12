# DataObject

`kernel\Foundation\Object\DataObject`  ·  class

源码：`gstudio_kernel/Foundation/Object/DataObject.php`

> 数据对象（Data Object）

## 声明

```php
class DataObject extends stdClass
```

父类：`stdClass`

## 概述

一种数据容器，继承自 stdClass。实例化时通过构造参数一次性填充已声明
属性，之后仍允许通过 `set` 或 `->prop = $v` 继续写入数据
（含未声明的动态属性），适合需要在生命周期内多次更新字段的场景。

若希望「实例化后完全只读」，请继承 `ReadonlyDataObject`（而非本类），
它仅在 __set 上叠加写入拦截，其余读写能力由本类提供。

适用场景：
- 把结构化数据（如配置、查询结果行、外部 API 响应）封装成对象
- 在多个组件间传递，且允许任意一方更新字段
- 需要 `toArray()` / `toJson()` / `get()` / `has()` / `keys()` 等便捷访问

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`__get()`](#__get) | 读取属性 |
| [`__set()`](#__set) | 允许在实例化后写入数据 |
| [`set()`](#set) | 设置单个或多个属性 |
| [`assign()`](#assign) | 批量赋值：把数组中的值赋给已有属性 |
| [`toArray()`](#toarray) | 将属性输出为数组格式 |
| [`has()`](#has) | 是否包含指定属性（已声明且键存在） |
| [`get()`](#get) | 安全读取属性，不存在时返回默认值 |
| [`keys()`](#keys) | 返回全部属性名 |
| [`toJson()`](#tojson) | 序列化为 JSON 字符串 |
| [`__toString()`](#__tostring) | 序列化为 JSON 字符串（转字符串时调用） |

### __construct()

```php
public function __construct($data)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | — |

### __get()

```php
public function __get($name)
```

读取属性

访问不存在的属性时返回 null 而非触发 Undefined property 告警。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | — |

### __set()

```php
public function __set($k, $v)
```

允许在实例化后写入数据

支持写入「已声明的 protected 属性」以及「未声明的动态属性」。
在类作用域内直接赋值，不会递归触发本方法。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$k` | `string` | — | — |
| `$v` | `mixed` | — | — |

### set()

```php
public function set($key, $value = null)
```

设置单个或多个属性

- `set('name', $value)`：设置单个属性
- `set(['name' => $a, 'age' => $b])`：批量设置

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|array` | — | 属性名或键值对数组 |
| `$value` | `mixed` | `null` | 单个属性的值（数组模式忽略） |

### assign()

```php
public function assign(array $data)
```

批量赋值：把数组中的值赋给已有属性

仅更新已存在的属性（已声明的属性 + 已写入的动态属性），
数组中不存在的键会被忽略，也不会创建新的动态属性。
区别于 `set`：set() 会无条件写入任意键（含动态属性）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 键值对数据 |

### toArray()

```php
public function toArray()
```

将属性输出为数组格式

### has()

```php
public function has($key)
```

是否包含指定属性（已声明且键存在）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | — |

### get()

```php
public function get($key, $default = null)
```

安全读取属性，不存在时返回默认值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | — |
| `$default` | `mixed` | `null` | — |

### keys()

```php
public function keys()
```

返回全部属性名

### toJson()

```php
public function toJson($flags = JSON_UNESCAPED_UNICODE)
```

序列化为 JSON 字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flags` | `int` | `JSON_UNESCAPED_UNICODE` | json_encode 标志位，默认转义 Unicode |

可能抛出：

- `\RuntimeException` 序列化失败时抛出

### __toString()

```php
public function __toString()
```

序列化为 JSON 字符串（转字符串时调用）

## 非公开方法

**protected**

- `protected function properties()` —— 获取全部属性名（已声明属性 + 已写入的动态属性）

## 同目录

- [AbilityBaseObject](/php/api/foundation/object/ability-base-object)
- [BaseObject](/php/api/foundation/object/base-object)
- [ReadonlyDataObject](/php/api/foundation/object/readonly-data-object)

