# KTooltip 文字提示

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第一件。悬停/聚焦/点击触发的轻量文字提示。

## 何时使用

- 图标按钮、截断文字等需要补充说明但不值得占用版面时。
- 需要放标题+内容卡片的，用 [KPopover](./popover.md)；需要确认操作的，用 [KPopconfirm](./popconfirm.md)。

## 代码演示

<Demo path="tooltip/basic" title="方位 / 触发 / 受控" :desc="['12 方位（top 系/bottom 系/left 系/right 系 ± 对齐后缀）。', 'trigger 支持 hover/focus/click 组合。', 'v-model:open 受控。', '#trigger 包触发元素、默认插槽放富内容（content/title prop 兜底）。', '空内容不弹泡。']" />

<Demo path="tooltip/trigger" title="触发方式与条件" :desc="['`trigger` 支持 `hover` / `focus` / `click` 单值或数组组合。', '`disabled` 关闭触发：受开关控制的条件示例仅在开关打开时弹出。']" />

<Demo path="tooltip/arrow" title="箭头开关" :desc="['`arrow` 控制气泡箭头，默认显示；两枚气泡并排对比。', '配合开关动态切换，箭头实时出现 / 消失。']" />

<Demo path="tooltip/sizes" title="三档尺寸" :desc="['`size` 支持 `sm` / `md` / `lg`，字号、内边距与最大宽度同步缩放。', '只影响气泡，触发器尺寸由业务控件决定。']" />

<Demo path="tooltip/placements" title="12 方位全览" :desc="['四主方位 ± 对齐后缀共 12 个，逐位悬停查看。', '箭头逐位跟随触发器中心（贴边方位不钉边中点）。']" />

<Demo path="tooltip/container" title="弹层容器契约" :desc="['popup-container 指定挂载盒：气泡 absolute 进容器文档流，随内容滚动、被盒边界裁切（Select/Popover/Popconfirm 同语义）。', '缺省 body 仍 fixed + scroll 跟随。']" />

<Demo path="tooltip/render" title="自定义渲染（headless）" desc="`#render` 插槽 / `render` prop 整件替换：触发器与气泡全自绘，ref/attrs/on 绑定包散播后延迟、定位、翻转、主题、受控逻辑照常生效。" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容（默认插槽优先） | `string \| VNode` | — |
| title | 提示内容别名（antd 同名兼容；优先级低于 `content`） | `string \| VNode` | — |
| placement | 方位（主侧放不下且对侧放得下时自动翻转，翻转结果写回 `data-placement`） | `KOverlayPlacement`（12 方位） | `'top'` |
| trigger | 触发方式，可组合 | `'hover' \| 'focus' \| 'click'` 或数组 | `['hover','focus']` |
| mouseEnterDelay | 移入延迟（秒） | `number` | `0.1` |
| mouseLeaveDelay | 移出延迟（秒；leave 容差留出移入弹层的时间） | `number` | `0.1` |
| open / v-model:open | 受控开合 | `boolean` | — |
| disabled | 禁用弹出 | `boolean` | `false` |
| arrow | 显示箭头 | `boolean` | `true` |
| size | 气泡尺寸：字号、内边距、最大宽度同步缩放 | `'sm' \| 'md' \| 'lg'` | `'md'` |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| openChange | 开合变化（与 `update:open` 同发） | `(open: boolean)` |
| update:open | 受控开合（`v-model:open`） | `(open: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| trigger | 触发元素（事件绑在包裹层 `span.k-tooltip__trigger`） |
| default | 提示内容（覆盖 `content`/`title` prop，可放富内容） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换（含 Teleport/Transition） |

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-tooltip-bg` | `--k-color-bg-spotlight`（压暗提示底，antd 同款语义） |
| `--k-tooltip-color` | `--k-color-text-light-solid` |
| `--k-tooltip-radius / -padding / -font-size` | `border-radius` / 随 size 档 / 随 size 档（sm/md/lg = 12/14/16px） |
| `--k-tooltip-arrow-size` | `8px` 常数（等腰直角三角形半对角，外露 ≈5.7px 略探过 gap 贴住触发器） |

## 注意事项

