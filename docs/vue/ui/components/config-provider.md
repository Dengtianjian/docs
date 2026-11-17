# KConfigProvider 全局配置

> 共同约定见 [共同约定](./index.md)。运行时「作用域主题 + 全局配置」载体件——**非库启动必需项**：不装它，`import 'kit/vue/ui/css/index.css'` 一切照常。

## 何时使用

- 运行时换肤：主题数据来自接口/用户配置，需要把 seed 差量落到 DOM；
- 局部暗色 / 局部品牌色（子树独立，页级亮暗不受影响）；
- 组件级部件变量覆盖（`components.KButton.radius` 这类，不写 CSS 的声明式通道）。

## 代码演示

<Demo path="config-provider/theme" title="作用域主题" desc="只写 seed（主色 + 圆角），色板/状态/派生全由 CSS 表达式图自动铺——一变百变的声明式入口。" />

<Demo path="config-provider/scheme" title="子树独立暗色" desc="`scheme=dark` + `scoped`：wrapper 落 data-k-theme，子树内 light-dark() 就近解析成暗色，页面其它区域不受影响。站点导航的亮暗开关是同一机制的全局用法。" />

<Demo path="config-provider/components-token" title="组件级变量" desc="`components.KButton` 的键 = 部件变量去掉 `--k-button-` 前缀，数字自动加 px（lineHeight/zIndex 等无量纲键除外）。" />

<Demo path="config-provider/live-seed" title="响应式换肤" desc="theme 传 computed：改 seed → Provider 只重算差量 `<style>` 内容，不重建 DOM。导航栏取色器就是这条链路的站点级演示。" />

<Demo path="config-provider/wave-toggle" title="波纹全局开关" desc="`:wave=&quot;{ disabled: true }&quot;`（antd ConfigProvider.wave 同款形态）关闭子树内所有点击波纹；实例级 `KButton wave` prop 优先级更高，可单独强制开/关。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题：`ThemeConfig`（就地 `createTheme`）或已有 `ThemeResult`；可传响应式对象 | `ThemeConfig \| ThemeResult` | — |
| scheme | 亮暗指令；`auto` = 跟随系统/外层（**不写属性**，尊重宿主已有的强制控制） | `'auto' \| 'light' \| 'dark'` | `'auto'` |
| scoped | `true` = 只作用于子树（渲染 wrapper div + 作用域类）；`false` = 全局（变量写 `:root`，显式 light/dark 落 `<html>` 属性） | `boolean` | `false` |
| popupContainer | 弹层默认容器（Select/Tooltip/Popover/Popconfirm 消费）。缺省 body = `fixed` + scroll 跟随；指定元素 = 弹层 `absolute` 进容器文档流（随内容滚、被容器 overflow 裁切，static 容器自动补 `relative`，antd getPopupContainer 同款） | `HTMLElement \| (() => HTMLElement)` | — |
| defaults | 组件轴默认值，如 `{ KButton: { size: 'sm' } }`；**P1 组件尚未消费，随 P2 表单件接线**（机制已就位：`useProps()`） | `Record<string, Record<string, unknown>>` | — |
| wave | 点击波纹全局开关（antd ConfigProvider.wave 同款）：`disabled=true` 时子树内波纹组件（KButton）停发；嵌套 Provider 子覆盖父 | `{ disabled?: boolean }` | — |
| theme.breakpoints / locale | 规格预留（自定义断点、国际化），未实现 | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 受配置/主题作用的内容子树 |

无事件。

### 组合式 API（组件/业务侧消费面）

```ts
import { useKConfig, useProps } from 'kit/vue/ui'

const cfg = useKConfig()      // 无 Provider 时为全局缺省单例，永远可用
cfg.scopeClass                // 弹层/portal 必须绑定（Teleport 脱离 DOM 树后的主题续链）
cfg.defaults                  // 轴默认值（合并链：prop > 最近 Provider > 上层 > token 初始值）
```

## 工作原理（简）

1. `theme` 经 `createTheme` 编成**只含差量**的声明（未声明的变量靠级联继承，嵌套 Provider 天然合成、子覆父就近赢）；
2. 作用域 = **内容 hash 的稳定 class**（`k-scope-xxx`，SSR/CSR 一致），差量经 Teleport 注入 `<head>` 的 `<style>`——**绝不用行内 style 变量**（行内断链 Teleport 弹层，naive-ui 的已知翻车点）；注入选择器为 `.k-config-provider.k-scope-xxx`，且 theme.css 图块并列声明在 `.k-config-provider` 上，容器自身重算整图（见主题 Token 规格 §10.3 修订，2026-11-17）；
3. `cssText()` 键名字典序稳定排序：SSR 快照可比对、diff 可读。

## 注意事项

- 全局模式（`scoped=false`）：显式 `light/dark` 把属性写到 `<html>`；`auto` 不改写宿主已有属性（只回收本 Provider 自己写上的那次）——多 Provider 同时全局属于业务自己的仲裁，库不禁止但文档不推荐；
- 弹层类组件（P3+）有硬契约：portal 根必须绑 `cfg.scopeClass` 并渲染进 `cfg.getPopupContainer()`，「局部暗色区内的弹层跟随暗色」是验收用例。

---

## 规格附录（决策登记，面向贡献者）

- 职责封闭清单 = ①主题注入 ②自定义断点（未实现）③亮暗指令 ④非视觉全局配置；新增职责先进清单再实现；
- 明确不做：Provider 内计算 CSS 变量（级联自己算）、主题持久化（业务职责）、第二套主题模型、深合并（浅合并 + 编译期 `extend`）、CSS-in-JS 运行时；
- 实现与 v0.1 规格的两处偏离（以本文为准）：`scoped` 缺省改为 `false`（全局更符合「应用根挂一个」的主场景）；`config`/`getPopupContainer` 更名 `defaults`/`popupContainer`（与 K 前缀 prop 风格统一）；
- **亮暗链两条硬规则（2026-11-17 按压变压暗事故复盘）**：① `color-scheme: light dark` 缺省只在 `:root`，scoped 容器绝不重抄（`light dark` 的 used 值跟系统不跟祖先，会把强暗子树拉回亮档）；② 全局 Provider 的 `scheme=auto` 不得 `removeAttribute('data-k-theme')`（那可能是宿主站点开关的强制态），只回收自己写上的那次；
- 设计器是 playground 页面，消费本件而不是内嵌逻辑。
