<template>
  <div>
    <p class="hint">
      <code>#card</code> 插槽整体替换卡片主体；选择控件仍由表格渲染在卡片头部。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      stacked
      :pagination="false"
      :row-selection="selection"
    >
      <template #card="{ row }">
        <div class="card">
          <div class="card__head">
            <strong>{{ row.code }}</strong>
            <span class="pill" :class="{ 'is-done': row.status === '已完成' }">{{ row.status }}</span>
          </div>
          <p class="card__meta">{{ row.customer }} · {{ row.city }}</p>
          <div class="card__foot">
            <span class="amount">¥ {{ row.amount.toLocaleString() }}</span>
            <KButton size="sm" @click="picked = row.code">处理</KButton>
          </div>
        </div>
      </template>
    </KTable>
    <p class="log">已选 {{ selected.length }} 项；最近处理：{{ picked || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Order extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: string
}

const rows: Order[] = [
  { id: 1, code: 'SO-20260021', customer: '林一', city: '杭州', amount: 4200, status: '已完成' },
  { id: 2, code: 'SO-20260022', customer: '周舟', city: '上海', amount: 2680, status: '已发货' },
  { id: 3, code: 'SO-20260023', customer: '陈默', city: '成都', amount: 980, status: '待付款' },
]

const selected = ref<KTableRowKey[]>([])
const picked = ref('')

const selection = computed(() => ({
  selectedRowKeys: selected.value,
  onChange: (keys: KTableRowKey[]) => (selected.value = keys),
}))

const columns: KTableColumn<Order>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号' },
  { key: 'customer', dataIndex: 'customer', title: '客户' },
  { key: 'city', dataIndex: 'city', title: '城市' },
  { key: 'amount', dataIndex: 'amount', title: '金额' },
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
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 15px;
}
.card__meta {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid var(--k-neutral-2);
}
.amount {
  font-variant-numeric: tabular-nums;
}
.pill {
  padding: 0 8px;
  border-radius: 10px;
  background: var(--k-color-fill-tertiary);
  color: var(--k-color-text-secondary);
  font-size: 11px;
  line-height: 20px;
}
.pill.is-done {
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
}
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>