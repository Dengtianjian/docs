# Draft

`kernel\Modules\Wechat\OfficialAccount\Apis\Draft`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Draft.php`

> 草稿管理

## 声明

```php
class Draft extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

草稿箱用于暂存图文内容（newspublish 接口已下线，图文统一走草稿箱 + 发布能力流程）。

注意：查询/删除方法名刻意避开 get()/delete() 等父类 HTTP 方法名，
以免覆盖 `WechatOfficialAccountApi::get` 等请求封装。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`add()`](#add) | 新增草稿 |
| [`getDraft()`](#getdraft) | 获取草稿 |
| [`update()`](#update) | 修改草稿 |
| [`deleteDraft()`](#deletedraft) | 删除草稿 |
| [`batchGet()`](#batchget) | 获取草稿列表 |
| [`getCount()`](#getcount) | 获取草稿总数 |

### add()

```php
public function add(array $articles)
```

新增草稿

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$articles` | `array` | — | 图文数组，每项含 title、author、digest、content、content_source_url、 |

### getDraft()

```php
public function getDraft($mediaId)
```

获取草稿

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 草稿的 media_id |

### update()

```php
public function update($mediaId, $index, array $articles)
```

修改草稿

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 草稿的 media_id |
| `$index` | `int` | — | 要更新的文章在草稿中的位置（从 0 开始） |
| `$articles` | `array` | — | 更新后的图文数组 |

### deleteDraft()

```php
public function deleteDraft($mediaId)
```

删除草稿

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaId` | `string` | — | 草稿的 media_id |

### batchGet()

```php
public function batchGet($offset = 0, $count = 20, $noContent = 0)
```

获取草稿列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$offset` | `int` | `0` | 从该偏移位置开始返回（0 表示从第一份草稿开始） |
| `$count` | `int` | `20` | 返回草稿的数量，取值 1-20 |
| `$noContent` | `int` | `0` | 是否返回草稿内容：0 返回（默认），1 不返回 |

### getCount()

```php
public function getCount()
```

获取草稿总数

## 同目录

- [AccountManagement](/php/api/modules/wechat/officialaccount/apis/account-management)
- [Basic](/php/api/modules/wechat/officialaccount/apis/basic)
- [Comment](/php/api/modules/wechat/officialaccount/apis/comment)
- [Publish](/php/api/modules/wechat/officialaccount/apis/publish)
- [WebApp](/php/api/modules/wechat/officialaccount/apis/web-app)

