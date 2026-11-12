# QCloudCosPutObjectTagging

`kernel\Modules\QCloud\QCloudCos\Object\Tag\QCloudCosPutObjectTagging`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/Tag/QCloudCosPutObjectTagging.php`

> PUT Object tagging（设置对象标签）的输入容器

## 声明

```php
class QCloudCosPutObjectTagging extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`PUT /＜ObjectKey＞?tagging`，输入是**请求体 XML**：
```xml
<Tagging><TagSet>
<Tag><Key>scene</Key><Value>avatar</Value></Tag>
<Tag><Key>env</Key><Value>prod</Value></Tag>
</TagSet></Tagging>
```

```php
$xml = (new QCloudCosPutObjectTagging())
->tags(["scene" => "avatar", "env" => "prod"])
->toXml();
```

要点：最多 **10** 个标签；`?tagging` 是**子资源** ⇒ 必须同时参与签名与出现在请求 URL 上；
覆盖语义（整份 TagSet 替换原标签）。**注意区分**：走请求头设置标签用的是 `x-cos-tagging`
（见 `QCloudCosObjectTagTrait::tagging`，主要用于上传时顺带打标），
那是"上传参数"，不是本接口的 TagSet 语义。

文档核对状态：**待核对**（XML 结构依据官方写法整理，尚未逐条对官方 PUT Object tagging 页面；
尤其"＜Key＞/＜Value＞ 是否需要 URL 编码"—— 请求头那侧官方明确要求编码，请求体这侧待确认）。

## 示例

```php
<Tagging><TagSet>
<Tag><Key>scene</Key><Value>avatar</Value></Tag>
<Tag><Key>env</Key><Value>prod</Value></Tag>
</TagSet></Tagging>
```

## 示例

```php
$xml = (new QCloudCosPutObjectTagging())
->tags(["scene" => "avatar", "env" => "prod"])
->toXml();
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `MAX_TAGS` | `10` | 单个对象允许的最大标签数（官方） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`tags()`](#tags) | 标签集合（**必选**：至少 1 个，最多 `MAX_TAGS` 个） |
| [`tag()`](#tag) | 设置标签（**两种调用方式都支持**） |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜Tagging＞＜TagSet＞…＜/TagSet＞＜/Tagging＞`） |

### tags()

```php
public function tags($tags = null)
```

标签集合（**必选**：至少 1 个，最多 `MAX_TAGS` 个）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tags` | `array|null` | `null` | 键值对；不传=读取 |

### tag()

```php
public function tag($key, $value = null)
```

设置标签（**两种调用方式都支持**）

- `tag(["scene" => "avatar", "env" => "prod"])` —— 整批并入；
- `tag("scene", "avatar")` —— 设单个标签，可链式多次。

⚠️ **为什么第二参必须可选**：基类 [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object) 通过
`QCloudCosObjectTagTrait` 已经带了 `tag(array $tags)`。本类这个同名方法若把第二参
写成必填（或把参数类型收窄），就**与父类签名不兼容**（PHP 会报
"Declaration … must be compatible with …"，且按父类约定调用 `tag([...])` 会直接
`ArgumentCountError`）⇒ 所以这里**放宽类型 + 第二参可选**，保持兼容。

⚠️ **语义差异**：在**本类**里，上面两种写法都写进**请求体 TagSet**（见 `toXml`）；
而基类 trait 的同名方法写的是 **`x-cos-tagging` 请求头**。本类专用于 `PUT Object tagging`
（XML 体），故沿用"写 TagSet"的语义 —— 要用请求头那条路请显式调
`QCloudCosObjectTagTrait::tagging`（或 `tagging("a=b")`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `array|string` | — | 标签键值对，或单个标签的键 |
| `$value` | `string|null` | `null` | 单个标签的值（`$key` 传数组时忽略） |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜Tagging＞＜TagSet＞…＜/TagSet＞＜/Tagging＞`）

用 `Arr::toXML` 拼：`Tag` 是列表 ⇒ 展开成重复的 `＜Tag＞` 子元素；字符串逐值转义。
未设置标签时返回空串。

## 同目录

- [QCloudCosDeleteObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-delete-object-tagging)
- [QCloudCosGetObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-get-object-tagging)
- [QCloudCosObjectTagTrait](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-object-tag-trait)

