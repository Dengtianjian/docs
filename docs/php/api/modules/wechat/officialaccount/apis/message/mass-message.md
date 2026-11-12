# MassMessage

`kernel\Modules\Wechat\OfficialAccount\Apis\Message\MassMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Message/MassMessage.php`

> 群发消息

## 声明

```php
class MassMessage extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

公众号可通过本类接口按标签或 OpenID 列表群发消息，群发有次数与速率限制，
且会占用公众号的群发次数，详见官方文档。

注意：本类方法名刻意避开 get()/delete() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 等请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`sendAll()`](#sendall) | 按标签群发 |
| [`sendToUsers()`](#sendtousers) | 按 OpenID 列表群发 |
| [`preview()`](#preview) | 群发消息预览 |
| [`getStatus()`](#getstatus) | 查询群发消息发送状态 |
| [`deleteMass()`](#deletemass) | 删除群发 |
| [`getSpeed()`](#getspeed) | 获取群发速度 |
| [`setSpeed()`](#setspeed) | 设置群发速度 |

### sendAll()

```php
public function sendAll($msgType, $content, array $filter = ["is_to_all" => true], array $options = [])
```

按标签群发

$msgType 与 $content 需对应官方约定（同客服消息），例如：
- text：["content" => "文本内容"]
- mpnews：["media_id" => "图文素材ID"]
- image / voice：["media_id" => "素材ID"]
- wxcard：["card_id" => "卡券ID"]

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgType` | `string` | — | 消息类型 |
| `$content` | `array` | — | 消息体 |
| `$filter` | `array` | `["is_to_all" => true]` | 发送对象：["is_to_all" => true] 或 ["is_to_all" => false, "tag_id" => 标签ID] |
| `$options` | `array` | `[]` | 其余可选字段，如 send_ignore_reprint、clientmsgid |

### sendToUsers()

```php
public function sendToUsers(array $openIds, $msgType, $content, array $options = [])
```

按 OpenID 列表群发

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openIds` | `array` | — | 接收者 OpenID 列表（最多 10000 个） |
| `$msgType` | `string` | — | 消息类型 |
| `$content` | `array` | — | 消息体 |
| `$options` | `array` | `[]` | 其余可选字段，如 send_ignore_reprint、clientmsgid |

### preview()

```php
public function preview($msgType, $content, $toUser = null, $toWxName = null)
```

群发消息预览

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgType` | `string` | — | 消息类型 |
| `$content` | `array` | — | 消息体 |
| `$toUser` | `string` | `null` | 接收预览的 OpenID（与 $toWxName 二选一） |
| `$toWxName` | `string|null` | `null` | 接收预览的微信号（与 $toUser 二选一） |

### getStatus()

```php
public function getStatus($msgId)
```

查询群发消息发送状态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgId` | `int|string` | — | 群发消息的 msg_id |

### deleteMass()

```php
public function deleteMass($msgId, $articleIdx = null)
```

删除群发

群发接口派生的 msg_id 对应的消息可在此删除；已发送成功的消息仅可删除图文消息。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgId` | `int|string` | — | 群发消息的 msg_id |
| `$articleIdx` | `int|null` | `null` | 图文消息中要删除的文章序号（从 1 开始） |

### getSpeed()

```php
public function getSpeed()
```

获取群发速度

### setSpeed()

```php
public function setSpeed($speed)
```

设置群发速度

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$speed` | `int` | — | 群发速度级别（0-4，具体含义以官方文档为准） |

## 同目录

- [CustomMessage](/php/api/modules/wechat/officialaccount/apis/message/custom-message)
- [Message](/php/api/modules/wechat/officialaccount/apis/message/message)
- [SubscribeMessage](/php/api/modules/wechat/officialaccount/apis/message/subscribe-message)
- [TemplateMessage](/php/api/modules/wechat/officialaccount/apis/message/template-message)

