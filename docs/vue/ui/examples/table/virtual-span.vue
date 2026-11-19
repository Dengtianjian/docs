<template>
  <div>
    <p class="hint">
      1000 行按 4 行一组纵向合并部门列，并开启虚拟滚动。滚到某组中间时，窗口会自动上探到合并起始行，
      部门列不会出现空白；离开一组后窗口再收回。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      virtual
      sticky
      :scroll="{ x: 760, y: 360 }"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  task: string
  status: string
}

const GROUP = 4

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 140 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'task', dataIndex: 'task', title: '任务', width: 300 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
]

const rows: Row[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  dept: `第 ${Math.floor(index / GROUP) + 1} 组`,
  name: `成员 ${index + 1}`,
  task: `任务 ${index + 1}`,
  status: index % 3 === 0 ? '进行中' : '已完成',
}))

function spanMethod({ rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex !== 0) return undefined
  return rowIndex % GROUP === 0 ? { rowSpan: GROUP } : undefined
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>