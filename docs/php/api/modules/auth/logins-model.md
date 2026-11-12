# LoginsModel

`kernel\Modules\Auth\LoginsModel`  ·  class

源码：`gstudio_kernel/Modules/Auth/LoginsModel.php`

> 登录凭证模型（认证服务）

## 声明

```php
class LoginsModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 概述

负责存储与管理用户登录 Token 凭证，供 GlobalAuthMiddleware 校验使用。
表结构以 Schema 声明（见 $schema），字段名沿用 camelCase 以兼容既有读取方。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tableName` | `mixed` | `"logins"` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$softDelete` | `bool` | protected | — |
| `$casts` | `array` | protected | 字段类型映射（字段名 → PHP 类型） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |

### __construct()

```php
public function __construct()
```

## 同目录

- [Auth](/php/api/modules/auth/auth)
- [AuthModule](/php/api/modules/auth/auth-module)
- [AuthProvider](/php/api/modules/auth/auth-provider)

