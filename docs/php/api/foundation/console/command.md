# Command

`kernel\Foundation\Console\Command`  ·  class

源码：`gstudio_kernel/Foundation/Console/Command.php`

> 系统命令执行器

## 声明

```php
class Command
```

## 概述

基于 proc_open 封装，支持三种执行模式：
1. 单次进程：每次 exec() 打开一个新进程，执行后关闭（默认）
2. 会话复用：open() 后复用长驻 shell 进程，通过随机标记分隔每次命令的输出
3. 异步执行：start() 非阻塞启动，poll()/wait() 轮询获取结果

同步执行支持 onStdout()/onStderr() 实时输出回调、超时与最大输出限制。

线程安全：本类非线程安全，同一实例不应被多个并发执行上下文共享。
平台差异：会话模式（open()）仅支持 Unix/Linux，Windows 下返回 false。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$process` | `resource|null` | private | — |
| `$pipes` | `array` | private | — |
| `$env` | `array` | private | — |
| `$options` | `array` | private | — |
| `$cwd` | `string` | private | — |
| `$initCommand` | `string` | private | — |
| `$lastExitcode` | `int|null` | private | — |
| `$timedOut` | `bool` | private | — |
| `$outputExceeded` | `bool` | private | — |
| `$timeout` | `int` | private | — |
| `$maxOutput` | `int` | private | — |
| `$status` | `array` | private | — |
| `$sessionOpened` | `bool` | private | — |
| `$sessionMarker` | `string` | private | — |
| `$asyncCommand` | `string` | private | — |
| `$asyncStdout` | `string` | private | — |
| `$asyncStderr` | `string` | private | — |
| `$totalBytes` | `int` | private | — |
| `$stdoutCallback` | `callable|null` | private | — |
| `$stderrCallback` | `callable|null` | private | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`run()`](#run) | 便捷静态执行：单次执行命令并返回标准输出 |
| [`__construct()`](#__construct) | 构建命令执行器 |
| [`setTimeout()`](#settimeout) | 设置命令执行超时时间 |
| [`setMaxOutput()`](#setmaxoutput) | 设置最大输出字节数，超过则终止命令 |
| [`onStdout()`](#onstdout) | 注册标准输出实时回调 |
| [`onStderr()`](#onstderr) | 注册标准错误实时回调 |
| [`open()`](#open) | 开启长驻 shell 会话，之后 exec()/execResult() 将复用该会话进程 Windows 下不支持会话模式，返回 false |
| [`close()`](#close) | 关闭长驻 shell 会话 |
| [`isOpen()`](#isopen) | 会话是否开启且进程存活 |
| [`start()`](#start) | 非阻塞启动命令执行 若已存在运行中的进程或会话，会先关闭 |
| [`isRunning()`](#isrunning) | 异步命令是否仍在运行 |
| [`poll()`](#poll) | 非阻塞轮询，读取当前已产生的输出 |
| [`wait()`](#wait) | 阻塞等待异步命令执行完成 |
| [`input()`](#input) | 向子进程标准输入写入数据（用于交互式命令） |
| [`execResult()`](#execresult) | 执行命令并返回完整执行结果 |
| [`exec()`](#exec) | 执行命令 |
| [`cd()`](#cd) | 切换目录 |
| [`which()`](#which) | 用于查找文件 which指令会在环境变量$PATH设置的目录里查找符合条件的文件。 |
| [`pwd()`](#pwd) | 获取当前工作目录 执行 pwd 指令可立刻得知您目前所在的工作目录的绝对路径名称。 |
| [`exitcode()`](#exitcode) | 命令执行退出码 返回最近一次执行（同步/异步/会话）的退出码；执行中或尚未执行返回 null |
| [`isSuccessful()`](#issuccessful) | 最近一次执行是否成功（退出码为 0） |
| [`isTimedOut()`](#istimedout) | 最近一次执行是否超时 |
| [`isOutputExceeded()`](#isoutputexceeded) | 最近一次执行是否因输出超限被终止 |
| [`terminate()`](#terminate) | 终止当前子进程 先发 SIGTERM 优雅终止，2 秒内未退出则升级为 SIGKILL |
| [`ln()`](#ln) | 软连接 为某一个文件在另外一个位置建立一个同步的链接 例如：ln -s /bin/php /usr/bin/php |
| [`whereis()`](#whereis) | 用于查找文件 该指令会在特定目录中查找符合条件的文件。这些文件应属于原始代码、二进制文件，或是帮助文件。 该指令只能用于查找二进制文件、源代码文件和man手册页，一般文件的定位需使用locate命令。 |

### run()

```php
public static function run(string $command, array $env = [], array $options = []): string
```

便捷静态执行：单次执行命令并返回标准输出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$command` | `string` | — | 命令 |
| `$env` | `array` | `[]` | 环境变量 |
| `$options` | `array` | `[]` | proc_open 选项 |

