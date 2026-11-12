# WechatMiniProgram

`kernel\Modules\Wechat\Miniprogram\WechatMiniProgram`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/WechatMiniProgram.php`

> 微信小程序（接口聚合入口）

## 声明

```php
class WechatMiniProgram extends WechatAccount
```

父类：[WechatAccount](/php/api/modules/wechat/wechat-account)

## 概述

自身即微信账号（AppId/AppSecret），作为所有小程序接口类的聚合入口：
每个方法返回对应业务领域的接口对象（按需实例化，每次调用返回新实例）。

已聚合的领域：
- 用户与登录：user()、userLogin()
- 小程序码和小程序链接：qrCodeAndLink()
- 消息相关：message()
- 用工关系：employment()
- 小程序安全：security()
- 小程序交易管理服务：tradeManagement()
- 微信学生身份快速验证：studentIdentity()
- 附近小程序：nearby()
- 图像处理与文字识别：imageAndText()
- 虚拟支付：xPay()
- 微信搜一搜：search()

使用示例：

```php
$mp = new WechatMiniProgram($appId, $appSecret);
$mp->qrCodeAndLink()->qrCode()->getWxaCodeUnlimit("scene=1");
$mp->message()->subscribe()->send($openid, $templateId, $data);
$mp->security()->contentSecurity()->msgSecCheck($content, $openid);
```

## 示例

```php
$mp = new WechatMiniProgram($appId, $appSecret);
$mp->qrCodeAndLink()->qrCode()->getWxaCodeUnlimit("scene=1");
$mp->message()->subscribe()->send($openid, $templateId, $data);
$mp->security()->contentSecurity()->msgSecCheck($content, $openid);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`userLogin()`](#userlogin) | 用户登录相关接口（JSCode 换登录态、检查/重置登录态） |
| [`user()`](#user) | 用户信息相关接口（插件 openpid、加密信息、支付后 unionid、encryptKey、手机号） |
| [`qrCodeAndLink()`](#qrcodeandlink) | 小程序码和小程序链接 |
| [`message()`](#message) | 消息相关（动态消息、订阅消息） |
| [`employment()`](#employment) | 用工关系 |
| [`security()`](#security) | 小程序安全（内容安全、安全风控） |
| [`tradeManagement()`](#trademanagement) | 小程序交易管理服务（订单发货、品牌） |
| [`studentIdentity()`](#studentidentity) | 微信学生身份快速验证 |
| [`nearby()`](#nearby) | 附近小程序 |
| [`imageAndText()`](#imageandtext) | 图像处理与文字识别（图像处理、OCR） |
| [`xPay()`](#xpay) | 虚拟支付 |
| [`search()`](#search) | 微信搜一搜（数据推送） |

### userLogin()

```php
public function userLogin()
```

用户登录相关接口（JSCode 换登录态、检查/重置登录态）

### user()

```php
public function user()
```

用户信息相关接口（插件 openpid、加密信息、支付后 unionid、encryptKey、手机号）

### qrCodeAndLink()

```php
public function qrCodeAndLink()
```

小程序码和小程序链接

### message()

```php
public function message()
```

消息相关（动态消息、订阅消息）

### employment()

```php
public function employment()
```

用工关系

### security()

```php
public function security()
```

小程序安全（内容安全、安全风控）

### tradeManagement()

```php
public function tradeManagement()
```

小程序交易管理服务（订单发货、品牌）

### studentIdentity()

```php
public function studentIdentity()
```

微信学生身份快速验证

### nearby()

```php
public function nearby()
```

附近小程序

### imageAndText()

```php
public function imageAndText()
```

图像处理与文字识别（图像处理、OCR）

### xPay()

```php
public function xPay()
```

虚拟支付

### search()

```php
public function search()
```

微信搜一搜（数据推送）

## 同目录

- [WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

