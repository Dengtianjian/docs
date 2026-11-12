# Image

`kernel\Modules\Wechat\Miniprogram\Apis\ImageAndText\Image`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/ImageAndText/Image.php`

> 图像处理

## 声明

```php
class Image extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「图像处理与文字识别 → 图像处理」分类（接口前缀 /cv/img）。

说明：接口支持传图片 url（img_url）；若需直接上传图片二进制，可在 $extra 中传 "img" => 文件内容。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`aiCrop()`](#aicrop) | 图片智能裁剪（POST /cv/img/aicrop） |
| [`qrCode()`](#qrcode) | 二维码/条码识别（POST /cv/img/qrcode） |
| [`superResolution()`](#superresolution) | 图片高清化（POST /cv/img/superresolution） |

### aiCrop()

```php
public function aiCrop($imgUrl, $extra = [])
```

图片智能裁剪（POST /cv/img/aicrop）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，如 ["ratios" => ["1:1", "16:9"]]，具体字段以官方文档为准 |

### qrCode()

```php
public function qrCode($imgUrl, $extra = [])
```

二维码/条码识别（POST /cv/img/qrcode）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### superResolution()

```php
public function superResolution($imgUrl, $extra = [])
```

图片高清化（POST /cv/img/superresolution）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

## 同目录

- [ImageAndText](/php/api/modules/wechat/miniprogram/apis/imageandtext/image-and-text)
- [Ocr](/php/api/modules/wechat/miniprogram/apis/imageandtext/ocr)

