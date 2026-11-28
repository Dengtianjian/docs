# KFlex 弹性布局

> 共同约定见 [共同约定](./index.md)。flex 布局容器：方向、对齐、折行、间距与分隔符；间距支持尺寸阶梯、断点对象与字符串语法。
> 24 列二维栅格请用 [KGrid](./grid.md)。

## 何时使用

- 工具栏、表单项、卡片头这类「两端/靠右/居中」的局部排布；
- 需要 `gap` 阶梯、响应式间距或子项分隔线时；
- 一行放不下要折行 → `wrap`；操作列要竖线分隔 → `separator`。

## 代码演示

<Demo path="flex/basic" title="基础间距" :desc="['缺省 `inline-flex` + `gap=sm`（12px）。', '间距走原生 `gap`，不给子项包多余 DOM。']" />

<Demo path="flex/justify" title="两端对齐" desc="`justify=between` + `align=center`，内部再嵌一个 KFlex 管按钮组——嵌套即布局树。" />

<Demo path="flex/vertical-wrap" title="方向 / 二元组 / 折行" :desc="['`vertical` 纵向排列。', '`gap` 可传 `[行, 列]` 二元组分别控制折行后的两轴。']" />

<Demo path="flex/wrap" title="折行" :desc="['`wrap` + `gap`：标签云形态。', '间距阶梯与断点写法同样适用于折行后的行列间距。']" />

<Demo path="flex/responsive" title="响应式间距" :desc="['`gap` 支持对象 `{ xs: 8, md: 16 }` 与字符串 `xs:8 md:sm lg:lg`。', '由共享断点解析为当前档定值，拖动窗口观察。']" />

<Demo path="flex/separator" title="分隔符" :desc="['`separator` 在子项间插入竖线。', '此时子项必须是元素节点（文本节点会错位，开发环境 warn），代价是每个子项包一层 span。']" />

<Demo path="flex/render" title="自定义渲染（headless）" desc="`#render` 自绘信息带：gap 解析变量随 rootAttrs 继承，justify/align 作为状态由自绘视觉消费。" />

<Demo path="flex/render-advanced" title="自定义渲染 + 分隔符" :desc="['`children` 已拍平，可直接 v-for 并自绘分隔元素。', '`render` prop 通道画胶囊行，间距变量随 rootAttrs 继承。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| inline | `inline-flex`；块级布局传 `false` | `boolean` | `true` |
| vertical | 主轴纵向 | `boolean` | `false` |
| wrap | 允许折行 | `boolean` | `false` |
| justify | 主轴分布 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | — |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | — |
| gap | 间距：轴名走尺寸阶梯，数字直接 px，二元组 = `[行, 列]`；对象/字符串按断点取值 | `Size \| [Size, Size] \| Partial<Record<Breakpoint, Size \| [Size, Size]>> \| string` | `'sm'` |
| separator | 子项间插入分隔线（有额外 DOM 代价） | `boolean` | `false` |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 布局子内容 |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-flex-gap-row` | 由 gap prop 写入（缺省 `var(--k-size-sm)`） | 行间距 |
| `--k-flex-gap-column` | 由 gap prop 写入（缺省 `var(--k-size-sm)`） | 列间距 |

分隔线直接吃全局 `--k-line-width` 与 `--k-color-split`。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KFlexRenderScope`（入口导出）。静态布局件，无 ref / 动作组：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inline | `boolean` | `inline-flex`（缺省 `true`）；默认渲染走 `k-flex--inline` 类，自绘按值选 display |
| vertical | `boolean` | 主轴纵向（缺省 `false`）；自绘按值映射方向 |
| wrap | `boolean` | 允许折行（缺省 `false`）；自绘映射 `flex-wrap` |
| separator | `boolean` | 分隔符模式；为 true 时自绘应在子项之间画分隔元素 |
| justify | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| undefined` | 主轴分布；`undefined` = 未传 |
| align | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch' \| undefined` | 交叉轴对齐；`undefined` = 未传 |
| gap | `[string, string]` | 解析后的间距 `[行, 列]`：轴名 → `var(--k-size-*)`、数字 → `px`、二元组分别解析两轴；缺省 `sm` |
| children | `VNode[]` | 拍平后的子项 VNode（去 Comment、展 Fragment）；separator 模式下若含文本节点，DEV 环境 warn |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（`--k-flex-gap-row` / `--k-flex-gap-column` 两个间距变量）。**不含任何 class**——`k-flex` 的 display、gap 消费与 justify/align/inline/vertical/wrap 类名映射全在包外，视觉自绘；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合，自绘时可按需取用。

---

## 规格附录（实现决策，面向贡献者）

- justify/align 走类名映射（`k-flex--justify-between` 等）而非内联 style，方便 CSS 审计与工具类覆盖；
- 间距变量走 rootAttrs，headless 自绘可直接消费；gap 缺省 `sm`，需要零间距传 `:gap="0"`；
- `separator` 模式下根回退块级 `flex`，子项包 `span` 并插入分隔元素（非 separator 模式零额外 DOM）；
- 不做 flex 简写透传（保持轴语义清晰）。