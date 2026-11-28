<template>
  <div>
    <p class="hint">
      <code>#header</code> / <code>#footer</code> 只提供表格上下的挂载位置，不带内边距、颜色等样式，间距和布局由内容自己控制。
    </p>
    <KTable :columns="columns" :data-source="rows" :scroll="{ y: 220 }">
      <template #header="{ rows: headerRows }">
        <div class="page-head">
          <strong>订单列表</strong>
          <span>{{ headerRows.length }} 行</span>
        </div>
      </template>
      <template #footer="{ rows: footerRows, columns: footerColumns }">
        <div class="footer">
          <span>合计 ¥ {{ totalAmount(footerRows).toLocaleString() }}</span>
          <span class="meta">{{ footerRows.length }} 行 · {{ footerColumns.length }} 列</span>
          <KButton size="sm" variant="outlined" @click="exportData">导出</KButton>
        </div>
      </template>
    </KTable>
    <p class="log">最近操作：{{ lastAction || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  amount: number
  status: string
}

const statuses = ['待发货', '已发货', '已完成']

const rows: Row[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  order: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  amount: 1200 + index * 380,
  status: statuses[index % statuses.length],
}))

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 160 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 140 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
  { key: 'amount', dataIndex: 'amount', title: '金额', align: 'right' },
]

const totalAmount = (list: Row[]) => list.reduce((sum, row) => sum + row.amount, 0)
const lastAction = ref('')

function exportData() {
  lastAction.value = `导出 ${rows.length} 行`
}
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.page-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}
.page-head span {
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  margin-top: 12px;
  color: var(--k-color-text);
}
.footer .meta {
  margin-inline-end: auto;
  color: var(--k-color-text-tertiary);
}
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>