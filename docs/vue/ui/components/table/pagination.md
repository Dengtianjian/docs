# KTable · 分页

> 分页器开关、位置、受控页码与每页条数。


### 最小用法

```vue
<KTable
  v-model:current="page"
  v-model:page-size="size"
  row-key="id"
  :columns="columns"
  :data-source="rows"
  :pagination="{ showSizeChanger: true }"
/>
```

### 分页器

<Demo :title-level="4" path="table/pagination" title="分页" :desc="['`pagination` 传对象开启底部 KPagination（可配每页条数、跳转、总数）。', '`v-model:current` / `v-model:page-size` 受控；`pageChange` 回传当前页与每页条数。', '组合限制：分页切片作用于当前可见行，树形下父子可能被切到两页。']" />

<Demo :title-level="4" path="table/pagination-position" title="分页位置" :desc="['`paginationPosition` 六选一：左上 / 中上 / 右上 / 左下 / 中下 / 右下，默认右下。', '`both` 上下各渲染一份并统一右下对齐。']" />

## API

<!--@include: ./_api/props-pagination.md-->
<!--@include: ./_api/events-core.md-->

## 注意事项

<!--@include: ./_api/notes-pagination.md-->
