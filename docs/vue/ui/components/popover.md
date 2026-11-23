# KPopover 卡片气泡

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第二件。可放标题+富内容的浮层卡片。

## 何时使用

- 需要在触发点旁展示结构化信息（详情卡、快捷表单、操作说明）时；纯文字说明用 [KTooltip](./tooltip.md)。

## 代码演示

<Demo path="popover/basic" title="触发 / closable / 插槽" :desc="['hover 容差移入不消失。', 'click + closable 卡片。', '#trigger 包触发元素，#title 部件插槽 + 默认插槽内容区放任意结构。']" />

<Demo path="popover/trigger" title="触发方式与条件" :desc="['`trigger` 支持 `hover` / `focus` / `click` 单值或数组组合。', '`disabled` 关闭触发：受开关控制的条件示例仅在开关打开时弹出。']" />

<Demo path="popover/arrow" title="箭头开关" :desc="['`arrow` 控制卡片箭头，默认显示；两枚卡片并排对比。', '配合开关动态切换，箭头实时出现 / 消失。']" />

<Demo path="popover/sizes" title="三档尺寸" :desc="['`size` 支持 `sm` / `md` / `lg`，内容 14/16/18、标题 16/18/20、内边距 12/16/20，关闭钮同步缩放。', '只影响弹层，触发器尺寸由业务控件决定。']" />

<Demo path="popover/placements" title="12 方位" :desc="['top/bottom/left/right 四主方位 ± Top/Bottom 对齐后缀 = 12 方位，主侧放不下且对侧放得下才翻转。', '箭头逐位跟随触发器中心（贴边方位不钉边中点）。']" />

<Demo path="popover/render" title="自定义渲染（headless）" :desc="['双通道：`#render` 自绘快捷菜单（click 触发，Teleport/定位/外点关闭全继承）。', '`render` prop 自绘墨线气泡（hover 延迟链照常生效）。']" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题（`title` 插槽优先） | `string` | — |
| content | 内容（默认插槽优先） | `string` | — |
| placement | 方位（同 KTooltip，12 方位 + 自动翻转） | `KOverlayPlacement` | `'top'` |
| trigger | 触发方式 | `'hover' \| 'focus' \| 'click'` 或数组 | `['hover','focus']` |
| mouseEnterDelay | 移入延迟（秒） | `number` | `0.1` |
| mouseLeaveDelay | 移出延迟（秒） | `number` | `0.1` |
| open / v-model:open | 受控开合 | `boolean` | — |
| disabled | 禁用弹出 | `boolean` | `false` |
| arrow | 箭头 | `boolean` | `true` |
| closable | 右上关闭 X | `boolean` | `false` |
| size | 卡片尺寸：字号、内边距、标题与关闭钮同步缩放 | `'sm' \| 'md' \| 'lg'` | `'md'` |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| openChange | 开合变化（与 `update:open` 同发） | `(open: boolean)` |
| update:open | 受控开合（`v-model:open`） | `(open: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 触发元素（事件绑在包裹层 `span.k-popover__trigger`） |
| default | 内容（覆盖 `content` prop，可放任意结构） |
| title | 卡片标题（覆盖 `title` prop） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-popover-bg` | `--k-color-bg-elevated`（弹层卡面标准底） |
| `--k-popover-radius / -padding` | `border-radius-lg` / 随 size 档（sm/md/lg = 12/16/20px）；标题 16/18/20、内容 14/16/18，关闭钮同步缩放；标题常规字重 |
| `--k-popover-min-width / -max-width` | `13×size / 40×size`（sm 12×、lg 18×/48×） |
| `--k-popover-arrow-size` | `8px` 常数 |

## 注意事项

- 触屏（`hover: none`）下未显式传 `trigger` 时默认改为 `click` 触发，避免 hover 语义在移动端失效；显式 `trigger` 仍完全按传入值执行。

- **插槽语义**（2026-11-18 改判 naive 同款，破坏性）：`#trigger` 包触发元素、**默认插槽 = 内容区**；旧 `#content` 插槽别名已删（`content` prop 保留兜底）；`#title` 为卡片标题部件插槽，照旧。

- **箭头指向**（2026-11-17 修正）：主方位弹层居中对齐、箭头天然在边中点；八个贴边方位弹层错位摆放，旧「箭头钉在边中点」会指空。
  - 现由基座 `useOverlayPosition` 输出 `--k-overlay-arrow-offset`（弹层本地主轴 px，按触发器中心计算并 clamp 进限位 `arrowKeepout`=半盒+圆角余量），CSS 只管换侧与形状。
  - 坑：限位别用 CSS `clamp()`——百分比与 px 混算在 left/top 上不生效，必须在 JS 端算。
- **进出场动画**（2026-11-17 补退场）：`Transition` 驱动——进场 `k-popover-zoom`（0.85→1 + 淡入），退场 `k-popover-zoom-out` 反向，时长 `--k-motion-duration-fast`；退场播完才移除节点。

