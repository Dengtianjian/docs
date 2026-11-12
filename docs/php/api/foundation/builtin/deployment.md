# Deployment

`kernel\Foundation\Builtin\Deployment`  ·  class

源码：`gstudio_kernel/Foundation/Builtin/Deployment.php`

> 应用部署编排器：安装 / 更新 / 卸载（含回滚）

## 声明

```php
class Deployment extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

名字对应各应用根目录的 `Deployment/` 目录 —— 那里放 Install / Uninstall / Upgrades 脚本，
本类负责扫描并执行它们，顺带管理 `.version`、`install.lock`、`install.key`。

升级机制：
- 扫描 upgradesDir 目录下 Upgrade_x_y_z.php 文件，从文件名提取版本号按序执行
- 每个升级文件定义一个同名类，类有 upgrade() 方法则调用，否则构造器即升级逻辑
- 类可选定义 rollback() 方法以支持回滚

版本管理：
- .version 文件存储完整版本号（如 2.2.0.20260721.1746）
- 对比时自动提取前三段基础版本号（2.2.0）与升级脚本版本号做比较

安装辅助：
- install() / lockInstall() / installLocked()：创建数据/存储目录、写入并检测安装锁文件（install.lock）
- verifiyInstallKey() / refreshInstallKey()：校验与重新生成安装密钥（install.key）
- updateVersion() / version()：把配置版本号写入 .version、读取 .version 原文
- resetVersion() / uninstall()：强制改写版本号、删除 .version 版本记录

查询与状态（只读，不执行升级/回滚）：
- parseSemver() / compare()：提取三段基础版本号、按基础版本号比较两个版本
- getPendingUpgrades()：列出待升级版本（过滤条件与 upgrade() 一致）
- getStatus()：返回 app_id / current_version / latest_version / upgrade_dir / data_dir 快照

升级脚本文件格式：
```php
// 基础写法：构造器即升级逻辑
class Upgrade_1_1_0 { public function __construct() { ... } }

// 推荐写法：显式 upgrade/rollback 方法
class Upgrade_1_1_0 {
public function upgrade()  { ... }
public function rollback() { ... }
}
```

使用示例：
```php
$p = new Deployment();

// 升级到目标版本（每次升级后自动持久化 .version）
$p->upgrade('2.0.0');

// 回滚到指定版本（每次回滚后自动持久化 .version）
$p->rollback('1.0.0');

// 查看待升级版本
$pending = $p->getPendingUpgrades('2.0.0');

// 查询当前状态
$status = $p->getStatus();
```

## 示例

```php
// 基础写法：构造器即升级逻辑
class Upgrade_1_1_0 { public function __construct() { ... } }

// 推荐写法：显式 upgrade/rollback 方法
class Upgrade_1_1_0 {
public function upgrade()  { ... }
public function rollback() { ... }
}
```

## 示例

```php
$p = new Deployment();

// 升级到目标版本（每次升级后自动持久化 .version）
$p->upgrade('2.0.0');

// 回滚到指定版本（每次回滚后自动持久化 .version）
$p->rollback('1.0.0');

// 查看待升级版本
$pending = $p->getPendingUpgrades('2.0.0');

