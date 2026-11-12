# Comment

`kernel\Modules\Wechat\OfficialAccount\Apis\Comment`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Comment.php`

> 留言管理

## 声明

```php
class Comment extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

对已群发（或已发布）图文消息的留言进行开关、查看、精选、删除与回复等操作。
相关接口均需提供图文的 msg_data_id 与文章序号 index（从 1 开始）。

注意：查询/删除方法名刻意避开 get()/delete() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 等请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`open()`](#open) | 打开已群发文章评论 |
| [`close()`](#close) | 关闭已群发文章评论 |
| [`getList()`](#getlist) | 查看指定文章的评论数据 |
| [`markElect()`](#markelect) | 将评论标记精选 |
| [`unmarkElect()`](#unmarkelect) | 取消评论精选 |
| [`deleteComment()`](#deletecomment) | 删除评论 |
| [`reply()`](#reply) | 回复评论 |
| [`deleteReply()`](#deletereply) | 删除回复 |

### open()

```php
public function open($msgDataId, $index = 0)
```

打开已群发文章评论

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | `0` | 图文消息中文章的序号（从 1 开始；多图文时用于定位文章） |

### close()

```php
public function close($msgDataId, $index = 0)
```

关闭已群发文章评论

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | `0` | 图文消息中文章的序号（从 1 开始） |

### getList()

```php
public function getList($msgDataId, $index = 0, $begin = 0, $count = 50, $type = 0)
```

查看指定文章的评论数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | `0` | 图文消息中文章的序号（从 1 开始） |
| `$begin` | `int` | `0` | 起始位置（从 0 开始） |
| `$count` | `int` | `50` | 拉取数目，最大 50 |
| `$type` | `int` | `0` | 评论类型：0 普通评论，1 精选评论 |

### markElect()

```php
public function markElect($msgDataId, $index, $userCommentId)
```

将评论标记精选

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | — | 图文消息中文章的序号（从 1 开始） |
| `$userCommentId` | `int|string` | — | 用户评论 ID |

### unmarkElect()

```php
public function unmarkElect($msgDataId, $index, $userCommentId)
```

取消评论精选

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | — | 图文消息中文章的序号（从 1 开始） |
| `$userCommentId` | `int|string` | — | 用户评论 ID |

### deleteComment()

```php
public function deleteComment($msgDataId, $index, $userCommentId)
```

删除评论

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | — | 图文消息中文章的序号（从 1 开始） |
| `$userCommentId` | `int|string` | — | 用户评论 ID |

### reply()

```php
public function reply($msgDataId, $index, $userCommentId, $content)
```

回复评论

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | — | 图文消息中文章的序号（从 1 开始） |
| `$userCommentId` | `int|string` | — | 用户评论 ID |
| `$content` | `string` | — | 回复内容 |

### deleteReply()

```php
public function deleteReply($msgDataId, $index, $userCommentId)
```

删除回复

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$msgDataId` | `string` | — | 群发返回的 msg_data_id |
| `$index` | `int` | — | 图文消息中文章的序号（从 1 开始） |
| `$userCommentId` | `int|string` | — | 用户评论 ID |

## 同目录

- [AccountManagement](/php/api/modules/wechat/officialaccount/apis/account-management)
- [Basic](/php/api/modules/wechat/officialaccount/apis/basic)
- [Draft](/php/api/modules/wechat/officialaccount/apis/draft)
- [Publish](/php/api/modules/wechat/officialaccount/apis/publish)
- [WebApp](/php/api/modules/wechat/officialaccount/apis/web-app)

