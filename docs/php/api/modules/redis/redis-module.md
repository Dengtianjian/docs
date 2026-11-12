# RedisModule

`kernel\Modules\Redis\RedisModule`  ·  class

源码：`gstudio_kernel/Modules/Redis/RedisModule.php`

> Redis 服务（应用级）

## 声明

```php
class RedisModule extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

由 `RedisProvider` 绑定为应用单例，经容器取用
（`$app->make(RedisModule::class)` / `$app->redis()` 或门面 `Redis`）。

连接参数取自本应用的 `redis` 配置节，**首次取连接时才真正 pconnect**：
装配阶段登记本服务不会碰网络，没用到 Redis 的应用也不会为它付出连接成本。

连接池按 key 分：`use()` 取默认连接，`use("cache")` 取具名连接。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$client` | `\Redis|null` | protected | 默认连接（懒建） |
| `$connects` | `array` | protected | 具名连接池 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`client()`](#client) | 默认连接：按本应用的 `redis` 配置节建立，建立后复用 |
| [`connect()`](#connect) | 建立一条额外的连接并放进连接池 |
| [`disconnect()`](#disconnect) | 断开连接 |

### client()

```php
public function client()
```

默认连接：按本应用的 `redis` 配置节建立，建立后复用

可能抛出：

- [Error](/php/api/foundation/exception/error) 扩展未安装、配置缺失或连接失败时抛出

### connect()

```php
public function connect($useKey = null, array $options = [])
```

建立一条额外的连接并放进连接池

参数在 `redis` 配置节之上覆盖，只写差异项即可：
`$redis->connect("cache", ["database" => 2])`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$useKey` | `string|null` | `null` | 连接池里的名字；不传按顺序编号 |
| `$options` | `array` | `[]` | 覆盖配置项的连接参数 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 扩展未安装时抛出

### disconnect()

```php
public function disconnect($useKey = null)
```

断开连接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$useKey` | `string|null` | `null` | 连接池名；不传断开默认连接 |

## 非公开方法

**protected**

- `protected function options()` —— 本应用的 redis 连接配置
- `protected function create(array $options)` —— 按参数建立一条连接

## 同目录

- [Redis](/php/api/modules/redis/redis)
- [RedisProvider](/php/api/modules/redis/redis-provider)

