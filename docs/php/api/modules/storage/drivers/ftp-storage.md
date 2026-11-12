# FTPStorage

`kernel\Modules\Storage\Drivers\FTPStorage`  ·  class

源码：`gstudio_kernel/Modules/Storage/Drivers/FTPStorage.php`

> FTP / FTPS 磁盘存储

## 声明

```php
class FTPStorage extends AbstractStorage
```

父类：`AbstractStorage`

## 概述

`AbstractStorage` 的 FTP 实现，基于 PHP 的 FTP 扩展（`ftp_*`）对接 FTP 服务器：
上传、读取元信息、删除、生成访问地址。实例代表「一台 FTP 服务器上的一个目录」。

使用要点：
- **磁盘名默认 `ftp`（可省略），要与装配时注册的键名一致**：`Storage` 会把 `name()` 写进 files 表的 `disk` 列，
之后按该名字取回磁盘（如 `$storage->disk($file['disk'])`），对不上就会「磁盘未实例化」；
- **远端路径**统一是 `{basePath}/{fileName}` 拼成的**绝对路径**（以 `/` 开头），分隔符固定用 `/`
（不经过 `\kernel\Foundation\FileSystem\Path::join` —— 那个用 `DIRECTORY_SEPARATOR`，
Windows 下会拼出反斜杠，对 FTP 是错的）；
- **`url` 不含凭据**（可安全返回给客户端）；需要服务端自己去取回资源时用 `fetchURL`
（带凭据，**不要返回给客户端**）—— 例如预览 `ftp://` 文件时由
[ResponseProxy](/php/api/foundation/http/response/response-proxy) 代理取回（现代浏览器已移除 FTP 支持）；
- `put()` 是**搬运语义**：上传成功后删除本地源文件（与 `FileSystem::upload()` 一致）；
- `exists()` 基于 `ftp_size()`：部分服务器对目录/无权限路径也返回 -1，故它只适合判断**文件**；
- `get()` 返回的 `width` / `height` 固定为 `null`（无法在远端算图片尺寸），
`filePath` 是**远端绝对路径**（不是本地路径，不能直接交给 `ResponseFile`）；
- 连接按需建立并在实例内复用，可调用 `close` 主动断开（析构时也会断开）；
- **失败排障**：FTP 扩展没有错误 API，失败原因只在它抛的 PHP 警告里，而 `error_get_last()` 只能拿
「最后一条」（可能被 `TYPE is now 8-bit binary` 这类信息性提示占位）。故 `put()` 会收集本次调用的
**全部警告**并过滤出有用部分，同时附上**只读取证**（`PWD`/`MLST`/`SIZE` 的服务端回复）与
`mkdirFailed`（哪几级目录没建成）—— 见失败时的 `errorDetails`。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$host` | `string` | protected | 服务器地址（域名或 IP） |
| `$user` | `string|null` | protected | 登录用户名；为 null 时走匿名登录 |
| `$password` | `string|null` | protected | 登录密码 |
| `$port` | `int` | protected | 端口，默认 21 |
| `$secure` | `boolean` | protected | 是否使用 SSL（FTPS） |
| `$passive` | `boolean` | protected | 是否使用被动模式（PASV），默认 true（在 NAT/防火墙后必须开） |
| `$timeout` | `int` | protected | 连接/读写超时（秒） |
| `$connection` | `mixed|null` | protected | 复用的 FTP 连接句柄 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 FTP 磁盘 |
| [`close()`](#close) | 断开 FTP 连接（幂等） |
| [`__destruct()`](#__destruct) | — |
| [`get()`](#get) | 获取文件信息 |
| [`put()`](#put) | 上传文件到 FTP 服务器 |
| [`delete()`](#delete) | 删除 FTP 服务器上的文件 |
| [`exists()`](#exists) | 判断远端文件是否存在 |
| [`url()`](#url) | 生成文件的访问地址（**不含凭据**，可安全返回给客户端） |
| [`fetchURL()`](#fetchurl) | 生成供**服务端取回**的访问地址（**含凭据**，切勿返回给客户端） |

### __construct()

```php
public function __construct($host = "", $user = null, $password = null, $port = 21, $basePath = "", $secure = false, $passive = true, $timeout = 10, $name = "ftp")
```

构造 FTP 磁盘

除 `$host` 外都可省略；磁盘名固定排在最后，默认 `ftp`：
`new FTPStorage("ftp.example.com")` → 匿名登录、根目录、被动模式、磁盘名 `ftp`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | `""` | 服务器地址（域名或 IP）；留空表示尚未配置，使用时连接会失败 |
| `$user` | `string|null` | `null` | 登录用户名；为 null 时匿名登录 |
| `$password` | `string|null` | `null` | 登录密码 |
| `$port` | `int` | `21` | 端口，默认 21 |
| `$basePath` | `string` | `""` | 服务器上的基准目录（所有 fileKey 相对它解析），默认根目录 |
| `$secure` | `boolean` | `false` | 是否使用 FTPS |
| `$passive` | `boolean` | `true` | 是否使用被动模式，默认 true |
| `$timeout` | `int` | `10` | 连接/读写超时（秒），默认 10 |
| `$name` | `string` | `"ftp"` | 磁盘名称，默认 `ftp`（要与装配时注册的键名一致，会写入 files 表的 disk 列） |

### close()

```php
public function close()
```

断开 FTP 连接（幂等）

### __destruct()

```php
public function __destruct()
```

### get()

```php
public function get($fileName)
```

获取文件信息

以 `ftp_size()` 判断文件是否存在：返回负数视为不存在，此时返回 false（与本地磁盘一致）。
`width` / `height` 固定为 null，`filePath` 是远端绝对路径。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（含相对路径） |

### put()

```php
public function put($file, $saveFileName = null)
```

上传文件到 FTP 服务器

流程：把源文件搬到本地临时目录（`tempDirectory`）→ 建远端目录 → 预检被动数据端口
→ 上传 → 失败时收集全部警告 + 只读取证后返回错误态；成功后删除本地临时文件。

源文件支持两种入参：`$_FILES` 单文件数组（取 `tmp_name`），或本地文件路径字符串。

失败时 `errorDetails` 含：`remote` / `local` / `localReadable` / `remoteSize` / `passive` / `timeout`
/ `reason`（过滤掉信息性提示后的警告原文，可能为 null）/ `warnings`（本次调用全部警告）
/ `remoteFacts`（`PWD`、目录与目标文件的 `MLST`、`SIZE` 的服务端回复）/ `mkdirFailed`（没建成的目录段，仅在发生时报出）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array|string` | — | 源文件（上传数组或本地路径） |
| `$saveFileName` | `string|null` | `null` | 保存后的文件名称（含相对路径）；为 null 时用源文件名 |

