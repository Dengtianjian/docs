# 文件系统

`kernel\Foundation\FileSystem` 四件套，职责边界清晰：

- `Path` —— 只做路径推导（不碰磁盘）；
- `FileSystem` —— 实际文件动作（读/写/删/复制/上传）；
- `FileHelper` —— 类型判断 / 目录扫描 / 大小格式化；
- `Zip` —— 打包解压（带 zip slip / zip bomb 防护）。

## 路径 Path

```php
use kernel\Foundation\FileSystem\Path;

Path::project();        // 项目根目录
Path::kernel();         // 内核目录
Path::root();           // 默认应用根目录
Path::appRoot("gstudio_download");   // 指定应用根目录
Path::configs();        // appRoot/Configs
Path::data();           // appRoot/Data
Path::storage();        // appRoot/Storage

Path::join("/var/www", "app", "config.php");   // "/var/www/app/config.php"
Path::optimizedPath("a\\b/c");                 // 统一分隔符
```

## 读写 FileSystem（全静态）

```php
use kernel\Foundation\FileSystem\FileSystem;

FileSystem::createFile("/tmp/a.txt", "Hello");     // 创建
$content = FileSystem::readFile("/tmp/a.txt");     // 读（string|false）
FileSystem::exists("/tmp/a.txt");                  // 存在
FileSystem::copyFile("/tmp/a.txt", "/tmp/b.txt");  // 复制
FileSystem::moveFile("/tmp/a.txt", "/tmp/b.txt");  // 移动
FileSystem::deleteFile("/tmp/a.txt");              // 删除

FileSystem::ensureDirectory("/tmp/upload", 0755);  // 确保目录存在
FileSystem::cloneDirectory("/tmp/a", "/tmp/b");    // 递归复制目录
FileSystem::deleteDirectory("/tmp/b");             // 删除目录
FileSystem::clearFolder("/tmp/upload", ["keep.txt"]);   // 清目录（白名单）
```

## 上传

```php
$fileInfo = FileSystem::upload($_FILES["file"], Path::storage("upload/2026"));
echo $fileInfo["filePath"];
```

`upload()` 接受 `$_FILES` 数组或本地路径字符串。

## FileHelper 常用

```php
use kernel\Foundation\FileSystem\FileHelper;

FileHelper::isImage("a.png");
FileHelper::getMimeType("a.png");
FileHelper::extension("a.png");                     // "png"
FileHelper::humanReadableSize(1536);                // "1.50 KB"
FileHelper::maxUploadSize();
FileHelper::scandir("/tmp");                        // 扫描目录
FileHelper::recursionScanDir("/tmp");               // 递归扫描
```

## Zip

```php
use kernel\Foundation\FileSystem\Zip;

Zip::pack("/source", "/out.zip");          // 打包
Zip::extract("/out.zip", "/dest");         // 解压

$zip = new Zip();
$zip->exclude(["cache", "*.log"]);         // 排除
$zip->zipDirectory("/source", "/out.zip");
$zip->unzip("/out.zip", "/dest");
```
