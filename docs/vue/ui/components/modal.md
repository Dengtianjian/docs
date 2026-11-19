# KModal 对话框

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第四件。打断式对话框：声明式组件 + `useKApp().modal` 实例 API 双形态。

## 何时使用

- 需要用户在继续之前明确决策或补全信息时；就地轻确认用 [KPopconfirm](./popconfirm.md)。

## 代码演示

<Demo path="modal/basic" title="声明式（#trigger + 自管/受控）" desc="#trigger 点击即开；不传 open = 自管开合（X / 蒙层 / Esc 即关），传 v-model:open = 受控（trigger 只发 update:open）；center 落位、width、footer 纯插槽驱动。" />

<Demo path="modal/placement" title="九宫格屏幕落位" desc="`placement` 九值控制弹窗打开后停在视口哪一格（缘距：上/下 80、左/右 24、center 20）；zoom 动画原点仍走点击自动记录，与落位互不干涉；另附 `--k-modal-transform-origin` 动画原点 CSS 通道。" />

<Demo path="modal/draggable" title="拖拽 / 无遮罩 / 内容滚动" desc="`draggable` 按住标题栏拖动；`mask=false` 不压暗背景；长内容在 body 内滚动，标题与页脚固定。" />

<Demo path="modal/functional" title="实例 API：功能弹窗" desc="useKApp().modal：open + info/success/error/warning（类型图标）；不预设按钮，关闭统一 X / 蒙层 / Esc 触发 onClose；需要操作钮时在内容里自绘（handle.destroy 关闭）；draggable/mask/placement 同样可配。" />

<Demo path="modal/render" title="自定义渲染（headless）" desc="双通道：`#render` 自绘拖拽面板（headerOn 拖拽链 + translate 位移 + 原点变量全继承）；`render` prop 自绘居中 sheets。滚动锁/Esc/蒙层关闭/焦点移入照跑。" />

## API

### KModal 组件

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open / v-model:open | 开合：不传 = 组件自管（trigger 点击开、X/蒙层/Esc 关）；传 = 受控（组件自身交互只发事件不自动改值） | `boolean` | `false`（自管初始关） |
| title / content | 标题（支持 VNode）/ 默认插槽为空时的内容 | `string \| VNode` | — |
| icon | 标题前行图标（功能型弹窗用） | `string \| VNode` | — |
| width | 数值按 px，也可传 CSS 宽度串 | `number \| string` | `520` |
| placement | 九宫格屏幕落位：弹窗打开后停在视口哪一格（缘距沿用 wrap 留白：上/下排 80、左/右列 24、center 四边 20；取代旧 `centered`） | `'top-left' \| 'top' \| 'top-right' \| 'left' \| 'center' \| 'right' \| 'bottom-left' \| 'bottom' \| 'bottom-right'` | `'top'` |
| mask / maskClosable / keyboard | 蒙层 / 点蒙层关 / Esc 关 | `boolean` | `true` |
| closable | 右上关闭 X | `boolean` | `true` |
| draggable | 按住标题栏拖拽移动弹窗（naive 同款） | `boolean` | `false` |
| source | 动画原点覆盖元素（优先级：`source` > 最近 pointerdown 自动记录 > 中心缩放；与落位无关） | `Element` | — |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:open | 开合态变化（`v-model:open`；自管模式同步发出） | `(open: boolean)` |
| close | 关闭 X / 点蒙层 / Esc（均走 requestClose，与 open 对称） | `(e: MouseEvent \| KeyboardEvent)` |
| afterClose | 退场动画播完、节点移除后派发 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 触发元素（点击开弹窗；受控模式只发 `update:open(true)`） |
| title | 标题（仅 `title` prop 缺省时渲染） |
| default | 对话框内容（回退 = `content` prop） |
| footer | 页脚（纯插槽驱动：不传 `#footer` 则不渲染页脚区域；按钮完全由业务自绘） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 实例 API（`useKApp().modal`）

先在 `<KApp>` 子树里取实例，再调方法（文档站由主题在最外层统一挂 KApp；业务里自行包一层）：

```ts
import { useKApp } from 'kit/vue/ui'

const { modal } = useKApp()!   // 未挂 <KApp> 时 useKApp() 为 undefined
modal.success({ title: '发布成功', content: '版本号已锁定为 v2.3.0。', onClose: () => refresh() })
```

```
modal.open(props) / modal.info|success|error|warning(props) → { destroy() }
modal.destroyAll()
```

`props = KModalFuncProps`：`title/content/icon/width/mask/maskClosable/keyboard/draggable/placement/source/onClose/afterClose`。

