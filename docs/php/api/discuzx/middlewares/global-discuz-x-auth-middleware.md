# GlobalDiscuzXAuthMiddleware

`kernel\DiscuzX\Middlewares\GlobalDiscuzXAuthMiddleware`  ·  class

源码：`gstudio_kernel/DiscuzX/Middlewares/GlobalDiscuzXAuthMiddleware.php`

> DiscuzX 环境下的全局认证中间件

## 声明

```php
class GlobalDiscuzXAuthMiddleware extends GlobalAuthMiddleware
```

父类：[GlobalAuthMiddleware](/php/api/middlewares/global-auth-middleware)

## 概述

在 [GlobalAuthMiddleware](/php/api/middlewares/global-auth-middleware) 的基础上追加两件事：
- 同源视图请求（页面发起的 ajax）不用 token，改按 Discuz 的 uid / adminid / groupid 判定；
- 校验通过后用 Discuz 的会员信息补齐上下文（[Auth](/php/api/modules/auth/auth)）。

登录态仍然只写上下文，不缓存到任何静态变量。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$controller` | `DiscuzXController` | protected | 控制器 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`verifyViewControllerAdmin()`](#verifyviewcontrolleradmin) | — |
| [`verifyViewControllerAuth()`](#verifyviewcontrollerauth) | — |
| [`verify()`](#verify) | — |
| [`handle()`](#handle) | 中间件处理 |

### verifyViewControllerAdmin()

```php
public function verifyViewControllerAdmin()
```

### verifyViewControllerAuth()

```php
public function verifyViewControllerAuth()
```

### verify()

```php
public function verify($viewVerifyType)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewVerifyType` | `mixed` | — | — |

### handle()

```php
public function handle(\Closure $next)
```

中间件处理

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$next` | `\Closure` | — | — |

## 非公开方法

**private**

- `private function login()`

## 同目录

- [GlobalDiscuzXMultipleEncodeMiddleware](/php/api/discuzx/middlewares/global-discuz-x-multiple-encode-middleware)

