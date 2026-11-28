<template>
  <div>
    <p class="hint">
      400 行、每组 8 行：部门列纵向合并，组末会议行把「任务 + 状态」横向合并并显示多行说明。
      行高既有单行也有多行，虚拟滚动同时处理变量行高与合并窗口扩张。
    </p>
    <KTable
      class="mixed-demo"
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      virtual
      sticky
      :scroll="{ x: 860, y: 380 }"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn, KTableSpanContext, KTableCellSpan } from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  task: string
  status: string
  kind: 'work' | 'meeting'
}

const GROUP = 8

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 140 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  {
    key: 'task',
    dataIndex: 'task',
    title: '任务',
    width: 300,
    styles: { cell: { whiteSpace: 'normal', lineHeight: '22px' } },
  },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
]

const rows: Row[] = Array.from({ length: 400 }, (_, index) => {
  const meeting = index % GROUP === GROUP - 1
  const group = Math.floor(index / GROUP) + 1
  return meeting
    ? {
        id: index + 1,
        dept: `第 ${group} 组`,
        name: '小组会',
        task: `第 ${group} 组周会：回顾本周任务进度、遗留风险与跨组依赖，明确下周交付目标、验收口径和责任人，会后同步纪要到项目群。`,
        status: '—',
        kind: 'meeting',
      }
    : {
        id: index + 1,
        dept: `第 ${group} 组`,
        name: `成员 ${index + 1}`,
        task: `任务 ${index + 1}`,
        status: index % 3 === 0 ? '进行中' : '已完成',
        kind: 'work',
      }
})

function spanMethod({ rowIndex, row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex === 0) return rowIndex % GROUP === 0 ? { rowSpan: GROUP } : undefined
  if (row.kind === 'meeting' && columnIndex === 2) return { colSpan: 2 }
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
.mixed-demo :deep(.k-table__table) {
  table-layout: fixed;
}
</style>