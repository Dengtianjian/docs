# ModelBuilder

`kernel\Foundation\Database\RDB\ModelBuilder`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/ModelBuilder.php`

> Model 查询构建器

## 声明

```php
class ModelBuilder
```

## 概述

承担 Model 的全部查询职责，是 `Model::scopedBuilder()` / `Model::builder()` 的返回值。
对应 Laravel 的 `Illuminate\Database\Eloquent\Builder`。

## 为什么需要这一层

早期实现中 `Model::__call()` 直接把方法转发给 Model 持有的**同一个** Query 实例，
而 Query 只在写操作后 reset，导致查询条件跨调用累积：

```php
$model->where('key', $k)->exists();   // 条件留在 Query 上
$model->where('key', $k)->delete();   // 变成 AND `key` = ? AND `key` = ?
```

ModelBuilder 的生命周期**严格等于一次查询链**：每次从 Model 发起查询都新建一个
Builder（内部持有全新 Query），链式方法返回 Builder 自身，链结束后 Builder 即被丢弃。
因此任何两次查询之间不可能共享状态。

## 职责划分

- `Model`      ：Active Record —— 属性读写、save/delete/restore、关联定义、类型转换
- `ModelBuilder`：查询 —— where/orderBy/get/first 等，以及结果 hydrate 与 eager loading

## 链式语义

```php
UserModel::where('status', 1)->orderBy('id')->get();  // Builder 链，互不干扰
UserModel::where('a', 1)->get();
UserModel::where('b', 2)->get();                       // 不受上一行影响
```

注意：从 Model 实例**重新发起**链式调用会开启新的 Builder，此前未终结的链会被丢弃：

```php
$user->where('a', 1);   // 条件被丢弃（未接续链式，也未执行）
$user->get();           // 查全表，不含 a=1
```

## 条件链式

可选条件可用 `when()` / `unless()` 优雅表达，无需为分支单独声明变量：

```php
UserModel::orderBy('id')
->when($onlyActive, fn($q) => $q->where('active', 1))
->unless($onlyTrashed, fn($q) => $q->withoutTrashed())
->get();
```

## 结果处理

取到数据后需要对每条结果统一加工时，用 `map()` 注册回调（`get()`/`first()`/`paginate()` 执行时应用）：

```php
LinksModel::orWhereLike('show_pages', '%list%')
->map(fn($item) => $item + ['host' => parse_url($item['url'], PHP_URL_HOST)])
->get();
```

## 示例

```php
$model->where('key', $k)->exists();   // 条件留在 Query 上
$model->where('key', $k)->delete();   // 变成 AND `key` = ? AND `key` = ?
```

## 示例

```php
UserModel::where('status', 1)->orderBy('id')->get();  // Builder 链，互不干扰
UserModel::where('a', 1)->get();
UserModel::where('b', 2)->get();                       // 不受上一行影响
```

## 示例

```php
$user->where('a', 1);   // 条件被丢弃（未接续链式，也未执行）
$user->get();           // 查全表，不含 a=1
```

## 示例

```php
UserModel::orderBy('id')
->when($onlyActive, fn($q) => $q->where('active', 1))
->unless($onlyTrashed, fn($q) => $q->withoutTrashed())
->get();
```

## 示例

```php
LinksModel::orWhereLike('show_pages', '%list%')
->map(fn($item) => $item + ['host' => parse_url($item['url'], PHP_URL_HOST)])
->get();
```

## 相关

- `Model::scopedBuilder` 创建入口（含全局作用域）

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `HYDRATE_METHODS` | `['get', 'first', 'paginate']` | 需要把结果行转换为 Model 实例的终端方法 |
| `MAP_METHODS` | `['get', 'first', 'paginate']` | 会对结果集逐项应用 map() 回调的终端方法 |
| `METHOD_ALIASES` | `[ 'all' => 'get', ]` | 方法别名映射 |
| `EXECUTE_METHODS` | `[ 'get', 'first', 'value', 'pluck', 'paginate', 'count', 'exists', 'notExists', 'max', 'min', 'avg', 'sum', 'update', 'delete', 'cursor', 'chunk', 'chunkById', ]` | 会真正执行 SQL 的方法 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$model` | `Model` | protected | 原型 Model 实例 |
| `$query` | `Query` | protected | 本次查询链专属的 Query 实例 |
| `$eagerLoads` | `array` | protected | 待预加载的关联关系名列表 |
| `$trashedScope` | `int` | protected | 软删除作用域模式，取自 Model 的当前设置 |
| `$scopesApplied` | `bool` | private | 全局作用域是否已应用 |
| `$resultMap` | `callable|null` | private | 结果集逐项处理回调（由 map() 注册） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造查询构建器 |
| [`__call()`](#__call) | 方法代理：转发给底层 Query |
| [`with()`](#with) | 设置需要预加载的关联关系 |
| [`map()`](#map) | 注册结果集逐项处理回调 |
| [`when()`](#when) | 条件式链式调用：条件为真时执行回调，否则跳过 |
| [`unless()`](#unless) | 条件式链式调用（反向）：条件为假时执行回调 |
| [`withTrashed()`](#withtrashed) | 查询范围：包含已软删除的记录 |
| [`onlyTrashed()`](#onlytrashed) | 查询范围：仅查询已软删除的记录（WHERE deleted_at IS NOT NULL） |
| [`withoutTrashed()`](#withouttrashed) | 查询范围：仅查询未软删除的记录（WHERE deleted_at IS NULL，默认行为） |
| [`forceDelete()`](#forcedelete) | 强制真删除：绕过软删除作用域，按当前条件执行 DELETE |
| [`getQuery()`](#getquery) | 获取底层 Query 实例 |
| [`toQuery()`](#toquery) | 获取带全局作用域的 Query 实例 |
| [`getModel()`](#getmodel) | 获取原型 Model 实例 |
| [`getEagerLoads()`](#geteagerloads) | 获取当前声明的预加载关系 |

### __construct()

```php
public function __construct(Model $model, array $eagerLoads = [], int $trashedScope = Model::TRASHED_EXCLUDE)
```

构造查询构建器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$model` | `Model` | — | 原型 Model 实例 |
| `$eagerLoads` | `array` | `[]` | 预加载的关联关系名列表 |
| `$trashedScope` | `int` | `Model::TRASHED_EXCLUDE` | 软删除作用域模式 |

### __call()

```php
public function __call($method, $parameters)
```

方法代理：转发给底层 Query

- Query 链式方法（返回 Query 自身）→ 返回 $this，保持 Builder 链
- 执行方法 → 先应用全局作用域，再执行
- 声明了 with() 的终端方法 → 结果行转 Model 实例并批量预加载

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 方法名 |
| `$parameters` | `array` | — | 参数 |

### with()

```php
public function with(string ...$relations)
```

设置需要预加载的关联关系

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relations` | `...string` | — | 关系方法名列表 |

### map()

```php
public function map(callable $callback)
```

注册结果集逐项处理回调

在查询执行后（get / first / paginate）对每条结果应用一次，**用回调的返回值替换原数据**，
适合取到数据后统一加工（补字段、格式化、裁剪字段等）。可链式，多次调用以最后一次为准。

与 when()/unless() 的区别：when/unless 作用于「查询条件」，map 作用于「查询结果」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 处理函数 fn($item) => $newItem。 |

### when()

```php
public function when($condition, callable $callback,$default = null)
```

条件式链式调用：条件为真时执行回调，否则跳过

回调接收当前 Builder 与条件值两个参数，返回 $this 以维持链式。
用于「可选条件」场景，避免为条件分支单独声明变量。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$condition` | `mixed` | — | 条件（真值判定） |
| `$callback` | `callable` | — | 条件为真时调用：fn(ModelBuilder $q, $condition) |
| `$default` | `callable|null` | `null` | 条件为假时可调用的回退回调（可选） |

### unless()

```php
public function unless($condition, callable $callback,$default = null)
```

条件式链式调用（反向）：条件为假时执行回调

等价于 when(!$condition, $callback, $default)。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$condition` | `mixed` | — | 条件（真值判定） |
| `$callback` | `callable` | — | 条件为假时调用：fn(ModelBuilder $q, $condition) |
| `$default` | `callable|null` | `null` | 条件为真时可调用的回退回调（可选） |

### withTrashed()

```php
public function withTrashed()
```

查询范围：包含已软删除的记录

不加任何 deleted_at 条件。需在终端方法前调用。

### onlyTrashed()

```php
public function onlyTrashed()
```

查询范围：仅查询已软删除的记录（WHERE deleted_at IS NOT NULL）

### withoutTrashed()

```php
public function withoutTrashed()
```

查询范围：仅查询未软删除的记录（WHERE deleted_at IS NULL，默认行为）

### forceDelete()

```php
public function forceDelete($params = [])
```

强制真删除：绕过软删除作用域，按当前条件执行 DELETE

提供此方法是为了保持 `Model::where(...)->forceDelete()` 这类链式写法可用
（链式方法现在返回 Builder 而非 Model，Model 专有方法需在此显式提供）。

注意：不应用软删除作用域，否则已软删除的记录永远删不掉。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `array` | `[]` | 预处理参数 |

### getQuery()

```php
public function getQuery(): Query
```

获取底层 Query 实例

供 Relation 等组件基于已配置作用域的 Query 继续构建关联查询。

返回：`Query` —— Query

### toQuery()

```php
public function toQuery(): Query
```

获取带全局作用域的 Query 实例

立即应用作用域后返回，用于需要脱离 Builder 直接使用 Query 的场景（如 Relation）。

返回：`Query` —— Query

### getModel()

```php
public function getModel(): Model
```

获取原型 Model 实例

返回：`Model` —— Model

### getEagerLoads()

```php
public function getEagerLoads(): array
```

获取当前声明的预加载关系

返回：`array` —— array＜string＞

## 非公开方法

**private**

- `private function applyScopes()` —— 应用全局作用域（当前只有软删除过滤）
- `private function hydrateResult(string $method, $result)` —— 将 Query 查询结果转换为 Model 实例并执行 eager loading
- `private function applyResultMap(string $method, $result)` —— 对查询结果逐项应用 map() 回调

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [Model](/php/api/foundation/database/rdb/model)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

