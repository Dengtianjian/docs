<template>
  <div>
    <p class="hint">
      第 3 行的「全员会」把左固定列「部门」和「成员」合并成一格，跨了固定区与非固定区：整表会退回粘性单元格模式（控制台有告警），
      横向滚动时固定列仍吸边，但快速拖动可能重新出现轻微的漂/漏光。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      sticky
      :scroll="{ x: 720, y: 280 }"
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
  week: string
  status: string
  kind: 'work' | 'meeting'
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 110, fixed: 'left' },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'week', dataIndex: 'week', title: '本周进展', width: 260 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100, fixed: 'right' },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '张三', week: '表格合并接入', status: '在职', kind: 'work' },
  { id: 2, dept: '研发部', name: '李四', week: '浮层合并同步', status: '在职', kind: 'work' },
  { id: 3, dept: '研发部全员会', name: '—', week: '暂停个人开发，集中评审合并方案', status: '—', kind: 'meeting' },
  { id: 4, dept: '设计部', name: '王五', week: '合并格视觉走查', status: '在职', kind: 'work' },
  { id: 5, dept: '设计部', name: '赵六', week: '边框与斑马纹确认', status: '休假', kind: 'work' },
]

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (row.kind === 'meeting' && columnIndex === 0) return { colSpan: 2 }
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