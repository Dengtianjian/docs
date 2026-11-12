# Language

`kernel\Support\Language`  ·  class

源码：`gstudio_kernel/Support/Language.php`

> 语言字典

## 声明

```php
class Language
```

## 概述

无状态的静态工具类：只维护「语言代码 → 语言名称」的映射，不依赖应用、不进容器、
直接 `Language::getAll()` 调用。与 `Services/` 的区别就在这里——那边是被 Provider
登记、经容器取用的有生命周期服务，这边则是纯静态支撑类。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $languages` | `array` | `[ "zh" => "中文", "en" => "英语", "yue" => "`… | 语言代码 → 语言名称 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`getAll()`](#getall) | 全部语言 |
| [`getOne()`](#getone) | 指定语言的名称 |
| [`add()`](#add) | 追加 / 覆盖一种语言 |

### getAll()

```php
public static function getAll()
```

全部语言

### getOne()

```php
public static function getOne($langEng)
```

指定语言的名称

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$langEng` | `string` | — | 语言代码（如 "zh"、"en"） |

### add()

```php
public static function add($langEng, $langName)
```

追加 / 覆盖一种语言

只改进程内的字典，不落库、不写文件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$langEng` | `string` | — | 语言代码 |
| `$langName` | `string` | — | 语言名称 |

## 同目录

- [Output](/php/api/support/output)
- [Result](/php/api/support/result)

