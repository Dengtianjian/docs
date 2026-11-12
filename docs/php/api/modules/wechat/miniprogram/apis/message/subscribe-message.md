# SubscribeMessage

`kernel\Modules\Wechat\Miniprogram\Apis\Message\SubscribeMessage`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Message/SubscribeMessage.php`

> 订阅消息

## 声明

```php
class SubscribeMessage extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「消息相关 → 订阅消息」分类：包含模板管理与发送订阅消息。
模板管理类接口需要小程序账号具备相应权限（一般通过第三方平台代调用）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`send()`](#send) | 发送订阅消息（POST /cgi-bin/message/subscribe/send） |
| [`getTemplateList()`](#gettemplatelist) | 获取已有模板列表（GET /wxaapi/newtmpl/gettemplate） |
| [`getCategory()`](#getcategory) | 获取类目（GET /wxaapi/newtmpl/getcategory） |
| [`getPubTemplateTitles()`](#getpubtemplatetitles) | 获取类目下的公共模板（GET /wxaapi/newtmpl/getpubtemplatetitles） |
| [`getPubTemplateKeywords()`](#getpubtemplatekeywords) | 获取模板中的关键词（GET /wxaapi/newtmpl/getpubtemplatekeywords） |
| [`addTemplate()`](#addtemplate) | 选用模板（POST /wxaapi/newtmpl/addtemplate） |
| [`deleteTemplate()`](#deletetemplate) | 删除模板（POST /wxaapi/newtmpl/deltemplate） |
| [`setUserNotify()`](#setusernotify) | 激活与更新服务卡片（POST /wxa/set_user_notify） |
| [`setUserNotifyExt()`](#setusernotifyext) | 更新服务卡片扩展信息（POST /wxa/set_user_notifyext） |
| [`getUserNotify()`](#getusernotify) | 查询服务卡片状态（POST /wxa/get_user_notify） |

### send()

```php
public function send($touser, $templateId, $data = [], $page = null, $miniprogramState = "formal", $lang = "zh_CN")
```

发送订阅消息（POST /cgi-bin/message/subscribe/send）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$touser` | `string` | — | 接收者（用户）的 openid |
| `$templateId` | `string` | — | 所需下发的订阅模板 id |
| `$data` | `array` | `[]` | 模板内容，形如 ["thing1" => ["value" => "内容"], "time2" => ["value" => "2026-01-01 00:00:00"]] |
| `$page` | `string` | `null` | 点击模板卡片后的跳转页面（可带参数，仅限本小程序内的页面） |
| `$miniprogramState` | `string` | `"formal"` | 跳转小程序类型：developer（开发版）/ trial（体验版）/ formal（正式版） |
| `$lang` | `string` | `"zh_CN"` | 进入小程序查看的语言类型：zh_CN / en_US / zh_HK / zh_TW |

### getTemplateList()

```php
public function getTemplateList()
```

获取已有模板列表（GET /wxaapi/newtmpl/gettemplate）

### getCategory()

```php
public function getCategory()
```

获取类目（GET /wxaapi/newtmpl/getcategory）

### getPubTemplateTitles()

```php
public function getPubTemplateTitles($ids, $start = 0, $limit = 30)
```

获取类目下的公共模板（GET /wxaapi/newtmpl/getpubtemplatetitles）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$ids` | `string` | — | 类目 id，多个用逗号分隔 |
| `$start` | `int` | `0` | 用于分页，表示拉取第几页，从 0 开始 |
| `$limit` | `int` | `30` | 每页记录数，最大 30 |

### getPubTemplateKeywords()

```php
public function getPubTemplateKeywords($tid)
```

获取模板中的关键词（GET /wxaapi/newtmpl/getpubtemplatekeywords）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tid` | `string` | — | 模板标题 id |

### addTemplate()

```php
public function addTemplate($tid, $kidList, $sceneDesc = null)
```

选用模板（POST /wxaapi/newtmpl/addtemplate）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tid` | `string` | — | 模板标题 id |
| `$kidList` | `array` | — | 开发者自行组合好的模板关键词列表，关键词顺序可以自由搭配 |
| `$sceneDesc` | `string` | `null` | 服务场景描述，15 个字以内 |

### deleteTemplate()

```php
public function deleteTemplate($priTmplId)
```

删除模板（POST /wxaapi/newtmpl/deltemplate）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$priTmplId` | `string` | — | 要删除的模板 id |

### setUserNotify()

```php
public function setUserNotify($openid, $categoryId, $type = 1)
```

激活与更新服务卡片（POST /wxa/set_user_notify）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$categoryId` | `string` | — | 服务卡片类目 id |
| `$type` | `int` | `1` | 操作类型（以官方文档为准） |

### setUserNotifyExt()

```php
public function setUserNotifyExt($openid, $categoryId, $extInfo = [])
```

更新服务卡片扩展信息（POST /wxa/set_user_notifyext）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$categoryId` | `string` | — | 服务卡片类目 id |
| `$extInfo` | `array` | `[]` | 扩展信息（以官方文档为准） |

### getUserNotify()

```php
public function getUserNotify($openid, $categoryId)
```

查询服务卡片状态（POST /wxa/get_user_notify）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openid` | `string` | — | 用户 openid |
| `$categoryId` | `string` | — | 服务卡片类目 id |

## 同目录

- [DynamicMessage](/php/api/modules/wechat/miniprogram/apis/message/dynamic-message)
- [Message](/php/api/modules/wechat/miniprogram/apis/message/message)

