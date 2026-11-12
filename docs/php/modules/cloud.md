# 云服务

## 腾讯云 QCloud

```
Modules/QCloud/
├── QCloud.php           账号注册表（单例）
├── QCloudProvider.php   装配：建注册表 + 登记账号
├── QCloudAccount.php    账号（SecretId / SecretKey / 名字）
├── QCloudApi.php  QCloudFaceID.php  QCloudCos/  STS/
```

### 装配

```php
class QCloudProvider extends \kernel\Modules\QCloud\QCloudProvider
{
  protected function account()
  {
    $s = Setting::items("QCloud_SecretId", "QCloud_SecretKey");

    return new QCloudAccount($s["QCloud_SecretId"], $s["QCloud_SecretKey"], "main");
  }
}

// Bootstrap
$this->app()->make(QCloudProvider::class);
```

`account()` 默认返回 `null`——内核不知道密钥放在哪，返回 null 就不登记任何账号。

### 使用

```php
$qcloud = $this->app()->make(QCloud::class);

$qcloud->hasAccount("main");
$account = $qcloud->account("main");           // QCloudAccount
$qcloud->addAccount($account, );               // 运行期追加
$qcloud->getAccounts();
```

账号名用于区分多套密钥（例如 `main` / `backup`），COS 驱动、短信、人脸核身都按名字取账号。

## 阿里云 Aliyun

```
Modules/Aliyun/
├── Aliyun.php          门面
├── AliyunProvider.php  装配
├── AliyunAccount.php   凭证（AccessKey / Secret）
├── AliyunRequest.php  AliyunSignature.php
└── AliyunOSS/          OSS 存储驱动
```

### 装配

```php
class AliyunProvider extends \kernel\Modules\Aliyun\AliyunProvider
{
  protected function account()
  {
    $s = Setting::items("Aliyun_AccessKey", "Aliyun_Secret");

    return new AliyunAccount($s["Aliyun_AccessKey"], $s["Aliyun_Secret"]);
  }
}
```

### 使用

```php
use kernel\Modules\Aliyun\Aliyun;

$ak = Aliyun::appId();
$sk = Aliyun::appSecret();

// 签名与请求是纯工具，直接用
$req = new \kernel\Modules\Aliyun\AliyunRequest($account);
$sign = new \kernel\Modules\Aliyun\AliyunSignature($account);
```

## 对象存储

COS / OSS 都是 `StorageModule` 的磁盘驱动，配置在存储模块的 `drivers()` 里：

```php
protected function drivers()
{
  return [
    "local" => new AppLocalStorage(),
    "cos"   => new QCloudCOSStorage($this->app()->qcloud()->account("main")),
    "oss"   => new AliyunOSSStorage($this->app()->aliyun()),
  ];
}
```

之后 `Storage::disk("cos")`、`Storage::use("oss")` 即可。
