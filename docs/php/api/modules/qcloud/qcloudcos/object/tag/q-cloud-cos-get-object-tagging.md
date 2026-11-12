# QCloudCosGetObjectTagging

`kernel\Modules\QCloud\QCloudCos\Object\Tag\QCloudCosGetObjectTagging`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/Tag/QCloudCosGetObjectTagging.php`

> GET Object tagging（读取对象标签）的输入容器

**无方法**

## 声明

```php
class QCloudCosGetObjectTagging extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`GET /＜ObjectKey＞?tagging`。

⚠️ **本接口没有专用请求头，也没有请求体** —— 因此本类除基类能力外不新增方法；保留它是为了让
标签这一组的三个接口（PUT / GET / DELETE）与目录结构一一对应。
结果在**响应体 XML** 里（`＜Tagging＞＜TagSet＞＜Tag＞＜Key/>＜Value/>＜/Tag＞…＜/TagSet＞＜/Tagging＞`）。

排障提示：响应里 `＜TagSet＞` 为空 ⇒ 该对象没有标签（不要与"没有权限"混淆，后者是 403 + `AccessDenied`）。

文档核对状态：**待核对**（"无专用请求头"这一结论依据通用实践整理，尚未逐条对官方 GET Object tagging 页面）。

## 方法

本类没有公开方法。

## 同目录

- [QCloudCosDeleteObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-delete-object-tagging)
- [QCloudCosObjectTagTrait](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-object-tag-trait)
- [QCloudCosPutObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-put-object-tagging)

