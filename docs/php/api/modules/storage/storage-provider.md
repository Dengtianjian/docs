# StorageProvider

`kernel\Modules\Storage\StorageProvider`  ·  class

源码：`gstudio_kernel/Modules/Storage/StorageProvider.php`

> 文件存储装配

## 声明

```php
class StorageProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造即装配：用 `drivers` 给的磁盘列表建 `Storage`，登记成应用单例
（业务契约键 + 短名 `storage`），再交给 `configure` 收尾。

内核的默认实现是**兜底**：一块本地盘、不开签名、不落库，作用只是保证任何应用
`$app->make(StorageModule::class)` 都有东西可用。真实装配由应用侧继承本类：

```php
class StorageProvider extends \kernel\Modules\Storage\StorageProvider
{
protected function drivers()
{
return ["local" => new AppLocalStorage(), "cos" => ...];
}

protected function configure(StorageModule $storage)
{
$storage->enableDataSave();
$storage->registerRoute("upload");
}
}
```

存储默认不对外开放：文件中心归装配它的应用，别的应用要用由它 expose()、使用方 import()。

## 示例

```php
class StorageProvider extends \kernel\Modules\Storage\StorageProvider
{
protected function drivers()
{
return ["local" => new AppLocalStorage(), "cos" => ...];
}

protected function configure(StorageModule $storage)
{
$storage->enableDataSave();
$storage->registerRoute("upload");
}
}
```

## 相关

- `Storage`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配：建存储 → 登记成应用单例 → 交给 configure() 收尾 |

### __construct()

```php
public function __construct()
```

构造即装配：建存储 → 登记成应用单例 → 交给 configure() 收尾

注意构造期间就会调用 `drivers` 与 `configure`：子类若另有属性参与计算，
必须先于 `parent::__construct()` 就绪。

## 非公开方法

**protected**

- `protected function drivers()` —— 磁盘列表（别名 => 驱动）
- `protected function configure(StorageModule $storage)` —— 装配收尾

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [Storage](/php/api/modules/storage/storage)
- [StorageFile](/php/api/modules/storage/storage-file)
- [StorageModule](/php/api/modules/storage/storage-module)
- [StorageSignature](/php/api/modules/storage/storage-signature)
- [StorageURL](/php/api/modules/storage/storage-url)

