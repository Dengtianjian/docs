# TemporaryMaterial

`kernel\Modules\Wechat\OfficialAccount\Apis\Material\TemporaryMaterial`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Material/TemporaryMaterial.php`

> 素材管理 - 临时素材

## 声明

```php
class TemporaryMaterial extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

临时素材仅在微信服务器保存 3 天，到期自动删除；
上传后返回的 media_id 可用于客服消息、群发消息等场景。

说明：上传为 multipart/form-data，不走父类 post() 封装，因此单独新建 Curl 实例
手动附加 access_token 与文件；下载接口返回二进制内容，直接返回原始响应体。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`upload()`](#upload) | 上传临时素材 |
| [`download()`](#download) | 获取临时素材 |
| [`downloadHdVoice()`](#downloadhdvoice) | 获取高清语音素材（js-sdk 专用） |

### upload()

```php
public function upload($type, $filePath, $fileName = null, $mimeType = "")
```

上传临时素材

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 媒体文件类型：image/voice/video/thumb |
| `$filePath` | `string` | — | 本地文件绝对路径 |
| `$fileName` | `string|null` | `null` | 上传文件名，默认取路径 basename |
| `$mimeType` | `string` | `""` | 文件 MIME 类型，默认由 curl 推断 |

### download()

```php
public function download($mediaId)
```

获取临时素材

成功时返回文件二进制内容（图片/语音/视频等）；出错时返回 JSON 数组（含 errcode/errmsg）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 素材 media_id |

### downloadHdVoice()

```php
public function downloadHdVoice($mediaId)
```

获取高清语音素材（js-sdk 专用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 语音素材 media_id |

## 同目录

- [Material](/php/api/modules/wechat/officialaccount/apis/material/material)
- [PermanentMaterial](/php/api/modules/wechat/officialaccount/apis/material/permanent-material)

