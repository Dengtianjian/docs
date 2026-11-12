# Path

`kernel\Foundation\FileSystem\Path`  ·  class

源码：`gstudio_kernel/Foundation/FileSystem/Path.php`

> 路径体系（纯路径计算，无副作用）

## 声明

```php
class Path
```

## 概述

集中管理当前应用的目录路径推导，与文件操作解耦。全部为静态 getter，
每次调用自动计算，无任何静态属性、无缓存。

7 个路径 getter：
kernel        = 本类文件所在目录（内核目录，永远正确，无需任何外部输入）
project       = DiscuzX 平台取 DISCUZ_ROOT（去尾斜杠），否则为 kernel 的上级目录
root          = kernel 同级目录下的 {默认应用 ID}
data          = root/Data
storage       = root/Storage
kernelDir/dir = kernel/root 相对 project 的路径

依赖默认应用 ID 的 getter（root/data/storage/dir）在尚未登记任何 App
（Applications::defaultId() 为 null）时返回 null。

非 final，可被继承扩展；getter 均为 public static，便于子类重写。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`project()`](#project) | 根目录（绝对路径） |
| [`kernel()`](#kernel) | 内核根目录（绝对路径） |
| [`appRoot()`](#approot) | 指定应用的根目录（绝对路径），默认 {kernel 同级目录}/{appId} |
| [`root()`](#root) | 当前应用根目录（绝对路径），默认 {kernel 同级目录}/{默认应用 ID} |
| [`configs()`](#configs) | 指定应用的配置目录（绝对路径），即 appRoot/Configs |
| [`data()`](#data) | 指定应用的数据目录（绝对路径），默认 appRoot/Data |
| [`storage()`](#storage) | 应用存储目录（绝对路径），默认 appRoot/Storage |
| [`kernelDir()`](#kerneldir) | 内核目录（相对路径），即 kernel 相对 project 的路径 |
| [`dir()`](#dir) | 应用目录（相对路径），即 appRoot 相对 root 的路径 |
| [`join()`](#join) | 组合多个路径段为一个完整路径 |
| [`optimizedPath()`](#optimizedpath) | 优化路径分隔符 |

### project()

```php
public static function project()
```

根目录（绝对路径）

DiscuzX 平台返回 DISCUZ_ROOT（去尾斜杠）；普通项目返回内核目录的上级目录。

### kernel()

```php
public static function kernel()
```

内核根目录（绝对路径）

即本类所在目录，与 kernelId、部署位置无关，永远正确。

### appRoot()

```php
public static function appRoot($appId = null)
```

指定应用的根目录（绝对路径），默认 {kernel 同级目录}/{appId}

与 `root` 的区别：这里能明确指定「哪个应用」。多应用共存时
`root()` 取的是默认应用，而 `appRoot($app->appId())` 取的是调用方自己那份
（配置目录、数据目录都靠它定位）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 应用 ID，不传取默认应用 |

### root()

```php
public static function root()
```

当前应用根目录（绝对路径），默认 {kernel 同级目录}/{默认应用 ID}

### configs()

```php
public static function configs($appId = null)
```

指定应用的配置目录（绝对路径），即 appRoot/Configs

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 应用 ID，不传取默认应用 |

### data()

```php
public static function data($appId = null)
```

指定应用的数据目录（绝对路径），默认 appRoot/Data

与 `configs` / `storage` 一样支持指定应用：多应用同进程时
传 `$app->appId()` 才能拿到调用方自己那份，不传永远取默认应用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | `null` | 应用 ID，不传取默认应用 |

### storage()

```php
public static function storage()
```

应用存储目录（绝对路径），默认 appRoot/Storage

### kernelDir()

```php
public static function kernelDir()
```

内核目录（相对路径），即 kernel 相对 project 的路径

### dir()

```php
public static function dir()
```

应用目录（相对路径），即 appRoot 相对 root 的路径

### join()

```php
public static function join(...$paths)
```

组合多个路径段为一个完整路径

自动过滤空路径段，并规范化路径分隔符为当前系统的 DIRECTORY_SEPARATOR。
适用于跨平台路径拼接。

使用示例：
```php
self::join('/var/www', 'app', 'config.php');
// Linux:   "/var/www/app/config.php"
// Windows: "\var\www\app\config.php"
```

```php
self::join('/var/www', 'app', 'config.php');
// Linux:   "/var/www/app/config.php"
// Windows: "\var\www\app\config.php"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$paths` | `...string` | — | 可变数量的路径段 |

### optimizedPath()

```php
public static function optimizedPath($path)
```

优化路径分隔符

将路径中的 "/" 与 "\" 统一替换为当前运行系统的 DIRECTORY_SEPARATOR。
已从 FileHelper 迁移至此，作为路径规范化的统一入口。

使用示例：
```php
Path::optimizedPath('path/to\\file.txt');
// Linux:   "path/to/file.txt"
// Windows: "path\to\file.txt"
```

```php
Path::optimizedPath('path/to\\file.txt');
// Linux:   "path/to/file.txt"
// Windows: "path\to\file.txt"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 需要优化的路径字符串 |

## 非公开方法

**protected**

- `protected static function relativePath(string $path, string $base): string` —— 求 $path 相对 $base（绝对路径前缀）的路径

## 同目录

- [FileHelper](/php/api/foundation/filesystem/file-helper)
- [FileSystem](/php/api/foundation/filesystem/file-system)
- [Zip](/php/api/foundation/filesystem/zip)

