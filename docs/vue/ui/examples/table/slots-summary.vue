<template>
  <div>
    <p class="hint">
      <code>#summary</code> 收到当前展示的 <code>rows</code> 与可见叶子列 <code>columns</code>，可自行排版合计、计数等汇总信息。
    </p>
    <KTable :columns="columns" :data-source="rows" :pagination="false">
      <template #summary="{ columns: summaryColumns, rows: summaryRows }">
        <div class="summary">
          <span>共 {{ summaryRows.length }} 条</span>
          <span>已发货 {{ shippedCount(summaryRows) }} 单</span>
          <span>金额合计 ¥ {{ totalAmount(summaryRows).toLocaleString() }}</span>
          <span class="meta">{{ summaryColumns.length }} 个可见列</span>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  status: string
  amount: number
}

const statuses = ['待发货', '已发货', '已完成']

const rows: Row[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  order: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  status: statuses[index % statuses.length],
  amount: 1200 + index * 380,
}))

const shippedCount = (list: Row[]) => list.filter(row => row.status === '已发货').length
const totalAmount = (list: Row[]) => list.reduce((sum, row) => sum + row.amount, 0)

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 160 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 140 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
  { key: 'amount', dataIndex: 'amount', title: '金额', align: 'right', width: 140 },
]
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  color: var(--k-color-text);
  font-size: 12px;
}
.summary .meta {
  margin-inline-start: auto;
  color: var(--k-color-text-tertiary);
}
</style>