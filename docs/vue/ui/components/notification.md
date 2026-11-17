# KNotification 通知

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第五件（原与 message 同页，现拆出独立文档）。带标题+描述+操作的结构化系统通知：声明式卡片组件 `KNotification` + `useKApp().notification` 实例 API 双形态，功能面对齐 antd v6。

## 何时使用

- 后台系统主动推送的结构化通知（成功/失败/待办），比 [KMessage](./message.md) 信息量大、可放操作区。
- 渲染在页面流里持续可见的警告条用 [KAlert](./alert.md)。

## 代码演示

<Demo path="notification/basic" title="弹出位置 + 操作区" desc="placement 六方位（top/bottom 水平居中）；actions 操作区（VNode 按钮）；duration=0 常驻走关闭钮。" />

<Demo path="notification/progress" title="倒计时进度条 + 悬停暂停" desc="showProgress 底部进度条与自动关闭同源计时；pauseOnHover（默认开）悬停时计时与进度条同步冻结。" />

<Demo path="notification/update" title="同 key 原地更新" desc="info → warning → success/error 三段式：同 key 不叠条，原位换内容、计时从头、进场动画不重放。" />

<Demo path="notification/scroll" title="滚动容器 + maxCount" desc="条数超出视口列内滚动（卡片保持自然高度不压扁，溢出列显细滚动条并可拖拽）；config({ maxCount }) 超限挤掉最旧一条。差异登记：antd 默认溢出走 stack 收起，本库按滚动实现。" />

<Demo path="notification/render" title="自定义渲染（headless，声明式卡片）" desc="双通道：`#render` 自绘 toast 卡（type 驱动强调色，rootOn/onClose 继承 click/close 事件）；`render` prop 自绘 snackbar。仅声明式卡片支持；实例队列的计时/动画由 Holder 驱动，不在 headless 契约内。" />

## API

### KNotification 组件（声明式卡片）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title / description / actions | 三段内容（antd v6 语义；`actions` 即旧 `btn`） | `string \| VNode` | — |
| type | 类型图标着色 | `'info' \| 'success' \| 'error' \| 'warning'` | — |
| icon | 覆盖类型图标 | `string \| VNode \| null` | — |
| closable / closeIcon | 关闭钮显隐 / 图标（`null` 不渲染） | `boolean` / `string \| VNode \| null` | `true` / 内建 X |
| showProgress / progressDuration | 倒计时条 / 时长（秒，实例队列由 duration 注入） | `boolean` / `number` | `false` |
| pauseOnHover | 悬停冻结进度条动画 | `boolean` | `true` |
| role | 无障碍角色 | `'alert' \| 'status'` | `'alert'` |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KNotificationRenderScope) => VNodeChild` | — |
| classNames / styles | 语义部件覆盖（下表） | — | — |

#### Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 图标（回退 = `icon` prop 或类型 SVG） |
| title | 标题（回退 = `title` prop） |
| description | 描述（回退 = `description` prop） |
| actions | 操作区（回退 = `actions` prop） |
| close | 关闭钮图标（回退 = `closeIcon` prop 或内建 X） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无默认插槽（同名插槽均覆盖对应 prop）。

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 点关闭钮（`.stop` 不冒泡到卡片 click） | `(e: MouseEvent)` |
| click | 点卡片根节点 | `(e: MouseEvent)` |

### 实例 API（`useKApp().notification`）

先在 `<KApp>` 子树里取实例（上方示例即此结构），再调方法：

```ts
import { useKApp } from 'kit/vue/ui'

