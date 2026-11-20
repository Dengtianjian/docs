# KTable · 排序与筛选

> 单列排序、列筛选与全局搜索。分页见独立分类，工具条插槽见「插槽」页。


### 最小用法

```vue
const columns = [
  { key: 'name', dataIndex: 'name', title: '姓名', sortable: true },
  { key: 'team', dataIndex: 'team', title: '团队', filters: teamOptions },
]

<KTable searchable row-key="id" :columns="columns" :data-source="rows" />
```

### 排序与筛选

<Demo :title-level="4" path="table/sort-filter" title="排序与筛选" :desc="['列 `sortable` 点击循环：升序 → 降序 → 取消。', '`filters` 在表头展开多选面板，`filterMultiple=false` 为单选。', '排序与筛选可叠加；树形下排序只作用于同级。']" />

<Demo :title-level="4" path="table/global-filter" title="全局搜索" :desc="['工具条搜索框绑定 `v-model:global-filter`，默认按可见叶子列的文本包含匹配。', '与列筛选、排序、分页叠加；树形下命中行的祖先链同样保留并展开。', '自定义匹配用 `globalFilterMethod`；“高亮命中”开关演示 `globalFilterHighlight` 关闭。']" />

<Demo :title-level="4" path="table/sort-controlled" title="受控排序与筛选" :desc="['`:sort-state` / `:filters` 受控，配合 `sortChange` / `filterChange` 回写。', '团队列 `filterMultiple: false` 为单选筛选；重置按钮清空受控状态。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-sort-filter.md-->
<!--@include: /vue/ui/components/table/_api/events-core.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-sort-filter.md-->
