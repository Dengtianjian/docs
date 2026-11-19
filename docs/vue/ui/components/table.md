# KTable 表格

> 共同约定见 [共同约定](./index.md)。P3 数据展示批核心件。列驱动表格：排序、筛选、行选择、固定列、粘性表头与分页。

## 何时使用

- 结构化数据展示与轻量交互（排序、筛选、选择）；
- 需要固定首尾列、横向滚动或粘性表头。

## 代码演示

<Demo path="table/basic" title="基础表格" :desc="['`columns` + `data-source` + `row-key`。', '`align` 控制列对齐，默认按 `dataIndex` 取值展示。']" />

<Demo path="table/sizes" title="三种尺寸" :desc="['`size` 三档：sm 紧凑（8×12）、md 默认（12×16）、lg 宽松（16×20）。', '只影响单元格密度，不影响分页器与空态尺寸。']" />

<Demo path="table/header-group" title="表头分组" :desc="['列的 `children` 生成多级表头：分组列 `colspan` 覆盖叶子数量，叶子列 `rowspan` 补齐层高。', '排序与筛选只挂在叶子列上。']" />

<Demo path="table/header-group-sort" title="分组表头 + 排序/筛选 + 滚动" :desc="['多级表头里同时放可排序列与带筛选项的列。', '配合横向滚动、粘性表头、左右固定列，观察滚动时排序图标与固定列的稳定性。']" />

<Demo path="table/expandable" title="可展开行" :desc="['配合 `#expanded` 插槽出现展开列。', '`v-model:expandedRowKeys` 受控、`defaultExpandAll` 默认全展开、`rowExpandable` 指定行是否可展开，展开内容整行跨列。']" />

<Demo path="table/expand-component" title="行展开 · 组件渲染" desc="`expandedRender` 返回 `h(组件)`：展开内容是一个真实组件实例，带 props 与本地状态（点击「标记关注」计数递增）。" />

<Demo path="table/expand-slot" title="行展开 · 插槽渲染" desc="`#expanded` 插槽拿到 `{ row, index, rowKey }`，可直接用模板写结构化内容；`expandedRender` 对某行返回 `undefined` 时也会回退到这里。" />

<Demo path="table/span" title="单元格合并" desc="`spanMethod` 按行与列返回 `rowSpan` / `colSpan`：部门列纵向合并同组行、周会行横向合并三周。合并起点之外的单元格自动不渲染，左右固定列浮层同步同一份合并计划。" />

<Demo path="table/span-basic" title="合并 · 纵向" desc="只有 rowSpan：部门列按连续相同值合并，其余列逐行显示，用于检查行高、行分隔线与斑马纹。" />

<Demo path="table/span-colspan" title="合并 · 横向" desc="只有 colSpan：里程碑行把两列合成一个说明格，不改变行高。" />

<Demo path="table/span-cross-region" title="合并 · 跨固定区（退回粘性）" desc="合并跨越左固定列与中区时无法用浮层承载，整表退回粘性单元格模式并在 dev 告警；横向滚动观察固定列吸附与可能的漂移。" />

<Demo path="table/span-expand-bottom" title="合并 · 展开内容挂在组尾" desc="`expanded-placement=&#39;bottom&#39;`：展开内容追加到所属合并组的末尾整行（跨全部列），不是整表底部；部门合并保持生效。" />

<Demo path="table/span-expand-component" title="合并 · 展开（组件渲染）" desc="合并 + `expandedRender` 返回 `h(组件)`：同组两行（成员 2、3）都展开，内容按行序追加到研发部组尾；「标记完成」切换组件内部状态。" />

<Demo path="table/span-expand-slot" title="合并 · 展开（插槽渲染）" desc="合并 + `#expanded` 插槽，未传 `expandedPlacement`：检测到 rowSpan 自动按组尾追加；插槽作用域仍是原始行数据。" />

<Demo path="table/span-expand-mixed" title="合并 · 展开（按行混用）" desc="同一张表按行选择渲染方式：成员 2 由 `expandedRender` 返回 `h()` 节点，成员 3 返回组件，成员 5 返回 `undefined` 回退到 `#expanded` 插槽；三块内容各自追加到所属合并组尾部。" />

<Demo path="table/span-virtual" title="合并 · 虚拟滚动（colSpan）" desc="400 行 + 虚拟滚动 + 横向合并：colSpan 不改变行高，虚拟窗口保持生效。" />

<Demo path="table/span-states" title="合并 · 斑马纹 / 边框 / 固定行" desc="合并与斑马纹、四类边框开关、固定行同时出现：固定行不参与合并，合并格底色跟随起始行。" />

<Demo path="table/column-visibility" title="列显隐" :desc="['`columnSetting` 显示内置「列设置」按钮。', '`v-model:columnVisibility` 可受控。', '`hidden` 静态隐藏，`hideable: false` 锁定列，分组列不可单独隐藏。']" />

