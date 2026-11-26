<template>
  <div>
    <p class="hint">
      `expanded-placement="bottom"`：展开内容不插在行下方，而是追加到该行所属合并组的末尾整行（跨全部列），
      不是整表底部；部门列的纵向合并保持生效。内容由 `expanded-render` 返回的 VNode 渲染（也可改用 `#expanded` 插槽）。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      expanded-placement="bottom"
      :expanded-render="renderExpanded"
      sticky
      :scroll="{ x: 640, y: 320 }"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type {
  KTableColumn,
  KTableSpanContext,
  KTableCellSpan,
  KTableExpandedRenderContext,
} from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  note: string
  status: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 120, fixed: 'left' },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'note', dataIndex: 'note', title: '备注', width: 260, ellipsis: true },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100, fixed: 'right' },
]

const rows: Row[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  dept: index < 3 ? '研发部' : '设计部',
  name: `成员 ${index + 1}`,
  note: `第 ${index + 1} 行详情：展开后内容追加到所属部门组的末尾`,
  status: index % 3 === 0 ? '在职' : index % 3 === 1 ? '休假' : '试用',
}))

function renderExpanded({ row }: KTableExpandedRenderContext<Row>) {
  return h('div', { class: 'detail' }, `${row.name}：${row.note}`)
}

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
  line-height: 20px;
}
.detail {
  padding: 4px 8px;
  color: var(--k-color-text-secondary);
}
</style>