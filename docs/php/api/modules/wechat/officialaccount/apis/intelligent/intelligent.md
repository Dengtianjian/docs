# Intelligent

`kernel\Modules\Wechat\OfficialAccount\Apis\Intelligent\Intelligent`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Intelligent/Intelligent.php`

> 智能接口（聚合类）

## 声明

```php
class Intelligent extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

聚合微信「智能接口」分类下的接口，按子域拆分为多个子类：
- 语义理解：`Semantic`
- 智能语音（语音转文字、文本翻译）：`Voice`

使用示例：

```php
$oa->intelligent()->semantic()->search("查一下明天从北京到上海的机票", "flight");
$oa->intelligent()->voice()->queryRecoResultForText($voiceId);
```

## 示例

```php
$oa->intelligent()->semantic()->search("查一下明天从北京到上海的机票", "flight");
$oa->intelligent()->voice()->queryRecoResultForText($voiceId);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`semantic()`](#semantic) | 语义理解相关接口 |
| [`voice()`](#voice) | 智能语音相关接口（语音转文字、文本翻译） |

### semantic()

```php
public function semantic()
```

语义理解相关接口

### voice()

```php
public function voice()
```

智能语音相关接口（语音转文字、文本翻译）

## 同目录

- [Semantic](/php/api/modules/wechat/officialaccount/apis/intelligent/semantic)
- [Voice](/php/api/modules/wechat/officialaccount/apis/intelligent/voice)