<Demo path="table/ellipsis" title="省略与提示" :desc="['`ellipsis` 单行截断。', '加上 `ellipsisTooltip` 后仅在真实溢出时用 KTooltip 显示全文。', '存在省略列时表格自动切换为固定布局，建议给出列宽。']" />

<Demo path="table/sort-filter" title="排序与筛选" :desc="['列 `sortable` 点击表头循环 升序 → 降序 → 取消。', '`filters` 在表头展开多选面板，`filterMultiple=false` 为单选。', '筛选与排序可叠加。']" />

<Demo path="table/selection" title="多选" :desc="['`rowSelection` 默认 checkbox 多选，开启当前页全选。', '`getCheckboxProps` 禁用不可选行。', '`onChange` / `selectionChange` 回传 keys 与行数据。']" />

<Demo path="table/selection-single" title="单选" :desc="['`rowSelection.type=\'radio\'` 切换为单选列：表头不再出现全选，点击只保留一个 key。', '禁用行同样通过 `getCheckboxProps` 控制。']" />

<Demo path="table/fixed" title="固定列 + 粘性表头" :desc="['`fixed: \'left\' / \'right\'` 需配合数字 `width`。', '`scroll.x` 横向滚动、`scroll.y` 限制高度并让表头吸顶。']" />

<Demo path="table/fixed-stacked" title="堆叠固定列" :desc="['同侧多列按 `width` 依次累加偏移。', '选择列 44px 自动计入左侧偏移。', '固定列需连续，跨列分组不能同时跨固定与非固定边界。']" />

<Demo path="table/pinned-rows" title="固定行堆叠 × 固定列堆叠" :desc="['`rowPinning` 指定 top / bottom 行，与左右固定列同时存在：横向滚动时列堆叠固定、纵向滚动时行堆叠固定。', '固定行不受筛选、排序与分页影响。', '滚动离开原位才出现分隔阴影，回到顶部/底部即消失。']" />

<Demo path="table/virtual" title="虚拟滚动（千行）" :desc="['`virtual` 开启后只渲染可视窗口内的行，主体与左右固定列浮层共用同一窗口。', '行高一致时窗口最稳定；出现展开行时自动退回全量渲染。']" />

<Demo path="table/virtual-variable" title="虚拟滚动 · 不定高" :desc="['1000 行里混有多行摘要，行高按实测缓存写入前缀和。', '未测量行用 `virtualRowHeight` 估算，测量后自动做滚动锚定，避免内容跳动。']" />

<Demo path="table/virtual-span" title="虚拟滚动 · 跨行合并" :desc="['1000 行按 4 行一组纵向合并部门列。', '窗口会自动上探到合并起始行、下探到覆盖末行，滚到组中间也不会出现空白列。']" />

<Demo path="table/virtual-mixed" title="虚拟滚动 · 不定高 + 合并" :desc="['每组 8 行：部门列 rowSpan、会议行 colSpan，同时含单行与多行内容。', '变量行高与合并窗口扩张同时生效。']" />

<Demo path="table/virtual-fixed" title="虚拟滚动 + 固定行 / 固定列 / 吸顶表头" :desc="['千行数据使用虚拟滚动，同时开启 `rowPinning`（顶/底固定行）、左右固定列与吸顶表头。', '固定行始终渲染并计入上下占位，主体与浮层共用同一窗口。']" />

<Demo path="table/combined" title="综合 · 全能力叠加" desc="80 行、每 4 行一组：部门/组号固定左侧、状态/风险固定右侧，中间 9 列；部门 rowSpan + 组尾里程碑 colSpan、多级表头、顶/底固定行、虚拟滚动与吸顶表头同时开启。组号排序保持整组相邻，进度/评分为组内排序，部门筛选按整组过滤；展开内容追加到组尾，存在展开行期间虚拟滚动自动暂停。" />

<Demo path="table/pagination" title="分页" :desc="['`pagination` 传对象开启底部 KPagination（可配每页条数、跳转、总数）。', '`v-model:current` / `v-model:page-size` 可受控。']" />

<Demo path="table/pagination-position" title="分页位置" :desc="['`paginationPosition` 六选一：左上 / 中上 / 右上 / 左下 / 中下 / 右下，默认右下。', '`both` 上下各渲染一份并统一右下对齐。']" />

<Demo path="table/states" title="加载 / 空态 / 斑马纹 / 汇总" :desc="['`loading` 遮罩、`empty-text` 与 `#empty`。', '`striped`、`bordered`、汇总行均可用开关切换。', '`#summary` 渲染表尾汇总。']" />

<Demo path="table/empty" title="自定义空态" desc="`#empty` 插槽接收 `columns`，通常放 KEmpty，并用 `#actions` 提供引导操作。" />

