# 认证

认证模块把两件事放在一起：**凭证操作**（签发 / 校验 / 吊销 token）与**本次请求的登录态**。

```
Modules/Auth/
├── Auth.php          门面：Auth::userId()
├── AuthModule.php    实现：凭证 + 登录态
├── AuthProvider.php  装配：登记实例、挂中间件、清过期 token
└── LoginsModel.php   logins 表
```

## 装配

```php
// 应用 Bootstrap
$this->app()->make(\kernel\Modules\Auth\AuthProvider::class);
```

`AuthProvider` 构造时做三件事：

1. 把 `AuthModule` 登记成单例（类名 + 别名 `auth`）；
2. 按运行环境挂认证中间件（DiscuzX → `GlobalDiscuzXAuthMiddleware`，否则 `GlobalAuthMiddleware`）；
3. 有数据库连接时清理过期 token（安装期无连接则跳过）。

## 登录态（中间件写，业务读）

```php
use kernel\Modules\Auth\Auth;

if (Auth::logged()) {
  $uid  = Auth::userId();
  $user = Auth::user();
  $token = Auth::token();
  $expiresAt = Auth::tokenExpiresAt();
}
```

写方法标了 `@internal`，只给中间件和登录接口用：

```php
Auth::setToken($token)
  ->setTokenExpiresAt($expiresAt)
  ->setUserId($userId)
  ->setLogged(true);
```

拆开写方法的目的是防止业务代码顺手改登录态——读用 getter，写集中在中间件。

## 凭证

```php
// 签发
$token = Auth::createToken($userId);              // 落库，默认 30 天
$payload = Auth::generateToken($userId, 7);       // 只生成，不落库

// 校验
$record = Auth::findValidToken($token);           // 未过期则返回记录，否则 null

// 吊销
Auth::deleteToken($token);                        // 单个（软删除）
Auth::deleteTokensByUser($userId);                // 某用户全部
Auth::deleteExpiredTokens();                      // 清理过期（物理删除，装配时自动跑一次）
```

`logins()` 返回本应用的 `LoginsModel`，需要自定义查询时直接用。

## 中间件做了什么

`GlobalAuthMiddleware`：

1. 从 `Authorization` 头取 token（兼容 `Bearer`、`token` 前缀）；
2. `findValidToken()` 校验；
3. 校验通过则写入登录态；即将过期（剩余不足一天）时**顺手续签**，并把新 token 写回响应头：
   - `x-auth-token`
   - `x-auth-token-expires-at`

`GlobalDiscuzXAuthMiddleware` 另外兼容 Discuz 的登录态：Discuz 全局 uid 存在时直接采信，不需要 token。

## 跨应用

凭证表跟着**装配它的应用**走：

- super_app 的 `auth` 用的是 super_app 的 `logins` 表；
- download 要校验 super_app 签发的 token，就在自己的 Bootstrap 里：

```php
$app = Applications::get("gstudio_super_app");
$this->app()->import($app->auth(), "auth");
```

转发到 super_app 容器取实例，表名与密钥都还是 super_app 的。前提是 super_app **已装配**。

## 错误码

| 情况 | 结果 |
|---|---|
| 没带 token | 未登录（`logged() === false`），不报错 |
| token 无效 / 过期 | 未登录 |
| 应用没装配 Auth | `500:UnknownComponent`（无法解析 auth） |
