# KTable 表格

> 共同约定见 [共同约定](./index.md)。P3 数据展示批核心件。列驱动表格：排序、筛选、行选择、固定列、粘性表头与分页。

## 何时使用

- 结构化数据展示与轻量交互（排序、筛选、选择）；
- 需要固定首尾列、横向滚动或粘性表头。

## 代码演示

<Demo path="table/basic" title="基础表格" desc="`columns` + `data-source` + `row-key`；`align` 控制列对齐，默认按 `dataIndex` 取值展示。" />

<Demo path="table/sizes" title="三种尺寸" desc="`size` 三档：sm 紧凑（8×12）、md 默认（12×16）、lg 宽松（16×20）；只影响单元格密度，不影响分页器与空态尺寸。" />

<Demo path="table/header-group" title="表头分组" desc="列的 `children` 生成多级表头：分组列 `colspan` 覆盖叶子数量，叶子列 `rowspan` 补齐层高；排序与筛选只挂在叶子列上。" />

<Demo path="table/header-group-sort" title="分组表头 + 排序/筛选 + 滚动" desc="多级表头里同时放可排序列与带筛选项的列，配合横向滚动、粘性表头、左侧固定列与右侧固定列，用来看滚动时排序图标与固定列的稳定性。" />

<Demo path="table/expandable" title="可展开行" desc="配合 `#expanded` 插槽出现展开列；`v-model:expandedRowKeys` 受控、`defaultExpandAll` 默认全展开、`rowExpandable` 指定行是否可展开，展开内容整行跨列。" />

<Demo path="table/column-visibility" title="列显隐" desc="`columnSetting` 显示内置「列设置」按钮；`v-model:columnVisibility` 可受控。`hidden` 静态隐藏，`hideable: false` 锁定列，分组列不可单独隐藏。" />

<Demo path="table/ellipsis" title="省略与提示" desc="`ellipsis` 单行截断；加上 `ellipsisTooltip` 后仅在真实溢出时用 KTooltip 显示全文。存在省略列时表格自动切换为固定布局，建议给出列宽。" />

<Demo path="table/sort-filter" title="排序与筛选" desc="列 `sortable` 点击表头循环 升序 → 降序 → 取消；`filters` 在表头展开多选面板，`filterMultiple=false` 为单选；筛选与排序可叠加。" />

<Demo path="table/selection" title="多选" desc="`rowSelection` 默认 checkbox 多选，开启当前页全选；`getCheckboxProps` 禁用不可选行；`onChange` / `selectionChange` 回传 keys 与行数据。" />

<Demo path="table/selection-single" title="单选" desc="`rowSelection.type='radio'` 切换为单选列：表头不再出现全选，点击只保留一个 key；禁用行同样通过 `getCheckboxProps` 控制。" />

<Demo path="table/fixed" title="固定列 + 粘性表头" desc="`fixed: 'left' / 'right'` 需配合数字 `width`；`scroll.x` 横向滚动、`scroll.y` 限制高度并让表头吸顶。" />

<Demo path="table/fixed-stacked" title="堆叠固定列" desc="同侧多列按 `width` 依次累加偏移；选择列 44px 自动计入左侧偏移。固定列需连续，跨列分组不能同时跨固定与非固定边界。" />

<Demo path="table/pinned-rows" title="固定行堆叠 × 固定列堆叠" desc="`rowPinning` 指定 top / bottom 行，与左右固定列同时存在：横向滚动时列堆叠固定、纵向滚动时行堆叠固定；固定行不受筛选、排序与分页影响；滚动离开原位才出现分隔阴影，回到顶部/底部即消失。" />

<Demo path="table/virtual" title="虚拟滚动（千行）" desc="`virtual` 开启后只渲染可视窗口内的行，主体与左右固定列浮层共用同一窗口；要求等行高，出现展开行时自动退回全量渲染。" />

<Demo path="table/virtual-fixed" title="虚拟滚动 + 固定行 / 固定列 / 吸顶表头" desc="千行数据使用虚拟滚动，同时开启 `rowPinning`（顶/底固定行）、左右固定列与吸顶表头：固定行始终渲染并计入上下占位，主体与浮层共用同一窗口。" />

<Demo path="table/pagination" title="分页" desc="`pagination` 传对象开启底部 KPagination（可配每页条数、跳转、总数）；`v-model:current` / `v-model:page-size` 可受控。" />

<Demo path="table/pagination-position" title="分页位置" desc="`paginationPosition` 六选一：左上 / 中上 / 右上 / 左下 / 中下 / 右下，默认右下；`both` 上下各渲染一份并统一右下对齐。" />

<Demo path="table/states" title="加载 / 空态 / 斑马纹 / 汇总" desc="`loading` 遮罩、`empty-text` 与 `#empty`；`striped`、`bordered`、汇总行均可用开关切换；`#summary` 渲染表尾汇总。" />

<Demo path="table/empty" title="自定义空态" desc="`#empty` 插槽接收 `columns`，通常放 KEmpty，并用 `#actions` 提供引导操作。" />

