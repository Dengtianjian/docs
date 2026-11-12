# CustomMessage

`kernel\Modules\Wechat\OfficialAccount\Apis\Message\CustomMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Message/CustomMessage.php`

> 客服消息

## 声明

```php
class CustomMessage extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

用户与公众号产生交互（关注、发消息、点击菜单等）后 48 小时内，
可通过客服消息接口向用户下发消息。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`send()`](#send) | 发送客服消息 |
| [`typing()`](#typing) | 客服输入状态 |

### send()

```php
public function send($touser, $msgType, $content = [])
```

发送客服消息

$msgType 与 $content 需对应官方约定：
- text：["content" => "文本内容"]
- image / voice：["media_id" => "素材ID"]
- video：["media_id" => "素材ID", "thumb_media_id" => "封面素材ID", "title" => "", "description" => ""]
- music：["title" => "", "description" => "", "musicurl" => "", "hqmusicurl" => "", "thumb_media_id" => ""]
- news：["articles" => [["title" => "", "description" => "", "url" => "", "picurl" => ""], ...]]
- mpnews：["media_id" => "图文消息素材ID"]
- menu：["head_content" => "", "list" => [...], "tail_content" => ""]
- miniprogrampage：["title" => "", "appid" => "", "pagepath" => "", "thumb_media_id" => ""]

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$touser` | `string` | — | 用户 OpenID |
| `$msgType` | `string` | — | 消息类型：text/image/voice/video/music/news/mpnews/menu/miniprogrampage |
| `$content` | `array` | `[]` | 对应消息类型的消息体 |

### typing()

```php
public function typing($touser, $command = "Typing")
```

客服输入状态

下发前需先调用本接口向用户发送"正在输入"，用户收到后可提升交互体验。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$touser` | `string` | — | 用户 OpenID |
| `$command` | `string` | `"Typing"` | 输入状态：Typing（正在输入）/ CancelTyping（取消正在输入） |

## 同目录

- [MassMessage](/php/api/modules/wechat/officialaccount/apis/message/mass-message)
- [Message](/php/api/modules/wechat/officialaccount/apis/message/message)
- [SubscribeMessage](/php/api/modules/wechat/officialaccount/apis/message/subscribe-message)
- [TemplateMessage](/php/api/modules/wechat/officialaccount/apis/message/template-message)

