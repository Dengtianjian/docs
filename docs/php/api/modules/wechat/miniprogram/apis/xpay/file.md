# File

`kernel\Modules\Wechat\Miniprogram\Apis\XPay\File`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/XPay/File.php`

> 虚拟支付 - 文件上传

## 声明

```php
class File extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「虚拟支付」分类下媒体文件上传相关接口（接口前缀 /xpay）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`uploadFile()`](#uploadfile) | 上传媒体文件（POST /xpay/upload_vp_file，multipart/form-data） |
| [`getUploadFileSign()`](#getuploadfilesign) | 获取微信支付反馈投诉图片的签名头部（POST /xpay/get_upload_file_sign） |

### uploadFile()

```php
public function uploadFile($filePath, $fieldName = "media", $extra = [])
```

上传媒体文件（POST /xpay/upload_vp_file，multipart/form-data）

该接口为 multipart 上传，不走父类的 post() 封装，因此需手动附加 access_token。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 本地文件绝对路径 |
| `$fieldName` | `string` | `"media"` | 表单字段名（默认 "media"） |
| `$extra` | `array` | `[]` | 附加 query 参数，字段以官方文档为准 |

### getUploadFileSign()

```php
public function getUploadFileSign($data = [])
```

获取微信支付反馈投诉图片的签名头部（POST /xpay/get_upload_file_sign）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体字段以官方文档为准 |

## 同目录

- [Complaint](/php/api/modules/wechat/miniprogram/apis/xpay/complaint)
- [Contract](/php/api/modules/wechat/miniprogram/apis/xpay/contract)
- [Currency](/php/api/modules/wechat/miniprogram/apis/xpay/currency)
- [Funds](/php/api/modules/wechat/miniprogram/apis/xpay/funds)
- [Goods](/php/api/modules/wechat/miniprogram/apis/xpay/goods)
- [Order](/php/api/modules/wechat/miniprogram/apis/xpay/order)
- [XPay](/php/api/modules/wechat/miniprogram/apis/xpay/x-pay)

