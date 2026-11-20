# KTable · 行选择

> 多选、单选、跨页全选与已选状态。


### 最小用法

```vue
const selection = {
  type: 'checkbox',
  onChange: (keys, rows) => { selected.value = keys },
}

<KTable row-key="id" :columns="columns" :data-source="rows" :row-selection="selection" />
```

### 多选与单选

<Demo :title-level="4" path="table/selection" title="多选" :desc="['`rowSelection` 默认 checkbox 多选，开启当前页全选。', '`getCheckboxProps` 禁用不可选行，`selectionChange` 回传 keys 与行数据。', '点击数据格触发 `rowClick`，勾选格/操作按钮不触发；翻页不会清空已选 key。', '组合限制：默认全选只作用于当前页；树形选择不级联。']" />

<Demo :title-level="4" path="table/selection-single" title="单选" :desc="['`rowSelection.type` 设为 `radio` 切换单选：表头不再出现全选。', '点击只保留一个 key，禁用行同样通过 `getCheckboxProps` 控制。']" />

### 跨页选择

<Demo :title-level="4" path="table/selection-cross-page" title="跨页选择" :desc="['`rowSelection.selectAllScope` 设为 `all` 后，表头全选覆盖当前筛选/排序结果的**所有分页**，表头勾选态与半选态按全局计算。', '翻页、改每页条数都会保留已选 key；本演示用受控 `selectedRowKeys`，勾选几行后翻页仍在。', '全选后再取消单行，表头转半选；「清空」只重置受控数组。', '组合限制：`rowPinning` 固定行不参与表头全选；树形不级联；被筛选掉的行仍保留在已选 keys 中。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-selection.md-->
<!--@include: /vue/ui/components/table/_api/events-selection.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-selection.md-->
