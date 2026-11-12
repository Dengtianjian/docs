# WebApp

`kernel\Modules\Wechat\OfficialAccount\Apis\WebApp`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/WebApp.php`

> 网页授权与网页应用

## 声明

```php
class WebApp extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

微信公众号网页授权相关接口。

注意：本类中的 access_token 指「网页授权 access_token」（sns/oauth2），
与账号级的接口调用凭证 access_token 不同，因此方法名加了 WebPage 前缀以示区分。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`generateGetCodeURL()`](#generategetcodeurl) | 生成获取code的URL地址 |
| [`getWebPageAccessToken()`](#getwebpageaccesstoken) | 获取网页授权 access_token |
| [`refreshWebPageAccessToken()`](#refreshwebpageaccesstoken) | 刷新网页授权 access_token |
| [`getUserInfo()`](#getuserinfo) | 拉取用户信息（需 scope 为 snsapi_userinfo） |
| [`checkAccessToken()`](#checkaccesstoken) | 检验网页授权凭证（access_token）是否有效 |

### generateGetCodeURL()

```php
public function generateGetCodeURL($redirectURL, $responseType = "code", $scope = "snsapi_base", $state = "", $forcePopup = false, $forceSnapShot = false)
```

生成获取code的URL地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$redirectURL` | `string` | — | 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理 |
| `$responseType` | `string` | `"code"` | 返回类型，请填写code |
| `$scope` | `string` | `"snsapi_base"` | 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ） |
| `$state` | `string` | `""` | 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节 |
| `$forcePopup` | `boolean` | `false` | 强制此次授权需要用户弹窗确认；默认为false；需要注意的是，若用户命中了特殊场景下的静默授权逻辑，则此参数不生效 |
| `$forceSnapShot` | `boolean` | `false` | 强制此次授权进行是否进入快照页逻辑判定(在快照页功能灰度期间，部分网页即使命中了进入快照页模式逻辑未灰度用户也不会进入快照页模式，开发者可以通过此参数设置进入快照页模式判断逻辑)，默认为fals需要注意的是，若本次登录命中了近期登录过免授权逻辑逻辑或特殊场景下的静默授权逻辑，则此参数不生效 |

### getWebPageAccessToken()

```php
public function getWebPageAccessToken($code)
```

获取网页授权 access_token

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `string` | — | code参数 |

### refreshWebPageAccessToken()

```php
public function refreshWebPageAccessToken($refreshToken)
```

刷新网页授权 access_token

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$refreshToken` | `string` | — | 填写通过access_token获取到的refresh_token参数 |

### getUserInfo()

```php
public function getUserInfo($openId, $lang = "zh_CN")
```

拉取用户信息（需 scope 为 snsapi_userinfo）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openId` | `string` | — | 用户的唯一标识 |
| `$lang` | `string` | `"zh_CN"` | 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语 |

### checkAccessToken()

```php
public function checkAccessToken($openId)
```

检验网页授权凭证（access_token）是否有效

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openId` | `string` | — | 用户的唯一标识 |

## 同目录

- [AccountManagement](/php/api/modules/wechat/officialaccount/apis/account-management)
- [Basic](/php/api/modules/wechat/officialaccount/apis/basic)
- [Comment](/php/api/modules/wechat/officialaccount/apis/comment)
- [Draft](/php/api/modules/wechat/officialaccount/apis/draft)
- [Publish](/php/api/modules/wechat/officialaccount/apis/publish)

