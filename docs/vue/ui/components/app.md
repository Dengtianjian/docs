# KApp 应用根容器

> 共同约定见 [共同约定](./index.md)。应用级根容器（对标 antd `App`）：把主题文字 token 落进 DOM 继承链，并为全局反馈组件提供挂载宿主。**非库启动必需项**，与 [KConfigProvider](./config-provider.md) 一样属于可选运行时件。

## 何时使用

- 挂在应用根（antd 同款顺序：`ConfigProvider` 在外、`App` 在内），让页面里的**普通 HTML 文字**也继承 K UI 字体/文字色，而不是只有组件本身有样式；
- 消息 / 通知 / 确认框等全局反馈（P2b 已落地）以 KApp 为队列宿主：`useKApp().message/notification/modal/drawer` 实例 API 只在 KApp 之下存在（拍板③：无全局静态）；
- 微前端块级隔离：每个块挂一个 KApp，与宿主文字样式互不干扰。

## 代码演示

<Demo path="app/basic" title="基础用法" desc="默认渲染 `div.k-app`；`component` 可换根标签（如 `main`），`false` 则只保留上下文不渲染包裹层。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 根标签；`false` = 不渲染包裹层（仅上下文） | `string \| Component \| false` | `'div'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 应用内容（`component=false` 时不渲染包裹层，仅注入上下文） |

无事件。

### 组合式 API

| 函数 | 说明 |
| --- | --- |
| `useKApp()` | 返回 `{ root, message?, notification?, modal?, drawer? }`；未挂 KApp 时为 `undefined`。`message/notification/modal/drawer` 为实例 API（详见 [KModal](./modal.md)、[KMessage](./message.md)、[KNotification](./notification.md)、[KDrawer](./drawer.md)），队列 Holder 随 KApp 挂载与销毁 |

## 注意事项

- **KApp 不注入主题**：换肤三通道（CSS → JSON → JS，见 [主题 Token 规格 §10](../design/theme-tokens.md)）与 KApp 无关，它只负责文字 token 继承 + 挂载点上下文；
- `component=false` 时 `root` 为 `undefined`，反馈组件将回落 `body` 挂载——多应用场景慎用；
- 与 `KConfigProvider scoped` 的分工：Provider 的 wrapper 携带**主题变量图**，KApp 携带**文字基线与应用上下文**，二者正交、可嵌套。

---

## 规格附录（实现决策，面向贡献者）

- P1 职责 = ①`.k-app` 文字 token 继承（color/font-family/font-size/line-height 四项）②`root` 元素上下文；
  - P2b 反馈批把 `message/notification/modal` 实例挂进同一 context（不改注入 key），KApp 模板内常驻四个 Holder（队列空时零 DOM）；
  - 想绕开 KApp 直接渲染队列，可 `createModalService()` 等工厂自建——工厂本身暂不出 index 门面（公开面 = 实例 API）；
- 上下文走 `provide/inject`（Symbol key），是组件树注入、不穿 DOM；
  - Teleport 出口组件若需应用根，在 setup 期取 `useKApp()` 即可（注入沿组件父链，不受 teleport DOM 位置影响）；
- `root` 声明类型是 `HTMLElement`：`component` 传自定义组件时 ref 落组件实例，请传原生标签名。
