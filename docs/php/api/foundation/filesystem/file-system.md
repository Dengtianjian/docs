# FileSystem

`kernel\Foundation\FileSystem\FileSystem`  ·  class

源码：`gstudio_kernel/Foundation/FileSystem/FileSystem.php`

> 文件系统总管理

## 声明

```php
class FileSystem
```

## 概述

负责文件系统的基础文件动作：上传、创建、复制、移动、删除、读取，以及目录的克隆 / 清空 / 复制。

职责边界（本类只做「实际文件动作」，不含磁盘与鉴权）：
- 路径推导与拼接 → `Path`（root / data / storage / join / optimizedPath）
- 文件类型判断与目录扫描 → `FileHelper`（isImage、scandir 等）
- 带多磁盘、签名鉴权、元信息落库的存储门面 → [StorageModule](/php/api/modules/storage/storage-module)

约定：
- 全部方法均为**静态**，本类不持有任何状态（无静态属性、无缓存）；构造函数只做一件事：
确保当前应用的 `Data` / `Storage` 目录存在，因此 App 在 `defineConstants()` 之后
`new FileSystem()` 即可（未实例化 App 时会跳过，见 `ensureDirectories`）；
- 路径参数会经 `Path::optimizedPath` 规范化 —— 仅把 `/` 与 `\` 统一为当前系统的目录分隔符，
**不解析** `..` / `.`、不做 realpath、也不校验存在性，故相对路径按「当前工作目录」解释；
- 失败处理有两种风格：多数方法用返回值表达失败（见各方法 `@return`），
只有 `upload` 直接抛 [Error](/php/api/foundation/exception/error)。

## 相关

- `Path` 路径推导与规范化
- `FileHelper` 文件类型判断与目录扫描

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 无参构造，由 App 在 defineConstants() 之后实例化；构造时确保 data/storage 目录存在 |
| [`upload()`](#upload) | 上传（保存）文件 |
| [`cloneDirectory()`](#clonedirectory) | 克隆目录 |
| [`createFile()`](#createfile) | 创建文件 |
| [`deleteDirectory()`](#deletedirectory) | 删除目录及其所有子文件和子目录 |
| [`clearFolder()`](#clearfolder) | 清空文件夹内的所有内容（保留文件夹本身） |
| [`copyFolder()`](#copyfolder) | 复制文件夹到目标目录 |
| [`getFileInfo()`](#getfileinfo) | 获取文件信息 |
| [`exists()`](#exists) | 判断文件是否存在 |
| [`deleteFile()`](#deletefile) | 删除单个文件 |
| [`readFile()`](#readfile) | 读取文件内容 |
| [`copyFile()`](#copyfile) | 复制单个文件 |
| [`moveFile()`](#movefile) | 移动或重命名文件 |
| [`ensureDirectory()`](#ensuredirectory) | 确保目录存在 |
| [`fileSize()`](#filesize) | 获取文件大小（带错误处理） |

### __construct()

```php
public function __construct()
```

无参构造，由 App 在 defineConstants() 之后实例化；构造时确保 data/storage 目录存在

构造函数本身不保存任何状态，仅触发 `ensureDirectories` 的目录准备，
因此不存在「先 new 再调用」的时序要求 —— 所有方法都是静态的。

### upload()

```php
public static function upload($file, $savePath, $fileName = null)
```

上传（保存）文件

支持两种来源：
1. **`$_FILES` 单文件数组**（需含 `error` / `tmp_name` / `name`，走 `move_uploaded_file()` 落盘）；
2. **本地文件路径字符串**（CLI 临时文件、已下载到本地的文件等，走 `copy()` 落盘，
并在复制成功后 **unlink 源文件** —— 是「搬运」语义，源文件会消失，别把还想保留的文件传进来）。

落盘位置：`$savePath` 有值时落到 `Path::join($savePath, 保存文件名)`，否则落到当前工作目录；
保存文件名取 `$fileName`（缺省为 `uniqid()`）；**显式传入 `$fileName` 时扩展名以它为准**
（传入的文件名没带扩展名，保存后的文件也就没有扩展名），未传时沿用源文件名的扩展名。

返回值（保存后的名字 / 路径 + 原始信息；图片额外带宽高）：
```php
[
"name"         => "65f2c1a8b9.png",              // 保存后的文件名（不含目录）
"sourceFileName" => "avatar.png",                // 原始文件名
"path"         => "upload/2026",                 // 保存目录（经 optimizedPath）；未指定 $savePath 时为 null
"extension"    => "png",
"size"         => 20480,                         // 字节
"width"        => 128,                           // 非图片为 0（注意不是 null）
"height"       => 128,
"filePath"     => "upload/2026/65f2c1a8b9.png",  // 完整文件路径
]
```

使用示例：
```php
// 处理表单上传
$fileInfo = FileSystem::upload($_FILES['file'], Path::storage("upload/2026"));
echo $fileInfo['filePath'];   // 取得完整路径后交给存储层/模型

