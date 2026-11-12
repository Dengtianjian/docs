# AccountManagement

`kernel\Modules\Wechat\OfficialAccount\Apis\AccountManagement`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/AccountManagement.php`

> 账号管理

## 声明

```php
class AccountManagement extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

微信公众号账号管理相关接口（带参数二维码等）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`generatingParametricQRCode()`](#generatingparametricqrcode) | 生成带参数的二维码 |
| [`showQRCode()`](#showqrcode) | 通过 ticket 换取二维码 |

### generatingParametricQRCode()

```php
public function generatingParametricQRCode($sceneId = null, $sceneStr = null, $expireSeconds = 60, $actionName = "QR_SCENE")
```

生成带参数的二维码

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sceneId` | `integer` | `null` | 场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1--100000） |
| `$sceneStr` | `string` | `null` | 场景值ID（字符串形式的ID），字符串类型，长度限制为1到64 |
| `$expireSeconds` | `integer` | `60` | 该二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为60秒。 |
| `$actionName` | `string` | `"QR_SCENE"` | 二维码类型，QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值 |

### showQRCode()

```php
public function showQRCode($ticket)
```

通过 ticket 换取二维码

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$ticket` | `string` | — | 凭据 |

## 同目录

- [Basic](/php/api/modules/wechat/officialaccount/apis/basic)
- [Comment](/php/api/modules/wechat/officialaccount/apis/comment)
- [Draft](/php/api/modules/wechat/officialaccount/apis/draft)
- [Publish](/php/api/modules/wechat/officialaccount/apis/publish)
- [WebApp](/php/api/modules/wechat/officialaccount/apis/web-app)

