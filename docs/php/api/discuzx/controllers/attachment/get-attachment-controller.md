# GetAttachmentController

`kernel\DiscuzX\Controllers\Attachment\GetAttachmentController`  ·  class

源码：`gstudio_kernel/DiscuzX/Controllers/Attachment/GetAttachmentController.php`

## 声明

```php
class GetAttachmentController extends DiscuzXController
```

父类：[DiscuzXController](/php/api/discuzx/foundation/discuz-x-controller)

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$query` | `mixed` | `[ "w" => "int", "h" => "int", ]` | — |
| `$serializes` | `mixed` | `[ "aid" => "int", "fileName" => "string"`… | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`data()`](#data) | — |

### data()

```php
public function data($attachId)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$attachId` | `mixed` | — | — |

## 同目录

- [DeleteAttachmentController](/php/api/discuzx/controllers/attachment/delete-attachment-controller)
- [UploadAttachmentController](/php/api/discuzx/controllers/attachment/upload-attachment-controller)

