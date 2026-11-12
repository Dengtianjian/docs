# QCloudCosDeleteObjectTagging

`kernel\Modules\QCloud\QCloudCos\Object\Tag\QCloudCosDeleteObjectTagging`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/Tag/QCloudCosDeleteObjectTagging.php`

> DELETE Object tagging（删除对象标签）的输入容器

**无方法**

## 声明

```php
class QCloudCosDeleteObjectTagging extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`DELETE /＜ObjectKey＞?tagging`。

⚠️ **本接口没有专用请求头，也没有请求体** —— 因此除基类能力（容器方法，以及继承来的
ACL/标签 trait 方法——它们在 DELETE 场景**不会生效**）之外不新增方法；保留它是为了让
标签这一组的三接口（PUT / GET / DELETE）与 `Object/Tag` 目录一一对应。成功返回 **204**（无内容）；
失败为 404（对象不存在）或 403（无权限）。

文档核对状态：**待核对**（"无专用请求头"依据通用实践整理，尚未逐条对官方 DELETE Object tagging 页面）。

## 方法

本类没有公开方法。

## 同目录

- [QCloudCosGetObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-get-object-tagging)
- [QCloudCosObjectTagTrait](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-object-tag-trait)
- [QCloudCosPutObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-put-object-tagging)

