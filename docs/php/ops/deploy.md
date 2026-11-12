# 安装 / 升级 / 卸载

## 目录约定

每个应用根目录下有一个 `Deployment/`：

```
gstudio_download/Deployment/
├── Install/Install.php        首次安装
├── Uninstall/Uninstall.php    卸载
├── Upgrades/                  版本升级脚本
│   ├── Upgrade_1_0_1.php
│   └── Upgrade_1_1_0.php
└── UpgradeList.php            升级清单（版本 => 类名）
```

## 编排器

`kernel\Foundation\Builtin\Deployment` 负责扫描并执行这些脚本，顺带管理三样东西：

| 文件 / 状态 | 作用 |
|---|---|
| `.version` | 当前已安装版本 |
| `install.lock` | 已安装标记 |
| `install.key` | 安装密钥（防重装 / 防并行安装） |

```php
$deployment = new \kernel\Foundation\Builtin\Deployment($upgradesDir);

$deployment->install();          // 首次安装：跑 Install
$deployment->upgrade();          // 增量升级到最新
$deployment->upgrade("1.2.0");   // 升级到指定版本
$deployment->rollback("1.1.0");  // 回滚到指定版本
$deployment->uninstall();        // 卸载：跑 Uninstall
```

配套方法：

```php
$deployment->installLocked();            // 是否已安装
$deployment->lockInstall();              // 写 install.lock
$deployment->refreshInstallKey();        // 重新生成 install.key
$deployment->verifiyInstallKey($key);    // 校验安装密钥
$deployment->resetVersion("1.0.0");      // 手动改版本号（慎用）
```

版本比较是静态工具：

```php
Deployment::parseSemver("1.2.3-beta");        // 解析成可比较的形式
Deployment::compare("1.2.0", "1.1.9");        // -1 / 0 / 1
Deployment::compare("1.2.0", ">=1.1.0");      // 支持运算符形式
```

## DiscuzX 下的入口

`DiscuzXApp::deployment()` 返回针对扩展包布局的实例，安装脚本直接用它：

```php
// install.php
$app = new \kernel\DiscuzX\Foundation\DiscuzXApp(null, "gstudio_download");
$app->deployment()->install();
```

## 写一个升级脚本

```php
namespace gstudio_download\Deployment\Upgrades;

class Upgrade_1_1_0
{
  public function upgrade()
  {
    // 加字段、迁数据、建索引
  }

  public function rollback()
  {
    // 可选：回滚逻辑
  }
}
```

升级按版本号从小到大依次执行；每个脚本的 `upgrade()` 必须可重复执行或自行保证幂等。

## 与装配的关系

- 安装 / 升级脚本运行时框架处于**装配完成**状态，可以直接用容器、模型、设置；
- 但**数据库可能还没有连接**（首次安装），所以读取数据的逻辑要判断 `Connections::getDrivers()`；
- 卸载时不要删除别的应用的数据。

## 错误处理

脚本抛 `kernel\Foundation\Exception\Error` 会中止流程并把消息回传给调用方；已执行的版本不会自动回滚，需要显式 `rollback()`。
