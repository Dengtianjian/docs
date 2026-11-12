# Output

`kernel\Support\Output`  ·  class

源码：`gstudio_kernel/Support/Output.php`

> 输出工具

## 声明

```php
class Output
```

## 概述

提供调试输出（debug/backtrace）、打印（printContent）、
格式化输出（format）与格式化字符串（string）。

format() 输出 HTML ＜pre＞ 适合 HTTP 场景；CLI 场景应优先用
string() 取纯文本，避免 HTML 标签污染。isCli() 可感知运行环境。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`debug()`](#debug) | 调试输出并终止脚本 |
| [`backtrace()`](#backtrace) | 输出调用堆栈并终止脚本 |
| [`printContent()`](#printcontent) | 打印内容到标准输出 |
| [`format()`](#format) | 将数据以 HTML ＜pre＞ 形式输出（兼容 HTTP 场景） |
| [`string()`](#string) | 将数据格式化为字符串（不含 HTML 标签，CLI/HTTP 通用） |
| [`isCli()`](#iscli) | 是否为 CLI 运行环境 |

### debug()

```php
public static function debug(...$data)
```

调试输出并终止脚本

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `...mixed` | — | — |

### backtrace()

```php
public static function backtrace($options = DEBUG_BACKTRACE_IGNORE_ARGS, $limit = 0)
```

输出调用堆栈并终止脚本

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$options` | `int` | `DEBUG_BACKTRACE_IGNORE_ARGS` | debug_backtrace 选项 |
| `$limit` | `int` | `0` | 返回的最大帧数，0 表示不限制 |

### printContent()

```php
public static function printContent($outputString, ...$value)
```

打印内容到标准输出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$outputString` | `mixed` | — | — |
| `$value` | `...mixed` | — | — |

### format()

```php
public static function format(...$data)
```

将数据以 HTML ＜pre＞ 形式输出（兼容 HTTP 场景）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `...mixed` | — | — |

### string()

```php
public static function string(...$data)
```

将数据格式化为字符串（不含 HTML 标签，CLI/HTTP 通用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `...mixed` | — | — |

### isCli()

```php
public static function isCli()
```

是否为 CLI 运行环境

## 非公开方法

**private**

- `private static function wrapHtml($content)` —— 用 ＜pre＞ 包裹字符串（内部辅助）

## 同目录

- [Language](/php/api/support/language)
- [Result](/php/api/support/result)

