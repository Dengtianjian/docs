# WechatApi

`kernel\Modules\Wechat\WechatApi`  ·  class

源码：`gstudio_kernel/Modules/Wechat/WechatApi.php`

> 微信 API 请求客户端

## 声明

```php
class WechatApi extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

以微信账号（WechatAccount）为身份来源，封装对微信开放平台 API
（https://api.weixin.qq.com）的 HTTP 请求：统一拼接接口地址、自动获取并注入
access_token、发送 GET/POST 请求、解析 JSON 响应。
各业务模块（公众号、小程序、支付等）可在本类基础上扩展具体接口。

access_token 的获取、缓存与刷新由 `WechatAccessToken` 负责，
本类仅对外暴露 accessToken() 一个入口，因此 WechatAccount 与 WechatApi
取到的始终是同一份 token（进程内共享缓存）。

使用示例：

```php
$api = new WechatApi(new WechatAccount($appId, $appSecret));
access_token 为空或过期时自动获取并缓存
$user = $api->get("cgi-bin/user/info", ["openid" => $openId])->getData();
```

## 示例

```php
$api = new WechatApi(new WechatAccount($appId, $appSecret));
access_token 为空或过期时自动获取并缓存
$user = $api->get("cgi-bin/user/info", ["openid" => $openId])->getData();
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `ACCESS_TOKEN_REFRESH_AHEAD` | `WechatAccessToken::REFRESH_AHEAD` | access_token 提前刷新时间（秒） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$apiUrl` | `string` | protected | 微信开放平台接口地址前缀 |
| `$CURL` | `Curl` | protected | CURL 客户端实例，用于发起 HTTP 请求 |
| `$account` | `WechatAccount` | protected | 微信账号，提供 AppId/AppSecret 等身份信息 |
| `$accessTokenProvider` | `WechatAccessToken|null` | protected | access_token 提供者（惰性实例化，携带本账号的 AppId/AppSecret） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化微信 API 客户端 |
| [`account()`](#account) | 获取当前微信账号 |
| [`accessToken()`](#accesstoken) | 获取 access_token |
| [`get()`](#get) | 发送 GET 请求到微信 API |
| [`post()`](#post) | 发送 POST 请求到微信 API |
| [`getJSONData()`](#getjsondata) | 获取并解析最近一次响应为数组 |

### __construct()

```php
public function __construct($account)
```

初始化微信 API 客户端

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `WechatAccount` | — | 微信账号，提供 AppId/AppSecret 等身份信息 |

### account()

```php
public function account()
```

获取当前微信账号

### accessToken()

```php
public function accessToken($forceRefresh = false)
```

获取 access_token

委托 `WechatAccessToken`：实例内缓存 → 进程内共享缓存 →
wechat_accounts 表 → 回源微信（稳定版接口），并自动处理过期与写回。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$forceRefresh` | `bool` | `false` | 是否强制刷新（默认 false，命中有效缓存时直接返回） |

### get()

```php
public function get($uri, $query = [], $withAccessToken = true)
```

发送 GET 请求到微信 API

当 $withAccessToken 为 true 时，会自动附加当前有效的 access_token
（缓存为空或已过期时会先自动获取）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 业务接口路径，如 "cgi-bin/token" |
| `$query` | `array` | `[]` | 附加的 query 参数 |
| `$withAccessToken` | `bool` | `true` | 是否自动附加 access_token（默认 true） |

### post()

```php
public function post($uri, $body = [], $query = [], $withAccessToken = true)
```

发送 POST 请求到微信 API

当 $withAccessToken 为 true 时，会自动附加当前有效的 access_token
（缓存为空或已过期时会先自动获取）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 业务接口路径，如 "cgi-bin/message/custom/send" |
| `$body` | `array` | `[]` | 请求体数据（作为 POST 数据发送） |
| `$query` | `array` | `[]` | 附加的 query 参数 |
| `$withAccessToken` | `bool` | `true` | 是否自动附加 access_token（默认 true） |

### getJSONData()

```php
public function getJSONData()
```

获取并解析最近一次响应为数组

Curl 客户端在响应为 JSON 时已自动解析为关联数组，此时直接返回；否则再尝试
按 JSON 解码。

## 同目录

- [Wechat](/php/api/modules/wechat/wechat)
- [WechatAccessToken](/php/api/modules/wechat/wechat-access-token)
- [WechatAccount](/php/api/modules/wechat/wechat-account)
- [WechatProvider](/php/api/modules/wechat/wechat-provider)

