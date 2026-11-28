<template>
  <div>
    <p class="hint">
      表头渲染在数据下方，并随页面滚动贴在视口最底部；需要留出底边间距时用 <code>page-sticky-offset</code>。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      header-position="bottom"
      page-sticky
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: string
}

const cities = ['杭州', '上海', '成都', '深圳']
const statuses = ['待付款', '已发货', '已完成']

const rows: Row[] = Array.from({ length: 22 }, (_, index) => ({
  id: index + 1,
  code: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  city: cities[index % cities.length],
  amount: 1200 + index * 380,
  status: statuses[index % statuses.length],
}))

const columns: KTableColumn<Row>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号' },
  { key: 'customer', dataIndex: 'customer', title: '客户' },
  { key: 'city', dataIndex: 'city', title: '城市' },
  { key: 'amount', dataIndex: 'amount', title: '金额', align: 'right', render: ({ value }) => `¥ ${Number(value).toLocaleString()}` },
  { key: 'status', dataIndex: 'status', title: '状态' },
]
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.hint code {
  padding: 0 4px;
  border-radius: 4px;
  background: var(--k-color-fill-tertiary);
  font-size: 11px;
}
</style>