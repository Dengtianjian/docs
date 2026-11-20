# KTable · 固定列

> 左右固定列、多列堆叠、浮层吸附与同一固定区内的合并。


### 最小用法

```vue
const columns = [
  { key: 'name', dataIndex: 'name', title: '姓名', fixed: 'left', width: 120 },
  { key: 'status', dataIndex: 'status', title: '状态', fixed: 'right', width: 100 },
]

<KTable row-key="id" :columns="columns" :data-source="rows" :scroll="{ x: 900 }" />
```

### 固定列

<Demo :title-level="4" path="table/fixed" title="固定列 + 粘性表头" :desc="['`fixed` 取 `left` / `right`，需配合数字 `width`。', '`scroll.x` 横向滚动，`scroll.y` 限制高度并让表头吸顶。', '组合限制：固定列需与数字 `scroll.x` 搭配，同侧固定列必须连续。']" />

<Demo :title-level="4" path="table/fixed-stacked" title="堆叠固定列" :desc="['同侧多列按 `width` 依次累加偏移。', '选择列 44px 自动计入左侧偏移。', '组合限制：固定列需连续，分组不能同时跨固定与非固定边界。']" />

<Demo :title-level="4" path="table/fixed-layer-style" title="固定列 · 浮层部件样式" :desc="['`styles.fixedLayer` 同时作用于左右两块浮层，`classNames.fixedLayer` 可再加背景/描边类。']" />

## API

<!--@include: /vue/ui/components/table/_api/column-fields.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-fixed-columns.md-->
