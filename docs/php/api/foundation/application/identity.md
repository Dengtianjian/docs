# Identity

`kernel\Foundation\Application\Identity`  ·  class

源码：`gstudio_kernel/Foundation/Application/Identity.php`

> 应用身份解析

## 声明

```php
class Identity
```

## 概述

把「对象 / 类名 / 命名空间字符串」解析成应用 ID（等于应用目录名）。
本类只做解析、不持有状态：规则是取命名空间第一段；DiscuzX 宿主下目录名统一带
`gstudio_` 前缀而命名空间不带，按 `DiscuzXApp::exists`（宿主常量 `IN_DISCUZ`）判断后补前缀。
判断只看宿主常量、不依赖是否已建应用实例，早期自动加载阶段也能得到正确结果。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`fromNamespace()`](#fromnamespace) | 通过类名 / 对象 / 命名空间字符串解析所属应用的 ID（appId） |

### fromNamespace()

```php
public static function fromNamespace($class)
```

通过类名 / 对象 / 命名空间字符串解析所属应用的 ID（appId）

入参支持三种形态，统一归一为「完整类名」后取命名空间第一段作为 appId：
- 对象：`get_class()` 取完整类名；
- 类名字符串（含命名空间，如 `gstudio_download\Services\DownloadFileService`）；
- 纯命名空间字符串（如 `gstudio_super_app\Model`）。

命名空间第一段即应用 ID（目录名）：
- `gstudio_download\Services\DownloadFileService` → `gstudio_download`
- `gstudio_super_app\Models\SuperAppFilesModel`  → `gstudio_super_app`
- `kernel\Foundation\...`                        → `kernel`（由 DiscuzX 环境补前缀）

用途：子系统复用主系统的类时，kernel 内部需要按「某个类所属的应用」而非「默认应用」
来决定表名前缀、签名密钥、URL 的 id 参数等。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `object|string` | — | 对象、完整类名或命名空间字符串 |

## 同目录

- [Application](/php/api/foundation/application/application)
- [Applications](/php/api/foundation/application/applications)
- [Container](/php/api/foundation/application/container)

