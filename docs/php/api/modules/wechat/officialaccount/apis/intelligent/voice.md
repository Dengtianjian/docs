# Voice

`kernel\Modules\Wechat\OfficialAccount\Apis\Intelligent\Voice`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Intelligent/Voice.php`

> 智能接口 - 智能语音

## 声明

```php
class Voice extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

语音转文字为异步流程：先 addVoiceToRecoForText() 提交语音（$voiceId 由调用方生成，
用于后续查询），再轮询 queryRecoResultForText() 获取识别结果；另提供文本翻译接口。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addVoiceToRecoForText()`](#addvoicetorecofortext) | 提交语音识别任务（异步） |
| [`queryRecoResultForText()`](#queryrecoresultfortext) | 查询语音识别结果 |
| [`translateContent()`](#translatecontent) | 文本翻译 |

### addVoiceToRecoForText()

```php
public function addVoiceToRecoForText($voiceId, $filePath, $lang = "zh_CN", $format = "amr", $fileName = null)
```

提交语音识别任务（异步）

语音文件需为官方要求的格式（默认 amr，也可传 speex 等，以官方文档为准），
提交成功仅表示任务已受理，需再调用 queryRecoResultForText() 查询结果。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$voiceId` | `string` | — | 语音唯一标识（调用方自行生成，用于查询结果） |
| `$filePath` | `string` | — | 本地语音文件绝对路径 |
| `$lang` | `string` | `"zh_CN"` | 语言类型（zh_CN 等） |
| `$format` | `string` | `"amr"` | 语音格式，如 amr |
| `$fileName` | `string|null` | `null` | 上传文件名，默认取路径 basename |

### queryRecoResultForText()

```php
public function queryRecoResultForText($voiceId, $lang = "zh_CN")
```

查询语音识别结果

需在提交语音识别任务后调用；结果未就绪时微信返回对应状态，可稍后重试。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$voiceId` | `string` | — | 提交任务时的语音唯一标识 |
| `$lang` | `string` | `"zh_CN"` | 语言类型（zh_CN 等） |

### translateContent()

```php
public function translateContent($content, $lfrom, $lto)
```

文本翻译

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$content` | `string` | — | 待翻译的文本内容 |
| `$lfrom` | `string` | — | 源语言，如 zh_CN |
| `$lto` | `string` | — | 目标语言，如 en_US |

## 同目录

- [Intelligent](/php/api/modules/wechat/officialaccount/apis/intelligent/intelligent)
- [Semantic](/php/api/modules/wechat/officialaccount/apis/intelligent/semantic)

