<template>
  <KTable
    v-model:expanded-row-keys="expanded"
    :columns="columns"
    :data-source="rows"
    :span-method="spanMethod"
  >
    <template #expanded="{ row, index, rowKey }">
      <div class="panel">
        <div class="panel__head">
          <strong>{{ row.name }} · {{ row.dept }}</strong>
          <span class="panel__meta">第 {{ index + 1 }} 行 · key {{ rowKey }}</span>
        </div>
        <div class="panel__grid">
          <span class="panel__label">任务</span><span>{{ row.task }}</span>
          <span class="panel__label">进度</span><span>{{ row.progress }}%</span>
        </div>
      </div>
    </template>
  </KTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type {
  KTableCellSpan,
  KTableColumn,
  KTableRowKey,
  KTableSpanContext,
} from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  task: string
  progress: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 120 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'task', dataIndex: 'task', title: '任务', width: 280, ellipsis: true },
  { key: 'progress', dataIndex: 'progress', title: '进度', width: 100, align: 'right' },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '成员 1', task: '组件库表格合并能力', progress: 80 },
  { id: 2, dept: '研发部', name: '成员 2', task: '虚拟滚动不定高测量', progress: 60 },
  { id: 3, dept: '研发部', name: '成员 3', task: '展开内容组尾渲染', progress: 45 },
  { id: 4, dept: '设计部', name: '成员 4', task: '合并场景视觉走查', progress: 70 },
  { id: 5, dept: '设计部', name: '成员 5', task: '固定列浮层对齐', progress: 55 },
  { id: 6, dept: '设计部', name: '成员 6', task: '空态与加载状态', progress: 35 },
]

const expanded = ref<KTableRowKey[]>([2, 3])

function spanMethod({ row, rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex !== 0) return undefined
  if (rowIndex > 0 && rows[rowIndex - 1].dept === row.dept) return undefined
  let span = 1
  while (rows[rowIndex + span] && rows[rowIndex + span].dept === row.dept) span += 1
  return span > 1 ? { rowSpan: span } : undefined
}
</script>

<style scoped>
.panel {
  display: grid;
  gap: 8px;
  padding: 4px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.panel__head {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--k-color-text);
}
.panel__meta {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.panel__grid {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 8px 16px;
}
.panel__label {
  color: var(--k-color-text-tertiary);
}
</style>