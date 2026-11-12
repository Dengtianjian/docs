# Link

`kernel\Modules\Wechat\Miniprogram\Apis\QrCodeAndLink\Link`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/QrCodeAndLink/Link.php`

> 小程序链接（URL Scheme / URL Link / Short Link）

## 声明

```php
class Link extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序码与小程序链接」分类下的 URL Scheme、URL Link、Short Link 三组接口。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`generateScheme()`](#generatescheme) | 获取加密 scheme 码（POST /wxa/generatescheme） |
| [`queryScheme()`](#queryscheme) | 查询 scheme 码（POST /wxa/queryscheme） |
| [`generateNfcScheme()`](#generatenfcscheme) | 获取 NFC 的小程序 scheme（POST /wxa/generatenfcscheme） |
| [`generateUrlLink()`](#generateurllink) | 获取加密 URLLink（POST /wxa/generate_urllink） |
| [`queryUrlLink()`](#queryurllink) | 查询加密 URLLink（POST /wxa/query_urllink） |
| [`generateShortLink()`](#generateshortlink) | 获取 Short Link（POST /wxa/genwxashortlink） |

### generateScheme()

```php
public function generateScheme($jumpWxa = [], $isExpire = false, $expireType = 0, $expireTime = null, $expireInterval = null)
```

获取加密 scheme 码（POST /wxa/generatescheme）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$jumpWxa` | `array` | `[]` | 打开的小程序信息，形如 ["path" => "pages/index/index", "query" => "", "env_version" => "release"] |
| `$isExpire` | `bool` | `false` | 生成的 scheme 码类型：false 永久有效，true 定时过期 |
| `$expireType` | `int` | `0` | 过期类型：0 间隔失效（$expireInterval），1 指定时间失效（$expireTime） |
| `$expireTime` | `int|null` | `null` | 到期失效的 scheme 码的失效时间（Unix 时间戳，秒） |
| `$expireInterval` | `int|null` | `null` | 到期失效的 scheme 码的失效间隔（秒） |

### queryScheme()

```php
public function queryScheme($scheme)
```

查询 scheme 码（POST /wxa/queryscheme）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$scheme` | `string` | — | 获取到的 scheme 码 |

### generateNfcScheme()

```php
public function generateNfcScheme($sn, $modelId, $jumpWxa = [])
```

获取 NFC 的小程序 scheme（POST /wxa/generatenfcscheme）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sn` | `string` | — | 设备 sn |
| `$modelId` | `string` | — | 设备 model_id |
| `$jumpWxa` | `array` | `[]` | 打开的小程序信息，形如 ["path" => "pages/index/index", "query" => "", "env_version" => "release"] |

### generateUrlLink()

```php
public function generateUrlLink($path, $query = "", $isExpire = false, $expireType = 0, $expireTime = null, $expireInterval = null, $cloudBase = null, $envVersion = "release")
```

获取加密 URLLink（POST /wxa/generate_urllink）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 通过 URL Link 进入的小程序页面路径，不能为空 |
| `$query` | `string` | `""` | 通过 URL Link 进入小程序时的 query 参数 |
| `$isExpire` | `bool` | `false` | 生成的 URL Link 类型：false 永久有效，true 定时过期 |
| `$expireType` | `int` | `0` | 过期类型：0 间隔失效（$expireInterval），1 指定时间失效（$expireTime） |
| `$expireTime` | `int|null` | `null` | 到期失效的 URL Link 的失效时间（Unix 时间戳，秒） |
| `$expireInterval` | `int|null` | `null` | 到期失效的 URL Link 的失效间隔（秒） |
| `$cloudBase` | `array|null` | `null` | 云开发静态网站自定义 H5 域名信息 |
| `$envVersion` | `string` | `"release"` | 打开的小程序版本：release / trial / develop |

### queryUrlLink()

```php
public function queryUrlLink($link)
```

查询加密 URLLink（POST /wxa/query_urllink）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$link` | `string` | — | 获取到的 url link |

### generateShortLink()

```php
public function generateShortLink($pageUrl, $pageTitle = null, $isPermanent = false)
```

获取 Short Link（POST /wxa/genwxashortlink）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pageUrl` | `string` | — | 通过 Short Link 进入的小程序页面路径，必须是已发布的小程序路径 |
| `$pageTitle` | `string|null` | `null` | Short Link 对应的页面标题 |
| `$isPermanent` | `bool` | `false` | 生成的 Short Link 类型：false 默认（30 天有效），true 永久有效 |

## 同目录

- [QrCode](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/qr-code)
- [QrCodeAndLink](/php/api/modules/wechat/miniprogram/apis/qrcodeandlink/qr-code-and-link)

