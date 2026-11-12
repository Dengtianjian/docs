# AuthModule

`kernel\Modules\Auth\AuthModule`  ·  class

源码：`gstudio_kernel/Modules/Auth/AuthModule.php`

> 认证服务

## 声明

```php
class AuthModule extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

两件事合一：
- **凭证操作**（生成、落库、吊销、清理）——可跨应用取用，download 校验 super_app 签发的 token 靠的就是它；
- **本进程的登录态**（token / 过期时间 / 用户 / 是否已登录）——认证中间件写入，业务层只读。

登录态读写方法刻意分开：写方法只给中间件 / 登录接口用（标 `@internal`），
业务只调 getter——避免某个控制器顺手改登录态，把排查变成猜谜。

只存 id 与必要标量；用户详情按 id 查，不把整条记录长期缓存。

用法：
```php
$auth = $app->make(AuthModule::class);
if ($auth->logged()) {
$uid = $auth->userId();
}
```

构造即装配：登记自己（按基类名）、挂认证中间件、清理过期 token。
首次 `make()` 时构造并登记，之后取到的都是同一份——登录态因此不会串。

## 示例

```php
$auth = $app->make(AuthModule::class);
if ($auth->logged()) {
$uid = $auth->userId();
}
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$token` | `string|null` | protected | 本次请求解析出的 token 值 |
| `$tokenExpiresAt` | `int|null` | protected | token 的绝对过期时间戳 |
| `$user` | `mixed` | protected | 当前登录用户数据 |
| `$userId` | `string|int|null` | protected | 当前登录用户 ID |
| `$logged` | `bool` | protected | 是否已登录 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`logins()`](#logins) | 本应用的表访问入口 |
| [`findValidToken()`](#findvalidtoken) | 按 token 值查一条**未过期**的登录记录 |
| [`generateToken()`](#generatetoken) | 生成 token（不落库） |
| [`createToken()`](#createtoken) | 生成并保存 token 到 logins 表 |
| [`deleteToken()`](#deletetoken) | 按 token 值删除登录凭证（软删除） |
| [`deleteExpiredTokens()`](#deleteexpiredtokens) | 清理已过期的登录凭证（物理删除，含已软删除的） |
| [`deleteTokensByUser()`](#deletetokensbyuser) | 吊销某用户的所有登录凭证（软删除，常用于改密码后全平台下线） |
| [`setToken()`](#settoken) | 写入 token 值 |
| [`token()`](#token) | 当前 token 值（未登录为 null） |
| [`setTokenExpiresAt()`](#settokenexpiresat) | 写入 token 绝对过期时间戳 |
| [`tokenExpiresAt()`](#tokenexpiresat) | token 绝对过期时间戳（未登录为 null） |
| [`setUser()`](#setuser) | 写入当前登录用户数据 |
| [`user()`](#user) | 当前登录用户数据（未登录为 null） |
| [`setUserId()`](#setuserid) | 写入当前登录用户 ID |
| [`userId()`](#userid) | 当前登录用户 ID（未登录为 null） |
| [`setLogged()`](#setlogged) | 写入登录状态 |
| [`logged()`](#logged) | 当前是否已登录 |

### logins()

```php
public function logins()
```

本应用的表访问入口

绑定到本服务所属应用：download 校验 super_app 签发的 token 时，
查的是 super_app 的 logins 表，而不是它自己（不存在的）那张。

### findValidToken()

```php
public function findValidToken($token)
```

按 token 值查一条**未过期**的登录记录

app_id 匹配本应用或为空（通用 token），与改造前中间件里的判定一致，
把这段「查哪张表、按什么条件查」收回服务里，中间件只负责把结果写进上下文。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$token` | `string` | — | — |

### generateToken()

```php
public function generateToken($expireDays = 30)
```

生成 token（不落库）

使用密码学安全的随机字节生成 token 值与 salt；salt 随 createToken 一并持久化，
可用于后续校验或密钥轮换。原 password_hash 方案每次输出不同且无对应验证，已弃用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$expireDays` | `integer` | `30` | 有效天数 |

### createToken()

```php
public function createToken($userId, $expireDays = 30)
```

生成并保存 token 到 logins 表

内部调用 generateToken 生成凭证，并写入当前模型（snake_case）。
id 为自增主键；salt 与 expire_days 一并持久化。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userId` | `string|int` | — | 关联用户 ID（写入 user_id 字段） |
| `$expireDays` | `integer` | `30` | 有效天数 |

### deleteToken()

```php
public function deleteToken($token)
```

按 token 值删除登录凭证（软删除）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$token` | `string` | — | — |

### deleteExpiredTokens()

```php
public function deleteExpiredTokens()
```

清理已过期的登录凭证（物理删除，含已软删除的）

### deleteTokensByUser()

```php
public function deleteTokensByUser($userId)
```

吊销某用户的所有登录凭证（软删除，常用于改密码后全平台下线）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userId` | `string|int` | — | — |

### setToken()

```php
public function setToken($token)
```

写入 token 值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$token` | `string|null` | — | — |

### token()

```php
public function token()
```

当前 token 值（未登录为 null）

### setTokenExpiresAt()

```php
public function setTokenExpiresAt($expiresAt)
```

写入 token 绝对过期时间戳

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$expiresAt` | `int|null` | — | — |

### tokenExpiresAt()

```php
public function tokenExpiresAt()
```

token 绝对过期时间戳（未登录为 null）

### setUser()

```php
public function setUser($user)
```

写入当前登录用户数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$user` | `mixed` | — | — |

### user()

```php
public function user()
```

当前登录用户数据（未登录为 null）

### setUserId()

```php
public function setUserId($userId)
```

写入当前登录用户 ID

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userId` | `string|int|null` | — | — |

### userId()

```php
public function userId()
```

当前登录用户 ID（未登录为 null）

### setLogged()

```php
public function setLogged($logged)
```

写入登录状态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$logged` | `bool` | — | — |

### logged()

```php
public function logged()
```

当前是否已登录

## 同目录

- [Auth](/php/api/modules/auth/auth)
- [AuthProvider](/php/api/modules/auth/auth-provider)
- [LoginsModel](/php/api/modules/auth/logins-model)