const { notification } = useKApp()!   // 未挂 <KApp> 时 useKApp() 为 undefined
notification.success({ title: '保存成功' })
```

```
notification.open(config) → { destroy() }
notification.info|success|error|warning(config) → { destroy() }
notification.destroy(key) / destroyAll()
notification.config(options)   // 实例级全局默认，合入其后每次 open
```

| config 字段 | 说明 | 默认 |
| --- | --- | --- |
| title / description | 标题 / 描述 | — |
| actions | 底部操作区 VNode（`btn` 为弃用别名，自动转发） | — |
| type / icon | 同组件 | — |
| duration | 自动关闭秒数；`0` / `false` = 常驻 | `4.5` |
| placement | 六方位 | `'topRight'` |
| closable | `false` 隐藏关闭钮；对象 `{ closeIcon, onClose }` 自定义 | `true` |
| closeIcon | 关闭钮图标；`null` 不渲染 | 内建 X |
| showProgress / pauseOnHover | 倒计时条 / 悬停暂停（计时与条同步） | `false` / `true` |
| role / key / onClick / onClose | 同 message 语义 | `'alert'` |
| classNames / styles | 语义部件覆盖 | — |

| config() 字段 | 说明 |
| --- | --- |
| top / bottom | 上下缘距离（px，缺省 `--k-size`），滚动高度上限随之换算 |
| placement / duration / closeIcon / showProgress / pauseOnHover | 对应默认值 |
| maxCount | 同列数量上限，超限挤掉最旧一条（直接移除，无退场动画） |

### 语义 DOM

`root / icon / section / title / description / actions / close / progress` 八部件：根 `data-part="root"`，其余同名 `data-part` + `k-notification__*` 类；`classNames`/`styles` 逐部件覆盖。列表容器另在 Holder：`data-part="list"`。

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-notification-bg / -radius / -padding` | `--k-color-bg-elevated` / `--k-border-radius-lg` / `--k-size`（16px） |
| `--k-notification-accent` | 按 type 取语义色（`--k-color-info/success/error/warning`），图标与进度条共用；无 type 走 `--k-color-primary` |
| 列宽 / 条间隔 / 缘距 | `16×size`（256px）/ `size`（margin 实现，塌陷动画可归零）/ `size` 或 config top/bottom |
| 滚动 | 列 `max-height: 100vh − 上下缘距 + 留白带`，超出 `overflow-y: auto`；卡片 `flex-shrink: 0` 钉自然高度（flex 列子项默认可压缩，超高会压扁卡片而非溢出）；溢出列加 `is-scrollable`：显细轨滚动条（fill 阶梯色，Modal body 同款）+ 整列恢复 `pointer-events: auto`；未溢出列滚动条隐藏、列 `pointer-events: none` 不挡背后页面。卡片阴影 = `--k-box-shadow`（antd notification 同款三层匀开淡影），留白带按其外溢逐边取（横 36 / 上 28 / 下 46），负 margin 回补卡片视觉缘距 |
| z 层级 | `--k-z-index-notification` |

## 注意事项