- 触屏（`hover: none`）下未显式传 `trigger` 时默认改为 `click` 触发，避免 hover 语义在移动端失效；显式 `trigger` 仍完全按传入值执行。

- **插槽语义与内容通道**（2026-11-18 改判 naive 同款，破坏性）：`#trigger` 包触发元素、**默认插槽 = 显示内容**。
  - 内容优先级 默认插槽 > `content` prop > `title` prop（`title` 为 antd 同名兼容别名）。
  - 旧 `#content`/`#title` 插槽别名已删。
  - 各通道皆空时不弹空泡（hover/focus/click 均静默）。

- **箭头指向**（2026-11-17 修正）：主方位弹层居中对齐、箭头天然在边中点；八个贴边方位弹层错位摆放，旧「箭头钉在边中点」会指空。
  - 现由基座 `useOverlayPosition` 输出 `--k-overlay-arrow-offset`（弹层本地主轴 px，按触发器中心计算并 clamp 进限位 `arrowKeepout`=半盒+圆角余量），CSS 只管换侧与形状。
  - 坑：限位别用 CSS `clamp()`——百分比与 px 混算在 left/top 上不生效，必须在 JS 端算。
- **进出场动画**（2026-11-17 补退场）：`Transition` 驱动——进场 `k-tooltip-zoom`（0.8→1 + 淡入），退场 `k-tooltip-zoom-out`（1→0.8 + 淡出），时长 `--k-motion-duration-fast`。
  - 退场期间节点保留播完再移除，中途重 hover 可打断回放。

- 弹层 `Teleport` 出口走 popupContainer 契约（ConfigProvider 职责④）：缺省 body = `position: fixed` + scroll/resize 跟随。
  - 指定容器 = `absolute` 进容器文档流（随内容滚、被裁切）。
  - z `--k-z-index-popover`（临时浮层档，高于 modal/drawer），`scopeClass`/`data-k-theme` 随出口节点走。