### delete()

```php
public function delete($fileName)
```

删除 FTP 服务器上的文件

先经 `exists` 确认存在（不存在返回 404 错误态），再删除。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（含相对路径） |

### exists()

```php
public function exists($fileName)
```

判断远端文件是否存在

基于 `ftp_size()`：返回负数视为不存在（注意部分服务器对目录/无权限路径同样返回 -1）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（含相对路径） |

### url()

```php
public function url($fileName)
```

生成文件的访问地址（**不含凭据**，可安全返回给客户端）

形如 `ftp://host[:port]/{basePath}/{fileName}`；协议相对地址固定用 `/`。
注意现代浏览器已不支持 FTP，直接给出该地址无法在页面内预览 ——
预览场景应由服务端用 `fetchURL` 取回后代理输出。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（含相对路径） |

### fetchURL()

```php
public function fetchURL($fileName)
```

生成供**服务端取回**的访问地址（**含凭据**，切勿返回给客户端）

形如 `ftp://user:password@host[:port]/{basePath}/{fileName}`，交给
[ResponseProxy](/php/api/foundation/http/response/response-proxy) 之类的代理用 `fopen()` 取回
（FTP 凭据只能放在 URL 里 —— ftp:// 流包装器的 context 不支持账号密码）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（含相对路径） |

## 非公开方法

**protected**

- `protected function buildURL($fileName, $withCredentials = false)` —— 拼接访问地址
- `protected function tempDirectory()` —— 上传中转用的本地临时目录（子类可覆写）
- `protected function remotePath($fileName)` —— 把文件键拼成远端绝对路径（固定用 `/` 分隔）
- `protected function ensureDirectory($remoteDirectory, $connection, &$failed = null)` —— 逐级创建远端目录（已存在则忽略，建不成的段会被记录）
- `protected function callWithWarnings($callback, &$warnings)` —— 执行一次 FTP 调用并收集它抛出的**全部** PHP 警告
- `protected static function filterFtpWarnings($warnings)` —— 从收集到的警告里挑出「能说明失败原因」的
- `protected function collectRemoteFacts($connection, $remotePath)` —— 上传失败后向服务端只读取证
- `protected static function mlstExists($reply)` —— 判断 `MLST` 的回复是否表示路径存在
- `protected function connect()` —— 建立（或复用）FTP 连接
- `protected function checkPassiveDataPort($connection)` —— 预检「被动模式数据端口」是否可达

## 同目录

- [AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage)
- [AbstractStorage](/php/api/modules/storage/drivers/abstract-storage)
- [LocalStorage](/php/api/modules/storage/drivers/local-storage)

