# DiscuzController

`kernel\Discuz\Foundation\DiscuzController`  ·  class

源码：`gstudio_kernel/Discuz/Foundation/DiscuzController.php`

## 声明

```php
class DiscuzController extends AuthController
```

父类：[AuthController](/php/api/foundation/controller/auth-controller)

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$forumhash` | `bool` | `false` | 是否需要校验 Discuz 的 formhash（防 CSRF），由子类覆盖为 true 开启 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`verifyFormhash()`](#verifyformhash) | — |

### verifyFormhash()

```php
public function verifyFormhash()
```

## 同目录

- [DiscuzApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzView](/php/api/discuzx/foundation/discuz-x-view)

