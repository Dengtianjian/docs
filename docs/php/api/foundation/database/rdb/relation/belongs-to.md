# BelongsTo

`kernel\Foundation\Database\RDB\Relation\BelongsTo`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Relation/BelongsTo.php`

> 反向一对多关系：当前 Model 属于一条父 Model 记录

## 声明

```php
class BelongsTo extends Relation
```

父类：`Relation`

## 概述

JOIN 方向：父表 INNER JOIN 当前表，ON 当前表.外键 = 父表.主键

使用场景：
- Comment belongsTo Post（评论属于一篇文章）
- Order belongsTo User（订单属于一个用户）

注意：BelongsTo 的外键约定与 HasOne/HasMany 不同：
- foreignKey：当前表的外键字段（默认：{关联表名}_{关联表主键}）
- localKey：关联表的主键字段（默认：关联 Model 的 primaryKey）

```php
class Comment extends Model {
public function post() {
return $this->belongsTo(Post::class);
}
}

// 懒加载
$post = $comment->post;  // Post|null
```

## 示例

```php
class Comment extends Model {
public function post() {
return $this->belongsTo(Post::class);
}
}

// 懒加载
$post = $comment->post;  // Post|null
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

## 同目录

- [HasMany](/php/api/foundation/database/rdb/relation/has-many)
- [HasOne](/php/api/foundation/database/rdb/relation/has-one)
- [Relation](/php/api/foundation/database/rdb/relation/relation)

