# KGrid 栅格

> 共同约定见 [共同约定](./index.md)。真正的 CSS Grid：固定列数 + 跨度，列宽与间距由 `grid-template-columns` / `gap` 驱动。
> 一维排布用 [KFlex](./flex.md)；需要自然流式卡片可用 `columns` 响应式列数。

## 何时使用

- 需要二维对齐、跨列/跨行或明确列数的区块布局；
- 从 24 列体系迁移：`<KGrid>` 默认 24 列，`<KGridItem :span="12">` 直接对应原 12/24；
- 移动端列数变化：`columns="{ xs: 1, md: 3 }"`，不需要手写断点样式。

## 代码演示

<Demo path="grid/basic" title="基础栅格" :desc="['`span` 按列数分配，默认 24 列。', '列宽走 `grid-template-columns: repeat(n, minmax(0, 1fr))`，无预编译 class 矩阵。']" />

<Demo path="grid/gutter" title="栅格间距" :desc="['`gap` 数字 = 行列同值。', '`[行, 列]` 二元组分别控制两轴。']" />

<Demo path="grid/columns" title="列数与跨列" :desc="['`columns` 支持断点对象，移动端自动减列。', '`span` 跨列；`start` 指定起点（1 起）。']" />

<Demo path="grid/responsive" title="响应式" :desc="['`columns` / `span` / `start` / `gap` 都支持断点对象与字符串。', 'gutter 由共享断点解析成当前档定值，拖动窗口观察。']" />

<Demo path="grid/offset-flex" title="起点与 flex" :desc="['`start` 指定列起点；需要按比例分配时改用 KFlex。', 'Grid 负责二维对齐，Flex 负责一维弹性比例。']" />

<Demo path="grid/render" title="自定义渲染（headless）" :desc="['KGrid / KGridItem 各自 headless：`rootAttrs` 带走列模板、gap 与 grid-column 逻辑。', '自绘节点 spread 绑定包即可继承布局。']" />

## API

### KGrid Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 固定列数；支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | `24` |
| gap | 间距：轴名 / 数字 / `[行, 列]`；对象或字符串按断点取值 | `Size \| [Size, Size] \| Partial<Record<Breakpoint, Size \| [Size, Size]>> \| string` | `0` |
| align | 单元格纵向对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | — |
| justify | 单元格横向对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | — |
| inline | `inline-grid` | `boolean` | `false` |

<CommonProps />

### KGridItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 跨列数；支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | `1` |
| start | 起始列（1 起）；支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | — |
| rowSpan | 跨行数；支持断点对象 | `number \| Partial<Record<Breakpoint, number>>` | — |
| order | 排序 | `number` | — |

<CommonProps />

断点：`xs <576 ≤ sm <768 ≤ md <992 ≤ lg <1200 ≤ xl <1600 ≤ xxl`（与 mobile token 组的 768 分界一致）。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default（KGrid） | 网格内容（KGridItem 清单） |
| default（KGridItem） | 单元格内容 |
| render（KGrid / KGridItem） | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-grid-gap-row` | 由 gap prop 写入 | 行间距 |
| `--k-grid-gap-column` | 由 gap prop 写入 | 列间距 |

列模板由 `columns` 直接写入根节点 `grid-template-columns`。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。KGrid / KGridItem 各有 scope（入口导出）。

**`KGridRenderScope`**：`columns`（解析后的列数）、`gap`（解析后 `[行, 列]`）、`align` / `justify` / `inline`、`rootAttrs`（`data-part` + 列模板与 gap 变量）、`slots`。

**`KGridItemRenderScope`**：`span` / `start` / `rowSpan`（解析后的数值）、`order`、`rootAttrs`（`grid-column` / `grid-row` / `order` 内联逻辑）、`slots`。

绑定包散播到自绘节点才继承布局逻辑；display/对齐等视觉不在包内，自绘按 scope 状态自行映射。

---

## 规格附录（实现决策，面向贡献者）

- 列宽走 `grid-template-columns: repeat(n, minmax(0, 1fr))`，**不做预编译 class 矩阵**；`span` / `start` 直接写 `grid-column`；
- `columns` / `span` / `start` / `rowSpan` / `gap` 的响应式走共享断点（`useBreakpoint`），SSR 首帧保守档 `md`，挂载后校正；
- `start` 为 1 起；未传 `start` 时由 CSS Grid 自动放置；
- 一维排布、比例分配与分隔符请用 KFlex，不与 KGrid 混职责。