<template>
  <div>
    <p class="hint">
      底部表头组合：多级表头 + 左右固定列 + 选择/展开列 + 固定行 + 汇总行 + 排序/筛选 + 列拖拽/拖宽，表头悬浮在容器底部。
    </p>
    <KTable
      v-model:expanded-row-keys="expanded"
      :columns="columns"
      :data-source="rows"
      :row-selection="selection"
      :row-pinning="{ bottom: [6] }"
      header-position="bottom"
      sticky
      column-draggable
      column-resizable
      :scroll="{ x: 980, y: 320 }"
      :pagination="false"
      @selection-change="keys => (selected = keys)"
    >
      <template #expanded="{ row }">
        <div class="expanded">
          {{ row.order }} · {{ row.customer }} · 承运商 {{ row.carrier }} · 下单 {{ row.createdAt }}
        </div>
      </template>
      <template #summary="{ rows: summaryRows }">
        <span class="summary">
          共 {{ summaryRows.length }} 条 · 已选 {{ selected.length }} 条 · 金额合计 ¥
          {{ summaryRows.reduce((sum, row) => sum + row.amount, 0).toLocaleString() }}
        </span>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  city: string
  carrier: string
  status: string
  amount: number
  createdAt: string
}

const cities = ['杭州', '上海', '成都', '深圳']
const carriers = ['顺丰', '京东', '中通']
const statuses = ['待付款', '已发货', '已完成']

const rows: Row[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  order: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  city: cities[index % cities.length],
  carrier: carriers[index % carriers.length],
  status: statuses[index % statuses.length],
  amount: 1200 + index * 380,
  createdAt: `2026-11-${String(1 + (index % 20)).padStart(2, '0')} 10:${String(index * 7 % 60).padStart(2, '0')}`,
}))

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 150, fixed: 'left', sortable: true },
  {
    key: 'customer-group',
    title: '客户信息',
    children: [
      { key: 'customer', dataIndex: 'customer', title: '客户', width: 130 },
      { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
    ],
  },
  { key: 'carrier', dataIndex: 'carrier', title: '承运商', width: 100 },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: 110,
    filters: statuses.map(status => ({ label: status, value: status })),
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    title: '金额',
    width: 140,
    fixed: 'right',
    align: 'right',
    render: ({ value }) => `¥ ${Number(value).toLocaleString()}`,
  },
]

const expanded = ref<KTableRowKey[]>([2])
const selected = ref<KTableRowKey[]>([])

const selection = {
  onChange: (keys: KTableRowKey[]) => {
    selected.value = keys
  },
}
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.expanded {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.summary {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>