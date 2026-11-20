# KTable · 基础与外观

> 渲染、尺寸、省略、边框、斑马纹、加载与空态。Props 与通用事件见本页底部。


### 最小用法

```vue
<KTable row-key="id" :columns="columns" :data-source="rows" size="sm" />
```

### 基础渲染

<Demo :title-level="4" path="table/basic" title="基础表格" :desc="['`columns` + `data-source` + `row-key` 即可渲染。', '默认按 `dataIndex` 取值展示；`align` 只作用于表体，表头统一左对齐。']" />

<Demo :title-level="4" path="table/sizes" title="三种尺寸" :desc="['`size` 三档：sm 紧凑（8×12）、md 默认（12×16）、lg 宽松（16×20）。', '只影响单元格密度，不影响分页器与空态尺寸。']" />

### 文本与外观

<Demo :title-level="4" path="table/ellipsis" title="省略与提示" :desc="['`ellipsis` 单行截断。', '加 `ellipsisTooltip` 后仅在真实溢出时用 KTooltip 显示全文。', '组合限制：存在省略列时表格自动切换为固定布局，建议同时给列宽。']" />

<Demo :title-level="4" path="table/borders" title="边框开关" :desc="['`bordered` 控制外框，`row-borders` 控制行分隔线，`column-borders` 控制列分隔线。', '不传 `column-borders` 时跟随 `bordered`，可组合出仅横向、仅纵向或无边框样式。']" />

<Demo :title-level="4" path="table/states" title="加载 / 空态 / 斑马纹 / 汇总" :desc="['`loading` 遮罩、`empty-text` 与 `#empty`。', '`striped`、`bordered`、汇总行均可用开关切换。', '`#summary` 渲染表尾汇总。']" />

<Demo :title-level="4" path="table/empty" title="自定义空态" :desc="['`#empty` 插槽接收 `columns`，通常放 KEmpty。', '用 `#actions` 提供引导操作。']" />

<Demo :title-level="4" path="table/parts-styling" title="部件样式 · classNames / styles" :desc="['覆盖 `root / row / header / toolbar / filterPanel / pagination / footer` 及列级 `classNames.cell`、`styles.cell`。', '部件名与 API 的 `Part` 列表一致；样式可以是类名或内联对象。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-core.md-->
<!--@include: /vue/ui/components/table/_api/events-core.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-basic.md-->
