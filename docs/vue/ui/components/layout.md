# KLayout 组

> 共同约定见 [共同约定](./index.md)。页面级骨架五件套：KLayout / KLayoutHeader / KLayoutSider / KLayoutContent / KLayoutFooter。

## 何时使用

- 应用外壳、文档页、设置面板等「头-体-脚 / 左树右表」结构；
- 纯结构件（flex 骨架 + 背景分层），**不含任何交互逻辑**——Sider 折叠属 P4 Menu 场景，本批不提供（避免半成品交互）。

## 代码演示

<Demo path="layout/top" title="上下布局" desc="Header / Content / Footer 纵向堆叠；Content 是 flex:auto 的滚动容器。" />

<Demo path="layout/sider" title="左右布局" desc="嵌套一个 `has-sider` 的 KLayout 即得经典后台骨架；Sider 固定宽、Content 自适应并可滚动。" />

<Demo path="layout/render" title="自定义渲染（headless）" desc="五子件各自 headless：高度/宽度变量随 rootAttrs 注入（显式传值才落），骨架视觉全自绘。" />

## API

### KLayout Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hasSider | 子级含 Sider → 本层主轴变横向 | `boolean` | `false` |

<CommonProps />

### 子件 Props

| 组件 | 属性 | 说明 | 默认值 |
| --- | --- | --- | --- |
| KLayoutHeader | height | 高度（px） | 64（CSS 回退） |
| KLayoutSider | width | 宽度（px） | 208 = 16×13 模度（CSS 回退） |
| KLayoutFooter | height | 高度（px） | 64（CSS 回退） |
| KLayoutContent | — | 无专属 props，`main` 语义 + `overflow:auto` | — |

### DOM 语义

`section / header / aside / main / footer`——地标元素即无障碍结构，无需额外 role。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 五件套（KLayout / Header / Sider / Content / Footer）均为默认插槽放各自内容 |
| render | 自定义渲染作用域插槽（五子件各自支持），scope 见文末「自定义渲染」节；提供时整件替换 |

无事件（纯结构件，Sider 折叠留 P4 Menu 场景）。

## 主题定制（部件变量）

| 变量 | 缺省回退 | 说明 |
| --- | --- | --- |
| `--k-layout-header-height` | `64px` | prop 显式传值才落内联；主题层用 `components.KLayoutHeader.height` 覆盖 |
| `--k-layout-sider-width` | `208px` | 同上（`KLayoutSider.width`） |
| `--k-layout-footer-height` | `64px` | 同上（`KLayoutFooter.height`） |

背景分层：Layout = `--k-color-bg-layout`，Header/Sider/Footer = `--k-color-bg-container`，Content 透明——亮暗下自动成立。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。五子件各有 scope（入口导出），均含 `rootAttrs` 与 `slots`。纯结构件零行为，无 ref / 动作组；各 scope 逐字段如下（接口没有的组不列）：

**`KLayoutRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| hasSider | `boolean` | 子级是否含 Sider（缺省 `false`，须显式声明——组件不按插槽内容自动判断）；默认渲染 `true` 时落 `k-layout--has-sider` 类把主轴从 column 切 row，自绘按值决定 `flex-direction` |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象，**无 style**）。**不含任何 class**——`k-layout` 的 `display:flex; flex:auto; flex-direction:column; min-height:0` 骨架与 `--k-color-bg-layout` 背景全自绘；默认渲染根为 `section` 地标元素，自绘建议保留语义标签；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 骨架子内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KLayoutHeaderRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| height | `number \| undefined` | 高度 prop 原始值（px）；`undefined` = 未传，此时走 createTheme 组件令牌（`components.KLayoutHeader.height`）→ CSS 回退 `64px` 的优先级链，scope 不解析最终像素 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（**显式传 height 才注入** `--k-layout-header-height: {height}px`，缺省为空对象——保证令牌/CSS 回退链不被内联压死）。**不含任何 class**——`k-layout-header` 的 `display:flex; align-items:center; flex:none; height:var(--k-layout-header-height, 64px)` 消费、`padding-inline` 与 `--k-color-bg-container` 背景全自绘；默认渲染根为 `header` 地标元素；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 页头内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KLayoutSiderRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| width | `number \| undefined` | 宽度 prop 原始值（px）；`undefined` = 未传，走 createTheme（`components.KLayoutSider.width`）→ CSS 回退 `208px`（16×13 模度）。折叠交互不存在（P4 Menu 场景），无相关状态 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（**显式传 width 才注入** `--k-layout-sider-width: {width}px`，缺省为空对象）。**不含任何 class**——`k-layout-sider` 的 `flex:none; width:var(--k-layout-sider-width, 208px); overflow:auto` 与 `--k-color-bg-container` 背景全自绘；默认渲染根为 `aside` 地标元素；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 侧栏内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KLayoutContentRenderScope`**：

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象，无 style；本件无专属 props，故 scope 无状态字段）。**不含任何 class**——`k-layout-content` 的 `flex:auto; min-height:0; overflow:auto`（嵌套滚动正确性的关键两条）与透明背景全自绘；默认渲染根为 `main` 地标元素；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 主内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KLayoutFooterRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| height | `number \| undefined` | 高度 prop 原始值（px）；`undefined` = 未传，走 createTheme（`components.KLayoutFooter.height`）→ CSS 回退 `64px` |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（**显式传 height 才注入** `--k-layout-footer-height: {height}px`，缺省为空对象）。**不含任何 class**——`k-layout-footer` 的 `display:flex; align-items:center; flex:none; height:var(--k-layout-footer-height, 64px)` 消费、`padding-inline` 与 `--k-color-bg-container` 背景全自绘；默认渲染根为 `footer` 地标元素；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 页脚内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- 尺寸优先级 = prop（内联）> createTheme 组件令牌（`.k-layout-header` 差量块）> CSS 回退值——所以 prop 缺省时**不落内联样式**；
- 不提供响应式自动收起：断点判断属于业务 + Menu 组件职责，结构件保持零平台判断；
- Content `flex: auto; min-height: 0` 保证嵌套滚动正确。
