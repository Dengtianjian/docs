# KTable · 列设置与拖拽

> 列显隐、列顺序、跨分组换位、列宽拖拽，以及列头/汇总/页眉页脚插槽。

### 列显隐

<Demo :title-level="4" path="table/column-visibility" title="列显隐" :desc="['`columnSetting` 显示内置「列设置」按钮。', '`v-model:columnVisibility` 可受控；`hidden` 静态隐藏，`hideable: false` 锁定列。', '组合限制：分组列不可单独隐藏；至少保留一列可见。']" />

### 列顺序与列宽

<Demo :title-level="4" path="table/column-layout" title="列拖拽 / 列宽拖拽" :desc="['拖动表头左侧抓手换位；拖动右边缘改列宽：左拖缩窄、右拖挤右邻列，末列拖动让表格变宽。', '`v-model:columnOrder` / `v-model:columnWidths` 受控；双击表头或右缘把手按容器宽度重新分配列宽（填满表格、消除空隙）；`columnResizable` 会切为固定布局。', '组合限制：不跨固定侧换位，左/右浮层列只在各自一侧内移动。']" />

<Demo :title-level="4" path="table/column-layout-group" title="列拖拽 · 固定列与跨分组" :desc="['左/右固定列的表头在浮层里也能拖，`columnDraggable` 在两侧都对抓手生效。', '把列拖到其它分组的列旁会并入该分组，拖到顶层列旁则回到顶层；拖拽时目标分组表头加深，落到顶层时目标列头顶部出现落点线。', '分组归属走 `v-model:columnGroups`（叶子 key → 分组 key 路径）。', '组合限制：固定侧不同的列不能互换；分组只剩空壳时自动消失。']" />

### 汇总与页眉页脚

<Demo :title-level="4" path="table/slots-summary" title="插槽 · 自定义汇总行" :desc="['`#summary` 收到当前展示的 `rows` 与可见叶子列 `columns`，合计、计数都按当前结果计算。', '汇总行沿用表格最低一行的留白与分隔线；表头沉底时汇总行排在表头上方。']" />

<Demo :title-level="4" path="table/slots-footer" title="插槽 · 表格页眉与页脚" :desc="['`#header` / `#footer` 渲染在表格上下，独立于表体；插槽本身不带内边距、颜色等样式，保持纯净。', '参数与 `#summary` 一致（`columns` / `rows`），间距与布局由插槽内容自己控制。', '组合限制：页眉页脚在横向滚动容器外，不跟随表体横向滚动；需要与列对齐的合计请用 `#summary`。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-columns.md-->
<!--@include: /vue/ui/components/table/_api/column-fields.md-->
<!--@include: /vue/ui/components/table/_api/slots-columns.md-->
<!--@include: /vue/ui/components/table/_api/slots-layout.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-columns.md-->
