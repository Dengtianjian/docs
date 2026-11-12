# ReplyMessage

`kernel\Modules\Wechat\OfficialAccount\ReplyMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/ReplyMessage.php`

## 声明

```php
class ReplyMessage
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`text()`](#text) | 回复文本消息 |
| [`image()`](#image) | 回复图片消息 |
| [`voice()`](#voice) | 回复语音消息 |
| [`video()`](#video) | 回复视频消息 |
| [`music()`](#music) | 回复音乐消息 |
| [`news()`](#news) | 回复图文消息 |

### text()

```php
public static function text($toUserName, $fromUserName, $Content)
```

回复文本消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$Content` | `string` | — | 回复的消息内容（换行：在 content 中能够换行，微信客户端就支持换行显示） |

### image()

```php
public static function image($toUserName, $fromUserName, $mediaId)
```

回复图片消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$mediaId` | `string` | — | 通过素材管理中的接口上传多媒体文件，得到的id。 |

### voice()

```php
public static function voice($toUserName, $fromUserName, $mediaId)
```

回复语音消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$mediaId` | `string` | — | 通过素材管理中的接口上传多媒体文件，得到的id |

### video()

```php
public static function video($toUserName, $fromUserName, $mediaId, $title = null, $description = null)
```

回复视频消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$mediaId` | `string` | — | 通过素材管理中的接口上传多媒体文件，得到的id |
| `$title` | `string` | `null` | 视频消息的标题 |
| `$description` | `string` | `null` | 视频消息的描述 |

### music()

```php
public static function music($toUserName, $fromUserName, $thumbMediaId, $title = null, $description = null, $musicURL = null, $HQMusicUrl = null)
```

回复音乐消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$thumbMediaId` | `string` | — | 缩略图的媒体id，通过素材管理中的接口上传多媒体文件，得到的id |
| `$title` | `string` | `null` | 音乐标题 |
| `$description` | `string` | `null` | 音乐描述 |
| `$musicURL` | `string` | `null` | 音乐链接 |
| `$HQMusicUrl` | `string` | `null` | 高质量音乐链接，WIFI环境优先使用该链接播放音乐 |

### news()

```php
public static function news($toUserName, $fromUserName, $articles)
```

回复图文消息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$toUserName` | `string` | — | 接收方帐号（收到的OpenID） |
| `$fromUserName` | `string` | — | 开发者微信号 |
| `$articles` | `array` | — | 二位数组。 图文消息信息，注意，如果图文数超过限制，则将只发限制内的条数。当用户发送文本、图片、语音、视频、图文、地理位置这六种消息时，开发者只能回复1条图文消息；其余场景最多可回复8条图文消息。 |

## 同目录

- [WechatOfficialAccount](/php/api/modules/wechat/officialaccount/wechat-official-account)
- [WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

