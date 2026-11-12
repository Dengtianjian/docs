# Zip

`kernel\Foundation\FileSystem\Zip`  ·  class

源码：`gstudio_kernel/Foundation/FileSystem/Zip.php`

> ZIP 压缩/解压工具

## 声明

```php
class Zip
```

## 概述

基于 PHP 内置 ZipArchive 的目录打包与解压封装：
- zipDirectory() / pack()：将目录递归打包为 zip，支持忽略名单排除、压缩等级配置；
- unzip() / extract()：解压 zip 到指定目录，内置 zip slip（路径穿越）防护、
解压大小/文件数上限（防 zip bomb）、符号链接策略；
- isZip()：快速校验文件是否为合法 zip。

忽略名单规则（ignore，默认 [".git", "README.md"]）：
- 普通条目按文件名精确匹配（任意层级同名即排除，如 .git、README.md）；
- 含通配符（*、?、[]）的条目按 fnmatch 对文件名匹配（如 *.md）。

同时提供实例链式调用（setCompressionLevel/exclude）与静态无状态入口
（pack/extract，选项数组传入，不依赖实例状态）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$ignore` | `array` | `[ ".git", "README.md" ]` | 打包忽略名单：普通条目精确匹配文件名，含通配符的条目 fnmatch 匹配 |
| `$compressionLevel` | `integer` | `-1` | 压缩等级：-1 使用 ZipArchive 默认，0-9 为 DEFLATE 压缩等级 |
| `$maxExtractSize` | `integer` | `0` | 解压后总大小上限（字节），0 表示不限制（防 zip bomb） |
| `$maxExtractFiles` | `integer` | `0` | 解压文件数上限，0 表示不限制（防 zip bomb） |
| `$preserveSymlinks` | `boolean` | `false` | 解压时是否保留符号链接条目：false 时跳过符号链接（防止链接指向目标目录外） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$ignoreFileNames` | `array` | protected | 精确匹配的忽略文件名（每次打包前重置，仅对本次打包生效） |
| `$ignoreWildcards` | `array` | protected | 通配符忽略项（fnmatch 模式，仅对本次打包生效） |
| `$lastError` | `string|null` | protected | 最近一次操作的错误信息（成功或未操作时为 null） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`setCompressionLevel()`](#setcompressionlevel) | 配置压缩等级（链式） |
| [`exclude()`](#exclude) | 追加忽略条目（链式，去重合并进 ignore） |
| [`lastError()`](#lasterror) | 获取最近一次操作的错误信息 |
| [`isZip()`](#iszip) | 快速校验文件是否为合法 zip（magic bytes） |
| [`zipDirectory()`](#zipdirectory) | 将目录递归打包为 zip |
| [`unzip()`](#unzip) | 解压 zip 到指定目录 |
| [`pack()`](#pack) | 静态快捷打包：将目录递归打包为 zip（无状态入口） |
| [`extract()`](#extract) | 静态快捷解压：解压 zip 到指定目录（无状态入口） |

### setCompressionLevel()

```php
public function setCompressionLevel($level)
```

配置压缩等级（链式）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$level` | `integer` | — | -1 使用默认，0-9 为 DEFLATE 压缩等级 |

### exclude()

```php
public function exclude(array $names)
```

追加忽略条目（链式，去重合并进 ignore）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `array` | — | 文件名或 fnmatch 通配符（如 [".svn", "*.log"]） |

### lastError()

```php
public function lastError()
```

获取最近一次操作的错误信息

### isZip()

```php
public function isZip($path)
```

快速校验文件是否为合法 zip（magic bytes）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 待校验文件路径 |

### zipDirectory()

```php
public function zipDirectory($sourcePath, $outputPath)
```

将目录递归打包为 zip

目录不存在返回 false；打包过程中忽略名单内条目（任意层级）会被跳过。
失败原因可通过 lastError() 读取。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourcePath` | `string` | — | 源目录路径 |
| `$outputPath` | `string` | — | 输出 zip 文件路径（已存在则覆盖） |

### unzip()

```php
public function unzip(string $filePath, string $dest)
```

解压 zip 到指定目录

目标目录不存在会自动创建（0755）。内置多重防护：
- zip slip：含 ".."、绝对路径（/ 或盘符开头）的条目直接拒绝；
- 目标目录越界：解压目标 realpath 必须在 $dest 之内；
- zip bomb：解压总大小 / 文件数超过 maxExtractSize / maxExtractFiles 上限即中止；
- 符号链接：preserveSymlinks 为 false（默认）时跳过链接条目。
失败原因可通过 lastError() 读取。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | zip 文件路径 |
| `$dest` | `string` | — | 解压目标目录 |

### pack()

```php
public static function pack($sourcePath, $outputPath, array $options = [])
```

静态快捷打包：将目录递归打包为 zip（无状态入口）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourcePath` | `string` | — | 源目录路径 |
| `$outputPath` | `string` | — | 输出 zip 文件路径 |
| `$options` | `array` | `[]` | 选项：ignore（追加忽略名单）、compressionLevel（压缩等级 -1~9） |

### extract()

```php
public static function extract($filePath, $dest, array $options = [])
```

静态快捷解压：解压 zip 到指定目录（无状态入口）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | zip 文件路径 |
| `$dest` | `string` | — | 解压目标目录 |
| `$options` | `array` | `[]` | 选项：maxExtractSize（解压总大小上限，0 不限）、 |

## 非公开方法

**private**

- `private function extractWithGuard($zip, $dest)` —— 守卫式解压（内部辅助）
- `private function matchIgnoreFileName($fileName, $basePath = null)`
- `private function directoryToZip($zip, $directory, $removedLength, $root = true)` —— 递归遍历目录并写入 zip（内部辅助）

## 同目录

- [FileHelper](/php/api/foundation/filesystem/file-helper)
- [FileSystem](/php/api/foundation/filesystem/file-system)
- [Path](/php/api/foundation/filesystem/path)