返回：`string` —— string 标准输出

### __construct()

```php
public function __construct(array $env = [], array $options = [], string $command = "/bin/bash")
```

构建命令执行器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$env` | `array` | `[]` | 环境变量，exec() 执行时与传入的 env 合并 |
| `$options` | `array` | `[]` | proc_open 选项（bypass_shell、suppress_errors、cwd 等） |
| `$command` | `string` | `"/bin/bash"` | 初始化命令（shell 路径），exec() 执行的命令基于该命令运行。 |

### setTimeout()

```php
public function setTimeout(int $seconds): Command
```

设置命令执行超时时间

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$seconds` | `int` | — | 超时秒数，0 表示不限制 |

返回：`Command` —— Command

### setMaxOutput()

```php
public function setMaxOutput(int $bytes): Command
```

设置最大输出字节数，超过则终止命令

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$bytes` | `int` | — | 最大字节数，0 表示不限制 |

返回：`Command` —— Command

### onStdout()

```php
public function onStdout(callable $callback): Command
```

注册标准输出实时回调

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 回调函数，参数为输出片段 |

返回：`Command` —— Command

### onStderr()

```php
public function onStderr(callable $callback): Command
```

注册标准错误实时回调

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 回调函数，参数为输出片段 |

返回：`Command` —— Command

### open()

```php
public function open(): bool
```

开启长驻 shell 会话，之后 exec()/execResult() 将复用该会话进程 Windows 下不支持会话模式，返回 false

返回：`bool` —— bool 是否成功开启

### close()

```php
public function close()
```

关闭长驻 shell 会话

### isOpen()

```php
public function isOpen(): bool
```

会话是否开启且进程存活

返回：`bool` —— bool

### start()

```php
public function start(string $command, array $env = [], array $options = []): Command
```

非阻塞启动命令执行 若已存在运行中的进程或会话，会先关闭

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$command` | `string` | — | 命令 |
| `$env` | `array` | `[]` | 环境变量 |
| `$options` | `array` | `[]` | 选项 |

返回：`Command` —— Command

### isRunning()

```php
public function isRunning(): bool
```

异步命令是否仍在运行

返回：`bool` —— bool

### poll()

```php
public function poll(): array
```

非阻塞轮询，读取当前已产生的输出

返回：`array` —— array ["running" => bool, "exitcode" => int|null, "stdout" => string, "stderr" => string]

### wait()

```php
public function wait(int $timeout = 0): array
```

阻塞等待异步命令执行完成

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$timeout` | `int` | `0` | 等待超时秒数，0 表示按 setTimeout() 配置 |

返回：`array` —— array ["exitcode" => int|null, "stdout" => string, "stderr" => string, "timedout" => bool, "output_exceeded" => bool, "command" => string]

### input()

```php
public function input(string $data): Command
```

向子进程标准输入写入数据（用于交互式命令）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string` | — | 数据 |

返回：`Command` —— Command

### execResult()

```php
public function execResult(string $command, array $env = [], array $options = []): array
```

执行命令并返回完整执行结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$command` | `string` | — | 命令 |
| `$env` | `array` | `[]` | 环境变量，与构造时的环境变量合并 |
| `$options` | `array` | `[]` | 选项，与构造时的选项合并 |

返回：`array` —— array ["exitcode" => int|null, "stdout" => string, "stderr" => string, "timedout" => bool, "output_exceeded" => bool, "command" => string]

### exec()

```php
public function exec(string $command, array $env = [], array $options = []): string
```

执行命令

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$command` | `string` | — | 命令 |
| `$env` | `array` | `[]` | 环境变量 |
| `$options` | `array` | `[]` | 选项 |

