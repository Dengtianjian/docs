# QCloudCosObjectTagTrait

`kernel\Modules\QCloud\QCloudCos\Object\Tag\QCloudCosObjectTagTrait`  ·  trait

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/Tag/QCloudCosObjectTagTrait.php`

> 对象标签（Tagging）请求头 / 字段的 get/set 方法组

## 声明

```php
trait QCloudCosObjectTagTrait
```

## 概述

以 **trait** 形式提供，供各操作的「输入容器」复用（PHP 单继承 ⇒ 只能靠 trait 组合）。
调用约定同 [AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)：
**不传值 = 读取**、**传值 = 设置**并返回 `$this`。

```php
$put->tag(["scene" => "avatar", "env" => "prod"]);   // → x-cos-tagging: scene=avatar&env=prod
$put->tagging();                                     // 读回原始值
```

依赖：使用方必须能访问 `$this->item($name, $args)`（由
[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object) 提供）。

规则（官方）：最多 **10** 个标签；`x-cos-tagging` 的 Key 与 Value **必须先 URL 编码**
（`tag` 会自动做）；`PUT Object - Copy` 里还有 `x-cos-tagging-directive`（`Copy` / `Replaced`），
那个属于复制语义，不在本 trait 里。

## 示例

```php
$put->tag(["scene" => "avatar", "env" => "prod"]);   // → x-cos-tagging: scene=avatar&env=prod
$put->tagging();                                     // 读回原始值
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`tagging()`](#tagging) | x-cos-tagging（对象标签集合，形如 `Key1=Value1&Key2=Value2`） |
| [`tag()`](#tag) | 便捷：设置对象标签（自动 URL 编码 Key/Value） |

### tagging()

```php
public function tagging($value = null)
```

x-cos-tagging（对象标签集合，形如 `Key1=Value1&Key2=Value2`）

最多 10 个标签；Key 与 Value **必须 URL 编码**（用 `tag` 可自动编码）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### tag()

```php
public function tag(array $tags)
```

便捷：设置对象标签（自动 URL 编码 Key/Value）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tags` | `array` | — | 标签键值对（最多 10 个） |

## 同目录

- [QCloudCosDeleteObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-delete-object-tagging)
- [QCloudCosGetObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-get-object-tagging)
- [QCloudCosPutObjectTagging](/php/api/modules/qcloud/qcloudcos/object/tag/q-cloud-cos-put-object-tagging)

