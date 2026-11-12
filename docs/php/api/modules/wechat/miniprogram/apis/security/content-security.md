# ContentSecurity

`kernel\Modules\Wechat\Miniprogram\Apis\Security\ContentSecurity`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/Security/ContentSecurity.php`

> 内容安全

## 声明

```php
class ContentSecurity extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「小程序安全 → 内容安全」分类，用于检测文本、图片、音频内容是否违规。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getLabelText()`](#getlabeltext) | 内容安全结果标签对应文案 |
| [`msgSecCheck()`](#msgseccheck) | 文本内容安全识别（POST /wxa/msg_sec_check） |
| [`mediaCheckAsync()`](#mediacheckasync) | 多媒体内容安全识别（POST /wxa/media_check_async） |

### getLabelText()

```php
public function getLabelText($label)
```

内容安全结果标签对应文案

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$label` | `int` | — | 检测结果中的 label 值 |

### msgSecCheck()

```php
public function msgSecCheck($content, $openId, $scene = 2)
```

文本内容安全识别（POST /wxa/msg_sec_check）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$content` | `string` | — | 需检测的文本内容，上限 2500 字，需 UTF-8 编码 |
| `$openId` | `string` | — | 用户的 openid（用户需在近两小时访问过小程序） |
| `$scene` | `int` | `2` | 场景枚举值（1 资料；2 评论；3 论坛；4 社交日志） |

### mediaCheckAsync()

```php
public function mediaCheckAsync($mediaUrl, $openId, $scene = 2, $mediaType = 2)
```

多媒体内容安全识别（POST /wxa/media_check_async）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$mediaUrl` | `string` | — | 要检测的图片或音频的 url，支持 jpg/jpeg/png/bmp/gif（取首帧）与 mp3/aac/ac3/wma/flac/vorbis/opus/wav |
| `$openId` | `string` | — | 用户的 openid（用户需在近两小时访问过小程序） |
| `$scene` | `int` | `2` | 场景枚举值（1 资料；2 评论；3 论坛；4 社交日志） |
| `$mediaType` | `int` | `2` | 1 音频；2 图片 |

## 同目录

- [RiskControl](/php/api/modules/wechat/miniprogram/apis/security/risk-control)
- [Security](/php/api/modules/wechat/miniprogram/apis/security/security)

