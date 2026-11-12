# Message

`kernel\Modules\Wechat\Miniprogram\Apis\Message\Message`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Message/Message.php`

> 消息相关（聚合类）

## 声明

```php
class Message extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「消息相关」分类下的接口：
- 动态消息：`DynamicMessage`
- 订阅消息：`SubscribeMessage`

使用示例：

```php
$mp->message()->subscribe()->send($openid, $templateId, $data);
$mp->message()->dynamicMessage()->createActivityId(null, $openid);
```

## 示例

```php
$mp->message()->subscribe()->send($openid, $templateId, $data);
$mp->message()->dynamicMessage()->createActivityId(null, $openid);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`dynamicMessage()`](#dynamicmessage) | 动态消息相关接口 |
| [`subscribe()`](#subscribe) | 订阅消息相关接口 |

### dynamicMessage()

```php
public function dynamicMessage()
```

动态消息相关接口

### subscribe()

```php
public function subscribe()
```

订阅消息相关接口

## 同目录

- [DynamicMessage](/php/api/modules/wechat/miniprogram/apis/message/dynamic-message)
- [SubscribeMessage](/php/api/modules/wechat/miniprogram/apis/message/subscribe-message)

