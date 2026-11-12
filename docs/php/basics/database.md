# 数据库

`Foundation/Database` 分两层：

- **RDB**：`Model` / `ModelBuilder` / `Query` / `Schema` / `Table` / `Paginator`，支持 PDO 与 SQLite 驱动；
- **MongoDB**：同一套查询风格的另一套实现。

## 连接

```php
use kernel\Foundation\Database\RDB\DB;

DB::connection("default");          // 具名连接
DB::getConnection();                // 当前连接
DB::table("user");                  // 快速得到表对象
```

连接由应用装配期登记（DiscuzX 环境由 `DiscuzXDatabase` 自动配置），`Connections::getDrivers()` 可用来判断「现在有没有可用连接」——安装阶段通常没有。

## 模型

```php
namespace kernel\Modules\Storage;

use kernel\Foundation\Database\RDB\Model;

class FilesModel extends Model
{
  protected $tableName = "files";

  protected $schema = [
    "key"    => ["type" => "string", "length" => 64],
    "size"   => ["type" => "integer"],
    "mime"   => ["type" => "string", "length" => 128],
  ];
}
```

`$schema` 声明列后，读写时自动做类型转换，插入也不需要手动列字段。

### 表名与归属

表名 = `gstudio_<appId>_<表名>`，`appId` 取**模型所属的应用**：

```php
$superApp->make(FilesModel::class)->tableName;   // gstudio_super_app_files
$download->make(FilesModel::class)->tableName;   // gstudio_download_files
```

> 模型**不要**登记进容器，每次 `make()` 新建即可——模型身上带链式查询状态，长期持有会串条件。

### 查询

```php
$model->where("status", 1)->get();
$model->where("id", "in", [1, 2, 3])->first();
$model->where("name", "like", "%foo%")->paginate(20);
$model->orderBy("id", "desc")->limit(10)->get();
```

`__call` / `__callStatic` 会把未定义的方法转给 Builder，所以静态调用也可用：

```php
FilesModel::where("mime", "image/png")->get();
```

### Builder

```php
$builder = $model->builder();     // ModelBuilder：与模型相关（with / scoped / trashed）
$query   = $model->query();       // Query：纯查询构造

$builder->with("owner")->map(fn ($row) => $row->toArray())->get();
$builder->withTrashed()->get();
$builder->forceDelete();
```

### 关联

`Relation/` 下提供一对一、一对多、多对多；用 `with()` 预加载避免 N+1。

## Schema 与迁移

```php
use kernel\Foundation\Database\RDB\Schema;

Schema::create("files", function ($table) {
  $table->string("key", 64)->index();
  $table->integer("size");
  $table->timestamps();
});
```

建表 / 改表通常写在应用的 `Deployment/Install` 与 `Deployment/Upgrades` 里，随版本执行。

## 分页

```php
$page = FilesModel::where("ownerId", $uid)->paginate(20);

$page->items();
$page->total();
$page->currentPage();
```

响应时可直接交给 `ResponsePagination` 输出标准分页结构。

## 事务

```php
DB::connection()->transaction(function () use ($model) {
  $model->add([...]);
  // 抛异常即回滚
});
```

## 调试

- 开发模式（`mode=development`）下查询异常会带上 SQL 与绑定参数；
- `Query::writeSql()` 可取到最后一次编译的 SQL。