- **动画**（对齐 antd v6）：进场从所在边缘滑入（`k-notification-in`，方向随列）；退场高度塌陷——JS 先锁定当前 `height`，`is-closing` 类把 height/margin/padding/opacity 一并过渡归零，后续条目平滑补位，`transitionend(height)` 后真正移除（320ms 兜底，动画关闭的降级主题也能收口）。
- **滚动 vs stack**：antd 默认溢出走 stack 收起（悬停展开），本库按可滚动列表实现（用户拍板 2026-11-17；antd v6 list 语义本身含滚动区域）。stack 登记为待办。
- **同 key 更新**：原位替换、换新内部 id 重挂载——计时从头、进场动画抑制（`is-static`），列表位置不动、不叠条。
- **pauseOnHover**：悬停同时冻结 JS 关闭计时器与 CSS 进度条动画（离开续跑剩余量），二者严格同步。
- **进度条随卡片圆角**：贴底 2px 直边条由卡片 `overflow: hidden` + 自身圆角统一裁切。别给 track 单独做 bottom radius——2px 高的盒子做 8~12px 半径会被 CSS 半径缩放规则压到 ~1px，裁不出卡片轮廓（底带处轮廓内收可达 5px+）。
- 实例 API 只在 KApp 之下可用（拍板③：无全局静态）；Holder 出口 Teleport 到 body 并按契约④携带 `scopeClass`/`data-k-theme`。
- **滚动交互**（2026-11-17 修正）：未溢出列 `pointer-events: none`、卡片 `auto`（不挡背后页面）；Holder 逐列检测 `scrollHeight > clientHeight`（items/config 变化与窗口 resize 时同步），溢出列加 `is-scrollable` 恢复整列交互——滚轮在条间隔/留白带上、滚动条拖拽均生效，细轨滚动条仅此时可见。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。**仅声明式卡片 `KNotification` 支持**；`useKApp().notification` 实例 API 服务驱动，无 headless 契约。scope = `KNotificationRenderScope`（入口导出），字段逐组如下（无内部开合态的纯卡片件：只有状态 + 绑定包 + 单个关闭动作，无 ref/出口组）。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| title | `string \| VNode \| undefined` | 标题 prop 通道（`title` 插槽优先，经 `slots.title` 取） |
| description | `string \| VNode \| undefined` | 描述 prop 通道（`description` 插槽优先，经 `slots.description` 取） |
| actions | `string \| VNode \| undefined` | 底部操作区 prop 通道（antd v6 语义，旧名 `btn` 由 service 兼容转发；`actions` 插槽优先，经 `slots.actions` 取） |
| type | `KNotificationType \| undefined` | 类型（别名 = `'info' \| 'success' \| 'error' \| 'warning'`）；默认渲染据此切 `--k-notification-accent` 强调色（图标与进度条共用，无 type 走 primary），自绘可映射自己的语义色并决定类型图标 |
| icon | `string \| VNode \| null \| undefined` | 覆盖类型图标；**`null` = 强制无图标**（`icon` 插槽仍可经 `slots.icon` 取） |
| closable | `boolean` | 是否应渲染关闭钮（默认 true）；自绘关闭钮据此显隐并绑 `onClose` |
| closeIcon | `string \| VNode \| null \| undefined` | 关闭钮自定义图标；**`null` = 不渲染关闭钮**（与 closable 是与关系）；缺省走内建 X 或 `slots.close` |
| showProgress | `boolean` | 是否应渲染倒计时进度条（默认 false）；默认渲染还须 `progressDuration` 有值才画；声明式卡片**无自动关闭计时**（计时由实例队列 Holder 驱动），自绘进度条动画与关闭时机全自理 |
| progressDuration | `number \| undefined` | 进度条时长（秒；实例队列由 duration 注入）；默认渲染写进 bar 的 `animationDuration: ${n}s`，自绘可据此配自己的倒计时动画 |
| pauseOnHover | `boolean` | 悬停冻结进度条动画（默认 true）；默认渲染靠 `is-hover-pause` 类 + `:hover` 暂停 CSS 动画（实例队列的 JS 计时由 Holder 同步暂停），自绘自行实现悬停暂停 |
| role | `'alert' \| 'status'` | 无障碍角色（默认 `'alert'`）；已随 rootAttrs 输出，单列出来供自绘判断/覆写 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 卡片根节点：`data-part="root"` + `role`（alert/status 随 prop）。**不含 `k-notification` token 宿主类**——`--k-notification-*` 变量（bg/radius/padding/accent 语义色链）声明在 `.k-notification` 上，由默认模板追加（连同 `k-notification--<type>`、`is-hover-pause`）；自绘背景/圆角/阴影全自理，想复用 token 可自行补类 |
| rootOn | `Record<string, (e: Event) => void>` | 卡片根节点：仅 `click` → 发 `click(e)` 事件（点卡片整面回调）；无其它事件 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| onClose | `(e: MouseEvent) => void` | 关闭动作：**只发 `close(e)` 事件，不自隐**——声明式卡片无内部开合态，显隐由调用方（或实例队列 Holder 监听 close 后做高度塌陷退场）决定；自绘关闭钮记得 `.stop` 阻止冒泡，否则会连带触发 rootOn 的卡片 click |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（icon/title/description/actions/close，**无默认插槽**），自绘时可按需取用，如 `ctx.slots.actions?.()`。
