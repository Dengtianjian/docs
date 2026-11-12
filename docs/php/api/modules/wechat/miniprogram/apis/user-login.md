# UserLogin

`kernel\Modules\Wechat\Miniprogram\Apis\UserLogin`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/UserLogin.php`

## 声明

```php
class UserLogin extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`JSCode2Session()`](#jscode2session) | 小程序登录凭证校验（JSCode 换取登录态） |
| [`checkSession()`](#checksession) | 检查登录态 |
| [`resetUserSessionKey()`](#resetusersessionkey) | 重置登录态 |
| [`bind()`](#bind) | 绑定 |
| [`register()`](#register) | 注册 |

### JSCode2Session()

```php
public function JSCode2Session($code)
```

小程序登录凭证校验（JSCode 换取登录态）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | 小程序端 wx.login 获取的临时登录凭证 JSCode |

### checkSession()

```php
public function checkSession($openid, $signature, $sigMethod = "hmac_sha256")
```

检查登录态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户唯一标识符 |
| `$signature` | `string` | — | 用户登录态签名，即 hmac_sha256("", session_key)（session_key 对空字符串签名） |
| `$sigMethod` | `string` | `"hmac_sha256"` | 登录态签名的哈希方法，目前仅支持 hmac_sha256 |

### resetUserSessionKey()

```php
public function resetUserSessionKey($openid, $signature, $sigMethod = "hmac_sha256")
```

重置登录态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户唯一标识符 |
| `$signature` | `string` | — | 用户登录态签名，即 hmac_sha256("", session_key)（session_key 对空字符串签名） |
| `$sigMethod` | `string` | `"hmac_sha256"` | 登录态签名的哈希方法，目前仅支持 hmac_sha256 |

### bind()

```php
public function bind($code)
```

绑定

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | JSCode |

### register()

```php
public function register($code)
```

注册

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | JSCode |

## 同目录

- [Employment](/php/api/modules/wechat/miniprogram/apis/employment)
- [Nearby](/php/api/modules/wechat/miniprogram/apis/nearby)
- [Search](/php/api/modules/wechat/miniprogram/apis/search)
- [StudentIdentity](/php/api/modules/wechat/miniprogram/apis/student-identity)
- [User](/php/api/modules/wechat/miniprogram/apis/user)