返回：`string` —— string 标准输出。如需完整结果（含退出码/错误输出）请使用 execResult()

### cd()

```php
public function cd(string $cwd = "/"): Command
```

切换目录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$cwd` | `string` | `"/"` | 目标目录 |

返回：`Command` —— Command

### which()

```php
public function which(string $fileName): string
```

用于查找文件 which指令会在环境变量$PATH设置的目录里查找符合条件的文件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称，例如 php 最终执行的命令就是 which php |

返回：`string` —— string

### pwd()

```php
public function pwd(): string
```

获取当前工作目录 执行 pwd 指令可立刻得知您目前所在的工作目录的绝对路径名称。

返回：`string` —— string

### exitcode()

```php
public function exitcode()
```

命令执行退出码 返回最近一次执行（同步/异步/会话）的退出码；执行中或尚未执行返回 null

### isSuccessful()

```php
public function isSuccessful(): bool
```

最近一次执行是否成功（退出码为 0）

返回：`bool` —— bool

### isTimedOut()

```php
public function isTimedOut(): bool
```

最近一次执行是否超时

返回：`bool` —— bool

### isOutputExceeded()

```php
public function isOutputExceeded(): bool
```

最近一次执行是否因输出超限被终止

返回：`bool` —— bool

### terminate()

```php
public function terminate(int $signal = 15, int $escalateAfter = 2)
```

终止当前子进程 先发 SIGTERM 优雅终止，2 秒内未退出则升级为 SIGKILL

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$signal` | `int` | `15` | 首次发送的信号，默认 SIGTERM(15) |
| `$escalateAfter` | `int` | `2` | 等待秒数后升级 SIGKILL，0 表示不升级 |

### ln()

```php
public function ln(string $source, string $target, string $options = "-s"): string
```

软连接 为某一个文件在另外一个位置建立一个同步的链接 例如：ln -s /bin/php /usr/bin/php

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$source` | `string` | — | 文件源路径 |
| `$target` | `string` | — | 软连接到的目标路径 |
| `$options` | `string` | `"-s"` | 选项，默认是 -s 符号链接（symbolic）的意思 |

返回：`string` —— string

### whereis()

```php
public function whereis(string $target): string
```

用于查找文件 该指令会在特定目录中查找符合条件的文件。这些文件应属于原始代码、二进制文件，或是帮助文件。 该指令只能用于查找二进制文件、源代码文件和man手册页，一般文件的定位需使用locate命令。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `string` | — | 文件名称 |

返回：`string` —— string

## 非公开方法

**private**

- `private function initProcess()` —— 打开子进程（proc_open）并初始化管道
- `private function prepare(string $command)` —— 准备一次执行：重置执行状态、打开进程、写入命令
- `private function writeStream(int $idx, string $data)` —— 向指定管道写入数据（不关闭管道）
- `private function closeStream(int $idx)` —— 关闭指定管道并置空
- `private function readAvailable()` —— 非阻塞读取一次两个输出管道，触发回调并累计输出（异步轮询用）
- `private function readToEnd($marker = null): array` —— 阻塞读取输出直到进程结束（或会话命令标记出现）
- `private function execInProcess(string $command): array` —— 单次进程执行：准备 → 关闭 stdin → 读到结束 → 收尾
- `private function execInSession(string $command): array` —— 会话执行：复用长驻 shell，通过随机标记分隔输出并解析退出码
- `private function finalize(array $outputs, bool $keepProcess = false): array` —— 收尾：设置退出码、关闭进程/管道，返回结果数组
- `private function collectResult(): array` —— 汇总异步执行结果并清理资源
- `private function closePipes()` —— 关闭所有管道
- `private function emit($callback, string $chunk)` —— 触发输出回调（存在且可调用时执行）

## 同目录

- [Console](/php/api/foundation/console/console)

