# WechatAccessToken

`kernel\Modules\Wechat\WechatAccessToken`  ·  class

源码：`gstudio_kernel/Modules/Wechat/WechatAccessToken.php`

> 微信账号级接口调用凭证（access_token）

## 声明

```php
class WechatAccessToken
```

## 概述

从 WechatApi 中抽出的独立令牌组件，只依赖 AppId/AppSecret，
因此 `WechatAccount` 与 `WechatApi`（以及其各子类）都能直接调用。

token() 的取值优先级：
1. 实例内已注入或已缓存的 token；
2. 进程内共享缓存：同一请求内多个对象共用同一份 token，避免重复获取；
3. wechat_accounts 表：跨请求、跨进程的权威存储；
4. 以上都没有或已过期时，请求微信稳定版接口获取，并写回表与进程内缓存。

另外：
- 提前 REFRESH_AHEAD 秒判定过期，避免临界失效导致业务请求失败；
- 表不可用（如无数据库连接）或账号未入库时自动退化，不会中断调用；
- 回源前会再查一次表（双检），减少并发时的重复获取；
- 稳定版接口是幂等的（不会顶掉旧 token），因此写表不加锁。

使用示例：

```php
$token = (new WechatAccessToken($appId, $appSecret))->token();
// 或从账号上取
$token = (new WechatAccount($appId, $appSecret))->accessToken();
```

## 示例

```php
$token = (new WechatAccessToken($appId, $appSecret))->token();
// 或从账号上取
$token = (new WechatAccount($appId, $appSecret))->accessToken();
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `API_URL` | `"https://api.weixin.qq.com"` | 微信开放平台接口地址前缀 |
| `REFRESH_AHEAD` | `300` | access_token 提前刷新时间（秒） |
| `DEFAULT_EXPIRES_IN` | `7200` | 微信未返回 expires_in 时的兜底有效期（秒） |

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $cache` | `array` | `[]` | 进程内共享缓存（appId => ["accessToken" => string, "expiresAt" => int|null]） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | protected | 账号 AppId |
| `$appSecret` | `string|null` | protected | 账号 AppSecret |
| `$accessToken` | `string|null` | protected | 当前实例持有的 access_token |
| `$expiresAt` | `int|null` | protected | 当前实例持有的 access_token 过期时间（Unix 时间戳，秒） |
| `$CURL` | `Curl|null` | protected | CURL 客户端实例，用于请求微信接口 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化令牌组件 |
| [`appId()`](#appid) | 读写一体：获取或设置 AppId |
| [`appSecret()`](#appsecret) | 读写一体：获取或设置 AppSecret |
| [`token()`](#token) | 获取当前有效的 access_token（只读） |
| [`refresh()`](#refresh) | 强制刷新 access_token |
| [`fetch()`](#fetch) | 请求微信稳定版接口获取 access_token（不写入缓存） |
| [`fetchPlain()`](#fetchplain) | 请求微信普通版接口获取 access_token（不写入缓存） |
| [`set()`](#set) | 直接注入 access_token 与过期时间（不写入进程内共享缓存） |
| [`expiresAt()`](#expiresat) | 读写一体：获取或设置当前实例的 access_token 过期时间 |
| [`isExpired()`](#isexpired) | 判断当前实例的 access_token 是否为空或已进入提前刷新窗口 |
| [`isExpiresAtExpired()`](#isexpiresatexpired) | 判断指定过期时间是否已进入提前刷新窗口 |

### __construct()

```php
public function __construct($appId = null, $appSecret = null)
```

初始化令牌组件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 账号 AppId |
| `$appSecret` | `string|null` | `null` | 账号 AppSecret |

### appId()

```php
public function appId($data = null)
```

读写一体：获取或设置 AppId

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 AppId |

### appSecret()

```php
public function appSecret($data = null)
```

读写一体：获取或设置 AppSecret

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 AppSecret |

### token()

```php
public function token()
```

获取当前有效的 access_token（只读）

详见类注释中的取值优先级；未配置 AppId 或获取失败时返回 null。

### refresh()

```php
public function refresh()
```

强制刷新 access_token

以 force_refresh = true 调用稳定版接口，成功后写入表与进程内缓存。

### fetch()

```php
public function fetch($forceRefresh = false)
```

请求微信稳定版接口获取 access_token（不写入缓存）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$forceRefresh` | `bool` | `false` | 是否强制刷新（默认 false，由微信按有效期返回） |

### fetchPlain()

```php
public function fetchPlain()
```

请求微信普通版接口获取 access_token（不写入缓存）

注意：普通版接口会使同一账号此前获取的 access_token 立即失效，
多实例/多进程场景请优先使用 fetch()（稳定版）。

### set()

```php
public function set($accessToken, $expiresAt = null)
```

直接注入 access_token 与过期时间（不写入进程内共享缓存）

适用于从其他来源（如自有缓存、外部系统）恢复 token 的场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$accessToken` | `string|null` | — | access_token |
| `$expiresAt` | `int|null` | `null` | 过期时间（Unix 时间戳，秒），不传时视为未过期 |

### expiresAt()

```php
public function expiresAt($data = null)
```

读写一体：获取或设置当前实例的 access_token 过期时间

传入参数时为设置，并返回当前实例以支持链式调用；不传参数时返回当前过期时间。
外部注入 access_token 时应一并设置过期时间，否则将被视为未过期。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `int|null` | `null` | 待设置的过期时间（Unix 时间戳，秒） |

### isExpired()

```php
public function isExpired()
```

判断当前实例的 access_token 是否为空或已进入提前刷新窗口

### isExpiresAtExpired()

```php
public function isExpiresAtExpired($expiresAt)
```

判断指定过期时间是否已进入提前刷新窗口

提前 REFRESH_AHEAD 秒即视为过期；未记录过期时间（null/0）时视为未过期。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$expiresAt` | `int|null` | — | 过期时间（Unix 时间戳，秒） |

## 非公开方法

**protected**

- `protected function cache($accessToken, $expiresAt)` —— 写入当前实例与进程内共享缓存，并返回 token（内部使用）
- `protected function readStore()` —— 从 wechat_accounts 表读取本账号的 access_token（内部使用）
- `protected function writeStore($accessToken, $expiresAt)` —— 将 access_token 写入 wechat_accounts 表（内部使用）
- `protected function request()` —— 获取 CURL 客户端（内部使用）

## 同目录

- [Wechat](/php/api/modules/wechat/wechat)
- [WechatAccount](/php/api/modules/wechat/wechat-account)
- [WechatApi](/php/api/modules/wechat/wechat-api)
- [WechatProvider](/php/api/modules/wechat/wechat-provider)

