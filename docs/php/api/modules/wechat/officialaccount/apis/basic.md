# Basic

`kernel\Modules\Wechat\OfficialAccount\Apis\Basic`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Basic.php`

> 基础接口

## 声明

```php
class Basic extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

微信公众号基础接口：获取微信服务器 IP、jsapi_ticket，以及网络检测、
接口调用频次（quota）与调用详情（rid）查询等。

说明：账号级接口调用凭证 access_token 由 [WechatAccessToken](/php/api/modules/wechat/wechat-access-token)
统一获取与缓存，各请求经 `WechatOfficialAccountApi::accessToken` 自动注入，
因此本类不再单独暴露 access_token 相关方法。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getCallbackIP()`](#getcallbackip) | 获取微信服务器 IP 地址（旧版接口） |
| [`getApiDomainIp()`](#getapidomainip) | 获取微信服务器 IP 地址（新版接口，已取代 getcallbackip） |
| [`getJsApiTicket()`](#getjsapiticket) | 获取 jsapi_ticket |
| [`checkCallback()`](#checkcallback) | 网络检测 |
| [`clearQuota()`](#clearquota) | 清除接口调用频率限制（quota） |
| [`getOpenApiQuota()`](#getopenapiquota) | 查询接口调用频次（quota） |
| [`getRidInfo()`](#getridinfo) | 查询 rid 对应的接口调用详情 |

### getCallbackIP()

```php
public function getCallbackIP()
```

获取微信服务器 IP 地址（旧版接口）

### getApiDomainIp()

```php
public function getApiDomainIp()
```

获取微信服务器 IP 地址（新版接口，已取代 getcallbackip）

### getJsApiTicket()

```php
public function getJsApiTicket($type = "jsapi")
```

获取 jsapi_ticket

jsapi_ticket 用于 JS-SDK 权限签名，官方缓存有效期为 7200 秒，
签名算法见 `https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | `"jsapi"` | 票据类型，固定为 jsapi |

### checkCallback()

```php
public function checkCallback($action = "all", $checkOperator = "CHINANET")
```

网络检测

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `string` | `"all"` | 检测动作：dns（域名解析）、ping（ping 检测）、all（全部） |
| `$checkOperator` | `string` | `"CHINANET"` | 检测运营商，以官方文档为准（如 CHINANET、UNICOM、CAP 等） |

### clearQuota()

```php
public function clearQuota($appId = null)
```

清除接口调用频率限制（quota）

公众号调用接口频率超限被拦截后，可调用本接口将当日调用次数清零。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 公众号 AppId，不传时取当前账号的 AppId |

### getOpenApiQuota()

```php
public function getOpenApiQuota($cgiPath)
```

查询接口调用频次（quota）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$cgiPath` | `string` | — | 接口路径，如 "cgi-bin/message/custom/send" |

### getRidInfo()

```php
public function getRidInfo($rid)
```

查询 rid 对应的接口调用详情

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rid` | `string` | — | 接口调用返回中的 rid |

## 同目录

- [AccountManagement](/php/api/modules/wechat/officialaccount/apis/account-management)
- [Comment](/php/api/modules/wechat/officialaccount/apis/comment)
- [Draft](/php/api/modules/wechat/officialaccount/apis/draft)
- [Publish](/php/api/modules/wechat/officialaccount/apis/publish)
- [WebApp](/php/api/modules/wechat/officialaccount/apis/web-app)

