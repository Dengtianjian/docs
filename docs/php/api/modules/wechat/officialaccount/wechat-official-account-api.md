# WechatOfficialAccountApi

`kernel\Modules\Wechat\OfficialAccount\WechatOfficialAccountApi`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/WechatOfficialAccountApi.php`

> 微信公众号 API 基类

**无方法**

## 声明

```php
class WechatOfficialAccountApi extends WechatApi
```

父类：[WechatApi](/php/api/modules/wechat/wechat-api)

## 概述

公众号侧各接口类的公共基类，与小程序侧的 [WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api) 对称：
继承 [WechatApi](/php/api/modules/wechat/wechat-api)，通过微信公众号账号（WechatAccount）获取 access_token 并自动注入请求。

## 方法

本类没有公开方法。

## 同目录

- [ReplyMessage](/php/api/modules/wechat/officialaccount/reply-message)
- [WechatOfficialAccount](/php/api/modules/wechat/officialaccount/wechat-official-account)

