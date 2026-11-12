# RedisProvider

`kernel\Modules\Redis\RedisProvider`  ·  class

源码：`gstudio_kernel/Modules/Redis/RedisProvider.php`

> Redis 装配

## 声明

```php
class RedisProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造即装配：把 `RedisModule` 登记成应用单例——连接池与具名连接必须整个请求
共用一份，否则每次取到的是不同实例、连接也建不共享。

登记方式：`$app->make(RedisProvider::class)` 或 `$app->provider(new RedisProvider())`，
**必须传实例**——容器对「传类名」是延迟构造，本类不被构造则 Redis 不会被登记。

## 相关

- `RedisModule`
- `Redis` 门面

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配 |

### __construct()

```php
public function __construct()
```

构造即装配

## 同目录

- [Redis](/php/api/modules/redis/redis)
- [RedisModule](/php/api/modules/redis/redis-module)

