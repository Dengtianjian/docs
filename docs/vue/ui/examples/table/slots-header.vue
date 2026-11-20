<template>
  <div>
    <p class="hint">
      <code>#columnHeader</code> 同时作用于分组列与叶子列：可以补单位、列数等说明；排序按钮仍由表格包裹，点击排序不受影响。
    </p>
    <KTable :columns="columns" :data-source="rows" :pagination="false">
      <template #columnHeader="{ column }">
        <span class="head">
          {{ column.title }}
          <small v-if="column.children?.length">{{ column.children.length }} 列</small>
          <small v-else-if="column.dataIndex === 'amount'">（元）</small>
        </span>
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
  city: string
  amount: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 160, sortable: true },
  {
    key: 'customer-group',
    title: '客户信息',
    children: [
      { key: 'customer', dataIndex: 'customer', title: '客户', width: 140 },
      { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
    ],
  },
  { key: 'amount', dataIndex: 'amount', title: '金额', width: 140, align: 'right' },
]

const rows: Row[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  order: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默'][index % 3],
  city: ['杭州', '上海', '成都'][index % 3],
  amount: 1200 + index * 380,
}))
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.head small {
  margin-inline-start: 6px;
  color: var(--k-color-text-tertiary);
  font-weight: 400;
}
</style>