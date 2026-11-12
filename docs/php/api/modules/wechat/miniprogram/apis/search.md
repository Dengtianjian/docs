# Search

`kernel\Modules\Wechat\Miniprogram\Apis\Search`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Search.php`

> 微信搜一搜

## 声明

```php
class Search extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「微信搜一搜」分类，用于向微信搜索推送小程序优质内容，便于被及时收录与展示。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`submitPages()`](#submitpages) | 搜一搜数据推送（POST /wxa/search/wxaapi_submitpages） |

### submitPages()

```php
public function submitPages($pages)
```

搜一搜数据推送（POST /wxa/search/wxaapi_submitpages）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pages` | `array` | — | 页面信息列表，元素形如 |

## 同目录

- [Employment](/php/api/modules/wechat/miniprogram/apis/employment)
- [Nearby](/php/api/modules/wechat/miniprogram/apis/nearby)
- [StudentIdentity](/php/api/modules/wechat/miniprogram/apis/student-identity)
- [User](/php/api/modules/wechat/miniprogram/apis/user)
- [UserLogin](/php/api/modules/wechat/miniprogram/apis/user-login)

