# KTable · 基础与外观

> 列驱动渲染、尺寸、表头分组、省略、边框与空态。通用 Props 在本页底部，其他分类页只列各自专有字段。

### 渲染与尺寸

<Demo :title-level="4" path="table/basic" title="基础表格" :desc="['`columns` + `data-source` + `row-key` 即可渲染。', '默认按 `dataIndex` 取值展示；`align` 只作用于表体，表头统一左对齐。']" />

<Demo :title-level="4" path="table/sizes" title="三种尺寸" :desc="['`size` 三档：sm 紧凑（8×12）、md 默认（12×16）、lg 宽松（16×20）。', '只影响单元格密度，不影响分页器与空态尺寸。']" />

### 表头

<Demo :title-level="4" path="table/header-group" title="表头分组" :desc="['列的 `children` 生成多级表头：分组列 `colspan` 覆盖叶子数量，叶子列 `rowspan` 补齐层高。', '排序与筛选只挂在叶子列上。', '组合限制：分组跨固定与非固定边界时整组不参与吸边，需把分组整体放在同侧固定区。']" />

<Demo :title-level="4" path="table/header-group-sort" title="分组表头 + 排序/筛选 + 滚动" :desc="['多级表头里同时放可排序列与带筛选项的列。', '配合横向滚动、粘性表头、左右固定列观察图标与吸附稳定性。', '组合限制：固定列必须连续；分组跨边界时该组退回非吸边。']" />

<Demo :title-level="4" path="table/slots-header" title="插槽 · 自定义列头" :desc="['`#columnHeader` 同时作用于分组列与叶子列，可补单位、列数等说明。', '自定义内容仍在排序按钮内部，点击排序、筛选面板与 `aria-sort` 不受影响。']" />

### 文本与外观

<Demo :title-level="4" path="table/ellipsis" title="省略与提示" :desc="['`ellipsis` 单行截断。', '加 `ellipsisTooltip` 后仅在真实溢出时用 KTooltip 显示全文。', '组合限制：存在省略列时表格自动切换为固定布局，建议同时给列宽。']" />

<Demo :title-level="4" path="table/borders" title="边框开关" :desc="['`bordered` 控制外框，`row-borders` 控制行分隔线，`column-borders` 控制列分隔线。', '不传 `column-borders` 时跟随 `bordered`，可组合出仅横向、仅纵向或无边框样式。']" />

<Demo :title-level="4" path="table/states" title="加载 / 空态 / 斑马纹 / 汇总" :desc="['`loading` 遮罩、`empty-text` 与 `#empty`。', '`striped`、`bordered`、汇总行均可用开关切换。', '`#summary` 渲染表尾汇总。']" />

<Demo :title-level="4" path="table/empty" title="自定义空态" :desc="['`#empty` 插槽接收 `columns`，通常放 KEmpty。', '用 `#actions` 提供引导操作。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-core.md-->
<!--@include: /vue/ui/components/table/_api/slots-layout.md-->
<!--@include: /vue/ui/components/table/_api/events-core.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-basic.md-->