- **不预设按钮**：弹窗只有标题 + 内容 + 右上 X，关闭统一走 X / 蒙层 / Esc（`maskClosable`/`keyboard` 默认开），触发 `onClose`，退场播完触发 `afterClose`。需要操作钮时在 `content`（VNode）里自绘，点它调 `handle.destroy()` 关闭。
- 功能型 = 类型图标（info/success/error/warning）+ 标题 + 内容；`open` 无图标；`icon` 传 `null` 关闭图标、传 VNode 自定义。
- `onClose` 与 `open` 对称（打开 open / 关闭 close）；实例 API 只挂在 KApp context（拍板③：无全局静态），无 KApp 时 `useKApp()` 为 `undefined`。

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-modal-bg` | `--k-color-bg-elevated` |
| `--k-modal-radius` | `--k-border-radius-lg` |
| `--k-modal-padding / -header-pad-x` | `calc(var(--k-size-lg) + var(--k-size-xxs))`（28px，头/底纵向） / `--k-size-lg`（24px，横向） |
| `--k-modal-mask-bg` | `rgb(0 0 0 / 45%)` —— 破格登记常数（遮罩语义 = 压暗，恒定黑不随主题反相，`--k-color-split` 同款先例） |
| `--k-modal-transform-origin` | `50% 50%` —— 动画原点统一通道：pointer 记录写内联，业务 CSS 覆写即自定义任意原点（与屏幕落位无关） |
| `--k-modal-max-height` | 上/下排 `calc(100vh - var(--k-size) * 10)` / 中排（left/center/right）`calc(100vh - var(--k-size-md) * 2)` —— dialog 限高（= 视口 − wrap 上下留白 80×2 / 20×2），超出由 body 内滚 |
| z 层级 | 根节点 `--k-z-index-modal`；蒙层在根上下文内 `--k-z-index-mask`、wrap 抬到 `mask+1`（弹窗恒压过蒙层，外点关闭判定在 wrap：`e.target === e.currentTarget` 才关） |

## 注意事项

- **插槽语义与开合模型**（2026-11-18 改判 naive 同款）：`#trigger` 包触发元素、点击即开，默认插槽 = 对话框内容（照旧）；**不传 `open` = 组件自管开合**（X/蒙层/Esc 即关），传 `open` = 受控照旧（trigger 与关闭交互都只发 `update:open`/`close`）。zoom 动画原点自动取 trigger 点击处。

- **不预设按钮 · open/close 对称**：弹窗不自带确定/取消钮，footer 纯 `#footer` 插槽驱动（不传插槽就不渲染页脚区域）。关闭统一走右上 X / 蒙层 / Esc，声明式发 `close` 事件、实例 API 触发 `onClose`——与 `open` 命名对称。需要操作钮时由业务在 footer 插槽或 `content` 里自绘。
- **原点缩放**（自动记录 + CSS 变量双通道）：dialog 挂载帧先 `visibility:hidden`，取触发源算 `transform-origin` 后放行 zoom 动画——弹窗从触发元素方向胀出；程序化打开（无新鲜点击）回落中心。实例 API 在点击处理器里调用，天然吃到自动通道。缩放幅度 0.3→1。业务 CSS 覆写 `--k-modal-transform-origin`（或 `styles.dialog`）可自定义任意动画原点（如 `20% 80%`）。
- **九宫格屏幕落位**（2026-11-17 改判，取代旧 `centered` 与误建的 `transformOrigin` prop）：`placement` 九值 = 弹窗打开后停在视口哪一格，wrap 用 flex `justify-content`（纵）× `align-items`（横）九宫格对齐；缘距沿用 wrap 留白（上/下排 80、左/右列 24、center 四边 20），中排限高换档 `100vh−40`、其余 `100vh−160`。落位写根节点 `data-placement`，业务 CSS 可按属性覆写对齐；**落位与动画原点互不干涉**（原点仍走自动 pointer 链）。
- **拖拽**（naive `draggable` 同款）：开启后整个标题栏是把手（`cursor: grab`），按住拖动移动弹窗；位移走独立 `translate` 属性，与 zoom 的 `transform: scale` 复合不冲突。关闭 X 区域不启动拖拽；重开自动回位。触屏经 pointer capture + `touch-action: none` 同样可拖。
- **无遮罩**：`mask=false` 去掉压暗蒙层，背景保持原样；wrap 仍拦截点击（点空白经 `maskClosable` 可关），滚动锁定等模态语义不变。
- **内容滚动**：dialog 限高 `--k-modal-max-height`（视口 − wrap 留白），超高时 **body 内部滚动**、标题/页脚固定（flex 列 + `min-height:0` + `overflow-y:auto`）；滚动条细轨 fill 阶梯色，`overscroll-behavior: contain` 不把滚动链传给背后页面。短内容不受影响。
- **进出场动画**（补退场）：`Transition` 挂在 root——进/退场 root 整体淡入淡出（`k-modal-fade-in/out`，时长 `--k-motion-duration-mid`；Transition 只读根节点动画判结束，子节点动画不算数），dialog 叠加 `k-modal-zoom`（0.3→1）/ `k-modal-zoom-out`（1→0.3）。退场期间 `is-zoomed` 保持真（否则 visibility 门会立刻藏掉 dialog），`after-leave` 才复位并发 `afterClose`；命令式 Holder 据此在退场播完后才真正出队（`closing` 标记）。

