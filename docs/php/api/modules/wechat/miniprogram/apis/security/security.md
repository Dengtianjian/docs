# Security

`kernel\Modules\Wechat\Miniprogram\Apis\Security\Security`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Security/Security.php`

> 小程序安全（聚合类）

## 声明

```php
class Security extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「小程序安全」分类下的接口：
- 内容安全：`ContentSecurity`
- 安全风控：`RiskControl`

使用示例：

```php
$mp->security()->contentSecurity()->msgSecCheck($content, $openid, 2);
$mp->security()->riskControl()->getUserRiskRank($openid, 1);
```

## 示例

```php
$mp->security()->contentSecurity()->msgSecCheck($content, $openid, 2);
$mp->security()->riskControl()->getUserRiskRank($openid, 1);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`contentSecurity()`](#contentsecurity) | 内容安全相关接口 |
| [`riskControl()`](#riskcontrol) | 安全风控相关接口 |

### contentSecurity()

```php
public function contentSecurity()
```

内容安全相关接口

### riskControl()

```php
public function riskControl()
```

安全风控相关接口

## 同目录

- [ContentSecurity](/php/api/modules/wechat/miniprogram/apis/security/content-security)
- [RiskControl](/php/api/modules/wechat/miniprogram/apis/security/risk-control)

