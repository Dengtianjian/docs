# Auth

`kernel\Modules\Auth\Auth`  ·  class

源码：`gstudio_kernel/Modules/Auth/Auth.php`

> 认证门面

## 声明

```php
class Auth extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

静态转发到**当前应用**容器里的认证模块（短名 `auth`）：
与 `$app->auth()`、`$app->make(AuthModule::class)` 是同一份实例。

底层由 `AuthProvider` 在装配期登记：
```php
// 应用 Bootstrap
$app->make(AuthProvider::class);   // 或 $app->provider(new AuthProvider())
```
没装配就直接调用会抛出「无法解析 auth」，不会悄悄造一个空实例。

为什么用门面：
- 中间件是 `new $class($request, $controller)` 直接实例化的，拿不到容器注入，
只能靠门面从「当前应用」取实例；
- 业务代码里 `Auth::logged()` 比 `$app->make(AuthModule::class)->logged()` 短，
且不必关心模块在哪个命名空间。

归属：认证模块与登录态都跟着**装配它的应用**走。download 校验 super_app 签发的
token 时，查的是 super_app 的 logins 表——因为 `auth` 是从那个应用 `import` 过来的。

## 示例

```php
// 应用 Bootstrap
$app->make(AuthProvider::class);   // 或 $app->provider(new AuthProvider())
```

## 相关

- `AuthModule` 具体实现：凭证操作 + 本进程登录态
- `AuthProvider` 装配：登记实例、挂中间件、清过期 token

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `logins()` | 本应用的表访问入口 |
| `findValidToken(string $token)` | 按 token 查未过期记录 |
| `static array{value:string,salt:string,expiresAt:int,expireDays:int} generateToken(int $expireDays = 30) 生成 token（不落库）` | — |
| `static array{value:string,salt:string,expiresAt:int,expireDays:int} createToken(string|int $userId, int $expireDays = 30) 生成并落库` | — |
| `deleteToken(string $token)` | 吊销单个 token（软删除） |
| `deleteExpiredTokens()` | 清理过期凭证（物理删除） |
| `deleteTokensByUser(string|int $userId)` | 吊销某用户全部凭证 |
| `setToken(string|null $token)` | 写入本次请求的 token |
| `token()` | 本次请求的 token |
| `setTokenExpiresAt(int|null $expiresAt)` | 写入 token 绝对过期时间 |
| `tokenExpiresAt()` | token 绝对过期时间 |
| `setUser(mixed $user)` | 写入当前登录用户数据 |
| `user()` | 当前登录用户数据 |
| `setUserId(string|int|null $userId)` | 写入当前登录用户 ID |
| `userId()` | 当前登录用户 ID |
| `setLogged(bool $logged)` | 写入登录状态 |
| `logged()` | 当前是否已登录 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 兜底实例：当前应用容器里的认证模块

## 同目录

- [AuthModule](/php/api/modules/auth/auth-module)
- [AuthProvider](/php/api/modules/auth/auth-provider)
- [LoginsModel](/php/api/modules/auth/logins-model)

