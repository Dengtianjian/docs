<template>
  <div>
    <p class="hint">只有横向合并：里程碑行把「任务 + 负责人」两列合成一个说明格（colSpan），不影响行高与虚拟滚动。</p>
    <KTable :columns="columns" :data-source="rows" :span-method="spanMethod" />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  phase: string
  task: string
  owner: string
  period: string
  kind: 'task' | 'milestone'
}

const columns: KTableColumn<Row>[] = [
  { key: 'phase', dataIndex: 'phase', title: '阶段', width: 110 },
  { key: 'task', dataIndex: 'task', title: '任务', width: 200 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 110 },
  { key: 'period', dataIndex: 'period', title: '周期', width: 140 },
]

const rows: Row[] = [
  { id: 1, phase: '需求', task: '竞品梳理', owner: '张三', period: '第 1 周', kind: 'task' },
  { id: 2, phase: '需求', task: '需求评审通过，进入排期（全员）', owner: '', period: '第 2 周', kind: 'milestone' },
  { id: 3, phase: '开发', task: '表格虚拟滚动', owner: '李四', period: '第 3 周', kind: 'task' },
  { id: 4, phase: '开发', task: '固定列浮层', owner: '王五', period: '第 3 周', kind: 'task' },
  { id: 5, phase: '开发', task: '阶段封版（暂停需求变更）', owner: '', period: '第 4 周', kind: 'milestone' },
  { id: 6, phase: '验收', task: '回归与 Edge 验收', owner: '赵六', period: '第 5 周', kind: 'task' },
]

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (row.kind === 'milestone' && columnIndex === 1) return { colSpan: 2 }
  return undefined
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>