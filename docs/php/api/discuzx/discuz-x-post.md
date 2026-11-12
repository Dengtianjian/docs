# DiscuzXPost

`kernel\DiscuzX\DiscuzXPost`  ·  class

源码：`gstudio_kernel/DiscuzX/DiscuzXPost.php`

## 声明

```php
class DiscuzXPost extends BaseObject
```

父类：[BaseObject](/php/api/foundation/object/base-object)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getThreadPostAttachments()`](#getthreadpostattachments) | 获取主题首个帖子的附件 |

### getThreadPostAttachments()

```php
public function getThreadPostAttachments($postId, $onlyImage = false)
```

获取主题首个帖子的附件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$postId` | `int|array` | — | 帖子ID或者帖子ID数组 |
| `$onlyImage` | `boolean` | `false` | 只获取图片附件 |

## 同目录

- [DiscuzXForum](/php/api/discuzx/discuz-x-forum)
- [DiscuzXThread](/php/api/discuzx/discuz-x-thread)
- [DiscuzXURL](/php/api/discuzx/discuz-xurl)

