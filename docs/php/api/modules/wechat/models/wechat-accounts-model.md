# WechatAccountsModel

`kernel\Modules\Wechat\Models\WechatAccountsModel`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Models/WechatAccountsModel.php`

> 微信账号

## 声明

```php
class WechatAccountsModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 概述

存放微信公众号/小程序的账号信息（AppId/AppSecret）及账号级 access_token 缓存。

说明：
- access_token 为账号级接口调用凭证，同一 appId 全局唯一，多进程/跨请求共用本表，
读取、写回与刷新由 [WechatAccessToken](/php/api/modules/wechat/wechat-access-token) 负责；
- 用户级凭证（网页授权 access_token、refresh_token、session_key 等）不属于本表，
应存放在 WechatUsersModel 中。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |

### __construct()

```php
public function __construct()
```

## 同目录

- [WechatUsersModel](/php/api/modules/wechat/models/wechat-users-model)

