<template>
  <div>
    <p class="hint">只有纵向合并：部门列按连续相同值合并，其余列保持逐行显示。</p>
    <KTable :columns="columns" :data-source="rows" :span-method="spanMethod" />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  role: string
  city: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 120 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 120 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '张三', role: '前端', city: '杭州' },
  { id: 2, dept: '研发部', name: '李四', role: '后端', city: '杭州' },
  { id: 3, dept: '研发部', name: '王五', role: '测试', city: '上海' },
  { id: 4, dept: '设计部', name: '赵六', role: '交互', city: '杭州' },
  { id: 5, dept: '设计部', name: '钱七', role: '视觉', city: '北京' },
  { id: 6, dept: '设计部', name: '孙八', role: '插画', city: '北京' },
]

function spanMethod({ row, rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex !== 0) return undefined
  if (rowIndex > 0 && rows[rowIndex - 1].dept === row.dept) return undefined
  let span = 1
  while (rows[rowIndex + span] && rows[rowIndex + span].dept === row.dept) span += 1
  return span > 1 ? { rowSpan: span } : undefined
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>