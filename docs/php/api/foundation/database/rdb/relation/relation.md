# Relation

`kernel\Foundation\Database\RDB\Relation\Relation`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Relation/Relation.php`

> 关联查询抽象基类

## 声明

```php
class Relation extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

Relation 是 ORM 关联查询的核心组件，每种关系类型（HasOne/HasMany/BelongsTo）
继承此类实现各自的 JOIN 配置和结果查询逻辑。

## 设计原理

Relation 内部持有 Query 实例并通过 __call 代理所有未定义方法，
使得关联查询完全支持链式调用：

```php
$user->posts()->where('status', 1)->orderBy('created_at', 'DESC')->get();
```

## 关联键约定

外键和主键均支持手动指定和自动推断：
- **外键推断**：`{从类表名}_{从类主键}`，如 `user_id`
- **主键推断**：`Model::$primaryKey`，默认 `id`

## 示例

```php
$user->posts()->where('status', 1)->orderBy('created_at', 'DESC')->get();
```

## 相关

- `HasOne` 一对一关系
- `HasMany` 一对多关系
- `BelongsTo` 反向一对多关系

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$relatedClass` | `string` | protected | 关联的 Model 类名 |
| `$foreignKey` | `string` | protected | 关联表的外键字段名 |
| `$localKey` | `string` | protected | 本地表的主键字段名 |
| `$parent` | `Model` | protected | 持有该关系的父 Model 实例 |
| `$query` | `Query` | protected | 底层 Query 构建器，已配置 JOIN 和 WHERE 约束 |
| `$results` | `mixed|null` | protected | 懒加载结果缓存 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造关联关系实例 |
| [`getResults()`](#getresults) | — |
| [`__call()`](#__call) | 方法代理：未定义方法自动转发给底层 Query 对象 |
| [`getRelatedClass()`](#getrelatedclass) | 获取关联 Model 类名 |
| [`getQuery()`](#getquery) | 获取底层 Query 实例 |
| [`getForeignKey()`](#getforeignkey) | 获取关联的外键 |
| [`getLocalKey()`](#getlocalkey) | 获取本地主键 |
| [`getParent()`](#getparent) | 获取父 Model |

### __construct()

```php
public function __construct(string $relatedClass, Model $parent, string $foreignKey = '', string $localKey = '')
```

构造关联关系实例

自动创建关联 Model 的 Query 实例，并通过 addConstraints() 配置 JOIN 条件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$relatedClass` | `string` | — | 关联 Model 类名 |
| `$parent` | `Model` | — | 父 Model 实例 |
| `$foreignKey` | `string` | `''` | 关联表外键（可选，自动推断） |
| `$localKey` | `string` | `''` | 本地表主键（可选，自动推断） |

### getResults()

```php
public abstract function getResults()
```

### __call()

```php
public function __call($method, $parameters)
```

方法代理：未定义方法自动转发给底层 Query 对象

使关联查询支持完整的 Query 链式调用。
若 Query 方法返回 Query 自身（链式方法），替换为 $this 以保证 Relation 链不间断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 调用的方法名 |
| `$parameters` | `array` | — | 调用参数 |

### getRelatedClass()

```php
public function getRelatedClass(): string
```

获取关联 Model 类名

返回：`string` —— string

### getQuery()

```php
public function getQuery(): Query
```

获取底层 Query 实例

返回：`Query` —— Query

### getForeignKey()

```php
public function getForeignKey(): string
```

获取关联的外键

返回：`string` —— string

### getLocalKey()

```php
public function getLocalKey(): string
```

获取本地主键

返回：`string` —— string

### getParent()

```php
public function getParent(): Model
```

获取父 Model

返回：`Model` —— Model

## 非公开方法

**protected**

- `protected abstract function addConstraints()`

## 同目录

- [BelongsTo](/php/api/foundation/database/rdb/relation/belongs-to)
- [HasMany](/php/api/foundation/database/rdb/relation/has-many)
- [HasOne](/php/api/foundation/database/rdb/relation/has-one)

