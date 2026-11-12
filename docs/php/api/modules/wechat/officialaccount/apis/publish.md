# Publish

`kernel\Modules\Wechat\OfficialAccount\Apis\Publish`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Publish.php`

> 发布能力

## 声明

```php
class Publish extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

将草稿箱中的图文发布到公众号（发布不等于群发，粉丝不会收到推送消息，
但会出现在公众号历史消息中，并占用发布次数）。

注意：查询/删除方法名刻意避开 get()/delete() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 等请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`submit()`](#submit) | 发布草稿 |
| [`getStatus()`](#getstatus) | 查询发布状态 |
| [`deletePublish()`](#deletepublish) | 删除发布 |
| [`getArticle()`](#getarticle) | 获取已发布的图文详情 |
| [`batchGet()`](#batchget) | 获取已发布图文列表 |

### submit()

```php
public function submit($mediaId)
```

发布草稿

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 草稿的 media_id |

### getStatus()

```php
public function getStatus($publishId)
```

查询发布状态

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$publishId` | `string` | — | 发布任务 ID（publish_id） |

### deletePublish()

```php
public function deletePublish($articleId, $index = null)
```

删除发布

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$articleId` | `string` | — | 发布成功后返回的 article_id |
| `$index` | `int|null` | `null` | 要删除的文章序号（从 1 开始，多图文时指定；不传表示删除全部） |

### getArticle()

```php
public function getArticle($articleId)
```

获取已发布的图文详情

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$articleId` | `string` | — | 发布成功后返回的 article_id |

### batchGet()

```php
public function batchGet($offset = 0, $count = 20, $noContent = 0)
```

获取已发布图文列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$offset` | `int` | `0` | 从该偏移位置开始返回（0 表示从第一条记录开始） |
| `$count` | `int` | `20` | 返回条数，取值 1-20 |
| `$noContent` | `int` | `0` | 是否返回图文内容：0 返回（默认），1 不返回 |

## 同目录

- [AccountManagement](/php/api/modules/wechat/officialaccount/apis/account-management)
- [Basic](/php/api/modules/wechat/officialaccount/apis/basic)
- [Comment](/php/api/modules/wechat/officialaccount/apis/comment)
- [Draft](/php/api/modules/wechat/officialaccount/apis/draft)
- [WebApp](/php/api/modules/wechat/officialaccount/apis/web-app)

