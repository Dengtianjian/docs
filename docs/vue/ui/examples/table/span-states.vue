<template>
  <div>
    <div class="controls">
      <KSwitch v-model="striped" label="斑马纹" />
      <KSwitch v-model="bordered" label="外框" />
      <KSwitch v-model="rowBorders" label="行分隔线" />
      <KSwitch v-model="columnBorders" label="列分隔线" />
    </div>
    <p class="hint">首行被固定行占用、不参与合并；斑马纹下合并格跟随起始行底色，其余合并行不会被交替色覆盖。</p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      :striped="striped"
      :bordered="bordered"
      :row-borders="rowBorders"
      :column-borders="columnBorders"
      :row-pinning="{ top: [1] }"
      sticky
      :scroll="{ y: 320 }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  score: number
  status: string
}

const striped = ref(true)
const bordered = ref(true)
const rowBorders = ref(true)
const columnBorders = ref(true)

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 120 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
]

const rows: Row[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  dept: index < 3 ? '研发部' : index < 6 ? '设计部' : '运营部',
  name: `成员 ${index + 1}`,
  score: 60 + ((index * 7) % 40),
  status: index % 3 === 0 ? '在职' : index % 3 === 1 ? '休假' : '试用',
}))

// 固定行挂在顶部、不参与合并，分组要在剩余行里算
const visibleRows = rows.filter(row => row.id !== 1)

function spanMethod({ row, rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex !== 0) return undefined
  if (rowIndex > 0 && visibleRows[rowIndex - 1].dept === row.dept) return undefined
  let span = 1
  while (visibleRows[rowIndex + span] && visibleRows[rowIndex + span].dept === row.dept) span += 1
  return span > 1 ? { rowSpan: span } : undefined
}
</script>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 8px;
}
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>