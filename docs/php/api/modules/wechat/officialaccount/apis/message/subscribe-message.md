# SubscribeMessage

`kernel\Modules\Wechat\OfficialAccount\Apis\Message\SubscribeMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Message/SubscribeMessage.php`

> 一次性订阅消息

## 声明

```php
class SubscribeMessage extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

用户通过网页授权/支付等场景授权一次后，公众号可下发一条对应的模板消息，
授权次数可累积（每授权一次可下发一条）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`send()`](#send) | 发送一次性订阅消息 |

### send()

```php
public function send($touser, $templateId, $scene, $title, array $data = [], $url = null, $miniprogram = null)
```

发送一次性订阅消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$touser` | `string` | — | 接收者 OpenID |
| `$templateId` | `string` | — | 订阅消息模板 ID |
| `$scene` | `string` | — | 场景值（订阅消息的 scene，用于统计，如 "1000"） |
| `$title` | `string` | — | 消息标题 |
| `$data` | `array` | `[]` | 模板数据，如 ["content" => ["value" => "内容"]] |
| `$url` | `string|null` | `null` | 点击消息后的跳转链接 |
| `$miniprogram` | `array|null` | `null` | 跳转小程序所需数据（含 appid、pagepath） |

## 同目录

- [CustomMessage](/php/api/modules/wechat/officialaccount/apis/message/custom-message)
- [MassMessage](/php/api/modules/wechat/officialaccount/apis/message/mass-message)
- [Message](/php/api/modules/wechat/officialaccount/apis/message/message)
- [TemplateMessage](/php/api/modules/wechat/officialaccount/apis/message/template-message)

