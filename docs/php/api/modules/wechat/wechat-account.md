# WechatAccount

`kernel\Modules\Wechat\WechatAccount`  ·  class

源码：`gstudio_kernel/Modules/Wechat/WechatAccount.php`

> 微信账号

## 声明

```php
class WechatAccount extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

承载单个微信账号（公众号/小程序等）的身份信息，即 AppId 与 AppSecret，
作为各业务对象（公众号、小程序等）获取账号数据的来源。

账号级 access_token 可直接通过 accessToken() 获取，内部委托 `WechatAccessToken`
（实例缓存 → 进程内共享缓存 → wechat_accounts 表 → 回源微信），
因此与 WechatApi 取到的始终是同一份 token。

使用示例：

```php
$account = new WechatAccount($appId, $appSecret);
$account->appId();        // 读取 AppId
$account->appSecret();    // 读取 AppSecret
$account->accessToken();  // 获取（必要时自动刷新）access_token
```

## 示例

```php
$account = new WechatAccount($appId, $appSecret);
$account->appId();        // 读取 AppId
$account->appSecret();    // 读取 AppSecret
$account->accessToken();  // 获取（必要时自动刷新）access_token
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | protected | 第三方平台 AppId（公众号/小程序等） |
| `$appSecret` | `string|null` | protected | 第三方平台 AppSecret |
| `$accessTokenProvider` | `WechatAccessToken|null` | protected | access_token 提供者（惰性实例化，携带本账号的 AppId/AppSecret） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化微信账号 |
| [`appId()`](#appid) | 读写一体：获取或设置 AppId |
| [`appSecret()`](#appsecret) | 读写一体：获取或设置 AppSecret |
| [`accessToken()`](#accesstoken) | 获取本账号的 access_token |

### __construct()

```php
public function __construct($appId, $secret)
```

初始化微信账号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | — | 第三方平台 AppId（公众号/小程序等） |
| `$secret` | `string|null` | — | 第三方平台 AppSecret |

### appId()

```php
public function appId($data = null)
```

读写一体：获取或设置 AppId

依据调用时是否传入参数区分读写：
- 传入参数：设置 AppId，并返回当前实例以支持链式调用；
- 不传参数：返回当前已设置的 AppId。

```php
$account->appId("wx1234567890");  // 设置，返回 $account
$account->appId();                // 读取，返回 "wx1234567890"
```

```php
$account->appId("wx1234567890");  // 设置，返回 $account
$account->appId();                // 读取，返回 "wx1234567890"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 AppId |

### appSecret()

```php
public function appSecret($data = null)
```

读写一体：获取或设置 AppSecret

依据调用时是否传入参数区分读写：
- 传入参数：设置 AppSecret，并返回当前实例以支持链式调用；
- 不传参数：返回当前已设置的 AppSecret。

```php
$account->appSecret("abcdefg");  // 设置，返回 $account
$account->appSecret();           // 读取，返回 "abcdefg"
```

```php
$account->appSecret("abcdefg");  // 设置，返回 $account
$account->appSecret();           // 读取，返回 "abcdefg"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 AppSecret |

### accessToken()

```php
public function accessToken($forceRefresh = false)
```

获取本账号的 access_token

委托 `WechatAccessToken`：实例缓存 → 进程内共享缓存 →
wechat_accounts 表 → 回源微信（稳定版接口），自动处理过期与写回。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$forceRefresh` | `bool` | `false` | 是否强制刷新（默认 false，命中有效缓存时直接返回） |

## 同目录

- [Wechat](/php/api/modules/wechat/wechat)
- [WechatAccessToken](/php/api/modules/wechat/wechat-access-token)
- [WechatApi](/php/api/modules/wechat/wechat-api)
- [WechatProvider](/php/api/modules/wechat/wechat-provider)

