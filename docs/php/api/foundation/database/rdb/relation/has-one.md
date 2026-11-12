# HasOne

`kernel\Foundation\Database\RDB\Relation\HasOne`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Relation/HasOne.php`

> 一对一关系：当前 Model 拥有一条关联 Model 记录

## 声明

```php
class HasOne extends Relation
```

父类：`Relation`

## 概述

JOIN 方向：关联表 INNER JOIN 当前表，ON 当前表.主键 = 关联表.外键

使用场景：
- User hasOne Profile（一个用户有一个档案）
- Order hasOne Invoice（一个订单有一张发票）

```php
class User extends Model {
public function profile() {
return $this->hasOne(Profile::class);
}
}

// 懒加载
$profile = $user->profile;  // Profile|null

// 链式查询
$profile = $user->profile()->select('bio', 'avatar')->first();
```

## 示例

```php
class User extends Model {
public function profile() {
return $this->hasOne(Profile::class);
}
}

// 懒加载
$profile = $user->profile;  // Profile|null

// 链式查询
$profile = $user->profile()->select('bio', 'avatar')->first();
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getResults()`](#getresults) | — |

### getResults()

```php
public function getResults()
```

## 非公开方法

**protected**

- `protected function addConstraints()`
- `protected function hydrate(Model $instance, array $row)` —— 将数据库行数据填充到 Model 实例

## 同目录

- [BelongsTo](/php/api/foundation/database/rdb/relation/belongs-to)
- [HasMany](/php/api/foundation/database/rdb/relation/has-many)
- [Relation](/php/api/foundation/database/rdb/relation/relation)

