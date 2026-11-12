# ImageAndText

`kernel\Modules\Wechat\Miniprogram\Apis\ImageAndText\ImageAndText`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/ImageAndText/ImageAndText.php`

> 图像处理与文字识别（聚合类）

## 声明

```php
class ImageAndText extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

聚合微信「图像处理与文字识别」分类下的接口：
- 图像处理：`Image`
- 文字识别：`Ocr`

使用示例：

```php
$mp->imageAndText()->image()->qrCode($imgUrl);
$mp->imageAndText()->ocr()->idCard($imgUrl);
```

## 示例

```php
$mp->imageAndText()->image()->qrCode($imgUrl);
$mp->imageAndText()->ocr()->idCard($imgUrl);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`image()`](#image) | 图像处理相关接口 |
| [`ocr()`](#ocr) | 文字识别（OCR）相关接口 |

### image()

```php
public function image()
```

图像处理相关接口

### ocr()

```php
public function ocr()
```

文字识别（OCR）相关接口

## 同目录

- [Image](/php/api/modules/wechat/miniprogram/apis/imageandtext/image)
- [Ocr](/php/api/modules/wechat/miniprogram/apis/imageandtext/ocr)

