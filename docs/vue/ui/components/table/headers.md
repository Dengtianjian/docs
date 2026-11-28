# KTable · 表头与列头

> 多级表头与分组排序/筛选。列头插槽见「插槽」分类。


### 最小用法

```vue
const columns = [
  {
    key: 'contact',
    title: '联系方式',
    children: [
      { key: 'email', dataIndex: 'email', title: '邮箱' },
      { key: 'city', dataIndex: 'city', title: '城市' },
    ],
  },
]
```

### 表头分组

<Demo :title-level="4" path="table/header-group" title="表头分组" :desc="['列的 `children` 生成多级表头：分组列 `colspan` 覆盖叶子数量，叶子列 `rowspan` 补齐层高。', '排序与筛选只挂在叶子列上。', '组合限制：分组跨固定与非固定边界时整组不参与吸边，需把分组整体放在同侧固定区。']" />

<Demo :title-level="4" path="table/header-group-sort" title="分组表头 + 排序/筛选 + 滚动" :desc="['多级表头里同时放可排序列与带筛选项的列。', '配合横向滚动、粘性表头、左右固定列观察图标与吸附稳定性。', '组合限制：固定列必须连续；分组跨边界时该组退回非吸边。']" />

> 列头的自定义内容（`#columnHeader`）见「插槽」页。

## API

<!--@include: ./_api/column-fields.md-->

## 注意事项

<!--@include: ./_api/notes-headers.md-->
