# Connections

`kernel\Foundation\Database\RDB\Drivers\Connections`  ·  class

源码：`gstudio_kernel/Foundation/Database/RDB/Drivers/Connections.php`

> 关系型数据库连接管理器

## 声明

```php
class Connections extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

Connections 是关系型数据库连接池的全局管理中心，通过静态属性维护所有 `AbstractDriver` 实例，
支持在运行时动态注册和切换活跃数据库连接。所有方法均为静态方法，全局共享状态。

## 核心概念

```
drivers:     default → AbstractDriver(主库)
slave   → AbstractDriver(只读从库)
log     → AbstractDriver(日志库)
useDriver:   → AbstractDriver(主库)  ← 当前活跃连接
```

## 典型用法

```php
// 初始化阶段注册连接
Connections::addDriver((new PdoDriver())->mysql(...), 'master', true);
Connections::addDriver((new PdoDriver())->mysql(...), 'slave');

// 运行时切到从库读
Connections::useDriver('slave');
$users = DB::table('users')->get();

// 切回主库写
Connections::switchToDefaultDriver();
DB::table('users')->insert($data);
```

## 自动回退

`getUseDriver()` 在无活跃连接时自动调用 `switchToDefaultDriver()`，
回退优先级：`$defaultDriver` → 名为 "default" 的驱动 → 第一个注册的驱动。

## 示例

```php
drivers:     default → AbstractDriver(主库)
slave   → AbstractDriver(只读从库)
log     → AbstractDriver(日志库)
useDriver:   → AbstractDriver(主库)  ← 当前活跃连接
```

## 示例

```php
// 初始化阶段注册连接
Connections::addDriver((new PdoDriver())->mysql(...), 'master', true);
Connections::addDriver((new PdoDriver())->mysql(...), 'slave');

// 运行时切到从库读
Connections::useDriver('slave');
$users = DB::table('users')->get();

// 切回主库写
Connections::switchToDefaultDriver();
DB::table('users')->insert($data);
```

## 相关

- `AbstractDriver` 驱动抽象基类
- [DB](/php/api/foundation/database/rdb/db) 数据库门面（通过 connection() 间接使用 Connections）

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $drivers` | `array` | `[]` | 数据库驱动列表 |
| `static $useDriver` | `AbstractDriver` | `null` | 当前使用的数据库驱动 |
| `static $defaultDriver` | `AbstractDriver` | `null` | 默认数据库驱动 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addDriver()`](#adddriver) | 添加驱动 |
| [`useDriver()`](#usedriver) | 使用数据库驱动 |
| [`getUseDriver()`](#getusedriver) | 获取当前正在使用的数据库驱动 |
| [`getDrivers()`](#getdrivers) | 获取数据库驱动列表 |
| [`getDriver()`](#getdriver) | 按名获取单个数据库驱动，**不改变**当前连接 |
| [`setDefaultDriver()`](#setdefaultdriver) | 设置默认数据库驱动 |
| [`getDefaultDriver()`](#getdefaultdriver) | 获取当前设置的默认驱动 |
| [`switchToDefaultDriver()`](#switchtodefaultdriver) | 切换回默认数据库驱动 |

### addDriver()

```php
public static function addDriver($driver, $name = "default", $isDefault = false)
```

添加驱动

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$driver` | `AbstractDriver` | — | 驱动实例 |
| `$name` | `string` | `"default"` | 驱动在驱动列表中的键名 |
| `$isDefault` | `boolean` | `false` | 是否是默认使用的驱动 |

### useDriver()

```php
public static function useDriver($name)
```

使用数据库驱动

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 驱动列表键名 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### getUseDriver()

```php
public static function getUseDriver()
```

获取当前正在使用的数据库驱动

### getDrivers()

```php
public static function getDrivers()
```

获取数据库驱动列表

### getDriver()

```php
public static function getDriver($name)
```

按名获取单个数据库驱动，**不改变**当前连接

与 `useDriver` 的区别：后者会切换全局当前连接，本方法只取驱动。
供「某个模型 / 某张表固定使用某个驱动」这类按名解析的声明式场景使用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 驱动在数据库驱动列表中的键名 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### setDefaultDriver()

```php
public static function setDefaultDriver($name = "default")
```

设置默认数据库驱动

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `mixed` | `"default"` | 驱动在数据库驱动列表中的键名 |

可能抛出：

- [Error](/php/api/foundation/exception/error)

### getDefaultDriver()

```php
public static function getDefaultDriver()
```

获取当前设置的默认驱动

### switchToDefaultDriver()

```php
public static function switchToDefaultDriver()
```

切换回默认数据库驱动

可能抛出：

- [Error](/php/api/foundation/exception/error)

## 同目录

- [AbstractDriver](/php/api/foundation/database/rdb/drivers/abstract-driver)

