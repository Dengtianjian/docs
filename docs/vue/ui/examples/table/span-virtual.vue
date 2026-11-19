<template>
  <div>
    <p class="hint">
      400 行 + 虚拟滚动，只有 colSpan：每 40 行插一条「分段小结」，横向合并「任务 + 工时」；虚拟窗口保持生效，
      滚动时只渲染可视行（约 20 行）。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      virtual
      sticky
      :scroll="{ y: 360 }"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  no: number
  task: string
  hours: string
  status: string
  kind: 'task' | 'summary'
}

const columns: KTableColumn<Row>[] = [
  { key: 'no', dataIndex: 'no', title: '序号', width: 90 },
  { key: 'task', dataIndex: 'task', title: '任务', width: 300 },
  { key: 'hours', dataIndex: 'hours', title: '工时', width: 100, align: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
]

const rows: Row[] = Array.from({ length: 400 }, (_, index) => {
  const summary = index > 0 && index % 40 === 0
  return summary
    ? {
        id: index + 1,
        no: index / 40,
        task: `第 ${index / 40} 段小结：本段任务按计划完成`,
        hours: '',
        status: '—',
        kind: 'summary',
      }
    : {
        id: index + 1,
        no: index + 1,
        task: `任务 ${index + 1}`,
        hours: `${(index % 8) + 1}h`,
        status: index % 3 === 0 ? '进行中' : '已完成',
        kind: 'task',
      }
})

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (row.kind === 'summary' && columnIndex === 1) return { colSpan: 2 }
  return undefined
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