// 搬运本地临时文件（源文件会被删除）
FileSystem::upload('/tmp/export.csv', 'export/2026', 'users.csv');
```

```php
[
"name"         => "65f2c1a8b9.png",              // 保存后的文件名（不含目录）
"sourceFileName" => "avatar.png",                // 原始文件名
"path"         => "upload/2026",                 // 保存目录（经 optimizedPath）；未指定 $savePath 时为 null
"extension"    => "png",
"size"         => 20480,                         // 字节
"width"        => 128,                           // 非图片为 0（注意不是 null）
"height"       => 128,
"filePath"     => "upload/2026/65f2c1a8b9.png",  // 完整文件路径
]
```

```php
// 处理表单上传
$fileInfo = FileSystem::upload($_FILES['file'], Path::storage("upload/2026"));
echo $fileInfo['filePath'];   // 取得完整路径后交给存储层/模型

// 搬运本地临时文件（源文件会被删除）
FileSystem::upload('/tmp/export.csv', 'export/2026', 'users.csv');
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array|string` | — | `$_FILES` 单文件数组，或已存在的本地文件路径字符串 |
| `$savePath` | `string` | — | 保存目录；目录不存在时按 **0755** 递归创建。 |
| `$fileName` | `string|null` | `null` | 指定保存文件名（可含扩展名，扩展名以它为准）；不传则用 `uniqid()` |

可能抛出：

- [Error](/php/api/foundation/exception/error) 以下情况会抛出（第三参为业务错误码）：

### cloneDirectory()

```php
public static function cloneDirectory($sourcePath, $destPath)
```

克隆目录

将源目录下的所有文件和子目录递归复制到目标目录。
目标目录不存在时会自动创建。

与 `copyFolder` 的区别：本方法更「轻」——**没有**白名单、**没有**失败回滚，
且单个文件复制失败不会中断整体流程（`copy()` 的结果未被检查，也不返回成功与否）。
需要「跳过指定文件」或「失败即回滚」时请用 `copyFolder`。

使用示例：
```php
// 将 templates/default 克隆到 themes/newtheme
FileSystem::cloneDirectory('/path/to/templates/default', '/path/to/themes/newtheme');
```

```php
// 将 templates/default 克隆到 themes/newtheme
FileSystem::cloneDirectory('/path/to/templates/default', '/path/to/themes/newtheme');
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourcePath` | `string` | — | 被克隆的目录路径（不存在时静默返回，不报错） |
| `$destPath` | `string` | — | 克隆到的目标目录路径，不存在时自动创建（权限 0755） |

### createFile()

```php
public static function createFile($filePath, $fileContent = "", $overwrite = false)
```

创建文件

在指定路径创建文件并写入内容。父目录不存在时会自动创建（权限 0755）。

覆盖策略（`$overwrite`）：
- `false`（默认）：文件已存在时**直接返回 true**，不写入、不改动原文件
（判定用的是 `file_exists()`，所以同名目录也会命中并返回 true）；
- `true`：以 `w+` 打开并覆盖写入（内容被截断后重写）。

使用示例：
```php
// 创建新文件
FileSystem::createFile('/path/to/newfile.txt', 'Hello World');

// 覆盖已存在的文件
FileSystem::createFile('/path/to/existing.txt', 'New Content', true);
```

```php
// 创建新文件
FileSystem::createFile('/path/to/newfile.txt', 'Hello World');

// 覆盖已存在的文件
FileSystem::createFile('/path/to/existing.txt', 'New Content', true);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径（包含文件名和扩展名） |
| `$fileContent` | `string` | `""` | 写入的文件内容，默认为空字符串 |
| `$overwrite` | `boolean` | `false` | 是否覆盖已存在的文件。true=覆盖，false=跳过（当文件已存在时直接返回 true） |

### deleteDirectory()

```php
public static function deleteDirectory($path)
```

删除目录及其所有子文件和子目录

递归删除指定目录下的所有内容，最后删除目录本身。
**注意：删除后无法恢复，请谨慎使用。**

