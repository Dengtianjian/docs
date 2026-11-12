# DiscuzXThread

`kernel\DiscuzX\DiscuzXThread`  ·  class

源码：`gstudio_kernel/DiscuzX/DiscuzXThread.php`

## 声明

```php
class DiscuzXThread extends BaseObject
```

父类：[BaseObject](/php/api/foundation/object/base-object)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`changeThreadViews()`](#changethreadviews) | — |
| [`getThreadAttachments()`](#getthreadattachments) | 获取主题附件 |

### changeThreadViews()

```php
public function changeThreadViews($threadId, $newViews)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$threadId` | `mixed` | — | — |
| `$newViews` | `mixed` | — | — |

### getThreadAttachments()

```php
public function getThreadAttachments($threadId, $onlyImage = false)
```

获取主题附件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$threadId` | `int|array` | — | 主题ID或者主题ID数组 |
| `$onlyImage` | `boolean` | `false` | 只获取图片附件 |

## 同目录

- [DiscuzXForum](/php/api/discuzx/discuz-x-forum)
- [DiscuzXPost](/php/api/discuzx/discuz-x-post)
- [DiscuzXURL](/php/api/discuzx/discuz-xurl)