- 定位/外点关闭/Esc 走共用基座 `composables/usePopup.ts`（`utils/overlay.ts` 纯函数算位），与 KPopover/KPopconfirm 同源；KSelect 的自有定位暂不并轨（宽度贴触发器等专属语义）。
- 触发元素放 `#trigger` 插槽，外包一层 `span.k-tooltip__trigger`（inline-block），事件绑在这层；焦点语义保持留在触发元素上。
- 弹层显示时触发层带 `aria-describedby` 指向弹层 id（`role="tooltip"`），读屏在焦点触发时可朗读提示内容；隐藏时移除关联，避免指向空节点。
- 受控模式（传 `open`）下外点/Esc 只发 `openChange`，改不改由调用方决定。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**——Teleport、Transition、箭头、包裹层都由你自己画；script 逻辑（延迟开合、定位翻转、外点/Esc、受控、主题出口）照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KTooltipRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| visible | `boolean` | 开合合成态：受控（原始 vnode props 含 `open` 键）取 `open && !disabled`，自管取内部开合态；且须 `hasContent` 为真（空内容静默）；自绘气泡用它做 `v-if` 门控 |
| hasContent | `boolean` | 是否有内容：默认插槽存在或 `content ?? title` 非空任一成立；为 false 时 hover/focus/click 均不弹空泡 |
| placement | `KOverlayPlacement` | **翻转后的实际方位**（基座 `useOverlayPosition` 的 actualPlacement，与 `popupAttrs['data-placement']` 同值；12 方位联合类型）；只在首选侧放不下且对侧放得下时翻转 |
| content | `string \| VNode \| undefined` | `content ?? title` prop 通道内容（`title` 为 antd 同名兼容别名，优先级低于 `content`）；默认插槽内容优先，经 `slots.default` 取 |
| size | `KTooltipSize` | 尺寸档（`sm / md / lg`）；默认渲染据此缩放字号、内边距与最大宽度 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerEl | `Ref<HTMLElement \| null>` | 触发器节点 ref：定位锚点（量触发框 `getBoundingClientRect`）、外点判定「触发区内不关」的边界；`:ref="ctx.triggerEl"` 绑到自绘触发器，**必绑** |
| popupEl | `Ref<HTMLElement \| null>` | 气泡节点 ref：两遍渲染测量（`offsetWidth/Height` 判翻转 + 箭头偏移量）、外点判定「气泡内不关」的依据；自绘气泡**必绑**，不绑定位不落地（style 停在 `visibility:hidden`） |
| teleportTarget | `HTMLElement \| string` | Teleport 目标（`usePopupHost` 出口契约）：缺省 `'body'`（fixed + scroll/resize 跟随）；KConfigProvider `popupContainer` 指定时为容器元素（函数形式读模板 ref，挂载瞬间 null 兜底 body）——absolute 进容器文档流、随内容滚、被容器裁切，static 容器自动补 relative。`<Teleport :to="ctx.teleportTarget">` 直接消费 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| triggerAttrs | `Record<string, unknown>` | 触发器：仅 `data-part="trigger"`，无 ARIA/类；默认模板的 `span.k-tooltip__trigger`（inline-block 包裹层）是视觉壳，自绘自理 |
| triggerOn | `Record<string, (e: Event) => void>` | 触发器事件：`mouseenter`/`mouseleave`（hover 档走 `mouseEnterDelay`/`mouseLeaveDelay` 延迟链，单位秒；开启路径有 disabled 守卫）、`focusin`/`focusout`（focus 档同延迟链）、`click`（click 档 `setOpen(!visible)`）；`trigger` 组合决定哪些事件实际生效，未配置的档空转 |
| popupAttrs | `Record<string, unknown>` | 气泡节点：`data-part="root"` + `class` 出口类 + `data-k-theme`（Provider scheme 非 auto 时）+ `data-placement`（实际方位）+ `role="tooltip"` + `style` 定位包。**class 含 `k-tooltip` token 宿主类**——`--k-tooltip-*` 变量（bg/color/radius/padding/font-size/arrow-size）与 `z-index-popover`、max-width 都声明在它上面，必须保留否则 token 断链；另含 scoped Provider 的 `k-config-provider + scopeClass`。style = position（fixed/absolute）+ top/left + visibility（先隐藏测量再落位的两遍渲染）+ `--k-overlay-arrow-offset`（箭头主轴偏移 px，JS 端 clamp 进限位）。**气泡视觉壳不在包内**——`.k-tooltip__inner` 的背景/圆角/内边距与箭头节点全自绘（箭头可消费偏移变量） |
| popupOn | `Record<string, (e: Event) => void>` | 气泡悬停容差：`mouseenter`（hover 档清掉待关计时器——移入气泡不消失）、`mouseleave`（hover 档按 `mouseLeaveDelay` 延迟关闭） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen(v) | `(v: boolean) => void` | 开/合气泡：同值幂等；**受控双模**——受控（传了 `open`）只 emit 不改内部态，自管写内部开合态；两模都发 `update:open` + `openChange`。开启连带定位 watch（两遍渲染 + 挂 scroll/resize 跟随），关闭卸载监听；外点（document `pointerdown` capture，触发区/气泡内不关）与 Esc 均经它关闭（受控同样只发事件） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（trigger/default），自绘时可按需取用，如 `ctx.slots.default?.()` 取富内容。

最小契约：

```vue
<KTooltip content="…">
  <template #render="ctx">
    <button :ref="ctx.triggerEl" v-bind="ctx.triggerAttrs" v-on="ctx.triggerOn">…</button>
    <Teleport :to="ctx.teleportTarget">
      <div v-if="ctx.visible" :ref="ctx.popupEl" v-bind="ctx.popupAttrs" v-on="ctx.popupOn">…</div>
    </Teleport>
  </template>
</KTooltip>
```

注意：headless 无 Transition（进出场动画自管）；`render` prop 走 `h()` 时事件包需 `onProps(pack)` 转成 `onXxx` 键（入口有导出）；`classNames`/`styles` 只作用于默认渲染。**render prop 闭包产物在组件子作用域渲染，不带调用方 `<style scoped>` 的 data-v 属性**——该通道的自绘样式须全局（专属前缀命名）或内联；`#render` 插槽通道在调用方作用域编译，scoped 照常生效。