删除过程中单个文件/目录的失败（`unlink()` / `rmdir()`）用 `@` 抑制错误、不中断流程；
返回值以「最终目标目录是否还在」为准，因此部分删除失败时也可能返回 false 但目录已被清空。

使用示例：
```php
// 删除临时目录
FileSystem::deleteDirectory('/path/to/temp');
```

```php
// 删除临时目录
FileSystem::deleteDirectory('/path/to/temp');
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 要删除的目录路径 |

### clearFolder()

```php
public static function clearFolder($targetPath, $whiteList = [])
```

清空文件夹内的所有内容（保留文件夹本身）

递归删除指定文件夹内的所有文件和子文件夹，但保留该文件夹本身。
可通过 $whiteList 参数指定不删除的路径。

白名单按**完整路径精确匹配**（`in_array()` 全等比较），并在递归中继续生效：
命中白名单的文件/目录会被整体跳过（目录不会被清空、也不会被删除）。
子目录清空且 `rmdir()` 成功后会被删除，只有 `$targetPath` 本身始终保留。

使用示例：
```php
// 清空缓存目录，但保留 index.html
FileSystem::clearFolder('/path/to/cache', ['/path/to/cache/index.html']);
```

```php
// 清空缓存目录，但保留 index.html
FileSystem::clearFolder('/path/to/cache', ['/path/to/cache/index.html']);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetPath` | `string` | — | 被清除的文件夹路径 |
| `$whiteList` | `array` | `[]` | 清除时跳过的白名单。数组元素必须是完整的文件/目录路径（包含 $targetPath 前缀），例如 $targetPath 为 "a/b" 时，白名单元素为 "a/b/c/d" 则会跳过路径为 a/b/c/d 的文件或目录 |

### copyFolder()

```php
public static function copyFolder($targetPath, $destPath, $whiteList = [])
```

复制文件夹到目标目录

将指定目录下的所有文件和子目录复制到目标目录。
目标目录不存在时会自动创建。复制过程中任一文件失败时，
会自动回滚（删除已复制的内容）。

使用示例：
```php
// 复制主题文件夹，跳过配置文件
$whiteList = ['/themes/newtheme/config.php'];
FileSystem::copyFolder('/themes/default', '/themes/newtheme', $whiteList);
```

```php
// 复制主题文件夹，跳过配置文件
$whiteList = ['/themes/newtheme/config.php'];
FileSystem::copyFolder('/themes/default', '/themes/newtheme', $whiteList);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetPath` | `string` | — | 被复制的目录路径 |
| `$destPath` | `string` | — | 复制到的目标目录路径 |
| `$whiteList` | `array` | `[]` | 路径白名单。数组元素必须是完整的文件/目录路径（包含 $destPath 前缀），在白名单中的路径会被跳过不复制 |

### getFileInfo()

```php
public static function getFileInfo($filePath)
```

获取文件信息

返回文件的综合信息，包括名称、路径、扩展名、大小以及图片的宽高等。
对于图片文件，会自动获取宽高尺寸。

与 `upload` 的区别：入参必须是**已存在的本地文件路径**（否则返回 false），
且不做任何移动/复制；返回结构中非图片的 `width` / `height` 为 `null`（`upload()` 里是 `0`）。

使用示例：
```php
$info = FileSystem::getFileInfo('/storage/avatars/user_123.jpg');
echo $info['size'];   // 文件大小（字节）
echo $info['width'];  // 图片宽度，非图片时为 null
```

```php
$info = FileSystem::getFileInfo('/storage/avatars/user_123.jpg');
echo $info['size'];   // 文件大小（字节）
echo $info['width'];  // 图片宽度，非图片时为 null
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

### exists()

```php
public static function exists($filePath)
```

判断文件是否存在

对传入路径做规范化后，调用 PHP 内置 file_exists 判断文件是否存在。
与 `getFileInfo`/`readFile`/`fileSize` 不同，本方法只关心存在性，
不读取内容、不获取元信息，失败原因单一（不存在即返回 false）。

使用示例：
```php
if (FileSystem::exists('/storage/avatars/user_123.jpg')) {
// 文件存在，执行后续逻辑
}
```

