# Material

`kernel\Modules\Wechat\OfficialAccount\Apis\Material\Material`  ·  class

源码：`gstudio_kernel/Modules/Wechat/OfficialAccount/Apis/Material/Material.php`

> 素材管理（聚合类）

## 声明

```php
class Material extends WechatOfficialAccountApi
```

父类：[WechatOfficialAccountApi](/php/api/modules/wechat/officialaccount/wechat-official-account-api)

## 概述

聚合微信「素材管理」分类下的接口，按子域拆分为多个子类：
- 临时素材：`TemporaryMaterial`（media_id 有效期 3 天）
- 永久素材：`PermanentMaterial`（长期保存，有数量上限）

使用示例：

```php
$oa->material()->temporary()->upload("image", "/path/a.jpg");
$oa->material()->permanent()->addNews($articles);
```

## 示例

```php
$oa->material()->temporary()->upload("image", "/path/a.jpg");
$oa->material()->permanent()->addNews($articles);
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`temporary()`](#temporary) | 临时素材相关接口 |
| [`permanent()`](#permanent) | 永久素材相关接口 |

### temporary()

```php
public function temporary()
```

临时素材相关接口

### permanent()

```php
public function permanent()
```

永久素材相关接口

## 同目录

- [PermanentMaterial](/php/api/modules/wechat/officialaccount/apis/material/permanent-material)
- [TemporaryMaterial](/php/api/modules/wechat/officialaccount/apis/material/temporary-material)

