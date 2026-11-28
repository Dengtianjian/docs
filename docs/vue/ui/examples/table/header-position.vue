<template>
  <div>
    <div class="controls">
      <KRadioGroup
        v-model="position"
        shape="button"
        :options="[
          { label: '表头在顶部', value: 'top' },
          { label: '表头在底部', value: 'bottom' },
        ]"
      />
      <KSwitch v-model="stickyHeader" label="表头悬浮" />
    </div>
    <p class="hint">
      表头位置由 <code>header-position</code> 控制；表头在底部时，<code>sticky</code> 改为吸在容器底部。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :header-position="position"
      :sticky="stickyHeader"
      :scroll="{ y: 300 }"
      :pagination="false"
    >
      <template #summary="{ rows }">
        <span class="summary">共 {{ rows.length }} 条 · 金额合计 ¥ {{ rows.reduce((sum, row) => sum + row.amount, 0).toLocaleString() }}</span>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
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

const rows: Row[] = Array.from({ length: 18 }, (_, index) => ({
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

const position = ref<'top' | 'bottom'>('bottom')
const stickyHeader = ref(true)
</script>

<style scoped>
.summary {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-bottom: 12px;
}
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