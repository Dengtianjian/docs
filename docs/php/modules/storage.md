# 存储

存储模块负责「文件从哪来、存到哪、怎么访问」，把多块磁盘（本地 / COS / OSS / FTP）收在一个门面后面。

```
Modules/Storage/
├── Storage.php          门面：Storage::put()
├── StorageModule.php    实现：磁盘池、文件元信息、签名、访问控制
├── StorageProvider.php  装配：建磁盘池、登记、configure 钩子
├── StorageFile.php  StorageSignature.php  StorageURL.php  FilesModel.php
└── Drivers/             LocalStorage · FTPStorage · AbstractObjectStorage …
```

## 装配

```php
$this->app()->make(\kernel\Modules\Storage\StorageProvider::class);
```

内核的 `StorageProvider` 是**兜底实现**：只有一块本地盘、不落库、不开签名。真实装配由应用继承它覆写两个钩子：

```php
class StorageProvider extends \kernel\Modules\Storage\StorageProvider
{
  protected function drivers()
  {
    return [
      "local" => new AppLocalStorage(),
      "cos"   => new QCloudCOSStorage($this->app()->qcloud()->account("main")),
    ];
  }

  protected function configure(Storage $storage)
  {
    $storage->enableDataSave();                    // 文件元信息写入 files 表
    $storage->accessControl(true, function () {
      return Auth::userId();                       // 谁能读：登录用户
    }, true);
    $storage->registerRoute("file");               // 注册 /file/{key} 读取路由
  }
}
```

磁盘列表的**第一块是默认盘**。

## 基本操作

```php
$key = Storage::put($file);                 // 上传：返回文件 key
$key = Storage::put($file, "cover.png");    // 指定文件名
$key = Storage::save($file, "a/b/c.png");   // 指定保存路径

Storage::get($key);                         // 读取内容
Storage::exists($key);                      // 是否存在
Storage::delete($key);                      // 删除
Storage::url($key);                         // 访问地址（带签名）
Storage::direct($key, [], 1800);            // 直链（自定义有效期）
```

## 访问控制

| 常量 | 含义 |
|---|---|
| `StorageModule::PUBLIC_READ` | 公开可读 |
| `StorageModule::AUTHENTICATED_READ` | 登录可读（默认） |
| `StorageModule::PRIVATE` | 仅所有者 / 授权方可读 |

```php
Storage::updateAccessControl($key, StorageModule::PUBLIC_READ);
Storage::checkAccessControl($key, $authTag, $ownerId, "read");
```

## 签名与防盗链

```php
$url = Storage::url($key);                     // 已带签名
Storage::verifySignature($key, $query, $headers, "get", $action);
Storage::verifyRequestSignature($key, $silent = false);
```

签名包含：key、过期时间、HTTP 方法、可选的自定义参数，由 `StorageSignature` 生成与校验。

## 多磁盘

```php
Storage::disks();           // 全部磁盘
Storage::disk("cos");       // 取某块
Storage::use("cos");        // 切换当前磁盘（后续操作走它）
```

## 跨应用

文件默认归属装配它的应用：`files` 表名、落盘目录、签名密钥都跟着那个应用。别的应用要用就 `import`：

```php
$this->app()->import(StorageModule::class, "gstudio_super_app", "storage");
```

## 文件模型

`FilesModel` 存元信息：key、原始名、大小、扩展名、MIME、宽高、所有者、访问级别、所属磁盘。开启 `enableDataSave()` 后由存储模块自动维护。
