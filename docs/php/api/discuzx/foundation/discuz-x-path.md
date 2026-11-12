# DiscuzXPath

`kernel\DiscuzX\Foundation\DiscuzXPath`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/DiscuzXPath.php`

> DiscuzX 平台路径（[Path](/php/api/foundation/filesystem/path) 的 DiscuzX 实现）

## 声明

```php
class DiscuzXPath extends Path
```

父类：[Path](/php/api/foundation/filesystem/path)

## 概述

kernel 以**插件**形式运行在 DiscuzX 中，目录布局与「独立项目」不同。本类继承 [Path](/php/api/foundation/filesystem/path)，
在需要改变语义的方法上覆盖父类实现，父类没有对应概念的目录以新方法补充。
全部为纯静态 getter：实时推导、无缓存、无副作用、不定义任何常量。

## 覆盖情况一览

| 父类方法 | 是否覆盖 | DiscuzX 取值 |
|---|---|---|
| `project` | 否（父类已含 DiscuzX 分支） | `DISCUZ_ROOT` 去尾斜杠 |
| `kernel` | 否（与部署位置无关，永远正确） | `{project}/source/plugin/gstudio_kernel` |
| `root` | 否（父类推导在插件布局下恰好正确） | `{project}/source/plugin/{appId}` |
| `kernelDir` | 否（父类推导正确） | `source/plugin/gstudio_kernel` |
| `data` | **是** | `{root()}/Data` |
| `storage` | **是** | `{pluginData()}/Storage`（用户文件放 Discuz data 下，不写进插件目录） |
| `dir` | **是** | `source/plugin/{appId}` |
| `join` / `optimizedPath` | 否（与平台无关） | — |
| `relativePath` | 否（父类为 `protected`，本类直接继承使用） | — |

## 新增方法（父类无对应概念）

| 方法 | 含义 | DiscuzX 取值 |
|---|---|---|
| `plugin` | 插件目录（绝对路径） | `{project}/source/plugin` |
| `pluginDir` | 插件目录（相对路径，相对项目根） | `source/plugin` |
| `pluginData` | 本插件的数据目录（Discuz 插件数据惯例） | `{project}/data/plugindata/{appId}` |

## 使用前提（重要）

PHP 的静态方法调用按**书写时的类名**解析，不存在运行期「路径提供者替换」：
kernel 内部（`Log`、`Provisioner`、`LocalStorage`、`FileSystem` 等）写的是 `Path::data()`，
**不会**因为存在本子类而改走这里。因此本类的覆盖只对**显式调用 `DiscuzXPath::xxx()`** 的
代码（本模块内）生效；若要让 kernel 内部也走 DiscuzX 语义，需要 kernel 侧提供可替换的
路径解析层。

## 使用方式

```php
DiscuzXPath::pluginData(); // {project}/data/plugindata/{appId}
DiscuzXPath::storage();    // {project}/data/plugindata/{appId}/Storage
DiscuzXPath::data();       // {project}/source/plugin/{appId}/Data
DiscuzXPath::dir();        // source/plugin/{appId}
DiscuzXPath::plugin();     // {project}/source/plugin
DiscuzXPath::pluginDir();  // source/plugin
```

## 示例

```php
DiscuzXPath::pluginData(); // {project}/data/plugindata/{appId}
DiscuzXPath::storage();    // {project}/data/plugindata/{appId}/Storage
DiscuzXPath::data();       // {project}/source/plugin/{appId}/Data
DiscuzXPath::dir();        // source/plugin/{appId}
DiscuzXPath::plugin();     // {project}/source/plugin
DiscuzXPath::pluginDir();  // source/plugin
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`data()`](#data) | 应用数据目录（绝对路径）—— 覆盖 `Path::data` |
| [`pluginData()`](#plugindata) | 本插件的数据目录（绝对路径） |
| [`storage()`](#storage) | 本插件的存储目录（绝对路径）—— 覆盖 `Path::storage` |
| [`dir()`](#dir) | 应用目录（相对路径，相对项目根）—— 覆盖 `Path::dir` |
| [`plugin()`](#plugin) | 插件目录（绝对路径） |
| [`pluginDir()`](#plugindir) | 插件目录（相对路径，相对项目根） |

### data()

```php
public static function data($appId = null)
```

应用数据目录（绝对路径）—— 覆盖 `Path::data`

DiscuzX 下应用根即插件目录（`{project}/source/plugin/{appId}`），因此取值落在插件目录内。
按 Discuz 惯例存放、且会随插件升级被覆盖的数据请改用 `pluginData`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 应用 ID，不传取默认应用（必须保留该参数，否则与父类签名不兼容） |

### pluginData()

```php
public static function pluginData()
```

本插件的数据目录（绝对路径）

按 Discuz 插件数据惯例放在站点 data 目录下，即 `data/plugindata/{appId}` ——
该位置不在插件目录内，插件升级 / 重装不会影响里面的文件。

### storage()

```php
public static function storage()
```

本插件的存储目录（绝对路径）—— 覆盖 `Path::storage`

取 `pluginData` 的 `Storage` 子目录，即把用户上传的文件放 Discuz data 下，
而不是写进会被升级覆盖的插件目录。

### dir()

```php
public static function dir()
```

应用目录（相对路径，相对项目根）—— 覆盖 `Path::dir`

供需要把应用位置拼进 URL / 模板引用的场景使用。

### plugin()

```php
public static function plugin(): string
```

插件目录（绝对路径）

返回：`string` —— string 形如 `{project}/source/plugin`

### pluginDir()

```php
public static function pluginDir(): string
```

插件目录（相对路径，相对项目根）

供需要把插件目录拼成 URL / 相对引用的场景使用。

返回：`string` —— string 固定为 `source/plugin`

## 同目录

- [DiscuzXApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzXController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzXDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzXGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzXHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzXLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzXResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzXView](/php/api/discuzx/foundation/discuz-x-view)

