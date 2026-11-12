# Model

`kernel\Foundation\Database\RDB\Model`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Model.php`

> Model — AR（Active Record）+ 查询代理 ORM 基类

## 声明

```php
class Model extends Table
```

父类：`Table`

## 概述

提供两种使用模式：
1. 查询代理：所有未定义方法通过 __call / __callStatic 转发给 ModelBuilder，支持完整链式调用
2. Active Record：直接操作单行数据，$model->field = value → save() / find() / delete()

## 查询状态隔离（重要）

每次查询都由 `scopedBuilder()` 创建**全新的 ModelBuilder**（内部持有全新 Query），
链式方法由 Builder 承接并返回自身，链结束后 Builder 即丢弃。
因此两次查询之间绝不共享 where/orderBy/select/limit 等任何状态。

早期实现把方法转发给 Model 持有的同一个 Query 实例，而 Query 只在写操作后 reset，
导致条件跨调用累积（见 ModelBuilder 类注释）。

类型转换架构：
PHP 赋值/DB 取值 ──→ castToDb()  ──→  存入 $data（DB 兼容格式）
读取/输出        ──→ castFromDb() ──→  转为 PHP 期望类型

时间戳自动维护：save() 实例操作、以及 insert/update 等查询级写操作（受 $queryTimestamps 控制）都会自动填充 created_at / updated_at，精度由字段的 cast 类型决定
软删除：delete() 写入 deleted_at 而非真删，查询默认过滤 deleted_at IS NULL

## 代码组织（自上而下）

常量（作用域模式）→ 属性 → 构造与初始化 → 访问器
→ 类型转换引擎 → 查询入口 → 结果转换与预加载 → 属性读写
→ Active Record（写入 / 删除与恢复）→ 软删除查询范围 → 关联关系 → 数据导出

------------------------------------------------------------------
=== Active Record 方法 ===

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `find(int|string $id)` | 按主键查一行，数据填充到 $data |
| `$this save()                                 主键非默认值 → UPDATE，否则 → INSERT + 回填 ID` | — |
| `delete(array $params = [])` | 软删除（写 deleted_at）或真删；有主键按主键，否则走 Query 条件 |
| `$this where(mixed $column, mixed $operatorOrValue = null, mixed $value = null)` | — |
| `$this whereRaw(string $sql)` | — |
| `$this whereBetween(string $column, mixed $min, mixed $max)` | — |
| `$this whereNotBetween(string $column, mixed $min, mixed $max)` | — |
| `$this whereIn(string $column, array|\kernel\Foundation\Database\RDB\Query $values)` | — |
| `$this whereNotIn(string $column, array|\kernel\Foundation\Database\RDB\Query $values)` | — |
| `$this whereNull(string $column)` | — |
| `$this whereNotNull(string $column)` | — |
| `$this whereLike(string $column, string $value)` | — |
| `$this whereNotLike(string $column, string $value)` | — |
| `$this whereColumn(string $column1, string $operatorOrColumn2, string $column2 = null)` | — |
| `$this whereDate(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereYear(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereMonth(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereDay(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereTime(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereHour(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereMinute(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereSecond(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this whereExists(\kernel\Foundation\Database\RDB\Query|callable $queryOrCallable)` | — |
| `$this whereNotExists(\kernel\Foundation\Database\RDB\Query|callable $queryOrCallable)` | — |
| `$this orWhere(mixed $column, mixed $operatorOrValue = null, mixed $value = null)` | — |
| `$this orWhereRaw(string $sql)` | — |
| `$this orWhereBetween(string $column, mixed $min, mixed $max)` | — |
| `$this orWhereNotBetween(string $column, mixed $min, mixed $max)` | — |
| `$this orWhereIn(string $column, array|\kernel\Foundation\Database\RDB\Query $values)` | — |
| `$this orWhereNotIn(string $column, array|\kernel\Foundation\Database\RDB\Query $values)` | — |
| `$this orWhereNull(string $column)` | — |
| `$this orWhereNotNull(string $column)` | — |
| `$this orWhereLike(string $column, string $value)` | — |
| `$this orWhereNotLike(string $column, string $value)` | — |
| `$this orWhereColumn(string $column1, string $operatorOrColumn2, string $column2 = null)` | — |
| `$this orWhereDate(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereYear(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereMonth(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereDay(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereTime(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereHour(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereMinute(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereSecond(string $column, string $operatorOrValue, mixed $value = null)` | — |
| `$this orWhereExists(\kernel\Foundation\Database\RDB\Query|callable $queryOrCallable)` | — |
| `$this orWhereNotExists(\kernel\Foundation\Database\RDB\Query|callable $queryOrCallable)` | — |
| `$this whereFilter(array $data, string $operator = 'AND')` | — |
| `$this select(string ...$columns)` | — |
| `$this selectRaw(string $sql)` | — |
| `$this addSelect(string ...$columns)` | — |
| `$this selectSub(\kernel\Foundation\Database\RDB\Query|callable $query, string $asName)` | — |
| `$this distinct(string ...$columns)` | — |
| `$this orderBy(string $column, string $direction = 'ASC')` | — |
| `$this orderByRaw(string $rawSQL)` | — |
| `$this orderRandom(string $seed = null)` | — |
| `$this groupBy(string ...$columns)` | — |
| `$this groupByRaw(string $rawSQL)` | — |
| `$this limit(int $value)` | — |
| `$this take(int $value)` | — |
| `$this offset(int $value)` | — |
| `$this skip(int $value)` | — |
| `$this page(int $page, int $perPage = 10)` | — |
| `$this from(string $tableName, string $asName = null)` | — |
| `$this fromSub(\kernel\Foundation\Database\RDB\Query|callable $query, string $asName)` | — |
| `$this bind(string $key, mixed $value)` | — |
| `$this addBindings(array $bindings)` | — |
| `$this fill(string $executeType, array $options)` | — |
| `$this reset()` | — |
| `$this setDatabaseDriver($driver)` | — |
| `$this when(mixed $condition, callable $callback, ?callable $default = null) 条件为真时执行回调（Laravel 风格可选条件）` | — |
| `$this unless(mixed $condition, callable $callback, ?callable $default = null) 条件为假时执行回调（when 的反向）` | — |
| `$this map(callable $callback) 注册结果集逐项处理回调（get/first/paginate 执行时逐项应用，用返回值替换原数据）` | — |
| `$this with(string ...$relations) 声明预加载的关联关系` | — |
| `first(array $params = [])` | 返回 array|false |
| `get(array $params = [])` | 返回 array |
| `cursor(array $params = [])` | 返回 \Generator |
| `chunk(int $size, callable $callback)` | 返回 bool |
| `chunkById(int $size, callable $callback, string $column = 'id')` | 返回 bool |
| `chunkStream(int $size, string $column = 'id')` | 返回 \Generator |
| `count(string $column = '*', array $params = [])` | 返回 int|false |
| `max(string $column, array $params = [])` | 返回 int|float|false |
| `min(string $column, array $params = [])` | 返回 int|float|false |
| `avg(string $column, array $params = [])` | 返回 float|false |
| `sum(string $column, array $params = [])` | 返回 int|float|false |
| `exists(array $params = [])` | 返回 bool |
| `notExists(array $params = [])` | 返回 bool |
| `value(string $column, array $params = [])` | 返回 mixed|null |
| `pluck(string $column, string|null $indexKey = null, array $params = [])` | 返回 array |
| `paginate(array $params = [])` | 返回 \kernel\Foundation\Database\RDB\Paginator |
| `raw(mixed $sql)` | 返回 \kernel\Foundation\Database\RDB\Statement |
| `getSql()` | 返回 string |
| `getBindings()` | 返回 array |
| `writeSql(string $type, array|null $data = null, array $options = [])` | 返回 string |
| `insert(array $data, bool $isReplaceInto = false, bool $isIgnore = false, bool $returnId = false, array $params = [])` | 返回 int|bool |
| `insertGetId(array $data, bool $isReplaceInto = false, bool $isIgnore = false, array $params = [])` | 返回 int|string |
| `update(array $data, array $params = [])` | 返回 int|bool |
| `tableName()` | 获取当前（含前缀）表名 |
| `prefix(string|null $val = null)` | 读取或设置表前缀 |
| `applyPrefix(string $tableName)` | 为表名追加前缀 |
| `create()` | 依据 $schema 建表 |
| `drop()` | 删表 |
| `truncate()` | 清空表（保留结构） |
| `rename(string $newName)` | 重命名表 |
| `copy(string $newName, bool $withData = false)` | 复制表（可选连带数据） |
| `tableExists()` | 表是否存在 |
| `getCreateSQL()` | 获取建表 DDL |
| `getColumns()` | 获取字段结构 |
| `getIndexes()` | 获取索引 |
| `getStatus()` | 获取表状态（引擎/行数/自增值等） |
| `optimize()` | 优化表（整理碎片） |
| `getPhpSchema()` | $schema → 字段→PHP类型 映射 |
| `exec(string $sql)` | 执行写/DDL SQL（PDO::exec） |
| `execQuery(string $sql)` | 执行 SQL 返回结果集对象 |
| `select(string $sql, array $bindings = [])` | 原生查询取全部行 |
| `selectOne(string $sql, array $bindings = [])` | 原生查询取单行 |
| `scalar(string $sql, array $bindings = [])` | 原生查询取标量 |
| `insertId()` | 最后插入的自增 ID |

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `TRASHED_EXCLUDE` | `0` | 软删除作用域：排除已软删除的记录（默认） |
| `TRASHED_INCLUDE` | `1` | 软删除作用域：包含已软删除的记录 |
| `TRASHED_ONLY` | `2` | 软删除作用域：仅查已软删除的记录 |

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | `""` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$primaryKey` | `string` | protected | — |
| `$timestamps` | `bool` | protected | — |
| `$createTime` | `string` | protected | — |
| `$updateTime` | `string` | protected | — |
| `$queryTimestamps` | `bool` | protected | 查询级（非实例）写操作时是否自动维护 created_at / updated_at |
| `$softDelete` | `bool` | protected | — |
| `$deleteTime` | `string` | protected | — |
| `$casts` | `array` | protected | 手动指定的字段类型映射（字段名 → 类型标签） |
| `$schemaCasts` | `array` | private | 从 $schema 列定义自动推导的类型映射（字段名 → 类型标签） |
| `$dateFormat` | `string` | protected | timestamp / date 类型默认输出格式 |
| `$trashedScope` | `int` | protected | 软删除作用域默认模式 |
| `$query` | `Query|null` | protected | 子类自定义的 Query 原型（可选） |
| `$eagerLoads` | `array` | private | 待预加载的关联关系名列表 |
| `$relations` | `array` | private | 已加载的关联数据缓存 |
| `$data` | `array` | private | 当前行数据（键值对，存储的是 DB 兼容格式） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`getPrimaryKey()`](#getprimarykey) | 获取主键字段名 |
| [`getTableBaseName()`](#gettablebasename) | 获取去前缀后的表名 |
| [`getCasts()`](#getcasts) | 获取手动声明的字段类型映射 |
| [`getTrashedScope()`](#gettrashedscope) | 获取当前软删除作用域模式 |
| [`getDeleteTime()`](#getdeletetime) | 获取软删除标记字段名 |
| [`getEagerLoads()`](#geteagerloads) | 获取当前声明的预加载关系 |
| [`scopedBuilder()`](#scopedbuilder) | 创建一次性的查询构建器（含全局作用域） |
| [`builder()`](#builder) | 创建不带全局作用域的查询构建器 |
| [`query()`](#query) | 创建全新的裸 Query 实例（不含任何作用域） |
| [`scopedQuery()`](#scopedquery) | 获取带全局作用域的 Query 实例 |
| [`__callStatic()`](#__callstatic) | 静态调用代理：自动实例化后转发到查询构建器 |
| [`__call()`](#__call) | 实例方法代理：未定义方法转发给新的查询构建器 |
| [`rowToModel()`](#rowtomodel) | 将数据库行数据转为 Model 实例 |
| [`setRelation()`](#setrelation) | 设置关联数据缓存（用于 eager loading 分发） |
| [`eagerLoadRelations()`](#eagerloadrelations) | 批量执行 eager loading |
| [`__get()`](#__get) | 读取属性 |
| [`__isset()`](#__isset) | 判断属性是否存在（isset() / ?? 运算符会走这里） |
| [`__set()`](#__set) | 写入属性 |
| [`discuzTableName()`](#discuztablename) | 拼出 DiscuzX 环境下的真实表名 |
| [`save()`](#save) | 持久化当前行数据 |
| [`touchTimestampForData()`](#touchtimestampfordata) | 为外部写入数据数组注入 created_at / updated_at（查询级写操作用） |
| [`delete()`](#delete) | 删除记录 |
| [`forceDelete()`](#forcedelete) | 强制真删除（绕过软删除，直接执行 DELETE） |
| [`restore()`](#restore) | 恢复已软删除的记录（SET deleted_at = NULL） |
| [`isTrashed()`](#istrashed) | 当前行是否已被软删除 |
| [`usesSoftDelete()`](#usessoftdelete) | 软删除功能是否启用 |
| [`hasOne()`](#hasone) | 定义一对一关系 |
| [`hasMany()`](#hasmany) | 定义一对多关系 |
| [`belongsTo()`](#belongsto) | 定义反向一对多关系 |
| [`getRelation()`](#getrelation) | 获取指定关联的查询结果（带缓存） |
| [`load()`](#load) | 手动加载指定关联 |
| [`with()`](#with) | 设置需要预加载的关联关系（静态方法） |
| [`toArray()`](#toarray) | 将当前行数据导出为关联数组 |
| [`toJson()`](#tojson) | 将当前行数据导出为 JSON 字符串 |

### __construct()

```php
public function __construct($tableName = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `mixed` | `null` | — |

### getPrimaryKey()

```php
public function getPrimaryKey(): string
```

获取主键字段名

返回：`string`

### getTableBaseName()

```php
public function getTableBaseName(): string
```

获取去前缀后的表名

用于自动推断关联外键时生成 `{表名}_{主键}` 格式的字段名。
例如 prefix='ruyi_', tableName='ruyi_users' → 返回 'users'

返回：`string` —— string

### getCasts()

```php
public function getCasts(): array
```

获取手动声明的字段类型映射

返回：`array` —— array＜string, string＞

### getTrashedScope()

```php
public function getTrashedScope(): int
```

获取当前软删除作用域模式

返回：`int` —— int Model::TRASHED_*

### getDeleteTime()

```php
public function getDeleteTime(): string
```

获取软删除标记字段名

返回：`string` —— string

### getEagerLoads()

```php
public function getEagerLoads(): array
```

获取当前声明的预加载关系

返回：`array` —— array＜string＞

### scopedBuilder()

```php
public function scopedBuilder(): ModelBuilder
```

创建一次性的查询构建器（含全局作用域）

每次调用返回全新的 ModelBuilder，内部持有全新的 Query 实例，
因此两次查询之间不会共享任何条件、排序、绑定参数。

这是所有查询的统一入口，替代早期「共享 $this->query」的写法。

需要不包含作用域的构建器请用 builder()，仅取 Query 请用 query() / scopedQuery()。

返回：`ModelBuilder` —— ModelBuilder

### builder()

```php
public function builder(): ModelBuilder
```

创建不带全局作用域的查询构建器

用于 Active Record 内部操作（save / delete / restore），
避免软删除条件干扰对已删除记录的写入。

与 scopedBuilder() 的唯一区别是不应用软删除作用域。

返回：`ModelBuilder` —— ModelBuilder

### query()

```php
public function query(): Query
```

创建全新的裸 Query 实例（不含任何作用域）

每次调用都是独立实例。供 ModelBuilder 构造、内部写操作、
以及需要绕过软删除的作用域的组件使用。

子类若在构造中为 $query 赋了自定义 Query 实例，这里会沿用同一个类，
但用**当前**的 $tableName 新建，既保留了自定义实现，又不会复用任何查询状态。

需要带作用域时请用 scopedQuery()。

返回：`Query` —— Query

### scopedQuery()

```php
public function scopedQuery(): Query
```

获取带全局作用域的 Query 实例

返回全新的 Query，且已应用软删除等全局作用域。
供 Relation 等需要脱离 ModelBuilder、但又要遵守作用域的组件使用。

与 query() 的区别：后者不含任何作用域。

返回：`Query` —— Query

### __callStatic()

```php
public static function __callStatic($method, $parameters)
```

静态调用代理：自动实例化后转发到查询构建器

UserModel::where('status', 1)->get()  → new UserModel → scopedBuilder() → where() → get()
UserModel::count()                     → new UserModel → scopedBuilder() → count()

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `mixed` | — | — |
| `$parameters` | `mixed` | — | — |

### __call()

```php
public function __call($method, $parameters)
```

实例方法代理：未定义方法转发给新的查询构建器

每次调用都开启一条全新的查询链，链式方法由 ModelBuilder 承接并返回自身，
因此后续链式调用不再经过本方法，也就不会重复创建构建器。

find() 是唯一例外：需要把结果填充进**当前**实例而非返回新实例。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `mixed` | — | — |
| `$parameters` | `mixed` | — | — |

### rowToModel()

```php
public function rowToModel(array $row, string $class = ''): Model
```

将数据库行数据转为 Model 实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$row` | `array` | — | 数据库行数据 |
| `$class` | `string` | `''` | Model 类名（默认当前类） |

返回：`Model` —— static

### setRelation()

```php
public function setRelation(string $name, $value)
```

设置关联数据缓存（用于 eager loading 分发）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | — |
| `$value` | `mixed` | — | — |

### eagerLoadRelations()

```php
public function eagerLoadRelations(array $models)
```

批量执行 eager loading

对一组 Model 实例批量预加载指定的关联关系，消除 N+1 问题。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$models` | `array` | — | — |

### __get()

```php
public function __get($name)
```

读取属性

优先级：类 property → 已缓存的关联数据 → 关系懒加载 → $data → null
若字段在 $casts 中声明，通过 castFromDb 转为 PHP 输出格式。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `mixed` | — | — |

### __isset()

```php
public function __isset($name): bool
```

判断属性是否存在（isset() / ?? 运算符会走这里）

必须与 __get() 的解析优先级保持一致，否则 `$model->field ?? '默认值'`
会因为 __isset() 返回 false 而永远拿不到 $data 与关联里的真实值。

判定顺序：类 property → 已缓存的关联 → $data 字段 → 可懒加载的关联方法

注意遵循 isset() 语义：值为 null 时一律返回 false。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `mixed` | — | — |

返回：`bool`

### __set()

```php
public function __set($name, $value)
```

写入属性

自动通过 castToDb 转为 DB 兼容格式后存入 $data。
类型优先级：$casts > $schemaCasts；均未声明则不转换，原样存储。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `mixed` | — | — |
| `$value` | `mixed` | — | — |

### discuzTableName()

```php
public function discuzTableName($tableName)
```

拼出 DiscuzX 环境下的真实表名

Discuz 的表名由「应用 ID + 表名」组成（如 `gstudio_super_app_files`）。应用 ID 取
**本模型所属的应用**（`BaseObject::app`）：容器构造对象时会把所属应用压进
装配上下文，所以构造期就能算对；构造完成后则由 `bindApp()` 补上的实例决定。

因此「读别的应用的表」不再靠猜：用那个应用的容器取模型即可
（`$superApp->make(FilesModel::class)`），表名与签名都会跟着它走。

传入的表名里已含 `gstudio` 前缀时原样透传，不会被二次拼接。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `string` | — | 模型声明的裸表名（如 `files`），或调用方给定的完整表名 |

### save()

```php
public function save()
```

持久化当前行数据

判断逻辑：主键值等于默认值（如 0） → INSERT 后回填自增 ID
主键值非默认值              → UPDATE

save() 前自动调用 touchTimestamps() 注入 created_at / updated_at。
$data 已存储为 DB 兼容格式，直接传给 Query::update / insertGetId。

### touchTimestampForData()

```php
public function touchTimestampForData(array $data, bool $isInsert = false): array
```

为外部写入数据数组注入 created_at / updated_at（查询级写操作用）

与 touchTimestamps() 同理，但作用于传入的 $data（而非 $this->data），
并复用以字段 cast 类型为准的 castToDb 转换，保证存储格式一致。
仅当字段缺失时填充，已显式传入的值保留；模型未声明该列时跳过。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 写入数据（单行关联数组，或批量索引数组） |
| `$isInsert` | `bool` | `false` | 是否 INSERT（true 同时设 created_at；false 只设 updated_at） |

返回：`array` —— array 注入后的数据

### delete()

```php
public function delete($params = [])
```

删除记录

软删除启用时：写入 deleted_at = 当前时间（非真删）
软删除关闭时：执行真实 DELETE

data 中存在有效主键 → 按主键条件删；否则将条件转发给 Query（链式查询场景）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `mixed` | `[]` | — |

### forceDelete()

```php
public function forceDelete($params = [])
```

强制真删除（绕过软删除，直接执行 DELETE）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$params` | `mixed` | `[]` | — |

### restore()

```php
public function restore()
```

恢复已软删除的记录（SET deleted_at = NULL）

### isTrashed()

```php
public function isTrashed(): bool
```

当前行是否已被软删除

返回：`bool`

### usesSoftDelete()

```php
public function usesSoftDelete(): bool
```

软删除功能是否启用

返回：`bool`

### hasOne()

```php
public function hasOne(string $relatedClass, string $foreignKey = '', string $localKey = ''): HasOne
```

定义一对一关系

当前 Model 拥有一条关联 Model 记录。

```php
class User extends Model {
public function profile() {
return $this->hasOne(Profile::class);
// 等价于 return $this->hasOne(Profile::class, 'user_id', 'id');
}
}
$user = User::find(1);
echo $user->profile->bio;
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relatedClass` | `string` | — | 关联 Model 类名 |
| `$foreignKey` | `string` | `''` | 关联表外键（可选，自动推断为 {当前表名}_{当前主键}） |
| `$localKey` | `string` | `''` | 当前表主键（可选，默认 $primaryKey） |

返回：`HasOne` —— HasOne

### hasMany()

```php
public function hasMany(string $relatedClass, string $foreignKey = '', string $localKey = ''): HasMany
```

定义一对多关系

当前 Model 拥有多条关联 Model 记录。

```php
class Post extends Model {
public function comments() {
return $this->hasMany(Comment::class);
}
}
$post = Post::find(1);
foreach ($post->comments as $comment) { ... }
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relatedClass` | `string` | — | 关联 Model 类名 |
| `$foreignKey` | `string` | `''` | 关联表外键（可选，自动推断） |
| `$localKey` | `string` | `''` | 当前表主键（可选，默认 $primaryKey） |

返回：`HasMany` —— HasMany

### belongsTo()

```php
public function belongsTo(string $relatedClass, string $foreignKey = '', string $localKey = ''): BelongsTo
```

定义反向一对多关系

当前 Model 属于一条父 Model 记录（即当前表持有外键）。

```php
class Comment extends Model {
public function post() {
return $this->belongsTo(Post::class);
// 等价于 return $this->belongsTo(Post::class, 'post_id', 'id');
}
}
$comment = Comment::find(1);
echo $comment->post->title;
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relatedClass` | `string` | — | 关联的父 Model 类名 |
| `$foreignKey` | `string` | `''` | 当前表外键（可选，自动推断为 {关联表名}_{关联表主键}） |
| `$localKey` | `string` | `''` | 关联表主键（可选，默认关联 Model 的 $primaryKey） |

返回：`BelongsTo` —— BelongsTo

### getRelation()

```php
public function getRelation(string $relation)
```

获取指定关联的查询结果（带缓存）

若关联已加载则直接返回缓存，否则通过关系方法查询并缓存。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relation` | `string` | — | 关系方法名 |

### load()

```php
public function load(string ...$relations)
```

手动加载指定关联

适用于已有 Model 实例时按需加载关联数据。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relations` | `...string` | — | 关系方法名列表 |

### with()

```php
public static function with(string ...$relations)
```

设置需要预加载的关联关系（静态方法）

在 get/first/find 等终端方法调用前通过 with() 声明需要预加载的关联，
终端方法执行时会自动进行批量 eager loading。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relations` | `...string` | — | 关系方法名列表 |

### toArray()

```php
public function toArray(): array
```

将当前行数据导出为关联数组

$casts 中声明的字段通过 castFromDb 转为 PHP 输出格式；其余字段原样返回。

返回：`array`

### toJson()

```php
public function toJson(int $flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES): string
```

将当前行数据导出为 JSON 字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flags` | `int` | `JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES` | JSON 编码选项（默认 JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES） |

返回：`string`

## 非公开方法

**protected**

- `protected static function getDefaultTableName(): string` —— 从类名自动推断数据库表名
- `protected function freshTimestamp(): int` —— 获取当前时间戳（毫秒精度）
- `protected function usesTimestamps(): bool` —— 时间戳自动维护是否启用
- `protected function usesQueryTimestamps(): bool` —— 查询级（非实例）写操作是否自动维护时间戳

**private**

- `private function detectPrimaryKey()` —— 遍历 $schema 找到首个主键或自增列，设置为 $primaryKey
- `private function detectTimestamps()` —— 如果 $casts 和 $schemaCasts 中不存在 $createTime 或 $updateTime，则关闭时间戳自动维护
- `private function detectSoftDelete()` —— 如果 $casts 和 $schemaCasts 中都不存在 $deleteTime 字段，则关闭软删除
- `private function castToDb(string $type, $value)` —— PHP → DB：将任意 PHP 值转为可直接写入数据库的格式
- `private function castFromDb(string $type, $value)` —— DB → PHP：将数据库原始值转为 PHP 端期望的类型（输出/读取时调用）
- `private function parseCastType(string $type): array` —— 解析 cast 类型标签，分离基础类型和可选的格式参数
- `private function castDefault(string $type)` —— 类型默认值（用于 $data 字段初始化）
- `private function parseTimestamp($value, string $unit = 's')` —— 任意格式的时间输入 → 指定精度的 Unix 时间戳 int
- `private function formatTimestamp(string $format, $ts, float $micro = 0.0)` —— Unix 秒级时间戳 + 亚秒 → 格式化日期字符串
- `private function touchTimestamps(bool $isInsert = false)` —— 注入当前时间到 $data 的 created_at / updated_at 字段

## 同目录

- [DB](/php/api/foundation/database/rdb/db)
- [ModelBuilder](/php/api/foundation/database/rdb/model-builder)
- [Paginator](/php/api/foundation/database/rdb/paginator)
- [Query](/php/api/foundation/database/rdb/query)
- [Schema](/php/api/foundation/database/rdb/schema)
- [Statement](/php/api/foundation/database/rdb/statement)
- [Table](/php/api/foundation/database/rdb/table)