- 出口优先级：KApp root → ConfigProvider popupContainer → body；scoped Provider 下出口节点自带 `k-config-provider + scopeClass` 与 `data-k-theme`（契约④）。
- 打开时 `body` 滚动锁定（模块级计数，多模态叠层只由最后一个释放）。
- **焦点管理（focus trap）**：打开时记录原焦点并把焦点移入 dialog——优先 `[autofocus]`/`[data-autofocus]`，其次正文第一个可聚焦元素，再次 footer，最后 dialog 本身；Tab / Shift+Tab 在 dialog 内循环。退场结束后焦点还原到打开前元素（已卸载则跳过）。
- **叠层**：Esc 与 Tab 圈定只由最上层弹窗响应（模块级打开栈），关闭上层后焦点回到下层；dialog 带 `aria-modal="true"` + `aria-labelledby`（指向标题）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KModalRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| open | `boolean` | 开合合成态：受控（原始 vnode props 含 `open` 键）取 `props.open`，自管取内部开合态；自绘根/dialog 用它做 `v-if` 门控 |
| title | `string \| VNode \| undefined` | 标题 prop 通道（默认渲染仅它缺省时才取 `title` 插槽，自绘经 `slots.title` 取） |
| content | `string \| VNode \| undefined` | 内容 prop 通道（默认插槽为空时的回退，命令式服务用；自绘经 `slots.default` 取） |
| icon | `string \| VNode \| undefined` | 标题前行图标（功能型弹窗用）；自绘自行渲染 |
| width | `string` | **归一化后的 CSS 宽度值**（number prop 转 `${n}px`，字符串原样）；已经进 dialogAttrs.style，也可单独消费 |
| placement | `KModalPlacement` | 九宫格屏幕落位（`'top-left' \| 'top' \| 'top-right' \| 'left' \| 'center' \| 'right' \| 'bottom-left' \| 'bottom' \| 'bottom-right'`）；写进 rootAttrs 的 `data-placement`，落位 CSS（wrap flex 对齐 + 缘距 + 限高换档）由自绘自理 |
| mask | `boolean` | 是否应渲染压暗蒙层；false 时不画蒙层，但 wrap 外点判定与滚动锁等模态语义不变 |
| maskClosable | `boolean` | 点蒙层/空白是否关闭；wrapOn 的外点路径内部据此守卫 |
| keyboard | `boolean` | Esc 是否关闭；document keydown 监听随开合 watch 挂/卸（headless 照跑），只有打开栈最上层响应，处理器内据此守卫 |
| closable | `boolean` | 是否应渲染右上关闭 X；自绘关闭钮据此显隐并绑 `requestClose` |
| draggable | `boolean` | 头部拖拽总开关；headerOn 拖拽链内部据此守卫，dialogAttrs.style 也只在开启时携带 translate 位移 |
| dragging | `boolean` | 拖拽进行中（pointerdown → pointerup/cancel）；自绘可据此切 grab/grabbing 光标 |
| zoomed | `boolean` | **原点测好、动画放行标记**：打开 watch 先置 false → nextTick 测触发源原点（`source` prop > 最近 pointerdown 自动记录 > 无则中心）→ 置 true 并聚焦 dialog；默认模板靠 `is-zoomed` 类控 `visibility:hidden` 门与 zoom 动画，自绘用它做 dialog 可见性门/动画触发。**退场期间保持 true**（否则动画中途 dialog 被藏掉），`onAfterLeave` 才复位；退场中途重开会重起 zoom 并把拖拽位移归零 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| teleportTarget | `HTMLElement \| string` | Teleport 目标，优先级 **KApp root > ConfigProvider popupContainer（元素或函数）> `'body'`**；`<Teleport :to="ctx.teleportTarget">` 直接消费 |
| dialogEl | `Ref<HTMLElement \| null>` | dialog 节点 ref：原点测量（量 dialog 框相对触发源算 `--k-modal-transform-origin`）、焦点圈定根节点（Tab 循环与初始焦点都在它内部找）；`:ref="ctx.dialogEl"` 绑到自绘 dialog，**必绑**——不绑原点回落中心缩放、焦点圈定失效 |
| titleId | `string` | 标题节点 id；`dialogAttrs` 的 `aria-labelledby` 指向它，自绘标题节点需 `:id="ctx.titleId"`，否则读屏拿不到标题 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `class` 出口类（scoped Provider 的 `k-config-provider + scopeClass`，token 变量链靠它接续）+ `data-k-theme`（Provider scheme 非 auto 时）+ `data-placement`（九宫格落位标记，业务 CSS 可按属性覆写对齐）。**不含 `k-modal` token 宿主类**——`--k-modal-*` 变量（bg/radius/padding/max-height 等）与 `z-index-modal`、fixed inset 0 布局声明在 `.k-modal` 上，由默认模板追加；自绘要么自补 `k-modal` 类接 token，要么布局/层级全自理 |
| maskAttrs | `Record<string, unknown>` | 蒙层：仅 `data-part="mask"`；压暗视觉自绘（默认 `--k-modal-mask-bg` 恒定黑 45%、fixed inset 0、z-mask）；`mask=false` 时不渲染该节点 |
| wrapAttrs | `Record<string, unknown>` | 包裹层：仅 `data-part="wrap"`；九宫格 flex 对齐、缘距留白、抬层压过蒙层（默认 z = mask+1）全自绘——wrap 不抬层会被蒙层盖住，外点判定也失效 |
| wrapOn | `Record<string, (e: Event) => void>` | 包裹层：`click` 外点判定——**`e.target === e.currentTarget`（点到 wrap 本身的空白区）才算外点**，再经 `maskClosable` 守卫走 `requestClose(new MouseEvent('click'))`（合成事件）；点在 dialog 内冒泡上来不关 |
| dialogAttrs | `Record<string, unknown>` | dialog 节点：`data-part="dialog"` + `role="dialog"` + `aria-modal="true"` + `aria-labelledby`（有标题时指向标题节点 id）+ `tabindex="-1"`（焦点落点）+ **布局 style**：`width`（归一化值）+ draggable 开启时 `translate: "x y"`（独立 translate 属性承载拖拽位移，与 zoom 的 `transform: scale` 复合不冲突）+ `--k-modal-transform-origin`（测得的原点内联变量，动画 `transform-origin` 消费它）。**视觉壳不在包内**——背景/圆角/阴影/限高/overflow 与 `is-zoomed` 可见性门、zoom 动画全自绘（消费 `ctx.zoomed`） |
| headerAttrs | `Record<string, unknown>` | 头部：仅 `data-part="header"`；grab 光标、`touch-action: none`（触屏拖拽前提）等把手视觉自绘 |
| headerOn | `Record<string, (e: Event) => void>` | 头部拖拽链：`pointerdown`（守卫：draggable 开启、非拖拽中、鼠标仅左键、**`.k-modal__close` 区域豁免**——自绘关闭钮需保留该类名或自行排除；通过后 `setPointerCapture` 出窗不丢事件 + `preventDefault`）、`pointermove`（累计位移写 dragX/Y → dialogAttrs.style 的 translate 实时跟进）、`pointerup`/`pointercancel`（结束拖拽） |
| triggerOn | `Record<string, (e: Event) => void>` | 触发器：仅 `click` → `requestOpen()`。注意 scope **无 triggerAttrs**（`data-part="trigger"` 由默认模板加），自绘触发器语义标记自理 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| requestOpen() | `() => void` | 打开：**受控双模**——自管置内部开合态 true，受控（传了 `open`）只 emit 不改内部态；两模都发 `update:open(true)`（不发 close）。连带开合 watch：body 滚动锁（模块级计数，多模态叠层只由最后一个释放）、挂 document keydown（Esc/Tab 圈定，仅最上层响应）、压入打开栈、zoomed 复位 → 测原点 → 放行、拖拽位移归零（重开回位）、焦点移入（autofocus → 正文 → footer → dialog） |
| requestClose(e) | `(e: MouseEvent \| KeyboardEvent) => void` | 关闭：自管置内部开合态 false，受控只 emit；两模都发 `update:open(false)` + `close(e)`。关闭 X / 点蒙层（wrapOn 合成 MouseEvent）/ Esc（原生 KeyboardEvent）三路径共用；连带释放滚动锁计数、卸 Esc 监听、移出打开栈；zoomed/原点变量留到退场结束由 `onAfterLeave` 复位（退场动画期间 dialog 仍需可见） |
| onAfterLeave() | `() => void` | **自绘退场动画结束后必须调用**（默认模板挂 Transition `@after-leave`）：复位 `zoomed=false` + 清原点变量 + 还原打开前焦点（未卸载时）+ 发 `afterClose`；不调则 afterClose 不发、zoom 态不复位、焦点不还原（命令式 Holder 也据此才真正出队） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（trigger/title/default/footer），自绘时可按需取用，如 `ctx.slots.footer?.()`（页脚纯插槽驱动，不传就不画）。

headless 下滚动锁（模块计数）、Esc/Tab 焦点圈定（document 监听 + 打开栈）、原点测量、焦点移入/还原全在开合 watch 里照跑；Teleport/Transition 与九宫格落位 CSS 由调用方自管。
