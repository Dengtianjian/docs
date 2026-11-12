# 设置

设置模块把「键值配置」落在应用自己的表里（`gstudio_<app>_settings`），按应用隔离。

```
Modules/Setting/
├── Setting.php        门面：Setting::item()
├── SettingModule.php  实现：读 / 写 / 批量
└── SettingsModel.php  settings 表
```

## 装配

设置没有装配副作用，Bootstrap 里直接登记实例即可：

```php
$this->app()->provider(new \kernel\Modules\Setting\SettingModule(), "setting");
```

## 读

```php
use kernel\Modules\Setting\Setting;

$value = Setting::item("Site_Name");           // 单个，不存在返回 null
$map   = Setting::items("Site_Name", "Site_ICP");   // 批量，返回 名字 => 值
```

`items()` 的好处是一次查询取多个，避免循环里 N 次查库。

## 写

```php
Setting::add("Site_Name", "我的站", true);      // 不存在才写
Setting::save("Site_Name", "新名字", true);     // 存在则覆盖
Setting::saveItems([                            // 批量写
  "Site_Name" => "我的站",
  "Site_ICP"  => "京ICP备00000000号",
]);
```

第三个参数 `$serialization` 表示「存的时候是否序列化」：数组 / 对象要传 `true`，纯字符串可传 `false`。

## 判断存在

```php
if (Setting::exists("Site_Name")) { ... }
```

## 取原始模型

```php
$model = Setting::model();   // SettingsModel
$model->where("name", "like", "Site_%")->get();
```

## 跨应用读

设置跟着应用走，读别的应用的设置必须显式借用：

```php
// download 的 Bootstrap
$this->app()->import(\kernel\Modules\Setting\SettingModule::class, "gstudio_super_app", "setting");

// 业务
$name = $this->app()->setting()->item("Site_Name");   // 读的是 super_app 的设置
```

## 表结构

字段沿用 camelCase（历史兼容）：`name` / `value` / `serialization` / 时间戳，由 `SettingsModel::$schema` 声明，读写时自动做类型转换。
