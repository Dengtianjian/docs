# QCloudSTSScope

`kernel\Modules\QCloud\STS\QCloudSTSScope`  ·  class

源码：`gstudio_kernel/Modules/QCloud/STS/QCloudSTSScope.php`

## 声明

```php
class QCloudSTSScope
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `mixed` | — | — |
| `$bucket` | `mixed` | — | — |
| `$region` | `mixed` | — | — |
| `$resourcePrefix` | `mixed` | — | — |
| `$effect` | `mixed` | `'allow'` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`set_effect()`](#set_effect) | — |
| [`get_action()`](#get_action) | — |
| [`get_resource()`](#get_resource) | — |
| [`get_effect()`](#get_effect) | — |

### __construct()

```php
public function __construct($action, $bucket, $region, $resourcePrefix)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `mixed` | — | — |
| `$bucket` | `mixed` | — | — |
| `$region` | `mixed` | — | — |
| `$resourcePrefix` | `mixed` | — | — |

### set_effect()

```php
public function set_effect($isAllow)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$isAllow` | `mixed` | — | — |

### get_action()

```php
public function get_action()
```

### get_resource()

```php
public function get_resource()
```

### get_effect()

```php
public function get_effect()
```

## 同目录

- [QCloudSTS](/php/api/modules/qcloud/sts/q-cloud-sts)
- [QCloudSTSClient](/php/api/modules/qcloud/sts/q-cloud-sts-client)

