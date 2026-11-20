# KTable · 列设置与拖拽

> 列显隐、列顺序、列宽与跨分组换位。


### 最小用法

```vue
<KTable column-setting column-draggable column-resizable row-key="id" :columns="columns" :data-source="rows" />
```

### 列显隐

<Demo :title-level="4" path="table/column-visibility" title="列显隐" :desc="['`columnSetting` 显示内置「列设置」按钮。', '`v-model:columnVisibility` 可受控；`hidden` 静态隐藏，`hideable: false` 锁定列。', '组合限制：分组列不可单独隐藏；至少保留一列可见。']" />

### 列顺序与宽度

<Demo :title-level="4" path="table/column-layout" title="列拖拽 / 列宽拖拽" :desc="['拖动表头左侧抓手换位；拖动右边缘改列宽：左拖缩窄、右拖挤右邻列，末列拖动让表格变宽。', '`v-model:columnOrder` / `v-model:columnWidths` 受控；双击表头或右缘把手按容器宽度重新分配列宽（填满表格、消除空隙）；`columnResizable` 会切为固定布局。', '上方开关切 `columnDragMode=press`，按住表头任意处即可拖动。', '组合限制：不跨固定侧换位，左/右浮层列只在各自一侧内移动。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-columns.md-->
<!--@include: /vue/ui/components/table/_api/column-fields.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-columns.md-->