<Demo path="table/borders" title="边框开关" desc="`bordered` 控制外框，`row-borders` 控制行分隔线，`column-borders` 控制列分隔线；不传 `column-borders` 时跟随 `bordered`，可组合出仅横向、仅纵向或无边框样式。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `KTableColumn<T>[]` | — |
| dataSource | 数据 | `T[]` | — |
| rowKey | 行 key：字段名或函数 | `string \| (row, index) => string \| number` | `'id'` |
| size | 密度 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| bordered | 外框与圆角 | `boolean` | `true` |
| rowBorders | 行分隔线 | `boolean` | `true` |
| columnBorders | 列分隔线；不传时跟随 `bordered` | `boolean` | `bordered` |
| striped | 斑马纹 | `boolean` | `false` |
| sticky | 表头吸顶（需配合 `scroll.y`） | `boolean` | `false` |
| loading | 加载遮罩 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| pagination | `false` 不分页；对象开启分页器 | `false \| KTablePaginationConfig` | `false` |
| paginationPosition | 分页器位置，六个角位 + `both` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' \| 'both'` | `'bottom-right'` |
| rowSelection | 行选择配置 | `KTableRowSelection<T>` | — |
| scroll | `{ x, y }` 横向滚动宽度 / 纵向高度 | `{ x?: number \| string; y?: number \| string }` | — |
| virtual | 虚拟滚动（等行高；展开行/行高不一致时退回全量渲染） | `boolean` | `false` |
| virtualRowHeight | 显式指定虚拟行高（px）；内容撑高仍会自动退回全量 | `number` | — |
| sortState | 受控排序；不传走内部状态 | `KTableSortState \| null` | — |
| filters | 受控筛选；不传走内部状态 | `KTableFilterState` | — |
| columnSetting | 显示内置「列设置」按钮 | `boolean` | `false` |
| expandable | 行展开开关；需配合 `#expanded` 插槽 | `boolean` | `true` |
| defaultExpandAll | 首次挂载时展开全部可展开行 | `boolean` | `false` |
| rowExpandable | 指定行是否可展开 | `(row) => boolean` | — |
| v-model:expandedRowKeys | 展开行受控 keys | `KTableRowKey[]` | `[]` |
| v-model:rowPinning | 固定行受控 `{ top: keys[], bottom: keys[] }` | `{ top?: KTableRowKey[]; bottom?: KTableRowKey[] }` | `{}` |
| v-model:columnVisibility | 列显隐受控表 `{ 列key: boolean }` | `Record<string, boolean>` | `{}` |
| v-model:current | 受控当前页 | `number` | `1` |
| v-model:page-size | 受控每页条数 | `number` | `10` |
| classNames | 部件类名（`root / toolbar / columnSetting / wrap / row / filterPanel / loading / pagination`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / toolbar / columnSetting / wrap / row / filterPanel / loading / pagination`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KTableColumn

| 字段 | 说明 |
| --- | --- |
| `key` | 列唯一键（缺省用 `dataIndex`） |
| `title` | 表头文本（`#header` 插槽优先） |
| `dataIndex` | 取值路径，支持 `a.b` |
| `width` | 列宽；固定列必须为数字 `width` |
| `minWidth` | 最小列宽 |
| `align` | `left / center / right` |
| `fixed` | `'left' \| 'right'` 固定列 |
| `sortable` | `true` 默认比较，或自定义比较函数 |
| `filters` | 筛选项 `{ label, value }[]` |
| `filterMultiple` | 是否多选（默认 `true`） |
| `filterMethod` | 自定义筛选 `(value, row) => boolean` |
| `children` | 分组表头子列；有 `children` 的列不渲染数据单元格 |
| `hidden` | 默认隐藏；仍可在列设置中勾选打开（永久隐藏请配合 `hideable: false`） |
| `hideable` | 是否允许在列设置中切换，默认 `true`；`false` 锁定 |
| `ellipsis` | 单元格单行省略（表格自动切为固定布局） |
| `ellipsisTooltip` | 只在真实溢出时用 KTooltip 显示全文 |
| `render` | 单元格渲染 `({ row, value, index, column }) => VNodeChild` |
| `classNames` | 列级表头/单元格类名，类型 `Partial<Record<Part, string>>` |
| `styles` | 列级表头/单元格内联样式，类型 `Partial<Record<Part, CSSProperties>>` |

### KTableRowSelection

