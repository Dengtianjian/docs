<template>
  <div>
    <p class="hint">部门列按连续相同值纵向合并（rowSpan）；本周会行横向合并三周（colSpan）。横向滚动观察左固定列合并与浮层同步。</p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      sticky
      :scroll="{ x: 760, y: 300 }"
      :row-selection="{ type: 'checkbox' }"
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
  week1: string
  week2: string
  week3: string
  status: string
  kind?: 'work' | 'meeting'
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 100, fixed: 'left' },
  { key: 'name', dataIndex: 'name', title: '成员', width: 110 },
  { key: 'week1', dataIndex: 'week1', title: '第 1 周', width: 150 },
  { key: 'week2', dataIndex: 'week2', title: '第 2 周', width: 150 },
  { key: 'week3', dataIndex: 'week3', title: '第 3 周', width: 150 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100, fixed: 'right' },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '张三', week1: '完成登录重构', week2: '补齐单测', week3: '联调上线', status: '在职', kind: 'work' },
  { id: 2, dept: '研发部', name: '李四', week1: '表格虚拟滚动', week2: '性能压测', week3: '文档补全', status: '在职', kind: 'work' },
  { id: 3, dept: '研发部', name: '部门周会', week1: '全员参加架构评审，本周无个人周报', week2: '', week3: '', status: '—', kind: 'meeting' },
  { id: 4, dept: '设计部', name: '王五', week1: '图表规范', week2: '空态插画', week3: '走查修复', status: '在职', kind: 'work' },
  { id: 5, dept: '设计部', name: '赵六', week1: '组件视觉验收', week2: '暗色适配', week3: '图标整理', status: '休假', kind: 'work' },
  { id: 6, dept: '设计部', name: '部门周会', week1: '统一视觉走查口径，暂停个人交付一周', week2: '', week3: '', status: '—', kind: 'meeting' },
]

function spanMethod({ row, rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  // 部门列：同部门连续行的首行纵向合并
  if (columnIndex === 0) {
    if (rowIndex > 0 && rows[rowIndex - 1].dept === row.dept) return undefined
    let span = 1
    while (rows[rowIndex + span] && rows[rowIndex + span].dept === row.dept) span += 1
    return span > 1 ? { rowSpan: span } : undefined
  }
  // 周会行：三周合并成一个说明格（只在起始列返回 colSpan）
  if (row.kind === 'meeting' && columnIndex === 2) return { colSpan: 3 }
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