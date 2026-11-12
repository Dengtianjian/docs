# 配置

配置由 `kernel\Foundation\Builtin\Config` 统一管理：读应用 `Configs/` 目录下的 PHP 文件（`return [...]`），按 key 点号取值。

## 读取

```php
use kernel\Facades\Config;

$mode = Config::get("mode", "production");     // 第二参为默认值
$all = Config::all();
Config::has("storage.driver");
```

实例方式同源：

```php
$app->config()->get("mode", "production");
```

## 写入与操作

```php
Config::set("site.name", "如意");      // 运行时覆盖（不落盘）
Config::set(["a" => 1, "b" => 2]);     // 批量
Config::has("site.name");
Config::forget("site.name");           // 删除一个键
Config::push("list", "item");          // 数组末尾追加
Config::flush();                       // 清空全部
```

`set()` 只改内存里的这份实例，**不会写回文件**——持久化配置仍靠 `Configs/` 目录下的 PHP 文件。

## 配置文件的层级

框架按固定顺序**无条件读取并合并**这几个文件，后读的覆盖先读的：

```
Config.php
Config.development.php
Config.local.php
Config.production.php
Config.release.php
```

环境差异通过「存在哪些文件 + 覆盖顺序」体现，**不是按 mode 过滤文件**。例如 `Config.production.php` 只放生产要覆盖的键。

`mode` 键本身只影响运行行为判断：

```php
$app->mode();            // "production" / "development" …
$app->isDevelopment();
$app->isProduction();
```

## 注意

- 每个应用一份实例：`$app->config()` 读本应用 `Configs/`；跨应用要 `App::of("gstudio_super_app")->config()`；
- 首次访问才读文件（懒加载），所以装配期拿到的是**已加载完五层文件**的结果。
