# KFlex 弹性布局

> 共同约定见 [共同约定](./index.md)。flex 布局原子件：属性**一对一映射 CSS**，不附带任何行为。
> 与 [KSpace](./space.md) 的分工：只是要间距 → Space；要对齐/分布/折行语义 → Flex。

## 何时使用

- 工具栏、表单项、卡片头这类「两端/靠右/居中」的局部布局；
- 需要 `gap` 阶梯而不想写 `calc()` 时（gap 直接吃轴名）。

## 代码演示

<Demo path="flex/justify" title="两端对齐" desc="`justify=between` + `align=center`，内部再嵌一个 KFlex 管按钮组——嵌套即布局树。" />

<Demo path="flex/vertical" title="纵向" desc="`vertical` 一列堆叠，`gap` 控节奏。" />

<Demo path="flex/wrap" title="折行" desc="`wrap` + `gap`：标签云形态。`gap` 支持 `[行, 列]` 二元组分别控制两轴。" />

<Demo path="flex/render" title="自定义渲染（headless）" desc="`#render` 自绘信息带：gap 解析变量随 rootAttrs 继承，justify/align 作为状态由自绘视觉消费。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| inline | `display: inline-flex`（缺省 `flex`） | `boolean` | `false` |
| vertical | 主轴纵向（`flex-direction: column`） | `boolean` | `false` |
| wrap | 允许折行 | `boolean` | `false` |
| justify | 主轴分布 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | — |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | — |
| gap | 间距：轴名走尺寸阶梯，数字直接 px，可传 `[行, 列]` | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| number \| [Size, Size]` | — |

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
| `--k-flex-gap-row` | 由 gap prop 写入 | 行间距 |
| `--k-flex-gap-column` | 由 gap prop 写入 | 列间距 |

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KFlexRenderScope`（入口导出）。布局原子件零行为，无 ref / 动作组，仅状态与绑定包两组：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inline | `boolean` | `display: inline-flex`（缺省 `false` = `flex`）；默认渲染走 `k-flex--inline` 类，自绘按值选 display |
| vertical | `boolean` | 主轴纵向（`flex-direction: column`，缺省 `false`）；自绘按值映射方向 |
| wrap | `boolean` | 允许折行（缺省 `false`）；自绘映射 `flex-wrap` |
| justify | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| undefined` | 主轴分布；`undefined` = 未传。默认渲染走类名映射（`k-flex--justify-between` → `justify-content: space-between` 等，start/end → flex-start/flex-end），自绘按值自行映射 |
| align | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch' \| undefined` | 交叉轴对齐；`undefined` = 未传。默认渲染类名映射 `align-items: flex-start/center/flex-end/baseline/stretch`，自绘按值消费 |
| gap | `[string, string] \| null` | 解析后的间距 `[行, 列]`：轴名（xxs/xs/sm/md/lg）→ `var(--k-size-*)` 引用（md → `var(--k-size)`）、数字 → `px` 字符串、二元组分别解析两轴（`utils/size.ts`）；**未传 gap prop = `null`**，此时 rootAttrs 的 style 为空对象、不落间距变量 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style`（传了 gap 时为 `--k-flex-gap-row` / `--k-flex-gap-column` 两个间距变量，未传为 `{}`）。**不含任何 class**——`k-flex` 基础类的 `display:flex`、`gap: var(--k-flex-gap-row) var(--k-flex-gap-column)` 消费与 justify/align/inline/vertical/wrap 类名映射全不在包内，视觉自绘（可自写同款 gap 声明消费注入变量）；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 布局子内容），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- justify/align 走**类名映射**（`k-flex--justify-between` 等）而非内联 style，方便 CSS 审计与工具类覆盖；
- 不实现 `separator`（那是 KSpace 的语义）、不做 flex 简写透传（保持轴语义清晰）；
- 部件仅 root。
