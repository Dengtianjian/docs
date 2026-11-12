# AuthController

`kernel\Foundation\Controller\AuthController`  ·  class

源码：`gstudio_kernel/Foundation/Controller/AuthController.php`

> 带认证能力的控制器基类

## 声明

```php
class AuthController extends Controller
```

父类：`Controller`

## 概述

在 `Controller` 基础上增加「认证开关 + 校验分发」能力：
- 公开属性 `$admin` / `$auth` 为认证开关，设为非 false 即启用对应认证；
- 启用后由框架的认证中间件（如 `GlobalAuthMiddleware`）读取这两个属性，执行 Token 校验，
并在通过后将校验结果分发到本类的 `verifyAdmin()` / `verifyAuth()`；
- 子类可覆盖 `verifyAdmin()` / `verifyAuth()` 追加额外业务校验，返回 `Result` 表示校验结果。

默认实现的两个方法均返回成功态 `Result(null)`，即「仅做中间件级 Token 校验、不追加业务校验」。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$admin` | `bool|int|string|array` | `false` | 管理员认证开关 |
| `$auth` | `bool|int|string|array` | `false` | 普通用户认证开关 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`verifyAdmin()`](#verifyadmin) | 管理员认证校验钩子 |
| [`verifyAuth()`](#verifyauth) | 普通用户认证校验钩子 |

### verifyAdmin()

```php
public function verifyAdmin(): Result
```

管理员认证校验钩子

由认证中间件在 Token 校验通过后调用，子类可覆盖以追加管理员专属的业务校验。

返回：`Result` —— Result 校验结果（成功/失败）

### verifyAuth()

```php
public function verifyAuth(): Result
```

普通用户认证校验钩子

由认证中间件在 Token 校验通过后调用，子类可覆盖以追加用户专属的业务校验。

返回：`Result` —— Result 校验结果（成功/失败）

## 同目录

- [Controller](/php/api/foundation/controller/controller)
- [ControllerBody](/php/api/foundation/controller/controller-body)
- [ControllerQuery](/php/api/foundation/controller/controller-query)
- [ControllerResponse](/php/api/foundation/controller/controller-response)

