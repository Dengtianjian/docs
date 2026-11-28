# KPopconfirm 确认气泡

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第三件。轻确认场景：在气泡里完成「确定/取消」，不打断页面上下文。

## 何时使用

- 低风险操作（删除一行、退出登录）就地确认；高破坏性操作或需要表单的，用 [KModal](./modal.md) 的 confirm。

## 代码演示

<Demo path="popconfirm/basic" title="基础 / 危险操作 / 异步 onOk" :desc="['confirm/cancel 事件回传原生点击。', 'ok-loading 期间确定钮转圈不即关，收尾（true→false）自动收起。', 'danger 确定钮走 KButton type=danger。', '默认插槽可整块覆盖文案区。']" />

<Demo path="popconfirm/trigger" title="条件触发" :desc="['确认气泡固定 click 打开；用受控 `open` + `update:open` 做业务条件拦截：名称非空才允许弹出。', '`disabled` 也可作为整体开关，关闭时点击不弹出。']" />

<Demo path="popconfirm/arrow" title="箭头开关" :desc="['`arrow` 控制确认气泡箭头，默认显示；两枚气泡并排对比。', '配合开关动态切换，箭头实时出现 / 消失。']" />

<Demo path="popconfirm/sizes" title="三档尺寸" :desc="['`size` 支持 `sm` / `md` / `lg`，标题 16/18/20、描述 14/16/18，内边距 12/16/20。', '实心图标固定 22px，图文间距 5px；标题不加粗。', '文案到操作区固定 16px；内置按钮同档跟随，sm 用 xs。']" />

<Demo path="popconfirm/placements" title="12 方位" :desc="['与 KTooltip/KPopover 共用 utils/overlay 基座，12 方位 + 自动翻转全覆盖。', '箭头逐位跟随触发器中心。']" />

<Demo path="popconfirm/render" title="自定义渲染（headless）" :desc="['双通道：`#render` 自绘危险确认卡（okLoading 异步收尾 true→false 自动关闭，逻辑照常生效）。', '`render` prop 自绘内联确认条（confirm/cancel 事件继承）。']" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 提示文案（默认插槽整块优先，其次 `title` 插槽） | `string` | — |
| description | 辅助说明（`description` 插槽优先） | `string` | — |
| icon | 消息前行图标 | `'warning' \| 'info'` | `'warning'` |
| okText | 确定钮文案 | `string` | `确定` |
| cancelText | 取消钮文案 | `string` | `取消` |
| okType | 确定钮类型 | `'primary' \| 'danger'` | `'primary'` |
| okLoading | 确定钮 loading：点确定不即关，`true→false` 收尾时自动关（受控 `open` 时同样发 `openChange`） | `boolean` | `false` |
| placement | 方位（12 方位 + 自动翻转，同 [KPopover](./popover.md)） | `KOverlayPlacement` | `'top'` |
| open / v-model:open | 受控开合 | `boolean` | — |
| disabled | 禁用弹出 | `boolean` | `false` |
| arrow | 显示箭头 | `boolean` | `true` |
| size | 卡片尺寸：字号、内边距、图标与内置按钮同步缩放 | `'sm' \| 'md' \| 'lg'` | `'md'` |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点确定钮 | `(e: MouseEvent)` |
| cancel | 点取消钮（外点/Esc 走 `openChange(false)`，不发 cancel） | `(e: MouseEvent)` |
| openChange | 开合变化（与 `update:open` 同发） | `(open: boolean)` |
| update:open | 受控开合（`v-model:open`） | `(open: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 触发元素（固定 click 触发） |
| default | 消息文案整块（覆盖 title/description 文案区） |
| title | 提示文案（无默认插槽时生效，覆盖 `title` prop） |
| description | 辅助说明（无默认插槽时生效，覆盖 `description` prop） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-popconfirm-bg / -radius / -padding` | `bg-elevated` / `border-radius-lg` / 随 size 档（sm/md/lg = 12/16/20px）；标题 sm/md/lg = 16/18/20，描述 14/16/18；`--k-popconfirm-icon-size = 22px`、`--k-popconfirm-gap = 5px`、`--k-popconfirm-action-gap = 16px`；内置按钮 sm = xs、md = md、lg = lg |
| `--k-popconfirm-min-width / -max-width` | `13×size / 24×size` |
| 图标着色 | `--k-color-warning` / `--k-color-info`（随 `icon`） |

