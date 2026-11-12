# User

`kernel\Modules\Wechat\Miniprogram\Apis\User`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/User.php`

> 小程序用户相关接口

## 声明

```php
class User extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

封装小程序用户信息相关服务端接口（插件用户 openpid、加密信息校验、
支付后获取 unionid、用户 encryptKey、手机号等）。

这些接口都需要 access_token，由父类 WechatApi 自动获取并注入，
且只允许在服务端调用。方法返回微信原始响应数组，失败时含 errcode/errmsg。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getPluginOpenPId()`](#getpluginopenpid) | 获取插件用户 openpid |
| [`checkEncryptedData()`](#checkencrypteddata) | 检查加密信息 |
| [`checkEncryptedMsg()`](#checkencryptedmsg) | 检查加密信息（直接传 SHA-256 值） |
| [`getPaidUnionId()`](#getpaidunionid) | 支付后获取 unionid |
| [`getUserEncryptKey()`](#getuserencryptkey) | 获取用户 encryptKey |
| [`getPhoneNumber()`](#getphonenumber) | 获取手机号 |

### getPluginOpenPId()

```php
public function getPluginOpenPId($code)
```

获取插件用户 openpid

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | 插件用户标志凭证（wx.pluginLogin 获得），5 分钟内有效，一个 code 只能获取一次 |

### checkEncryptedData()

```php
public function checkEncryptedData($encryptedData)
```

检查加密信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$encryptedData` | `string` | — | 加密数据（encryptedData 原始字符串） |

### checkEncryptedMsg()

```php
public function checkEncryptedMsg($encryptedMsgHash)
```

检查加密信息（直接传 SHA-256 值）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$encryptedMsgHash` | `string` | — | 加密数据的 SHA-256 值（Hex/Base16 编码后的字符串） |

### getPaidUnionId()

```php
public function getPaidUnionId($openid, $transactionId = null, $outTradeNo = null, $mchId = null)
```

支付后获取 unionid

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 支付该笔订单的用户的 openid |
| `$transactionId` | `string|null` | `null` | 微信支付订单号 |
| `$outTradeNo` | `string|null` | `null` | 商户订单号（需同时传 $mchId） |
| `$mchId` | `string|null` | `null` | 微信支付商户号（使用商户订单号查询时必传） |

### getUserEncryptKey()

```php
public function getUserEncryptKey($openid, $signature, $sigMethod = "hmac_sha256")
```

获取用户 encryptKey

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$signature` | `string` | — | session_key 对空字符串做 hmac_sha256 签名的结果 |
| `$sigMethod` | `string` | `"hmac_sha256"` | 签名方法，目前只支持 hmac_sha256 |

### getPhoneNumber()

```php
public function getPhoneNumber($code, $openid = null)
```

获取手机号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | 手机号获取凭证（前端 getPhoneNumber 回调的 detail.code） |
| `$openid` | `string|null` | `null` | 用户 openid，传入后会校验 openid 与 code 的绑定关系，不匹配时报错 |

## 同目录

- [Employment](/php/api/modules/wechat/miniprogram/apis/employment)
- [Nearby](/php/api/modules/wechat/miniprogram/apis/nearby)
- [Search](/php/api/modules/wechat/miniprogram/apis/search)
- [StudentIdentity](/php/api/modules/wechat/miniprogram/apis/student-identity)
- [UserLogin](/php/api/modules/wechat/miniprogram/apis/user-login)

