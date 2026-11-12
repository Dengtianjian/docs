# RiskControl

`kernel\Modules\Wechat\Miniprogram\Apis\Security\RiskControl`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Security/RiskControl.php`

> 安全风控

## 声明

```php
class RiskControl extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序安全 → 安全风控」分类。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getUserRiskRank()`](#getuserriskrank) | 获取用户安全等级（POST /wxa/getuserriskrank） |

### getUserRiskRank()

```php
public function getUserRiskRank($openid, $scene = 1, $clientIp = null, $isTest = false)
```

获取用户安全等级（POST /wxa/getuserriskrank）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户的 openid |
| `$scene` | `int` | `1` | 场景值：0 注册；1 营销作弊 |
| `$clientIp` | `string|null` | `null` | 用户访问来源的 IP，留空时尝试取 Discuz 的 $_G['client_ip'] |
| `$isTest` | `bool` | `false` | 是否测试（测试时不消耗调用次数） |

## 同目录

- [ContentSecurity](/php/api/modules/wechat/miniprogram/apis/security/content-security)
- [Security](/php/api/modules/wechat/miniprogram/apis/security/security)