## 注意事项

- 移动端（≤767px）：气泡最大宽度收为 `100vw - 24px`，避免超出屏幕。
- 默认图标为实心圆 + 镂空 warning / info 符号，容器固定 22px，图文间距 5px；标题常规字重，靠字号与描述区分层级。
- 文案区到操作区固定 16px；按钮同档跟随，sm 用 xs。

- **插槽语义**（2026-11-18 改判 naive 同款，破坏性）：`#trigger` 包触发元素、**默认插槽 = 消息文案整块**（覆盖 title/description 文案区）；无默认插槽时 `#title`/`#description` 部件插槽与同名 prop 照旧。

- **箭头指向**（2026-11-17 修正）：主方位弹层居中对齐、箭头天然在边中点；八个贴边方位弹层错位摆放，旧「箭头钉在边中点」会指空。
  - 现由基座 `useOverlayPosition` 输出 `--k-overlay-arrow-offset`（弹层本地主轴 px，按触发器中心计算并 clamp 进限位 `arrowKeepout`=半盒+圆角余量），CSS 只管换侧与形状。
  - 坑：限位别用 CSS `clamp()`——百分比与 px 混算在 left/top 上不生效，必须在 JS 端算。
- **箭头与进出场**（2026-11-17）：箭头 `--k-popconfirm-arrow-size: 8px`（同 KPopover）。
  - `Transition` 驱动进场 `k-popconfirm-zoom` / 退场 `k-popconfirm-zoom-out`（0.85 缩放 + 淡入淡出，`--k-motion-duration-fast`），退场播完才移除节点。