<Demo path="table/borders" title="边框开关" :desc="['`bordered` 控制外框，`row-borders` 控制行分隔线，`column-borders` 控制列分隔线。', '不传 `column-borders` 时跟随 `bordered`，可组合出仅横向、仅纵向或无边框样式。']" />

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
| pagination | `false` 不分页；对象开启分页器（`size` 可单独指定分页器尺寸） | `false \| KTablePaginationConfig` | `false` |
| paginationPosition | 分页器位置，六个角位 + `both` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' \| 'both'` | `'bottom-right'` |
| rowSelection | 行选择配置 | `KTableRowSelection<T>` | — |
| scroll | `{ x, y }` 横向滚动宽度 / 纵向高度 | `{ x?: number \| string; y?: number \| string }` | — |
| virtual | 虚拟滚动（支持变量行高与单元格合并；出现展开行时退回全量渲染） | `boolean` | `false` |
| virtualRowHeight | 未测量行的估算行高（px）；实测后按真实高度计算 | `number` | — |
| spanMethod | 单元格合并：按行与列返回 `{ rowSpan, colSpan }`；`rowIndex` 为当前页展示序，`columnIndex` 为可见叶子列序号 | `KTableSpanMethod<T>` | — |
| sortState | 受控排序；不传走内部状态 | `KTableSortState \| null` | — |
| filters | 受控筛选；不传走内部状态 | `KTableFilterState` | — |
| columnSetting | 显示内置「列设置」按钮 | `boolean` | `false` |
| expandable | 行展开开关；需配合 `#expanded` 插槽 | `boolean` | `true` |
| defaultExpandAll | 首次挂载时展开全部可展开行 | `boolean` | `false` |
| rowExpandable | 指定行是否可展开 | `(row) => boolean` | — |
| expandedPlacement | 展开内容位置：`inline` 紧随该行；`bottom` 追加到所属合并组的末尾整行（跨全部列）。`bottom` 仅在传 `spanMethod` 时生效；检测到 rowSpan 时自动按组尾追加 | `'inline' \| 'bottom'` | `'inline'` |
| expandedRender | 展开内容渲染函数，返回 VNodeChild（组件 / `h()` / VNode 均可）；对某行返回 `undefined` 时回退 `#expanded` 插槽，返回 `null` 视为空内容 | `(ctx: { row, index, rowKey }) => VNodeChild \| undefined` | — |
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
- **分页器尺寸**跟随表格 `size`：sm→sm、md→md、lg→lg；可用 `pagination.size` 单独覆盖。
- **可展开行**：展开列固定在最左 44px，选择列自动后移；展开内容整行跨列。固定行不显示展开按钮（固定行与展开暂不组合）。
  - 无合并（不传 `spanMethod`）时保持 `inline`：内容紧随展开行；
  - 有合并时：`expandedPlacement="bottom"`（或检测到 `rowSpan` 时自动）把展开内容追加到**所属合并组的末尾整行**（跨全部列），不是整表底部，合并不受影响；同一组多行展开依次追加，分页切换后只保留当前页行的展开内容；
  - `bottom` 在未传 `spanMethod` 时按 `inline` 渲染（dev 告警），非合并表格行为不变；
  - 展开内容可用 `expandedRender`（返回组件 / `h()` / VNode）或 `#expanded` 插槽；渲染函数逐行优先，某行返回 `undefined` 时回退插槽（`null` 视为空内容），可在同一张表里按行混用；两种位置共用同一份内容。
  - 两种模式在存在展开行时都会关闭虚拟滚动。
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
  - 支持**变量行高**：渲染后测量真实行高写入缓存，按行 key 存储，排序/筛选/换页不失效；测量后做滚动锚定，避免内容跳动；
  - 未测量行的估算高度：显式传 `virtualRowHeight` 时用它；不传时取已测行的平均高度（至少 8 行样本），滚动条总高随测量逐步收敛；
  - 支持**单元格合并**：窗口会自动上探到跨窗口合并格的起始行、下探到覆盖末行，合并格不会因窗口裁切出现空白；
  - 出现展开行时退回全量渲染；固定行始终渲染、不受窗口影响；
  - 千行数据 DOM 行数从 O(n) 降到约 20 行/表。
- **单元格合并**：`spanMethod` 返回 `{ rowSpan, colSpan }`，起点之外被覆盖的单元格不再渲染；`rowIndex` 是当前页展示序（排序/筛选后），`columnIndex` 只数可见叶子列（展开/选择列不计）。
  - 合并只在同一固定区内有效；跨左右固定区与中区时整表退回粘性单元格模式（dev 告警），固定列的抗抖动与性能相应回退。
  - 与虚拟滚动可同时使用：`rowSpan` 合并格会参与窗口扩张，起始行总在渲染范围内。
  - 有展开行时内容挂到所属合并组末尾，合并不受影响；固定行不参与合并；合并只在当前页内计算，不跨页。
  - 斑马纹下跨行单元格使用起始行底色，被覆盖行的 hover 不会点亮合并格。