```php
if (FileSystem::exists('/storage/avatars/user_123.jpg')) {
// 文件存在，执行后续逻辑
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

### deleteFile()

```php
public static function deleteFile($filePath)
```

删除单个文件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

### readFile()

```php
public static function readFile($filePath)
```

读取文件内容

使用 file_get_contents 读取文件的全部内容（一次性读入内存，适合配置/模板等小文件；
大文件请自行分块读取，本方法不加文件锁）。

使用示例：
```php
$content = FileSystem::readFile('/path/to/config.json');
if ($content !== false) {
$config = json_decode($content, true);
}
```

```php
$content = FileSystem::readFile('/path/to/config.json');
if ($content !== false) {
$config = json_decode($content, true);
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

### copyFile()

```php
public static function copyFile($sourcePath, $destPath, $overwrite = false)
```

复制单个文件

将源文件复制到目标路径。目标目录不存在时会自动创建（权限 0755）。
当 $overwrite 为 false 且目标文件已存在时，不会覆盖。

使用示例：
```php
// 复制文件（不覆盖已存在的目标文件）
FileSystem::copyFile('/path/to/source.txt', '/path/to/dest.txt');

// 复制并覆盖目标文件
FileSystem::copyFile('/path/to/source.txt', '/path/to/dest.txt', true);
```

```php
// 复制文件（不覆盖已存在的目标文件）
FileSystem::copyFile('/path/to/source.txt', '/path/to/dest.txt');

// 复制并覆盖目标文件
FileSystem::copyFile('/path/to/source.txt', '/path/to/dest.txt', true);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourcePath` | `string` | — | 源文件完整路径 |
| `$destPath` | `string` | — | 目标文件完整路径 |
| `$overwrite` | `boolean` | `false` | 是否覆盖已存在的目标文件。true=覆盖，false=目标存在时返回 false |

### moveFile()

```php
public static function moveFile($sourcePath, $destPath, $overwrite = false)
```

移动或重命名文件

将源文件移动到目标路径。目标目录不存在时会自动创建。
移动操作等同于重命名操作——源文件在操作成功后不再存在。
当 $overwrite 为 true 且目标文件已存在时，会先删除目标文件再移动。

使用示例：
```php
// 重命名文件
FileSystem::moveFile('/path/to/oldname.txt', '/path/to/newname.txt');

// 移动文件到另一个目录
FileSystem::moveFile('/path/to/file.txt', '/another/path/file.txt');

// 移动并覆盖目标文件
FileSystem::moveFile('/path/to/source.txt', '/path/to/dest.txt', true);
```

```php
// 重命名文件
FileSystem::moveFile('/path/to/oldname.txt', '/path/to/newname.txt');

// 移动文件到另一个目录
FileSystem::moveFile('/path/to/file.txt', '/another/path/file.txt');

// 移动并覆盖目标文件
FileSystem::moveFile('/path/to/source.txt', '/path/to/dest.txt', true);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$sourcePath` | `string` | — | 源文件完整路径 |
| `$destPath` | `string` | — | 目标文件完整路径 |
| `$overwrite` | `boolean` | `false` | 是否覆盖已存在的目标文件。true=先删除目标再移动，false=目标存在时返回 false |

### ensureDirectory()

```php
public static function ensureDirectory($path, $permissions = 0755)
```

确保目录存在

如果目录不存在，则递归创建目录。如果目录已存在，直接返回 true。

使用示例：
```php
// 确保日志目录存在
FileSystem::ensureDirectory('/var/log/myapp');

// 指定目录权限
FileSystem::ensureDirectory('/data/uploads', 0775);
```

```php
// 确保日志目录存在
FileSystem::ensureDirectory('/var/log/myapp');

// 指定目录权限
FileSystem::ensureDirectory('/data/uploads', 0775);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$path` | `string` | — | 目录完整路径 |
| `$permissions` | `integer` | `0755` | 目录权限（八进制），默认 0755；**仅在新建时生效**， |

### fileSize()

```php
public static function fileSize($filePath)
```

获取文件大小（带错误处理）

先检查文件是否存在，再获取大小。相比直接调用 PHP 内置的 filesize()，
此方法提供了存在性检查和路径规范化。

使用示例：
```php
$size = FileSystem::fileSize('/path/to/file.txt');
if ($size !== false) {
echo '文件大小: ' . FileHelper::humanReadableSize($size);
}
```

```php
$size = FileSystem::fileSize('/path/to/file.txt');
if ($size !== false) {
echo '文件大小: ' . FileHelper::humanReadableSize($size);
}
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件完整路径 |

## 非公开方法

**private**

- `private static function ensureDirectories()` —— 确保当前应用的 data/storage 目录存在，不存在则递归创建

## 同目录

- [FileHelper](/php/api/foundation/filesystem/file-helper)
- [Path](/php/api/foundation/filesystem/path)
- [Zip](/php/api/foundation/filesystem/zip)

