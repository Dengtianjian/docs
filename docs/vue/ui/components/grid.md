# KRow / KCol 栅格

> 共同约定见 [共同约定](./index.md)。24 列栅格：列宽是**预编译 CSS class**（CSS-first），运行时 JS 只解析 gutter。

## 何时使用

- PC 后台/内容页的区块划分；
- 移动端指引：**<768px 建议单列布局**——`span` 仍然工作，但视觉规则不保证多列可读，响应式列宽请用断点对象交给视口切换。

## 代码演示

<Demo path="grid/basic" title="基础栅格" desc="`span` 按 24 分。列宽 class（`k-col-{n}`、百分比宽度）在构建期全量生成进 `css/grid.css`。" />

<Demo path="grid/gutter" title="栅格间距" desc="`gutter` 数字 = 水平间距；`[水平, 垂直]` 二元组。实现 = Row 负 margin + Col 内 padding，垂直走 rowGap。" />

<Demo path="grid/responsive" title="响应式" desc="`span`/`offset`/`gutter` 都支持 `{ xs, sm, md, lg, xl, xxl }` 对象——列宽走预生成断点 class；gutter 由 `useBreakpoint()` 解析成**当前档定值**（列宽流动、gutter 不流动）。拖动窗口宽度观察。" />

<Demo path="grid/offset-flex" title="偏移与 flex" desc="`offset` 左偏移格数；`flex` 数字生成 `flex: n 0 0`，字符串原样透传 CSS flex。" />

<Demo path="grid/render" title="自定义渲染（headless）" desc="Row/Col 各自 headless：gutter 负外边距 + provide 注入照跑，Col 内边距随 rootAttrs 继承；列宽百分比由 span 自绘。" />

## API

### KRow Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔（px）；二元组 = `[水平, 垂直]`；对象 = 按断点取定值 | `number \| [number, number] \| Partial<Record<'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'xxl', number \| [number, number]>>` | — |
| justify | 水平排列 | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | — |
| align | 垂直对齐 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | — |
| wrap | 允许折行 | `boolean` | `true` |

<CommonProps />

### KCol Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列宽（0~24），支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | — |
| offset | 左侧间隔格数，支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | — |
| order | 排序 | `number` | — |
| flex | flex 值：数字生成 `n 0 0`，字符串透传 | `string \| number` | — |

<CommonProps />

断点：`xs <576 ≤ sm <768 ≤ md <992 ≤ lg <1200 ≤ xl <1600 ≤ xxl`（`--k-screen-*`，与 mobile token 组的 768 分界一致）。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default（KRow） | 行内容（KCol 清单） |
| default（KCol） | 列内容 |
| render（KRow / KCol） | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。Row / Col 各有 scope（入口导出）。两件均为静态布局件，无 ref / 动作组，各含状态与绑定包两组：

**`KRowRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| gutter | `[number, number]` | 解析后的 `[水平, 垂直]` px 定值：数字 → `[n, 0]`、二元组原样（缺位补 0）、未传 → `[0, 0]`；响应式对象经 `useBreakpoint()` 取当前档、缺档向低档回退（xxl→xl→lg→md→sm→xs）。解析结果**继续 provide 给子 KCol**（headless KRow 的注入照跑，Col 内边距不丢） |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| undefined` | 水平排列；`undefined` = 未传。默认渲染走类名映射（`k-row--justify-*` → `justify-content`，start/end → flex-start/flex-end），自绘按值消费 |
| align | `'top' \| 'middle' \| 'bottom' \| 'stretch' \| undefined` | 垂直对齐；`undefined` = 未传。默认渲染类名映射 `align-items: flex-start/center/flex-end/stretch`（top/middle/bottom），自绘按值消费 |
| wrap | `boolean` | 允许折行（**缺省 `true`**，与 KFlex 相反）；默认渲染 `false` 时落 `k-row--no-wrap` 类，自绘映射 `flex-wrap` |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（gutter 逻辑：水平非 0 时 `marginLeft`/`marginRight` = `-gutter/2 px` 负外边距，垂直非 0 时 `rowGap` = `gutter px`；为 0 的轴不落键）。**不含任何 class**——`k-row` 的 `display:flex; flex-wrap:wrap; box-sizing:border-box` 与 justify/align 类名映射全不在包内，视觉自绘；负 margin 需配 Col 的正 padding 才成立（headless Col 的 rootAttrs 自带）；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 行内容 / KCol 清单），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KColRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| span | `number \| SpanResponsive \| undefined` | 列宽原始 prop 值（0~24；`SpanResponsive` = `Partial<Record<KBreakpoint, number>>` 断点对象）。**列宽百分比不在绑定包里**——默认渲染走 `css/grid.css` 预编译 class 矩阵（`k-col-{n}` / `k-col-{bp}-{n}`），自绘需按此值自算 `width: n/24` 百分比或复用同名 class |
| offset | `number \| SpanResponsive \| undefined` | 左偏移格数原始 prop 值；同 span，默认渲染走 `k-col-offset-{n}` class，自绘自算 margin-left 百分比 |
| order | `number \| undefined` | 排序原始 prop 值；已作为 `order` 写进 rootAttrs 的 style，此字段供另行消费 |
| flex | `string \| number \| undefined` | flex 原始 prop 值；已解析进 rootAttrs 的 style（数字 → `n 0 0`，字符串原样透传 CSS flex），此字段为解析前的值 |
| gutter | `[number, number]` | 注入的 KRow gutter `[水平, 垂直]`（`K_ROW_INJECTION_KEY`；headless KRow 的 provide 照跑）；无 KRow 祖先时缺省 `[0, 0]`。Col 只消费水平分量（垂直走 Row 的 rowGap） |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（布局逻辑：水平 gutter 非 0 时 `paddingLeft`/`paddingRight` = `gutter/2 px`；`order` = prop 值；`flex` = 数字解析成 `n 0 0` / 字符串透传；未传的键不落）。**不含任何 class**——`k-col` 的 `position:relative; box-sizing:border-box` 与列宽/offset 百分比 class 全不在包内，列宽由 span 自绘；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 列内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- **CSS-first**：默认断点下的 288 条列宽/offset class 全部静态预生成（`css/grid.css`，由 `css/gen-grid.mjs` 存档脚本产出），组件运行时零宽度计算；
- gutter 响应式对象是**登记在案的 JS 例外**：matchMedia 监听 → 当前档取定值，经 `provide/inject`（`K_ROW_INJECTION_KEY`）传给子 Col；SSR 无 matchMedia 时返回保守档 `md`（首帧 gutter 可能与客户端实际档不同、挂载后即刻校正；列宽不受影响，走 CSS 断点）；
- Row 负 margin（`-gutter/2`）+ Col 正 padding（`gutter/2`）实现列间距，垂直行间用 `rowGap`——与 antd 的 margin 补偿法不同，更接近原生 gap 语义；
- 垂直 gutter 作用于行间（rowGap），不影响单个 Col 高度。
