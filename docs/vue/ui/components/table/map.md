# KTable · 功能地图

> 按“想做什么”找页面和关键配置；完整字段在各分类页底部。

| 想做什么 | 页面 | 关键 Prop / Slot |
| --- | --- | --- |
| 先把表格显示出来 | [快速上手](/vue/ui/components/table/quick-start) | `columns / dataSource / rowKey` |
| 调密度、边框、斑马纹、空态 | [基础与外观](/vue/ui/components/table/basic) | `size / bordered / striped / emptyText / #empty` |
| 多级表头、列头自定义 | [表头与列头](/vue/ui/components/table/headers) | 列 `children`、`#columnHeader` |
| 排序、列筛选、全局搜索 | [排序与筛选](/vue/ui/components/table/sort-filter) | `sortable / filters / searchable / globalFilter` |
| 页码、每页条数、分页位置 | [分页](/vue/ui/components/table/pagination) | `pagination / paginationPosition / v-model:current / v-model:page-size` |
| 页眉、页脚、汇总、工具条 | [插槽](/vue/ui/components/table/slots) | `#header / #footer / #summary / #filter / #toolbar` |
| 展开行、嵌套表、树形 | [展开与树形](/vue/ui/components/table/rows) | `expandable / expandedRender / #expanded / tree` |
| 行列合并 | [单元格合并](/vue/ui/components/table/merge) | `spanMethod` |
| 固定首尾列 | [固定列](/vue/ui/components/table/fixed-columns) | 列 `fixed / width`、数字 `scroll.x` |
| 固定顶部/底部行 | [固定行](/vue/ui/components/table/fixed-rows) | `v-model:rowPinning` |
| 表头吸顶、表头沉底、页面吸顶 | [表头位置与滚动](/vue/ui/components/table/sticky-scroll) | `sticky / headerPosition / pageSticky` |
| 大数据量窗口化 | [虚拟滚动](/vue/ui/components/table/virtual) | `virtual / scroll.y` |
| 列显隐、列顺序、列宽 | [列设置与拖拽](/vue/ui/components/table/columns) | `columnSetting / columnDraggable / columnResizable` |
| 多选、单选、跨页全选 | [行选择](/vue/ui/components/table/selection) | `rowSelection`、`selectAllScope` |
| 行操作、行拖拽、单元格编辑 | [操作与编辑](/vue/ui/components/table/editing) | 列 `actions / editable`、`rowDraggable` |
| 窄屏改卡片 | [响应式卡片](/vue/ui/components/table/stacked) | `stacked / stackBreakpoint`、`#card` |

### 推荐阅读顺序

1. [快速上手](/vue/ui/components/table/quick-start)
2. [基础与外观](/vue/ui/components/table/basic)
3. [排序与筛选](/vue/ui/components/table/sort-filter) + [分页](/vue/ui/components/table/pagination)
4. 按业务选一个方向：固定列 / 行选择 / 展开与树形 / 响应式卡片
5. 最后再看合并、虚拟滚动、吸顶与页面级滚动

### 综合与边界

组合示例和降级路径集中在[边界与组合](/vue/ui/components/table/edge-cases)，普通业务先从上面的分类页入手即可。