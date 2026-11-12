# DiscuzXController

`kernel\DiscuzX\Foundation\DiscuzXController`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/DiscuzXController.php`

## 声明

```php
class DiscuzXController extends AuthController
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

- [DiscuzXApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzXDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzXGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzXHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzXLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzXPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzXResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzXView](/php/api/discuzx/foundation/discuz-x-view)

