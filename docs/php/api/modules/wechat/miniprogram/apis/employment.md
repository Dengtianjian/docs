# Employment

`kernel\Modules\Wechat\Miniprogram\Apis\Employment`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Employment.php`

> 用工关系

## 声明

```php
class Employment extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「用工关系」分类，用于向灵活用工场景下的用户推送消息、解绑用工关系。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`sendMessage()`](#sendmessage) | 推送用工消息（POST /cgi-bin/message/wxopen/employeerelationmsg/send） |
| [`unbindUserB2cAuthInfo()`](#unbinduserb2cauthinfo) | 解绑用工关系（POST /wxa/business/unbinduserb2cauthinfo） |

### sendMessage()

```php
public function sendMessage($data = [])
```

推送用工消息（POST /cgi-bin/message/wxopen/employeerelationmsg/send）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段（如 touser、page、data 等）以官方文档为准 |

### unbindUserB2cAuthInfo()

```php
public function unbindUserB2cAuthInfo($data = [])
```

解绑用工关系（POST /wxa/business/unbinduserb2cauthinfo）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段（如 openid 等）以官方文档为准 |

## 同目录

- [Nearby](/php/api/modules/wechat/miniprogram/apis/nearby)
- [Search](/php/api/modules/wechat/miniprogram/apis/search)
- [StudentIdentity](/php/api/modules/wechat/miniprogram/apis/student-identity)
- [User](/php/api/modules/wechat/miniprogram/apis/user)
- [UserLogin](/php/api/modules/wechat/miniprogram/apis/user-login)

