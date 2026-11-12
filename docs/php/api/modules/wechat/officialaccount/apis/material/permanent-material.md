# PermanentMaterial

`kernel\Modules\Wechat\OfficialAccount\Apis\Material\PermanentMaterial`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Material/PermanentMaterial.php`

> 素材管理 - 永久素材

## 声明

```php
class PermanentMaterial extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

永久素材长期保存在微信服务器，新增后有数量上限（图文、图片、语音、视频分别计数）；
其中图文素材即草稿发布前的内容载体，也可直接用于群发。

说明：上传为 multipart/form-data，不走父类 post() 封装，因此单独新建 Curl 实例
手动附加 access_token 与文件；下载图文/视频素材时返回 JSON，其他类型返回二进制内容。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`upload()`](#upload) | 新增永久素材（图片/语音/视频/缩略图） |
| [`uploadImage()`](#uploadimage) | 上传图文消息内的图片（不占用永久素材数量） |
| [`addNews()`](#addnews) | 新增永久图文素材 |
| [`updateNews()`](#updatenews) | 修改永久图文素材 |
| [`download()`](#download) | 获取永久素材 |
| [`deleteMaterial()`](#deletematerial) | 删除永久素材 |
| [`batchGet()`](#batchget) | 获取素材列表 |
| [`getCount()`](#getcount) | 获取素材总数 |

### upload()

```php
public function upload($type, $filePath, array $description = [], $fileName = null, $mimeType = "")
```

新增永久素材（图片/语音/视频/缩略图）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 媒体文件类型：image/voice/video/thumb |
| `$filePath` | `string` | — | 本地文件绝对路径 |
| `$description` | `array` | `[]` | 视频素材的描述信息（title、introduction），仅 video 需要 |
| `$fileName` | `string|null` | `null` | 上传文件名，默认取路径 basename |
| `$mimeType` | `string` | `""` | 文件 MIME 类型，默认由 curl 推断 |

### uploadImage()

```php
public function uploadImage($filePath, $fileName = null, $mimeType = "")
```

上传图文消息内的图片（不占用永久素材数量）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 本地图片绝对路径 |
| `$fileName` | `string|null` | `null` | 上传文件名，默认取路径 basename |
| `$mimeType` | `string` | `""` | 文件 MIME 类型，默认由 curl 推断 |

### addNews()

```php
public function addNews(array $articles)
```

新增永久图文素材

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$articles` | `array` | — | 图文素材数组，每项含 title、thumb_media_id、author、digest、 |

### updateNews()

```php
public function updateNews($mediaId, $index, array $articles)
```

修改永久图文素材

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 图文素材 media_id |
| `$index` | `int` | — | 要更新的文章在图文素材中的位置（从 0 开始） |
| `$articles` | `array` | — | 更新后的图文数组（仅替换指定 index 的文章） |

### download()

```php
public function download($mediaId)
```

获取永久素材

图文素材返回 JSON（news_item）；视频素材返回 JSON（title、description、down_url）；
图片、语音等返回文件二进制内容。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 素材 media_id |

### deleteMaterial()

```php
public function deleteMaterial($mediaId)
```

删除永久素材

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 素材 media_id |

### batchGet()

```php
public function batchGet($type, $offset = 0, $count = 20)
```

获取素材列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$type` | `string` | — | 素材类型：image/video/voice/news |
| `$offset` | `int` | `0` | 从全部素材的该偏移位置开始返回（0 表示从第一个素材开始） |
| `$count` | `int` | `20` | 返回素材的数量，取值 1-20 |

### getCount()

```php
public function getCount()
```

获取素材总数

## 同目录

- [Material](/php/api/modules/wechat/officialaccount/apis/material/material)
- [TemporaryMaterial](/php/api/modules/wechat/officialaccount/apis/material/temporary-material)

