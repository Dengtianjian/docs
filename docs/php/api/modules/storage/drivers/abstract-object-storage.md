# AbstractObjectStorage

`kernel\Modules\Storage\Drivers\AbstractObjectStorage`  ·  class

源码：`gstudio_kernel/Modules/Storage/Drivers/AbstractObjectStorage.php`

> 对象存储磁盘抽象基类

## 声明

```php
class AbstractObjectStorage extends AbstractStorage
```

父类：`AbstractStorage`

## 概述

为所有对象存储型磁盘（腾讯云 COS、阿里云 OSS 等）提供统一骨架：
- 公共属性：客户端实例、桶名、地域、密钥；
- 构造时注入密钥/地域/桶，并委托父类标记为 "remote" 磁盘、随后触发 `boot` 完成客户端初始化；
- 提供 `bucket`/`region` 两个读写一体的访问器，且 region 变更会重新触发 boot() 以重建客户端。

具体的上传/读取/删除/URL/鉴权等能力由各子类（QCloudCOSStorage、AliyunOSSStorage …）实现。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$client` | `mixed|null` | protected | — |
| `$bucket` | `string|null` | protected | — |
| `$region` | `string|null` | protected | — |
| `$secretId` | `string|null` | protected | — |
| `$secretKey` | `string|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造对象存储磁盘 |
| [`bucket()`](#bucket) | 读取或设置存储桶名称 |
| [`region()`](#region) | 读取或设置存储地域 |
| [`client()`](#client) | 读取或设置存储服务客户端实例 |

### __construct()

```php
public function __construct($secretId, $secretKey, $region, $bucket)
```

构造对象存储磁盘

注入密钥/地域/桶，调用父类构造标记为远程（"remote"）磁盘，并触发 `boot` 完成客户端初始化。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$secretId` | `string` | — | 访问密钥 ID |
| `$secretKey` | `string` | — | 访问密钥 Secret |
| `$region` | `string` | — | 存储地域 |
| `$bucket` | `string` | — | 存储桶名称 |

### bucket()

```php
public function bucket($name = null)
```

读取或设置存储桶名称

读写一体：传参时设置桶名并返回 $this（链式）；不传时返回当前桶名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | `null` | 桶名称 |

### region()

```php
public function region($name = null)
```

读取或设置存储地域

读写一体：传参时设置地域并**重新触发 `boot`**（以便子类重建对应地域的客户端），返回 $this（链式）；
不传时返回当前地域。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | `null` | 地域标识 |

### client()

```php
public function client($client = null)
```

读取或设置存储服务客户端实例

读写一体：传参时设置客户端并返回 `$this`（链式）；不传时返回当前客户端
（未设置时为 null）。客户端由子类在自己的 `boot` 里创建。

```php
$storage->client($myClient);    // 注入
$client = $storage->client();   // 读取
```

⚠️ 读分支必须访问**属性** `$this->client`；若写成 `$this->client()`，PHP 会把它当成
**递归调用本方法**（本类同时有同名属性 `$client` 与同名方法 `client()`），从而无限递归。

💡 现状提示：子类 `QCloudCOSStorage` 目前用的是它**自己的** `$cosClient` 属性，
并未使用本属性/本方法；如需统一客户端入口，可改为走这里。

```php
$storage->client($myClient);    // 注入
$client = $storage->client();   // 读取
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$client` | `mixed|null` | `null` | 客户端实例；不传（`func_num_args()` 为 0）则读取 |

## 非公开方法

**protected**

- `protected function boot()` —— 客户端/磁盘初始化钩子

## 同目录

- [AbstractStorage](/php/api/modules/storage/drivers/abstract-storage)
- [FTPStorage](/php/api/modules/storage/drivers/ftp-storage)
- [LocalStorage](/php/api/modules/storage/drivers/local-storage)

