# DiscuzXAttachmentService

`kernel\DiscuzX\Services\DiscuzXAttachmentService`  ·  class

源码：`gstudio_kernel/DiscuzX/Services/DiscuzXAttachmentService.php`

## 声明

```php
class DiscuzXAttachmentService extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`saveFile()`](#savefile) | 保存文件 |
| [`uploadFile()`](#uploadfile) | 上传文件 |
| [`getAttachment()`](#getattachment) | 根据附件ID获取附件信息 |
| [`deleteAttachment()`](#deleteattachment) | 删除附件 |
| [`getRawAttachment()`](#getrawattachment) | 获取附件的原始记录 |
| [`attachmentStoragePath()`](#attachmentstoragepath) | 附件在服务端的绝对路径 |
| [`attachmentDownloadURL()`](#attachmentdownloadurl) | 附件下载地址（站内转发） |
| [`attachmentThumbURL()`](#attachmentthumburl) | 附件缩略图地址（仅图片类附件有效） |
| [`registerRoute()`](#registerroute) | 注册附件相关路由 |

### saveFile()

```php
public static function saveFile($files, $saveDir = "")
```

保存文件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$files` | `array` | — | 上传的文件或者上传的文件列表 |
| `$saveDir` | `string` | `""` | 保存的路径，基于data/plugindata/{插件ID}/attachments目录 |

### uploadFile()

```php
public static function uploadFile($file)
```

上传文件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 上传的文件 |

### getAttachment()

```php
public static function getAttachment($AttachmentId, $thumbWidth = null, $thumbHeight = null)
```

根据附件ID获取附件信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$AttachmentId` | `integer` | — | 附件ID |
| `$thumbWidth` | `mixed` | `null` | — |
| `$thumbHeight` | `mixed` | `null` | — |

### deleteAttachment()

```php
public static function deleteAttachment($aids)
```

删除附件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$aids` | `int|array` | — | 附件ID|附件ID列表 |

### getRawAttachment()

```php
public static function getRawAttachment($AttachmentId)
```

获取附件的原始记录

Discuz 的附件信息分散在两张表：
- `forum_attachment`       附件索引（含 tableid）
- `forum_attachment_{0..9}` 附件详情（按 aid 末位分表）
本方法按 aid 合并两表，返回合并后的原始行；不存在时返回 null。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$AttachmentId` | `int|string` | — | 附件 ID（aid） |

### attachmentStoragePath()

```php
public static function attachmentStoragePath(array $attachment, $type = "forum")
```

附件在服务端的绝对路径

形如 {attachdir}/{type}/{attachment}，其中 attachment 为 Discuz 记录的相对路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$attachment` | `array` | — | 附件记录 |
| `$type` | `string` | `"forum"` | 附件类型（forum/common/... ），默认 forum |

### attachmentDownloadURL()

```php
public static function attachmentDownloadURL($AttachmentId, $thumb = false)
```

附件下载地址（站内转发）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$AttachmentId` | `int|string` | — | 附件 ID（aid） |
| `$thumb` | `bool` | `false` | 是否取缩略图 |

### attachmentThumbURL()

```php
public static function attachmentThumbURL(array $attachment, $width = null, $height = null)
```

附件缩略图地址（仅图片类附件有效）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$attachment` | `array` | — | 附件记录 |
| `$width` | `int|null` | `null` | 目标宽度，null 取原图宽度 |
| `$height` | `int|null` | `null` | 目标高度，null 取原图高度 |

### registerRoute()

```php
public static function registerRoute()
```

注册附件相关路由

