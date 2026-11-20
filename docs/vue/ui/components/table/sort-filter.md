# KTable · 排序、筛选与分页

> 排序、列筛选、全局搜索、工具条区域与分页器。

### 排序与筛选

<Demo :title-level="4" path="table/sort-filter" title="排序与筛选" :desc="['列 `sortable` 点击循环：升序 → 降序 → 取消。', '`filters` 在表头展开多选面板，`filterMultiple=false` 为单选。', '排序与筛选可叠加；树形下排序只作用于同级。']" />

<Demo :title-level="4" path="table/global-filter" title="全局搜索" :desc="['工具条搜索框绑定 `v-model:global-filter`，默认按可见叶子列的文本包含匹配。', '与列筛选、排序、分页叠加；树形下命中行的祖先链同样保留并展开。', '组合限制：自定义匹配用 `globalFilterMethod`；默认文本单元格高亮命中片段，自定义 `render` 不处理。']" />

<Demo :title-level="4" path="table/slots-toolbar" title="插槽 · 工具条筛选与操作区" :desc="['`#filter` 放左侧筛选区，`#toolbar` 放右侧操作区，位于内置列设置按钮之前。', '工具条搜索仍用 `searchable` + `v-model:global-filter`；自定义筛选可自行驱动 `dataSource`，再叠加搜索。', '组合限制：插槽只负责布局，筛选与导出逻辑由业务实现；卡片模式下工具条仍可用，但列设置入口隐藏表头时无意义。']" />

### 分页

<Demo :title-level="4" path="table/pagination" title="分页" :desc="['`pagination` 传对象开启底部 KPagination（可配每页条数、跳转、总数）。', '`v-model:current` / `v-model:page-size` 可受控。', '组合限制：分页切片作用于当前可见行，树形下父子可能被切到两页。']" />

<Demo :title-level="4" path="table/pagination-position" title="分页位置" :desc="['`paginationPosition` 六选一：左上 / 中上 / 右上 / 左下 / 中下 / 右下，默认右下。', '`both` 上下各渲染一份并统一右下对齐。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-sort-filter.md-->
<!--@include: /vue/ui/components/table/_api/props-pagination.md-->
<!--@include: /vue/ui/components/table/_api/slots-toolbar.md-->
<!--@include: /vue/ui/components/table/_api/events-core.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-sort-filter.md-->