- 与 [KTooltip](./tooltip.md) 共用 `usePopupHost/useOverlayPosition/usePopupDismiss` 基座；出口契约、翻转语义见 tooltip 页注意事项。
- 触发器始终带 `aria-haspopup/aria-expanded`，展开时 `aria-controls` 指向弹层；弹层有标题时带 `aria-labelledby`。Esc 关闭由共用 dismiss 基座处理。
- closable 的 X 只关气泡（走 `setOpen(false)`），受控时同样只发事件；无标题时也渲染（卡片右上角），不再依赖标题行。
- 内容区可放表单控件；focus 触发 + 内容可聚焦元素组合时建议改用 `trigger="click"`（focusout 会在焦点移入内容前触发关闭）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KPopoverRenderScope`（入口导出），与 [KTooltip](./tooltip.md) 同构，四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| visible | `boolean` | 开合合成态：受控（原始 vnode props 含 `open` 键）取 `Boolean(open && !disabled)`，自管取内部开合态；无「空内容不弹」门（与 KTooltip 不同，空内容也弹）；自绘卡片用它做 `v-if` 门控 |
| placement | `KOverlayPlacement` | **翻转后的实际方位**（基座 `useOverlayPosition` 的 actualPlacement，与 `popupAttrs['data-placement']` 同值；12 方位联合类型）；只在首选侧放不下且对侧放得下时翻转 |
| title | `string \| undefined` | 卡片标题 prop 通道（`title` 插槽优先，经 `slots.title` 取）；有标题或标题插槽时默认渲染才画标题行 |
| content | `string \| undefined` | 内容 prop 通道（默认插槽优先，经 `slots.default` 取，可放任意结构） |
| size | `KPopoverSize` | 尺寸档（`sm / md / lg`）；默认渲染据此缩放字号、内边距、标题与关闭钮，卡面样式与 KPopconfirm 对齐 |
| closable | `boolean` | 是否应渲染右上关闭 X；自绘关闭钮据此显隐，点击走 `setOpen(false)`（受控同样只发事件） |
| arrow | `boolean` | 是否应渲染箭头；箭头节点与形状自绘（可消费 style 里的 `--k-overlay-arrow-offset` 偏移变量） |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerEl | `Ref<HTMLElement \| null>` | 触发器节点 ref：定位锚点（量触发框）、外点判定「触发区内不关」的边界；`:ref="ctx.triggerEl"` 绑到自绘触发器，**必绑** |
| popupEl | `Ref<HTMLElement \| null>` | 卡片弹层节点 ref：两遍渲染测量（`offsetWidth/Height` 判翻转 + 箭头偏移量）、外点判定「弹层内不关」的依据；自绘弹层**必绑**，不绑定位不落地（style 停在 `visibility:hidden`） |
| teleportTarget | `HTMLElement \| string` | Teleport 目标（`usePopupHost` 出口契约）：缺省 `'body'`（fixed + scroll/resize 跟随）；KConfigProvider `popupContainer` 指定时为容器元素（函数形式读模板 ref，挂载瞬间 null 兜底 body）——absolute 进容器文档流、随内容滚、被容器裁切，static 容器自动补 relative。`<Teleport :to="ctx.teleportTarget">` 直接消费 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerAttrs | `Record<string, unknown>` | 触发器：`data-part="trigger"` + `aria-haspopup="dialog"` + `aria-expanded`（随开合）+ 展开时 `aria-controls` 指向弹层 id；默认模板的 `span.k-popover__trigger`（inline-block 包裹层）是视觉壳，自绘自理 |
| triggerOn | `Record<string, (e: Event) => void>` | 触发器事件：`mouseenter`/`mouseleave`（hover 档走 `mouseEnterDelay`/`mouseLeaveDelay` 延迟链，单位秒；开启路径有 disabled 守卫）、`focusin`/`focusout`（focus 档同延迟链）、`click`（click 档 `setOpen(!visible)`）；`trigger` 组合决定哪些事件实际生效，未配置的档空转 |
| popupAttrs | `Record<string, unknown>` | 弹层节点：`id`（供触发器 aria-controls）+ `data-part="root"` + `class` 出口类 + `data-k-theme`（Provider scheme 非 auto 时）+ `data-placement`（实际方位）+ `role="dialog"` + `aria-modal="false"`（非模态浮层语义）+ 有标题时 `aria-labelledby` 指向标题节点 + `style` 定位包。**class 含 `k-popover` token 宿主类**——`--k-popover-*` 变量（bg/color/title-color/radius/padding/min-max-width/arrow-size）与 `z-index-popover` 都声明在它上面，必须保留否则 token 断链；另含 scoped Provider 的 `k-config-provider + scopeClass`。style = position（fixed/absolute）+ top/left + visibility（先隐藏测量再落位的两遍渲染）+ `--k-overlay-arrow-offset`（箭头主轴偏移 px，JS 端 clamp 进限位）。**卡片视觉壳不在包内**——`.k-popover__card` 的背景/圆角/阴影/宽度限制、标题行与关闭 X 全自绘 |
| popupOn | `Record<string, (e: Event) => void>` | 弹层悬停容差：`mouseenter`（hover 档清掉待关计时器——移入卡片不消失）、`mouseleave`（hover 档按 `mouseLeaveDelay` 延迟关闭） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen(v) | `(v: boolean) => void` | 开/合卡片：同值幂等；**受控双模**——受控（传了 `open`）只 emit 不改内部态，自管写内部开合态；两模都发 `update:open` + `openChange`。开启连带定位 watch（两遍渲染 + 挂 scroll/resize 跟随），关闭卸载监听；closable 的 X、外点（document `pointerdown` capture，触发区/弹层内不关）与 Esc 均经它关闭（受控同样只发事件） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（trigger/title/default），自绘时可按需取用，如 `ctx.slots.title?.()`。

自绘时 Teleport/Transition 由调用方自管（组件不再输出）；定位两遍渲染（先隐藏测量再落位）在 popupAttrs.style 里照跑。
