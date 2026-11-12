# Message

`kernel\Modules\Wechat\OfficialAccount\Apis\Message\Message`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Message/Message.php`

> 基础消息（聚合类）

## 声明

```php
class Message extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

聚合微信「消息管理」分类下的接口，按子域拆分为多个子类：
- 客服消息：`CustomMessage`
- 群发消息：`MassMessage`
- 模板消息：`TemplateMessage`
- 一次性订阅消息：`SubscribeMessage`

使用示例：

```php
$oa->message()->custom()->send($openid, "text", ["content" => "你好"]);
$oa->message()->mass()->sendAll("text", ["content" => "hello"]);
$oa->message()->template()->send($openid, $templateId, $data);
```

## 示例

```php
$oa->message()->custom()->send($openid, "text", ["content" => "你好"]);
$oa->message()->mass()->sendAll("text", ["content" => "hello"]);
$oa->message()->template()->send($openid, $templateId, $data);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`custom()`](#custom) | 客服消息相关接口 |
| [`mass()`](#mass) | 群发消息相关接口 |
| [`template()`](#template) | 模板消息相关接口 |
| [`subscribe()`](#subscribe) | 一次性订阅消息相关接口 |

### custom()

```php
public function custom()
```

客服消息相关接口

### mass()

```php
public function mass()
```

群发消息相关接口

### template()

```php
public function template()
```

模板消息相关接口

### subscribe()

```php
public function subscribe()
```

一次性订阅消息相关接口

## 同目录

- [CustomMessage](/php/api/modules/wechat/officialaccount/apis/message/custom-message)
- [MassMessage](/php/api/modules/wechat/officialaccount/apis/message/mass-message)
- [SubscribeMessage](/php/api/modules/wechat/officialaccount/apis/message/subscribe-message)
- [TemplateMessage](/php/api/modules/wechat/officialaccount/apis/message/template-message)

