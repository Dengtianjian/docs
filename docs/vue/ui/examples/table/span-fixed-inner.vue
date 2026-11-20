<template>
  <div>
    <p class="hint">
      里程碑行在左固定区内部把「部门 + 成员」合成一格（colSpan 2），同时把中区「任务 + 负责人」合成一格。
      两处合并都没有跨固定区，整表继续使用固定列浮层：横向滚动时合并格随左侧固定区平移，不会退回粘性模式。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      sticky
      :scroll="{ x: 820, y: 280 }"
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
  owner: string
  status: string
  kind: 'work' | 'meeting'
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 110, fixed: 'left' },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120, fixed: 'left' },
  { key: 'task', dataIndex: 'task', title: '本周进展', width: 240 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 100 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100, fixed: 'right' },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '张三', task: '表格合并接入', owner: '张三', status: '在职', kind: 'work' },
  { id: 2, dept: '研发部', name: '李四', task: '浮层合并同步', owner: '李四', status: '在职', kind: 'work' },
  {
    id: 3,
    dept: '研发部全员会',
    name: '—',
    task: '集中评审固定列内合并，暂停个人开发',
    owner: '—',
    status: '—',
    kind: 'meeting',
  },
  { id: 4, dept: '设计部', name: '王五', task: '合并格视觉走查', owner: '王五', status: '在职', kind: 'work' },
  { id: 5, dept: '设计部', name: '赵六', task: '边框与斑马纹确认', owner: '赵六', status: '休假', kind: 'work' },
]

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (row.kind !== 'meeting') return undefined
  if (columnIndex === 0) return { colSpan: 2 }
  if (columnIndex === 2) return { colSpan: 2 }
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
