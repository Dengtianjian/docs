# WechatOfficialAccount

`kernel\Modules\Wechat\OfficialAccount\WechatOfficialAccount`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/WechatOfficialAccount.php`

> 微信公众号（接口聚合入口）

## 声明

```php
class WechatOfficialAccount extends WechatAccount
```

父类：[WechatAccount](/php/api/modules/wechat/wechat-account)

## 概述

自身即微信账号（AppId/AppSecret），作为所有公众号接口类的聚合入口：
每个方法返回对应业务领域的接口对象（按需实例化，每次调用返回新实例），
与小程序侧的 [WechatMiniProgram](/php/api/modules/wechat/miniprogram/wechat-mini-program) 结构对称。

已聚合的领域（对应微信官方文档分类）：
- 基础接口：basic()
- 自定义菜单：customMenu()（menu()、personalized()）
- 基础消息：message()（custom()、mass()、template()、subscribe()）
- 素材管理：material()（temporary()、permanent()）
- 草稿管理：draft()
- 留言管理：comment()
- 发布能力：publish()
- 用户管理：userManagement()（user()、tag()、blacklist()）
- 网页开发：webApp()
- 智能接口：intelligent()（semantic()、voice()）
- 账号管理（带参二维码等）：accountManagement()

使用示例：

```php
$oa = new WechatOfficialAccount($appId, $appSecret);
$oa->message()->template()->send($openId, $templateId, $data);
$oa->customMenu()->menu()->createMenu($menuData);
$oa->material()->permanent()->addNews($articles);
```

说明：回复用户消息（文本/图片/图文等）不依赖账号与 access_token，为静态工具类，
直接使用 [ReplyMessage](/php/api/modules/wechat/officialaccount/reply-message)。

## 示例

```php
$oa = new WechatOfficialAccount($appId, $appSecret);
$oa->message()->template()->send($openId, $templateId, $data);
$oa->customMenu()->menu()->createMenu($menuData);
$oa->material()->permanent()->addNews($articles);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`name()`](#name) | 平台标识 |
| [`basic()`](#basic) | 基础接口（服务器 IP、jsapi_ticket、网络检测、quota/rid 查询等） |
| [`customMenu()`](#custommenu) | 自定义菜单（普通菜单、个性化菜单） |
| [`menu()`](#menu) | 自定义菜单 - 普通菜单（customMenu()->menu() 的快捷方式） |
| [`message()`](#message) | 基础消息（客服消息、群发消息、模板消息、一次性订阅消息） |
| [`templateMessage()`](#templatemessage) | 模板消息（message()->template() 的快捷方式） |
| [`material()`](#material) | 素材管理（临时素材、永久素材） |
| [`draft()`](#draft) | 草稿管理 |
| [`comment()`](#comment) | 留言管理 |
| [`publish()`](#publish) | 发布能力 |
| [`userManagement()`](#usermanagement) | 用户管理（用户信息、用户标签、黑名单） |
| [`webApp()`](#webapp) | 网页开发（网页授权与网页应用） |
| [`intelligent()`](#intelligent) | 智能接口（语义理解、智能语音） |
| [`accountManagement()`](#accountmanagement) | 账号管理相关接口（生成带参数二维码等） |

### name()

```php
public function name()
```

平台标识

### basic()

```php
public function basic()
```

基础接口（服务器 IP、jsapi_ticket、网络检测、quota/rid 查询等）

### customMenu()

```php
public function customMenu()
```

自定义菜单（普通菜单、个性化菜单）

### menu()

```php
public function menu()
```

自定义菜单 - 普通菜单（customMenu()->menu() 的快捷方式）

### message()

```php
public function message()
```

基础消息（客服消息、群发消息、模板消息、一次性订阅消息）

### templateMessage()

```php
public function templateMessage()
```

模板消息（message()->template() 的快捷方式）

### material()

```php
public function material()
```

素材管理（临时素材、永久素材）

### draft()

```php
public function draft()
```

草稿管理

### comment()

```php
public function comment()
```

留言管理

### publish()

```php
public function publish()
```

发布能力

### userManagement()

```php
public function userManagement()
```

用户管理（用户信息、用户标签、黑名单）

### webApp()

```php
public function webApp()
```

网页开发（网页授权与网页应用）

### intelligent()

```php
public function intelligent()
```

智能接口（语义理解、智能语音）

### accountManagement()

```php
public function accountManagement()
```

账号管理相关接口（生成带参数二维码等）

## 同目录

- [ReplyMessage](/php/api/modules/wechat/officialaccount/reply-message)
- [WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

