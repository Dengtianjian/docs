# HasMany

`kernel\Foundation\Database\RDB\Relation\HasMany`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Relation/HasMany.php`

> 一对多关系：当前 Model 拥有多条关联 Model 记录

## 声明

```php
class HasMany extends HasOne
```

父类：`HasOne`

## 概述

JOIN 方向：关联表 INNER JOIN 当前表，ON 当前表.主键 = 关联表.外键

使用场景：
- Post hasMany Comments（一篇文章有多条评论）
- User hasMany Orders（一个用户有多个订单）

```php
class Post extends Model {
public function comments() {
return $this->hasMany(Comment::class);
}
}

// 懒加载
$comments = $post->comments;  // Model[]

// 链式查询
$comments = $post->comments()->where('status', 1)->get();
```

## 示例

```php
class Post extends Model {
public function comments() {
return $this->hasMany(Comment::class);
}
}

// 懒加载
$comments = $post->comments;  // Model[]

// 链式查询
$comments = $post->comments()->where('status', 1)->get();
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getResults()`](#getresults) | — |

### getResults()

```php
public function getResults()
```

## 同目录

- [BelongsTo](/php/api/foundation/database/rdb/relation/belongs-to)
- [HasOne](/php/api/foundation/database/rdb/relation/has-one)
- [Relation](/php/api/foundation/database/rdb/relation/relation)

