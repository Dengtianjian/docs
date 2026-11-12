# DynamicMessage

`kernel\Modules\Wechat\Miniprogram\Apis\Message\DynamicMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Message/DynamicMessage.php`

> 动态消息

## 声明

```php
class DynamicMessage extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「消息相关 → 动态消息」分类，用于发送会在一定时间内自动更新的消息
（如拼团、状态变更等场景）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`createActivityId()`](#createactivityid) | 创建 activity_id（POST /cgi-bin/message/wxopen/activityid/create） |
| [`updateDynamicMessage()`](#updatedynamicmessage) | 修改动态消息（POST /cgi-bin/message/wxopen/updatablemsg/send） |
| [`updateChatToolMessage()`](#updatechattoolmessage) | 修改小程序聊天工具的动态卡片消息（POST /cgi-bin/message/wxopen/chattoolmsg/send） |

### createActivityId()

```php
public function createActivityId($unionId = null, $openid = null)
```

创建 activity_id（POST /cgi-bin/message/wxopen/activityid/create）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$unionId` | `int|null` | `null` | 目标用户的 unionid（与 openid 二选一，优先 unionid） |
| `$openid` | `string|null` | `null` | 目标用户的 openid（与 unionid 二选一） |

### updateDynamicMessage()

```php
public function updateDynamicMessage($activityId, $targetState, $templateInfo = [])
```

修改动态消息（POST /cgi-bin/message/wxopen/updatablemsg/send）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$activityId` | `string` | — | 动态消息的 activity_id |
| `$targetState` | `int` | — | 动态消息状态：0 未开始，1 已开始，2 已结束 |
| `$templateInfo` | `array` | `[]` | 模板信息，形如 ["parameter_list" => [["name" => "member_count", "value" => "1"]]] |

### updateChatToolMessage()

```php
public function updateChatToolMessage($data = [])
```

修改小程序聊天工具的动态卡片消息（POST /cgi-bin/message/wxopen/chattoolmsg/send）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段参见官方文档（如 activity_id、target_state、template_info 等） |

## 同目录

- [Message](/php/api/modules/wechat/miniprogram/apis/message/message)
- [SubscribeMessage](/php/api/modules/wechat/miniprogram/apis/message/subscribe-message)

