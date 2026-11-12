# DiscuzXLang

`kernel\DiscuzX\Foundation\DiscuzXLang`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/DiscuzXLang.php`

> DiscuzX 语言包（静态注册表）

## 声明

```php
class DiscuzXLang
```

## 概述

给 DiscuzX 适配层提供一套 kernel 风格的语言读取能力：语言项按「路径」组织，
取用时以 `/` 分隔逐级下钻，例如 `DiscuzXLang::value("kernel/extension_list")`。
全部为静态方法，进程内共享一份字典，无实例、无缓存。

## 数据来源

语言包文件位于 `DiscuzX/Langs/{utf-8,gbk}.php`，按站点 `CHARSET` 二选一。
文件内部构造 `$langs` 数组并在末尾自行调用 `add` 完成注册，`load`
只负责把它引进来；文件若写成 `return 数组` 的形式，返回值同样会被注册。

## 加载时机

`DiscuzXApp::__construct` 在应用启动时按站点 `CHARSET` 加载 `utf-8` / `gbk`，
因此业务代码直接 `value` 即可，无需自己 `load`。

## 使用方式

```php
// 内核自带语言包在 kernel 下；第二个参数为基路径，默认 Path::root()（应用根）
DiscuzXLang::load("DiscuzX/Langs/utf-8", Path::kernel());

DiscuzXLang::value("kernel/extension_list");              // 单个文案
DiscuzXLang::value("common/save", "common/cancel");       // ["保存", "取消"]
DiscuzXLang::connect("common/symbol/colon", "welcome");   // "：欢迎"
```

## 注意事项

1. **没有默认值兜底**：键不存在时读取方法返回 null，不抛异常、也不回退到其它语言；
2. **`add` 是浅合并**：同名顶层键整体覆盖 —— 多个语言文件都含 `common` 子树时，
后加载的那份会顶掉先加载的整棵子树；
3. **键名不要带 `/`**：读取方法会把参数按 `/` 拆成键路径逐级下钻，带 `/` 的扁平键存进去也读不回来。

## 示例

```php
// 内核自带语言包在 kernel 下；第二个参数为基路径，默认 Path::root()（应用根）
DiscuzXLang::load("DiscuzX/Langs/utf-8", Path::kernel());

DiscuzXLang::value("kernel/extension_list");              // 单个文案
DiscuzXLang::value("common/save", "common/cancel");       // ["保存", "取消"]
DiscuzXLang::connect("common/symbol/colon", "welcome");   // "：欢迎"
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $langs` | `array` | `[]` | 语言字典（多维数组，按业务 / 模块分组） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`load()`](#load) | 加载语言包 |
| [`add()`](#add) | 注册语言项 |
| [`change()`](#change) | 覆盖单个语言项 |
| [`connect()`](#connect) | 拼接多个语言片段 |
| [`value()`](#value) | 取语言文案（最常用的读取入口） |
| [`all()`](#all) | 获取整份语言字典 |

### load()

```php
public static function load($filePath, $basePath = null)
```

加载语言包

把语言包文件引进来并完成注册，分两步：
1. 解析路径 —— `Path::join($basePath, $filePath)`，未写扩展名时自动补 `.php`；
**存在性判断与实际载入使用同一个解析结果**，文件不存在直接抛 [Error](/php/api/foundation/exception/error)，不会静默跳过；
2. 载入文件 —— 语言包文件末尾自行调用 `add` 完成注册；
若文件 `return` 了数组，返回值也在此注册。

由 `DiscuzXApp::__construct` 在应用启动时调用（内核自带语言包 → `$basePath = Path::kernel()`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 语言包路径，**相对于 `$basePath`**（可省略 `.php` 扩展名）。 |
| `$basePath` | `string|null` | `null` | 基路径，默认 `Path::root()`（应用根）；内核自带语言包位于 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 解析后的文件不存在时抛出（statusCode = 500、errorCode = `DiscuzXLang:500001`、

### add()

```php
public static function add($langs, $key = null)
```

注册语言项

两种用法：
- `add(["common" => [...]])`：批量注册，与已注册内容做**浅合并**（同名顶层键整体覆盖），
此时 `$key` 忽略；
- `add("保存", "save")`：写入单个键，`$key` 为键名。

键名**不要带 `/`**：`value` / `connect` 会把参数按 `/` 拆成键路径逐级下钻，
带 `/` 的扁平键存进去也读不回来。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$langs` | `array|mixed` | — | 语言数组（批量注册），或单个语言项的值 |
| `$key` | `string|null` | `null` | 单键写入时的键名；`$langs` 为数组时不生效 |

### change()

```php
public static function change($key, $value)
```

覆盖单个语言项

与 `add($value, $key)` 等价，语义更直观一些；键名同样不要带 `/`，原因见 `add`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 语言项键名 |
| `$value` | `mixed` | — | 语言项内容 |

### connect()

```php
public static function connect()
```

拼接多个语言片段

参数为一个或多个「`/` 分隔的键路径」，分别取值后**按参数顺序拼接成一个字符串**，
适合把「符号 + 文案」「前缀 + 正文」这类多段内容拼起来。

```php
DiscuzXLang::connect("common/symbol/colon", "welcome"); // "：欢迎"
```

```php
DiscuzXLang::connect("common/symbol/colon", "welcome"); // "：欢迎"
```

### value()

```php
public static function value($keys)
```

取语言文案（最常用的读取入口）

变参：每个参数是一条 `/` 分隔的键路径。
- 只传一个：返回该语言项的值（标量或子数组）；
- 传多个：返回按参数顺序排列的值数组。

```php
DiscuzXLang::value("kernel/extension_list");          // "扩展列表"
DiscuzXLang::value("common/save", "common/cancel");   // ["保存", "取消"]
```

```php
DiscuzXLang::value("kernel/extension_list");          // "扩展列表"
DiscuzXLang::value("common/save", "common/cancel");   // ["保存", "取消"]
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$keys` | `string` | — | 一个或多个键路径 |

### all()

```php
public static function all()
```

获取整份语言字典

返回按顶层键分组的原始多维结构（不做任何转换），可用于调试，
或自行下发给前端 / 写入缓存。

## 非公开方法

**private**

- `private static function getValue($keys)` —— 按键（或键路径）取值（内部方法）

## 同目录

- [DiscuzXApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzXController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzXDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzXGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzXHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzXPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzXResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzXView](/php/api/discuzx/foundation/discuz-x-view)

