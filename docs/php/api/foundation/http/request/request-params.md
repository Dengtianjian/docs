# RequestParams

`kernel\Foundation\HTTP\Request\RequestParams`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Request/RequestParams.php`

> URI 参数（路由动态参数）集合

**无方法**

## 声明

```php
class RequestParams extends RequestData
```

父类：`RequestData`

## 概述

数据不在构造时填充，而是在路由匹配完成后由 App::run()/Console 经父类 fill()
注入（Router 匹配参数的唯一通道）；has/get/some/prepare 等继承自 RequestData。

## 方法

本类没有公开方法。

## 同目录

- [RequestBody](/php/api/foundation/http/request/request-body)
- [RequestData](/php/api/foundation/http/request/request-data)
- [RequestHeader](/php/api/foundation/http/request/request-header)
- [RequestQuery](/php/api/foundation/http/request/request-query)

