# AuthProvider

`kernel\Modules\Auth\AuthProvider`  ·  class

源码：`gstudio_kernel/Modules/Auth/AuthProvider.php`

> 认证装配

## 声明

```php
class AuthProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造即装配，只做三件事：
- 把 `AuthModule` 登记成应用单例（凭证操作与登录态都挂在它身上）；
- 按运行环境挂认证中间件（DiscuzX / 通用）；
- 有数据库连接时顺手清理过期 token（安装期无连接则跳过）。

业务方法不在这里，见 `AuthModule`；业务侧取用走门面 `Auth`。

登记方式：`$app->make(AuthProvider::class)` 或 `$app->provider(new AuthProvider(), "auth")`，
**必须传实例**——容器对「传类名」是延迟构造，本类不被构造则认证不会被装配。

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

- [Auth](/php/api/modules/auth/auth)
- [AuthModule](/php/api/modules/auth/auth-module)
- [LoginsModel](/php/api/modules/auth/logins-model)