| 字段 | 说明 |
| --- | --- |
| `type` | `'checkbox'`（默认，多选 + 全选）或 `'radio'`（单选） |
| `selectedRowKeys` | 受控选中 keys；单选模式长度保持 ≤ 1 |
| `onChange` | `(keys, rows) => void` |
| `getCheckboxProps` | `(row) => ({ disabled? })`，多选/单选共用 |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header | 统一表头内容（分组列与叶子列都会触发） | `{ column, index }` |
| empty | 空态内容 | `{ columns }` |
| summary | 表尾汇总行 | `{ columns, rows }` |
| expanded | 展开行内容 | `{ row, index, rowKey }` |
| filter | 工具条左侧筛选区 | `{ columns, visibility }`，`columns` 为叶子列（含 `key`） |
| toolbar | 工具条右侧操作区（位于内置列设置按钮前） | `{ columns }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| sortChange | 排序变化 | `sorter: KTableSortState \| null` |
| filterChange | 筛选变化 | `filters: KTableFilterState` |
| selectionChange | 选择变化 | `keys, rows` |
| rowClick | 行点击 | `row, index, event` |
| pageChange | 分页变化 | `page, pageSize` |
| expandChange | 行展开变化 | `keys, row, expanded` |
| update:current | 当前页受控模型更新 | `number` |
| update:pageSize | 每页条数受控模型更新 | `number` |

## 注意事项

- **固定列**依赖数值 `width` 并配合数字 `scroll.x`；
  - 左右固定列渲染在**独立的粘性浮层**里（浮层与主表逐行同步高度），横向滚动时固定列不参与重绘。
  - 浮层用滚动驱动动画（`animation-timeline: scroll()`）做平移吸附并独立合成，快速滚动也不会抖动；不支持滚动驱动动画的浏览器退回 `position: sticky`。
  - 有左侧固定列时，展开/选择列也一并放进左浮层（主表不再保留粘性单元格），没有左侧固定列时仍按 sticky 吸边；分组跨固定与非固定边界时退回单元格 sticky。
  - 列宽与偏移会冻结为**整数像素**，容器尺寸或列显隐变化时自动重新分配，百分比列宽不参与冻结。
- **粘性表头**只在 `scroll.y` 形成内部滚动时生效；未限高时页面滚动不会吸顶。
- 排序为单列、客户端排序；筛选默认取单元格值与选项相等，复杂条件用 `filterMethod`。
- 行选择默认作用于**当前页**；多选全选只增删当前页可选行，跨页选择需受控维护 `selectedRowKeys`；单选模式表头无全选，`selectedRowKeys` 始终只保留最后一个选中项。
- 表头排序使用真实按钮，`th` 输出 `aria-sort`；加载态表格 `aria-busy`，空态由 KEmpty 提供描述。
- 表头文字统一左对齐；列 `align` 只影响表体单元格（如数值列右对齐），表头不会跟着偏移。
- 边框三层独立控制：`bordered` 管外框/圆角，`rowBorders` 管横向分隔线，`columnBorders` 管纵向分隔线；`columnBorders` 缺省跟随 `bordered` 保持旧行为。
- 表格根节点与滚动容器不带外边距；分页器与表格之间保留 16px 间距，可经 `--k-table-pagination-gap` 调整（设 0 即贴紧）。
- **分页位置**按 `paginationPosition` 显式对齐，小屏不再强制居中；`both` 上下两份分页共用同一页状态。
- **可展开行**：展开列固定在最左 44px，选择列自动后移；展开内容整行跨列。固定行不显示展开按钮（固定行与展开暂不组合）。
- **固定行**：`rowPinning` 的行始终按 `dataSource` 顺序展示，不受筛选、排序与分页影响，也从分页总数中剔除；
  - top 从表头下方、bottom 从容器底部按实测行高依次堆叠。
  - 固定行与固定列可同时使用，交叉单元格同时 sticky 两个方向，行堆叠与列堆叠互不影响。
- **阴影随位置消失**：固定列只在 `scrollLeft > 0` / 未到最右时显示边缘阴影；固定行只在顶部/底部仍有滚动余量时显示分隔阴影，回到原位即消失。
- **分组表头**只支持叶子列排序/筛选；分组跨固定与非固定边界时整组不参与吸边，需把分组整体放在同侧固定区内。
- **隐藏列**不会丢失已有排序与筛选状态；
  - `columnVisibility` 缺省为 `{}`，可见性按列 `hidden` 默认值；
  - 显式 `columnVisibility[key]` 优先，可把默认隐藏的列重新打开。
  - 要永久隐藏，用 `hidden: true` + `hideable: false`。
- **省略**依赖 `table-layout: fixed`，表格中存在任一 `ellipsis` 列时自动切换；未给列宽时浏览器会平均分配剩余宽度。
- **列设置**至少在保一列可见：只剩一列时其余可见列的勾选禁用；`hideable: false` 的列仍列出但禁用，分组列本身不出现在列表中（只列叶子）。
- **虚拟滚动**：`virtual` 开启后主体与左右固定列浮层共用同一窗口，只渲染可视行 + 缓冲行；
  - “等行高”指**渲染出来的行高一致**，不是强制固定高度——每次窗口渲染后会校验窗口内所有行，任何一行被内容撑高（换行、多行文本）都会自动退回全量渲染，保证不出错位；
  - 想稳定保持虚拟可给文本列开启 `ellipsis` / `ellipsisTooltip` 保持单行，或显式传 `virtualRowHeight`（仍不是强制高度，内容撑高会回退）。
  - 出现展开行时同样退回全量；固定行始终渲染不受窗口影响。
  - 千行数据 DOM 行数从 O(n) 降到约 20 行/表。