- 触发固定为 click（确认语义不该 hover 误触）；外点/Esc = 取消路径（发 `openChange(false)`，不发 `cancel`，与 antd 一致）。
- 弹层复用 `usePopup` 基座与出口契约，同 [KTooltip](./tooltip.md)。
- 按钮行内嵌 KButton（sm 档用 `xs`，md/lg 同档），样式随主题级联。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KPopconfirmRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| visible | `boolean` | 开合合成态：受控（原始 vnode props 含 `open` 键）取 `Boolean(open && !disabled)`，自管取内部开合态；自绘确认卡用它做 `v-if` 门控 |
| placement | `KOverlayPlacement` | **翻转后的实际方位**（基座 `useOverlayPosition` 的 actualPlacement，与 `popupAttrs['data-placement']` 同值；12 方位联合类型）；只在首选侧放不下且对侧放得下时翻转 |
| title | `string \| undefined` | 提示文案 prop 通道；默认插槽整块优先，其次 `title` 插槽（经 `slots.title` 取），最后落到它 |
| description | `string \| undefined` | 辅助说明 prop 通道（`description` 插槽优先，经 `slots.description` 取；仅无默认插槽时生效） |
| size | `KPopconfirmSize` | 尺寸档（`sm / md / lg`）；默认渲染据此缩放字号、内边距、图标与内置按钮 |
| icon | `'warning' \| 'info'` | 消息前行图标语义（默认 `'warning'` 感叹圈）；默认渲染着色 `--k-color-warning / -info`，自绘按它画图标或取色 |
| okText | `string` | 确定钮文案（默认 `'确定'`） |
| cancelText | `string` | 取消钮文案（默认 `'取消'`） |
| okType | `'primary' \| 'danger'` | 确定钮类型；默认渲染映射 KButton `type`（danger 危险操作红），自绘映射自己的按钮语义 |
| okLoading | `boolean` | 确定钮 loading 快照；自绘按钮据此转圈/禁点；**`true→false` 收尾 watch 自动 `setOpen(false)`**（受控 open 时同样只发事件由调用方关），headless 下照跑 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerEl | `Ref<HTMLElement \| null>` | 触发器节点 ref：定位锚点（量触发框）、外点判定「触发区内不关」的边界；`:ref="ctx.triggerEl"` 绑到自绘触发器，**必绑** |
| popupEl | `Ref<HTMLElement \| null>` | 确认卡节点 ref：两遍渲染测量（`offsetWidth/Height` 判翻转 + 箭头偏移量）、外点判定「弹层内不关」的依据；自绘弹层**必绑**，不绑定位不落地（style 停在 `visibility:hidden`） |
| teleportTarget | `HTMLElement \| string` | Teleport 目标（`usePopupHost` 出口契约）：缺省 `'body'`（fixed + scroll/resize 跟随）；KConfigProvider `popupContainer` 指定时为容器元素（函数形式读模板 ref，挂载瞬间 null 兜底 body）——absolute 进容器文档流、随内容滚、被容器裁切，static 容器自动补 relative。`<Teleport :to="ctx.teleportTarget">` 直接消费 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerAttrs | `Record<string, unknown>` | 触发器：仅 `data-part="trigger"`，无 ARIA/类；默认模板的 `span.k-popconfirm__trigger`（inline-block 包裹层）是视觉壳，自绘自理 |
| triggerOn | `Record<string, (e: Event) => void>` | 触发器事件：**仅 `click`**（触发固定 click，确认语义不该 hover 误触）——`!disabled` 守卫后 `setOpen(!visible)`；无 hover/focus 档，也因此**没有 popupOn 包**（无悬停容差逻辑） |
| popupAttrs | `Record<string, unknown>` | 弹层节点：`data-part="root"` + `class` 出口类 + `data-k-theme`（Provider scheme 非 auto 时）+ `data-placement`（实际方位）+ `role="dialog"` + `aria-modal="false"`（非模态浮层语义）+ `style` 定位包。**class 含 `k-popconfirm` token 宿主类**——`--k-popconfirm-*` 变量（bg/radius/padding/min-max-width/arrow-size）与 `z-index-popover` 都声明在它上面，必须保留否则 token 断链；另含 scoped Provider 的 `k-config-provider + scopeClass`。style = position（fixed/absolute）+ top/left + visibility（先隐藏测量再落位的两遍渲染）+ `--k-overlay-arrow-offset`（箭头主轴偏移 px，JS 端 clamp 进限位）。**卡片视觉壳不在包内**——`.k-popconfirm__card` 的背景/圆角/阴影、图标、文案区与按钮行全自绘（按钮点击绑 `onConfirm`/`onCancel`） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen(v) | `(v: boolean) => void` | 开/合确认卡：同值幂等；**受控双模**——受控（传了 `open`）只 emit 不改内部态，自管写内部开合态；两模都发 `update:open` + `openChange`。开启连带定位 watch（两遍渲染 + 挂 scroll/resize 跟随），关闭卸载监听 |
| onConfirm | `(e: MouseEvent) => void` | 确定动作（async）：先发 `confirm(e)` → `await nextTick()` 等一轮 flush（调用方在 confirm 处理器里同步置 `ok-loading`，props 下一帧才回读得到）→ `okLoading` 为 false 才 `setOpen(false)`；为 true 则保持展开，等 `true→false` 收尾 watch 自动关（受控时收尾同样只发事件） |
| onCancel | `(e: MouseEvent) => void` | 取消动作：发 `cancel(e)` + `setOpen(false)`（受控只发事件） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（trigger/default/title/description），自绘时可按需取用，如 `ctx.slots.default?.()` 整块接管文案区。

外点/Esc 关闭走 usePopupDismiss（发 openChange(false)，不发 cancel），headless 下照跑。
