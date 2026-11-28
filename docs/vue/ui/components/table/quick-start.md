# KTable · 快速上手

> 先只记三件事：`columns`、`data-source`、`row-key`。其余能力按需加。

<Demo :title-level="4" path="table/quick-start" title="最小表格" :desc="['三列数据 + 稳定行 key，就是一个可用的表格。', '列只需要 `title` 和 `dataIndex`；不写 `width` 时按内容分配。']" />

### 三件必填

| 属性 | 作用 |
| --- | --- |
| `columns` | 列定义数组；`title` 显示表头，`dataIndex` 取值，`key` 可选（缺省用 `dataIndex`） |
| `data-source` | 行数据数组 |
| `row-key` | 行唯一键；字符串字段名，或 `(row, index) => key` |

```vue
<KTable row-key="id" :columns="columns" :data-source="rows" />
```

### 先加最常用的几项

- 密度：`size="sm" | "md" | "lg"`
- 外框 / 斑马纹：`bordered`、`striped`
- 列宽 / 右对齐：列上 `width: 120`、`align: 'right'`
- 单行省略：列上 `ellipsis`，需要提示时再开 `ellipsisTooltip`
- 内部滚动：`:scroll="{ y: 320, x: 720 }"`
- 排序 / 筛选：列上 `sortable`、`filters`

完整常用属性见 [Prop / Slot 速查](/vue/ui/components/table/props)。

### 下一步

1. 想让首尾列固定 → [固定列](/vue/ui/components/table/fixed-columns)
2. 加排序、筛选、搜索 → [排序与筛选](/vue/ui/components/table/sort-filter)
3. 数据分页 → [分页](/vue/ui/components/table/pagination)
4. 行选择、编辑、操作 → [行选择](/vue/ui/components/table/selection)、[操作与编辑](/vue/ui/components/table/editing)
5. 表头和页脚要定制 → [插槽](/vue/ui/components/table/slots)
6. 大数据量 → [虚拟滚动](/vue/ui/components/table/virtual)
7. 不确定功能在哪 → [功能地图](/vue/ui/components/table/map)