# 控制台与计划任务

## 命令行

框架自带一个命令行 Agent：在 Discuz 环境里通过入口脚本触发，命令类继承 `Foundation\Console\Command`。

```php
namespace gstudio_kernel\Commands;

class MakeModuleCommand extends \kernel\Foundation\Console\Command
{
  public function handle()
  {
    // 业务逻辑
    return 0;   // 退出码
  }
}
```

常用能力：

| 方法 | 用途 |
|---|---|
| `Command::run($cmd, $env, $options)` | 同步执行一条系统命令，返回输出 |
| `start() / poll() / wait()` | 异步执行并轮询输出 |
| `onStdout() / onStderr()` | 实时回调输出 |
| `setTimeout() / setMaxOutput()` | 超时与输出上限 |
| `input($data)` | 向子进程写入标准输入 |

## 计划任务

```
Foundation/Crontab/
├── Crons.php    任务管理器
└── Cron.php     任务基类
```

门面入口：

```php
use kernel\Facades\Crons;

// 登记一个任务实例
Crons::register(new CleanupCron());

// 按类名登记（自动实例化，非 Cron 子类跳过）
Crons::registerClass(CleanupCron::class);
```

未显式登记时，门面会兜底 `new` 一个管理器，并扫描当前应用 `Crons/` 目录把任务类登记进来。

### 写一个任务

```php
namespace gstudio_super_app\Crons;

use kernel\Foundation\Crontab\Cron;

class CleanupCron extends Cron
{
  public function handle()
  {
    // 业务逻辑
  }
}
```

## 与装配的关系

命令与计划任务都跑在**应用上下文**里，因此：

- 需要数据库的连接已经就绪；
- `Auth::userId()` 这类依赖登录态的接口在命令行下没有值（没有请求）；
- 读写设置、存储、云服务都按「注册在哪个应用」走。
