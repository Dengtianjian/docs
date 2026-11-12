# FileHelper

`kernel\Foundation\FileSystem\FileHelper`  ·  class

源码：`gstudio_kernel/Foundation/FileSystem/FileHelper.php`

> 文件操作辅助类

## 声明

```php
class FileHelper
```

## 概述

提供文件类型判断、路径处理、目录扫描、格式化等底层工具方法。
所有方法均为静态方法，无需实例化。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`isVideo()`](#isvideo) | 判断指定的文件是否是视频文件 |
| [`isImage()`](#isimage) | 判断指定的文件是否是图片文件 |
| [`isAudio()`](#isaudio) | 判断指定的文件是否是音频文件 |
| [`getMimeType()`](#getmimetype) | 获取文件的 MIME 类型 |
| [`extension()`](#extension) | 获取文件扩展名（不含点号） |
| [`combinedFilePath()`](#combinedfilepath) | 组合多个路径段为一个完整路径 |
| [`scandir()`](#scandir) | 扫描目录 |
| [`recursionScanDir()`](#recursionscandir) | 递归扫描目录 |
| [`compareDirectories()`](#comparedirectories) | 深度比较两个目录是否相等 |
| [`humanReadableSize()`](#humanreadablesize) | 将字节数格式化为人类可读的大小字符串 |
| [`maxUploadSize()`](#maxuploadsize) | 获取 PHP 配置允许的最大上传文件大小 |

### isVideo()

```php
public static function isVideo($fileName)
```

判断指定的文件是否是视频文件

通过 MIME 类型判断，该文件必须存在且可读。

使用示例：
```php
if (FileHelper::isVideo('/path/to/video.mp4')) {
// 处理视频文件
}
```

```php
if (FileHelper::isVideo('/path/to/video.mp4')) {
// 处理视频文件
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件完整路径（包含文件名和扩展名） |

### isImage()

```php
public static function isImage($fileName)
```

判断指定的文件是否是图片文件

通过 MIME 类型判断，该文件必须存在且可读。

使用示例：
```php
if (FileHelper::isImage('/path/to/photo.png')) {
// 处理图片文件
}
```

```php
if (FileHelper::isImage('/path/to/photo.png')) {
// 处理图片文件
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件完整路径（包含文件名和扩展名） |

### isAudio()

```php
public static function isAudio($filePath)
```

判断指定的文件是否是音频文件

通过 MIME 类型判断，该文件必须存在且可读。

使用示例：
```php
if (FileHelper::isAudio('/path/to/music.mp3')) {
// 处理音频文件
}
```

```php
if (FileHelper::isAudio('/path/to/music.mp3')) {
// 处理音频文件
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径（包含文件名和扩展名） |

### getMimeType()

```php
public static function getMimeType($filePath)
```

获取文件的 MIME 类型

通过 PHP 内置的 mime_content_type 获取文件 MIME 类型。
在进行文件类型判断时，推荐使用 isImage()、isVideo()、isAudio() 等方法。

使用示例：
```php
$mime = FileHelper::getMimeType('/path/to/file.pdf');
// 返回: "application/pdf"
```

```php
$mime = FileHelper::getMimeType('/path/to/file.pdf');
// 返回: "application/pdf"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

### extension()

```php
public static function extension($path)
```

获取文件扩展名（不含点号）

使用示例：
```php
FileHelper::extension('/path/to/file.txt');   // "txt"
FileHelper::extension('archive.tar.gz');      // "gz"
FileHelper::extension('noextension');         // ""
```

```php
FileHelper::extension('/path/to/file.txt');   // "txt"
FileHelper::extension('archive.tar.gz');      // "gz"
FileHelper::extension('noextension');         // ""
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 文件路径或文件名 |

### combinedFilePath()

```php
public static function combinedFilePath(...$paths)
```

组合多个路径段为一个完整路径

自动过滤空路径段，并规范化路径分隔符为当前系统的 DIRECTORY_SEPARATOR。
适用于跨平台路径拼接。

使用示例：
```php
FileHelper::combinedFilePath('/var/www', 'app', 'config.php');
// Linux:   "/var/www/app/config.php"
// Windows: "\var\www\app\config.php"
```

```php
FileHelper::combinedFilePath('/var/www', 'app', 'config.php');
// Linux:   "/var/www/app/config.php"
// Windows: "\var\www\app\config.php"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$paths` | `...string` | — | 可变数量的路径段 |

::: warning 已废弃
使用 PATH::join()
:::

### scandir()

```php
public static function scandir($targetPath, $sortingOrder = 0, $context = null)
```

扫描目录

对 PHP 内置 scandir() 的增强封装，自动过滤掉 "." 和 ".."，
并使用 array_values 重新索引结果数组。

使用示例：
```php
$files = FileHelper::scandir('/path/to/directory');
// 返回: ['file1.txt', 'file2.txt', 'subdir']  不包含 "." 和 ".."

// 降序排列
$files = FileHelper::scandir('/path/to/directory', 1);
```

```php
$files = FileHelper::scandir('/path/to/directory');
// 返回: ['file1.txt', 'file2.txt', 'subdir']  不包含 "." 和 ".."

// 降序排列
$files = FileHelper::scandir('/path/to/directory', 1);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetPath` | `string` | — | 被扫描的目录路径 |
| `$sortingOrder` | `integer` | `0` | 排序方式。0=升序（默认），1=降序 |
| `$context` | `mixed|null` | `null` | 流上下文资源，参见 PHP Streams API 文档 |

### recursionScanDir()

```php
public static function recursionScanDir($rootDir, $parentDir = null, $includeRootDir = false)
```

递归扫描目录

深度遍历目标目录及其所有子目录，返回所有文件的路径列表。
支持返回绝对路径或相对路径。

使用示例：
```php
// 获取所有文件的相对路径
$files = FileHelper::recursionScanDir('/path/to/project');
// 返回: ['src/App.php', 'src/Config.php', 'public/index.php', ...]

// 获取所有文件的绝对路径
$files = FileHelper::recursionScanDir('/path/to/project', null, true);
// 返回: ['/path/to/project/src/App.php', ...]

// 指定父级路径前缀
$files = FileHelper::recursionScanDir('/path/to/project/src', 'project');
// 返回: ['project/App.php', 'project/Config.php', ...]
```

```php
// 获取所有文件的相对路径
$files = FileHelper::recursionScanDir('/path/to/project');
// 返回: ['src/App.php', 'src/Config.php', 'public/index.php', ...]

// 获取所有文件的绝对路径
$files = FileHelper::recursionScanDir('/path/to/project', null, true);
// 返回: ['/path/to/project/src/App.php', ...]

// 指定父级路径前缀
$files = FileHelper::recursionScanDir('/path/to/project/src', 'project');
// 返回: ['project/App.php', 'project/Config.php', ...]
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rootDir` | `string` | — | 被扫描的根目录路径 |
| `$parentDir` | `string|null` | `null` | 父级路径前缀。传入字符串时会作为路径前缀添加到结果中，传入 null 或 false 时仅使用文件自身名称作为路径 |
| `$includeRootDir` | `boolean` | `false` | 是否在结果中包含根目录路径。true=返回绝对路径，false=返回相对路径或仅文件名 |

### compareDirectories()

```php
public static function compareDirectories($targetPath, $sourcePath)
```

深度比较两个目录是否相等

递归扫描两个目录，比较目录结构（文件/子目录名称）是否完全相同。
注意：此方法仅比较文件名称，不比较文件内容。

使用示例：
```php
// 比较两个版本的模板目录结构
$equal = FileHelper::compareDirectories('/templates/v1', '/templates/v2');
```

```php
// 比较两个版本的模板目录结构
$equal = FileHelper::compareDirectories('/templates/v1', '/templates/v2');
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetPath` | `string` | — | 第一个目录路径 |
| `$sourcePath` | `string` | — | 第二个目录路径 |

### humanReadableSize()

```php
public static function humanReadableSize($bytes, $decimals = 2)
```

将字节数格式化为人类可读的大小字符串

自动选择合适的单位（B/KB/MB/GB/TB/PB）进行格式化。

使用示例：
```php
FileHelper::humanReadableSize(0);           // "0 B"
FileHelper::humanReadableSize(1024);        // "1 KB"
FileHelper::humanReadableSize(1536000);     // "1.46 MB"
FileHelper::humanReadableSize(1536000, 0);  // "1 MB"
```

```php
FileHelper::humanReadableSize(0);           // "0 B"
FileHelper::humanReadableSize(1024);        // "1 KB"
FileHelper::humanReadableSize(1536000);     // "1.46 MB"
FileHelper::humanReadableSize(1536000, 0);  // "1 MB"
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$bytes` | `integer` | — | 字节数 |
| `$decimals` | `integer` | `2` | 小数位数，默认 2 |

### maxUploadSize()

```php
public static function maxUploadSize()
```

获取 PHP 配置允许的最大上传文件大小

取 php.ini 中 post_max_size 和 upload_max_filesize 的较小值作为结果。
可用于上传前的文件大小校验。

使用示例：
```php
$maxSize = FileHelper::maxUploadSize();
if ($fileSize > $maxSize) {
throw new \kernel\Foundation\Exception\Error('文件大小超出限制: ' . FileHelper::humanReadableSize($maxSize));
}
```

```php
$maxSize = FileHelper::maxUploadSize();
if ($fileSize > $maxSize) {
throw new \kernel\Foundation\Exception\Error('文件大小超出限制: ' . FileHelper::humanReadableSize($maxSize));
}
```

## 非公开方法

**private**

- `private static function parseIniSize($size)` —— 解析 PHP ini 大小字符串为字节数

## 同目录

- [FileSystem](/php/api/foundation/filesystem/file-system)
- [Path](/php/api/foundation/filesystem/path)
- [Zip](/php/api/foundation/filesystem/zip)

