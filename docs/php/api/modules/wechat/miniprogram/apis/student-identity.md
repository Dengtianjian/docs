# StudentIdentity

`kernel\Modules\Wechat\Miniprogram\Apis\StudentIdentity`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Miniprogram/Apis/StudentIdentity.php`

> 微信学生身份快速验证

## 声明

```php
class StudentIdentity extends WechatMiniProgramApi
```

父类：[WechatMiniProgramApi](/php/api/modules/wechat/miniprogram/wechat-mini-program-api)

## 概述

对应微信「微信学生身份快速验证」分类。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`quickCheckStudentIdentity()`](#quickcheckstudentidentity) | 快速获取学生身份（POST /intp/quickcheckstudentidentity） |

### quickCheckStudentIdentity()

```php
public function quickCheckStudentIdentity($data = [])
```

快速获取学生身份（POST /intp/quickcheckstudentidentity）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | `[]` | 请求体，字段（如 name、id_card 等）以官方文档为准 |

## 同目录

- [Employment](/php/api/modules/wechat/miniprogram/apis/employment)
- [Nearby](/php/api/modules/wechat/miniprogram/apis/nearby)
- [Search](/php/api/modules/wechat/miniprogram/apis/search)
- [User](/php/api/modules/wechat/miniprogram/apis/user)
- [UserLogin](/php/api/modules/wechat/miniprogram/apis/user-login)