// 查询当前状态
$status = $p->getStatus();
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$latestVersion` | `string|null` | protected | 完整版本号（.version 文件原文，如 2.2.0.20260721.1746） |
| `$currentSemver` | `string` | protected | 从完整版本号中提取的三段基础版本号（如 2.2.0），用于与升级脚本版本号做 version_compare |
| `$upgradesDir` | `string|null` | protected | 升级脚本目录（null 时默认为 {Path::root()}/Upgrades） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`parseSemver()`](#parsesemver) | 从完整版本号中提取三段基础版本号 |
| [`compare()`](#compare) | 比较两个版本号 |
| [`install()`](#install) | 首次安装：创建应用数据和存储目录 |
| [`installLocked()`](#installlocked) | 判断安装是否已锁定 |
| [`lockInstall()`](#lockinstall) | 写入安装锁文件，标记安装完成 |
| [`verifiyInstallKey()`](#verifiyinstallkey) | 校验安装密钥 |
| [`refreshInstallKey()`](#refreshinstallkey) | 重新生成并写入安装密钥 |
| [`upgrade()`](#upgrade) | 执行增量升级 |
| [`updateVersion()`](#updateversion) | 将配置中的版本号持久化到 .version 文件 |
| [`version()`](#version) | 读取当前持久化的完整版本号 |
| [`rollback()`](#rollback) | 执行增量回滚 |
| [`uninstall()`](#uninstall) | 卸载：删除 .version 文件 |
| [`getStatus()`](#getstatus) | 获取应用当前状态快照 |
| [`getPendingUpgrades()`](#getpendingupgrades) | 获取待升级的版本列表 |
| [`resetVersion()`](#resetversion) | 强制重置当前版本号 |

### __construct()

```php
public function __construct($upgradesDir = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$upgradesDir` | `string|null` | `null` | 升级脚本目录，null 时默认为 {Path::root()}/Upgrades |

### parseSemver()

```php
public static function parseSemver(string $fullVersion): string
```

从完整版本号中提取三段基础版本号

2.2.0.20260721.1746 → 2.2.0
1.0 → 1.0（不足三段原样返回）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fullVersion` | `string` | — | 完整版本号 |

返回：`string` —— string 基础版本号

### compare()

```php
public static function compare($version1, $version2, $operator = null)
```

比较两个版本号

先各自提取三段基础版本号（见 parseSemver），再交给 version_compare 比较。
传 $operator 返回 bool（如 "＞="、"<"）；不传返回 int（-1 / 0 / 1）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$version1` | `string` | — | 版本号 1 |
| `$version2` | `string` | — | 版本号 2 |
| `$operator` | `string|null` | `null` | 比较运算符（>、>=、<、<=、==、!= 等），null 时返回 int |

### install()

```php
public function install()
```

首次安装：创建应用数据和存储目录

### installLocked()

```php
public function installLocked()
```

判断安装是否已锁定

检测数据目录下的 install.lock 文件是否存在，存在即视为已完成安装。

### lockInstall()

```php
public function lockInstall()
```

写入安装锁文件，标记安装完成

在 data 目录下创建 install.lock，内容为当前时间戳。

### verifiyInstallKey()

```php
public function verifiyInstallKey($key)
```

校验安装密钥

读取 install.key 内容并与传入的 $key 比对。
$key 为空时直接返回 false；install.key 不存在（无内容）时也返回 false。

注：方法名 "verifiy" 为历史拼写（正确应为 "verify"），为保持向后兼容未改名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 待校验的安装密钥 |

### refreshInstallKey()

```php
public function refreshInstallKey()
```

重新生成并写入安装密钥

在 data 目录下写入一个新的 uniqid() 作为 install.key 内容。

### upgrade()

```php
public function upgrade($targetVersion = null)
```

执行增量升级

扫描 upgradesDir 目录下的 Upgrade_x_y_z.php 文件，从文件名提取版本号
（如 Upgrade_1_2_3.php → 1.2.3），过滤出 > currentSemver 且 ≤ targetVersion
的脚本，按版本升序逐个执行。

每个升级脚本是一个类，执行逻辑：
1. include 文件，从文件路径推导完全限定类名并实例化
2. 若类有 upgrade() 方法则调用之，否则构造器本身即升级逻辑（向后兼容）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetVersion` | `string|null` | `null` | 目标版本号，null 表示升级到最新 |

### updateVersion()

```php
public function updateVersion()
```

将配置中的版本号持久化到 .version 文件

读取应用配置中的目标版本号（`version`）并写入 data 目录下的 .version。

### version()

```php
public function version()
```

读取当前持久化的完整版本号

返回 data 目录下 .version 文件的原文（如 2.2.0.20260721.1746）；
文件不存在时返回 null。

### rollback()

```php
public function rollback($targetVersion)
```

执行增量回滚

从当前版本降级到 $targetVersion，按版本降序执行回滚脚本。
过滤出 ≤ currentSemver 且 > targetVersion 的脚本，逐个执行 rollback()。
仅定义了 rollback() 方法的升级类参与回滚，无该方法则跳过。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetVersion` | `string` | — | 回滚目标版本号 |

### uninstall()

```php
public function uninstall()
```

卸载：删除 .version 文件

### getStatus()

```php
public function getStatus(): array
```

获取应用当前状态快照

返回：`array` —— array{app_id: string|null, current_version: string, latest_version: string|null, upgrade_dir: string, data_dir: string|null}

### getPendingUpgrades()

```php
public function getPendingUpgrades($targetVersion = null): array
```

获取待升级的版本列表

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$targetVersion` | `string|null` | `null` | 目标版本 |

返回：`array` —— array 待升级的版本号列表，按升序排列

### resetVersion()

```php
public function resetVersion(string $version)
```

强制重置当前版本号

直接修改内存状态和 .version 文件，不执行任何升级或回滚逻辑。
适用于手动修正版本号、初始化新环境的基准版本等场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$version` | `string` | — | 要设置的目标版本号 |

## 非公开方法

**private**

- `private function upgradesDir(): string` —— 获取升级脚本目录路径
- `private function scanUpgradeFiles(): array` —— 扫描 upgradesDir 目录，匹配 Upgrade_x_y_z.php 文件并提取版本号
- `private function buildUpgradeClassName($filePath)` —— 从升级目录路径和文件名构建类的完全限定名
- `private function runUpgrade($filePath, $version)` —— 执行单个升级脚本
- `private function runRollback($filePath, $version)` —— 执行单个回滚脚本
- `private function persistVersion($version)` —— 持久化当前版本号到 .version 文件

## 同目录

- [Cache](/php/api/foundation/builtin/cache)
- [Config](/php/api/foundation/builtin/config)
- [Event](/php/api/foundation/builtin/event)
- [Lifecycle](/php/api/foundation/builtin/lifecycle)
- [Log](/php/api/foundation/builtin/log)

