# KTable · 固定行

> 顶部/底部固定行、与固定列交叉、分页与筛选行为。


### 最小用法

```vue
<KTable
  v-model:row-pinning="pinning"
  row-key="id"
  :columns="columns"
  :data-source="rows"
  :scroll="{ y: 360 }"
/>
```

### 固定行

<Demo :title-level="4" path="table/pinned-rows" title="固定行堆叠 × 固定列堆叠" :desc="['`rowPinning` 指定 top / bottom 行，可与左右固定列同时存在。', '固定行不受筛选、排序与分页影响，并从分页总数剔除。', '组合限制：树形下只能固定顶层行，固定带子节点的行后子树不再展示。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-fixed-rows.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-fixed-rows.md-->
