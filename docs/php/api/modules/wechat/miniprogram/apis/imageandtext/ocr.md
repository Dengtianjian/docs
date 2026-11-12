# Ocr

`kernel\Modules\Wechat\Miniprogram\Apis\ImageAndText\Ocr`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/ImageAndText/Ocr.php`

> 文字识别（OCR）

## 声明

```php
class Ocr extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「图像处理与文字识别 → OCR」分类（接口前缀 /cv/ocr）。

说明：接口支持传图片 url（img_url）；若需直接上传图片二进制，可在 $extra 中传 "img" => 文件内容。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`comm()`](#comm) | 通用印刷体识别（POST /cv/ocr/comm） |
| [`idCard()`](#idcard) | 身份证识别（POST /cv/ocr/idcard） |
| [`bankCard()`](#bankcard) | 银行卡识别（POST /cv/ocr/bankcard） |
| [`bizLicense()`](#bizlicense) | 营业执照识别（POST /cv/ocr/bizlicense） |
| [`driving()`](#driving) | 行驶证识别（POST /cv/ocr/driving） |
| [`drivingLicense()`](#drivinglicense) | 驾驶证识别（POST /cv/ocr/drivinglicense） |

### comm()

```php
public function comm($imgUrl, $extra = [])
```

通用印刷体识别（POST /cv/ocr/comm）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### idCard()

```php
public function idCard($imgUrl, $extra = [])
```

身份证识别（POST /cv/ocr/idcard）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### bankCard()

```php
public function bankCard($imgUrl, $extra = [])
```

银行卡识别（POST /cv/ocr/bankcard）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### bizLicense()

```php
public function bizLicense($imgUrl, $extra = [])
```

营业执照识别（POST /cv/ocr/bizlicense）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### driving()

```php
public function driving($imgUrl, $extra = [])
```

行驶证识别（POST /cv/ocr/driving）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

### drivingLicense()

```php
public function drivingLicense($imgUrl, $extra = [])
```

驾驶证识别（POST /cv/ocr/drivinglicense）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$imgUrl` | `string` | — | 图片 url |
| `$extra` | `array` | `[]` | 附加参数，具体字段以官方文档为准 |

## 同目录

- [Image](/php/api/modules/wechat/miniprogram/apis/imageandtext/image)
- [ImageAndText](/php/api/modules/wechat/miniprogram/apis/imageandtext/image-and-text)

