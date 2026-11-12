# DiscuzXFTPStorage

`kernel\DiscuzX\Foundation\Storage\DiscuzXFTPStorage`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/Storage/DiscuzXFTPStorage.php`

> DiscuzX 侧的 FTP 磁盘

## 声明

```php
class DiscuzXFTPStorage extends FTPStorage
```

父类：[FTPStorage](/php/api/modules/storage/drivers/ftp-storage)

## 概述

与基类 [FTPStorage](/php/api/modules/storage/drivers/ftp-storage) 的唯一差别是**上传中转用的本地临时目录**：这里落在 Discuz 的
`data/plugindata/{appId}/storage/ftp_temp`（`DiscuzXPath::storage`），而不是插件目录下。

其余能力（上传预检、失败取证、元信息、删除、URL/取回地址、连接复用）**全部继承基类**——
刻意不再复制一份 `put()`，否则基类每次改进都要在两处同步，很容易漂移。

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected function tempDirectory()` —— FTP 上传中转用的本地临时目录（覆写基类：落在 Discuz 的 data/plugindata 下）

## 同目录

- [DiscuzXLocalStorage](/php/api/discuzx/foundation/storage/discuz-x-local-storage)
- [DiscuzXQCloudCOSStorage](/php/api/discuzx/foundation/storage/discuz-xq-cloud-cos-storage)
- [DiscuzXStorage](/php/api/discuzx/foundation/storage/discuz-x-storage)

