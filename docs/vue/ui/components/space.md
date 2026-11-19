# KSpace 间距

> 共同约定见 [共同约定](./index.md)。相邻元素之间的**语义间距**容器：按钮组、操作列、表单行内元素。
> 与 [KFlex](./flex.md) 的分工：默认用 Space；需要 `justify-between` 等布局语义时用 Flex。

## 何时使用

- 一组同类控件要保持节奏性间距时（避免手写 margin）；
- 一行放不下要折行 → `wrap`；操作列要竖线分隔 → `separator`。

## 代码演示

<Demo path="space/basic" title="基础" desc="缺省水平方向、sm 档间距（8px）。间距走原生 `gap`，不给子项包多余 DOM。" />

<Demo path="space/vertical-wrap" title="方向 / 尺寸 / 折行" desc="`direction=vertical` 纵向；`size` 可传 `[行, 列]` 二元组分别控制 wrap 后的两轴。" />

<Demo path="space/responsive" title="响应式间距" desc="`size` 同时演示字符串 `'xs:8 md:sm lg:lg'` 与对象 `{ xs: 'xs', md: 'md' }`；由共享断点解析为当前档定值，拖动窗口观察。" />

<Demo path="space/separator" title="分隔符" desc="`separator` 模式给子项间插入竖线——此时子项必须是元素节点（文本节点会错位，开发环境 warn），代价是每个子项包一层 span。" />

<Demo path="space/render" title="自定义渲染（headless）" desc="`#render` 插槽自绘菱形分隔条（children 已拍平可直接 v-for）；`render` prop 画胶囊行——间距变量随 rootAttrs 继承，size 解析逻辑照跑。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距：轴名走尺寸阶梯（4/8/12/16/24），数字直接 px；二元组 = `[纵向间距, 横向间距]`；对象/字符串按断点取值 | `Size \| [Size, Size] \| Partial<Record<Breakpoint, Size \| [Size, Size]>> \| string` | `'sm'` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'baseline'` | — |
| wrap | 允许折行 | `boolean` | `false` |
| separator | 子项间插入分隔线（见上，有额外 DOM 代价） | `boolean` | `false` |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 子项内容 |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件（`separator` 为 prop，非插槽）。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-space-gap-row` | `var(--k-size-sm)` | 行间距（由 size prop 解析后写入根节点内联） |
| `--k-space-gap-column` | `var(--k-size-sm)` | 列间距 |

分隔线本身不设部件变量，直接吃全局 `--k-line-width` 与 `--k-color-split`。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KSpaceRenderScope`（入口导出）。静态布局件，无 ref / 动作组，仅状态与绑定包两组：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| direction | `'horizontal' \| 'vertical'` | 主轴方向（缺省 `'horizontal'`）；默认渲染走 `k-space--vertical` 类切 `flex-direction: column`，自绘按此值自行映射方向 |
| align | `'start' \| 'center' \| 'end' \| 'baseline' \| undefined` | 交叉轴对齐；`undefined` = 未传（不强制对齐）。默认渲染映射 `align-items: flex-start/center/flex-end/baseline`，自绘按值消费 |
| wrap | `boolean` | 允许折行（缺省 `false`）；自绘映射 `flex-wrap` |
| separator | `boolean` | 分隔符模式（缺省 `false`）；为 true 时自绘应在子项之间画分隔元素（默认渲染给每个子项包 `span[data-part=item]` + 伪分隔线 `data-part=separator`，根从 inline-flex 变 flex）。children 已拍平，可直接 `v-for` 后按 `i < children.length - 1` 插分隔 |
| size | `[string, string]` | 解析后的间距 `[行, 列]`：轴名（xxs/xs/sm/md/lg）→ `var(--k-size-*)` 引用、数字 → `px` 字符串、二元组分别解析两轴（`utils/size.ts` 只做映射不算像素，CSS-first）。已写入 rootAttrs 的两个 gap 变量；此字段供自绘直接取值另作他用 |
| children | `VNode[]` | 拍平后的子项 VNode：去 Comment、展 Fragment（`v-for` 产物）；separator 模式下若含文本节点，DEV 环境 warn（分隔线会错位）。自绘 `v-for` 的数据源，免去再调 `slots.default()` 重复求值 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（仅 `--k-space-gap-row` / `--k-space-gap-column` 两个间距变量，size 解析逻辑随包带走）。**不含任何 class**——`k-space` 基础类的 `display:inline-flex`、`gap: var(--k-space-gap-row) var(--k-space-gap-column)` 消费、方向/对齐/折行/分隔线视觉全不在包内，须自绘（可自写同款 gap 声明消费注入的变量）；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 子项内容），自绘时可按需取用，如 `ctx.slots.default?.()`；需要逐子项插分隔时用已拍平的 `children` 而非原始插槽产物。

---

## 规格附录（实现决策，面向贡献者）

- 根 `display:inline-flex; gap: var(--k-space-gap-row) var(--k-space-gap-column)`，**非 separator 模式零额外 DOM**；
- `separator` 才包子项（`span[data-part=item]` + 伪分隔线元素 `data-part=separator`），此时根自动变 `display:flex`；
- 尺寸解析在 JS 侧只做「轴名 → var() 引用 / 数字 → px」的映射（`utils/size.ts`），不计算具体像素——保持 CSS-first；响应式取值见 [响应式取值](../design/responsive-values.md)。
- 组件源码内零平台判断：移动端触控间距差由 token 阶梯的 mobile 组自动完成。
