# RequestData

`kernel\Foundation\HTTP\Request\RequestData`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request/RequestData.php`

> 请求数据包

## 声明

```php
class RequestData
```

## 概述

承载单一请求来源（如路由参数、查询串、请求体、请求头）的原始数据，
并提供「校验 → 转换 → 读取/写入/合并/删除」能力：
- 校验：通过 $validator 约束字段（Rule 实例 / Rules 关联数组 / Validator 实例）；
- 转换：通过 $mutator 对数据做映射、类型转换、字段裁剪；
- 读写：get()/some()/has() 支持点号路径与通配符，set()/fill()/remove() 支持写入与合并。

典型流程：fill() 注入数据 → prepare() 先校验再转换（转换结果原地写回 $data）→ 业务侧 get()/some() 取值。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$validatedResult` | `Result|null` | `null` | 最近一次 prepare() 的校验结果 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$data` | `array` | protected | 原始数据 / 当前数据 |
| `$mutator` | `Mutator|array|null` | protected | 数据转换规则 |
| `$validator` | `Validator|Rule|array|null` | protected | 数据校验规则 / 校验器 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化请求数据类 |
| [`has()`](#has) | 是否存在某个键 |
| [`get()`](#get) | 获取某个键的值 |
| [`set()`](#set) | 写入单个键值（覆盖式） |
| [`some()`](#some) | 获取数据 |
| [`prepare()`](#prepare) | 准备数据：先校验，再转换，最后把转换结果写回 $data |
| [`fill()`](#fill) | 注入数据，与既有数据合并 |
| [`remove()`](#remove) | 移除指定键 |

### __construct()

```php
public function __construct($mutator = null, $validator = null)
```

实例化请求数据类

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mutator` | `Mutator|array|null` | `null` | 数据转换规则（null/Mutator 实例/字段映射数组） |
| `$validator` | `Validator|Rule|array|null` | `null` | 数据校验规则或校验器（null/Rule 实例/关联数组/Validator 实例） |

### has()

```php
public function has($key)
```

是否存在某个键

支持点号路径（如 user.profile.name），严格区分「键存在值为 null」与「键不存在」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名，支持点号语法 |

### get()

```php
public function get($key, $default = null)
```

获取某个键的值

支持点号路径（如 user.profile.name）与 * 通配符（如 photos.*.url，
命中时返回平铺结果数组）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名，支持点号语法与通配符 |
| `$default` | `mixed` | `null` | 键不存在时的默认值 |

### set()

```php
public function set($key, $value)
```

写入单个键值（覆盖式）

不做点号路径展开：键名整体作为一级键写入（即 $key 含 "." 时按字面量存储，不会被拆成嵌套）。
返回当前实例以支持链式调用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名（按字面量存储，不解析点号路径） |
| `$value` | `mixed` | — | 值 |

### some()

```php
public function some($keys = null, $completion = false)
```

获取数据

无参调用（$keys === null）即获取全部数据（不经转换）；
传入键名则批量取部分，键名支持点号路径（如 user.profile.name，
结果以路径本身为键）。「获取全部」统一走本方法无参形态，勿再新增 all()。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keys` | `string|string[]|null` | `null` | 键名索引数组（传标量会被视作单个键） |
| `$completion` | `boolean` | `false` | 是否补齐缺失键为 null |

### prepare()

```php
public function prepare()
```

准备数据：先校验，再转换，最后把转换结果写回 $data

执行顺序：
1. 初始化 validatedResult 为「通过」；
2. 若设置了 $validator，按类型（关联数组 / Validator 实例 / 单个 Rule 实例）执行校验，
未通过则把错误写入 validatedResult 并返回 false；
3. 通过后用 $mutator 转换数据（无转换规则则跳过），转换成功写回 $data。

### fill()

```php
public function fill(array $data)
```

注入数据，与既有数据合并

通用能力：RequestParams 由 App::run()/Console 路由匹配完成后经 fill()
注入路由参数；其它子类（query/body/header）也可按需调用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 待合并的数据映射 |

### remove()

```php
public function remove($key)
```

移除指定键

与 fill() 对应，支持点号路径（如 user.profile.name）。键不存在时忽略，不报错。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 键名，支持点号语法 |

## 非公开方法

**protected**

- `protected function convert($data)` —— 应用数据转换规则

## 同目录

- [RequestBody](/php/api/foundation/http/request/request-body)
- [RequestHeader](/php/api/foundation/http/request/request-header)
- [RequestParams](/php/api/foundation/http/request/request-params)
- [RequestQuery](/php/api/foundation/http/request/request-query)

