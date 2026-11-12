# Kernel 框架文档

`kernel` 是这套 Discuz 插件的底层框架：**应用容器 + 模块化业务 + 一层薄薄的 HTTP / DB 基础设施**。

它不追求「全家桶」，只解决三件事：

1. **一个应用怎么被装配起来**——`App::assemble()` 跑一遍应用的 Bootstrap，把要用的东西登记进容器；
2. **装配好的东西怎么取**——容器按名字（别名或类名）给实例，构造参数自动注入；
3. **业务怎么分块**——每个领域一个模块，模块自带「实现 + 装配 + 门面」三件套。

## 目录结构

```
gstudio_kernel/
├── Foundation/          框架基础设施
│   ├── Application/       App / Application / Applications / Container / Identity
│   ├── Builtin/           框架自带组件：Cache Config Event Lifecycle Log Deployment
│   ├── HTTP/              Request / Response / URL / Curl
│   ├── Router/            路由定义与解析
│   ├── Controller/        控制器基类
│   ├── Middleware/        中间件容器与基类
│   ├── Database/          RDB（Model / Query / ModelBuilder / Schema）、MongoDB、连接池
│   ├── FileSystem/        Storage / FilesModel / 驱动 / 路径工具
│   ├── Crontab/           定时任务
│   ├── Console/           命令行 Agent 与命令基类
│   ├── Exception/         统一异常
│   └── Object/            BaseObject（归属绑定）等
├── Modules/             业务模块（Auth / Setting / Storage / Redis / QCloud / Aliyun / Wechat / WechatPay）
├── Facades/             门面（Cache Config Crons Log）
├── Controllers/         内核自带控制器（文件、扩展等）
├── Middlewares/         内核中间件
├── Commands/            内核命令
└── Routes/              路由定义
```

## 三个核心概念

| 概念 | 一句话 | 详见 |
|---|---|---|
| 应用（Application） | 一个可独立装配、独立持有数据的单元，有自己的容器 | [应用与装配](/php/guide/app) |
| 容器（Container） | 按名字管理「类 / 实例 / 闭包 / 工厂」，取用时自动注入 | [容器](/php/guide/container) |
| 模块（Module） | 一个业务领域，自带实现、装配与门面 | [模块](/php/guide/modules) |

## 文档结构

```
php/
├── index.md              简介（当前页）
├── getting-started.md    快速开始
├── guide/                核心概念：应用与装配 · 容器 · 模块机制
├── framework/            框架功能：门面 · 配置 · 缓存 · 日志 · 事件 · 生命周期 · 路由 · 控制器 · 中间件 · 验证 · 文件系统 · 数据工具 · 对象基类
├── modules/              业务模块：认证 · 设置 · 存储 · Redis · 云服务 · 微信
├── basics/               基础设施：HTTP · 数据库 · 控制台与计划任务
├── ops/                  运维：安装/升级/卸载 · 异常与错误
└── api/                  逐类 API（按源码目录分层，自动生成）
```

## 建议阅读顺序

1. [快速开始](/php/getting-started) —— 跑起来一个最小应用
2. [应用与装配](/php/guide/app) —— 应用是什么、怎么装配、跨应用怎么取
3. [容器](/php/guide/container) —— 四种登记方式与参数注入
4. [模块机制](/php/guide/modules) —— 业务代码该放哪、三件套怎么写
5. [框架功能](/php/framework/facade) —— 门面 · 配置 · 缓存 · 日志 · 事件 · 生命周期 · 路由 · 控制器 · 中间件 · 验证 · 文件系统 · 数据工具 · 对象基类
6. 按需查阅：[认证](/php/modules/auth) · [设置](/php/modules/setting) · [存储](/php/modules/storage) · [Redis](/php/modules/redis) · [云服务](/php/modules/cloud) · [微信](/php/modules/wechat) · [HTTP](/php/basics/http) · [数据库](/php/basics/database) · [控制台](/php/basics/console) · [部署](/php/ops/deploy) · [异常](/php/ops/errors)

## 逐类 API

左侧「API 参考（按类）」是按源码目录分层的逐类文档，由 `scripts/gen-api-docs.php` 从 `gstudio_kernel` 源码生成。改了类名或方法签名后重新跑一次即可：

```bash
php scripts/gen-api-docs.php
```

## 一条约定

框架里所有「名字」都**精确匹配**：登记时给别名就用别名，不给就用完整类名。不做短名推断、不剥 `Service` 后缀——要短名就在登记时显式给。
