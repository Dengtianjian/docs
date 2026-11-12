# QrCodeAndLink

`kernel\Modules\Wechat\Miniprogram\Apis\QrCodeAndLink\QrCodeAndLink`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/QrCodeAndLink/QrCodeAndLink.php`

> 小程序码和小程序链接（聚合类）

## 声明

```php
class QrCodeAndLink extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「小程序码与小程序链接」分类下的接口：
- 小程序码：`QrCode`
- URL Scheme / URL Link / Short Link：`Link`

使用示例：

```php
$mp->qrCodeAndLink()->qrCode()->getWxaCodeUnlimit("scene=1");
$mp->qrCodeAndLink()->link()->generateScheme(["path" => "pages/index/index"]);
```

## 示例

```php
$mp->qrCodeAndLink()->qrCode()->getWxaCodeUnlimit("scene=1");
$mp->qrCodeAndLink()->link()->generateScheme(["path" => "pages/index/index"]);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`qrCode()`](#qrcode) | 小程序码相关接口 |
| [`link()`](#link) | 小程序链接相关接口（URL Scheme / URL Link / Short Link） |

### qrCode()

```php
public function qrCode()
```

小程序码相关接口

### link()

```php
public function link()
```

小程序链接相关接口（URL Scheme / URL Link / Short Link）

## 同目录

- [Link](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/link)
- [QrCode](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/qr-code)

