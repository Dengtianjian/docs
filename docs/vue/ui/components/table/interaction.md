# KTable · 选择与编辑

> 行选择、跨页选择、行操作、行拖拽与单元格编辑。

### 行选择

<Demo :title-level="4" path="table/selection" title="多选" :desc="['`rowSelection` 默认 checkbox 多选，开启当前页全选。', '`getCheckboxProps` 禁用不可选行，`selectionChange` 回传 keys 与行数据。', '翻页不会清掉已选 key；需要表头一次选完所有页时用 `selectAllScope: all`，见「跨页选择」。', '组合限制：默认全选只作用于当前页；树形选择不级联。']" />

<Demo :title-level="4" path="table/selection-single" title="单选" :desc="['`rowSelection.type` 设为 `radio` 切换单选：表头不再出现全选。', '点击只保留一个 key，禁用行同样通过 `getCheckboxProps` 控制。']" />

<Demo :title-level="4" path="table/selection-cross-page" title="跨页选择" :desc="['`rowSelection.selectAllScope` 设为 `all` 后，表头全选覆盖当前筛选/排序结果的**所有分页**，表头勾选态与半选态按全局计算。', '翻页、改每页条数都会保留已选 key；本演示用受控 `selectedRowKeys`，勾选几行后翻页仍在。', '全选后再取消单行，表头转半选；「清空」只重置受控数组。', '组合限制：`rowPinning` 固定行不参与表头全选；树形不级联；被筛选掉的行仍保留在已选 keys 中。']" />

### 行操作与拖拽

<Demo :title-level="4" path="table/row-actions" title="行操作" :desc="['列配 `actions` 生成图标按钮，超出 `maxActions` 的收进竖向点下拉菜单；`icon` 内置 view / edit / copy / remove / more。', '`#actions` 插槽渲染在按钮之前，与按钮同一 flex 行垂直居中，可放状态标签等。', '`danger`、`disabled`（布尔或按行函数）与 `onClick`；点击不会触发 `rowClick`。', '组合限制：操作列是普通列，固定、宽度、分组规则与其他列一致。']" />

<Demo :title-level="4" path="table/row-drag" title="行拖拽" :desc="['按住第一列行抓手拖动，浮层副本跟随指针，蓝色线条标示落位，不插入占位行。', '松手发 `rowReorder`（`from` / `to` 为当前页展示序），业务按需重排 `dataSource`，组件不改数据。', '组合限制：固定行不可拖动；分页 / 排序 / 筛选后按当前展示序返回。']" />

### 单元格编辑

<Demo :title-level="4" path="table/cell-edit" title="单元格编辑" :desc="['列配 `editable`，`editTrigger` 决定单击 / 双击 / 手动进入，编辑态走 `v-model:editingCell`。', '默认渲染 KInput：Enter / blur 提交、Esc 取消；提交只发 `cellEdit`，不直接改数据。', '自定义控件用列的 `editRender`；同一时间只编辑一个单元格，固定列浮层与主表共用同一编辑态。']" />

<Demo :title-level="4" path="table/cell-edit-height" title="编辑 · 自定义控件行高" :desc="['备注列用两行 textarea + 按钮作为 `editRender`，列上 `editHeight: 104` 让可编辑行提前按较高控件预留。', '进入 / 退出编辑行高不变，表格不会上下跳；⌘/Ctrl+Enter 或「提交」写回，Esc 或「取消」放弃。', '组合限制：`editHeight` 只影响有 `editable` 列的行；多个可编辑列取最大预留值。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-selection.md-->
<!--@include: /vue/ui/components/table/_api/props-interaction.md-->
<!--@include: /vue/ui/components/table/_api/column-fields.md-->
<!--@include: /vue/ui/components/table/_api/slots-actions.md-->
<!--@include: /vue/ui/components/table/_api/events-selection.md-->
<!--@include: /vue/ui/components/table/_api/events-interaction.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-interaction.md-->
