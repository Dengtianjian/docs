# QrCode

`kernel\Modules\Wechat\Miniprogram\Apis\QrCodeAndLink\QrCode`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/QrCodeAndLink/QrCode.php`

> 小程序码

## 声明

```php
class QrCode extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序码与小程序链接 → 小程序码」分类。

注意：本类接口成功时返回的是图片二进制内容，失败时返回 JSON 字符串（含 errcode/errmsg），
调用方可通过 errcode 判断是否成功。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getWxaCode()`](#getwxacode) | 获取小程序码（POST /wxa/getwxacode） |
| [`getWxaCodeUnlimit()`](#getwxacodeunlimit) | 获取不限制的小程序码（POST /wxa/getwxacodeunlimit） |
| [`createWxaQrCode()`](#createwxaqrcode) | 获取小程序二维码（POST /cgi-bin/wxaapp/createwxaqrcode） |

### getWxaCode()

```php
public function getWxaCode($path, $width = 430, $autoColor = false, $lineColor = null, $isHyaline = false, $envVersion = "release")
```

获取小程序码（POST /wxa/getwxacode）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 扫码进入的小程序页面路径，如 "pages/index/index"，不能为空 |
| `$width` | `int` | `430` | 二维码宽度（px），默认 430 |
| `$autoColor` | `bool` | `false` | 是否自动配置线条颜色，为 true 时忽略 $lineColor |
| `$lineColor` | `array|null` | `null` | 线条颜色，形如 ["r" => 0, "g" => 0, "b" => 0] |
| `$isHyaline` | `bool` | `false` | 是否透明底色 |
| `$envVersion` | `string` | `"release"` | 打开的小程序版本：release（正式）/ trial（体验）/ develop（开发） |

### getWxaCodeUnlimit()

```php
public function getWxaCodeUnlimit($scene, $page = "index", $checkPath = true, $envVersion = "release", $width = 430, $autoColor = false, $lineColor = null, $isHyaline = false)
```

获取不限制的小程序码（POST /wxa/getwxacodeunlimit）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$scene` | `string` | — | 业务参数，最大 32 个可见字符，只支持数字、大小写英文及部分特殊符号 |
| `$page` | `string` | `"index"` | 扫码进入的页面路径，默认 "index"（首页），不能带参数 |
| `$checkPath` | `bool` | `true` | 是否检查 page 是否存在（为 false 时允许跳到不存在的页面，开发版默认不检查） |
| `$envVersion` | `string` | `"release"` | 打开的小程序版本：release / trial / develop |
| `$width` | `int` | `430` | 二维码宽度（px），默认 430 |
| `$autoColor` | `bool` | `false` | 是否自动配置线条颜色 |
| `$lineColor` | `array|null` | `null` | 线条颜色，形如 ["r" => 0, "g" => 0, "b" => 0] |
| `$isHyaline` | `bool` | `false` | 是否透明底色 |

### createWxaQrCode()

```php
public function createWxaQrCode($path, $width = 430)
```

获取小程序二维码（POST /cgi-bin/wxaapp/createwxaqrcode）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 扫码进入的小程序页面路径，不能为空，且不能带参数 |
| `$width` | `int` | `430` | 二维码宽度（px），默认 430 |

## 同目录

- [Link](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/link)
- [QrCodeAndLink](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/qr-code-and-link)

