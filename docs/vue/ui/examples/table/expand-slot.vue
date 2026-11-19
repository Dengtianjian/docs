<template>
  <KTable
    v-model:expanded-row-keys="expanded"
    :columns="columns"
    :data-source="rows"
  >
    <template #expanded="{ row, index, rowKey }">
      <div class="panel">
        <div class="panel__head">
          <strong>{{ row.order }} · {{ row.customer }}</strong>
          <span class="panel__meta">第 {{ index + 1 }} 行 · key {{ rowKey }}</span>
        </div>
        <div class="panel__grid">
          <div class="panel__field"><span class="panel__label">下单时间</span><span>{{ row.createdAt }}</span></div>
          <div class="panel__field"><span class="panel__label">承运商</span><span>{{ row.carrier }}</span></div>
          <div class="panel__field"><span class="panel__label">金额</span><span>{{ row.amount }}</span></div>
        </div>
        <KButton size="sm" variant="outlined" @click="contactCount += 1">
          联系客户（{{ contactCount }}）
        </KButton>
      </div>
    </template>
  </KTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  amount: string
  status: string
  createdAt: string
  carrier: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 140 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 160 },
  { key: 'amount', dataIndex: 'amount', title: '金额', width: 130, align: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100 },
]

const rows: Row[] = [
  { id: 1, order: 'SO-2401', customer: '杭州云枢', amount: '¥1,280.00', status: '已发货', createdAt: '2026-11-12 09:20', carrier: '顺丰' },
  { id: 2, order: 'SO-2402', customer: '上海叠境', amount: '¥860.00', status: '待发货', createdAt: '2026-11-12 14:05', carrier: '京东' },
  { id: 3, order: 'SO-2403', customer: '北京分形', amount: '¥2,430.00', status: '已完成', createdAt: '2026-11-13 10:41', carrier: '顺丰' },
  { id: 4, order: 'SO-2404', customer: '深圳深空', amount: '¥540.00', status: '待付款', createdAt: '2026-11-14 16:18', carrier: '中通' },
  { id: 5, order: 'SO-2405', customer: '成都双生', amount: '¥1,090.00', status: '已完成', createdAt: '2026-11-15 08:52', carrier: '京东' },
]

const expanded = ref<KTableRowKey[]>([2])
const contactCount = ref(0)
</script>

<style scoped>
.panel {
  display: grid;
  gap: 8px;
  padding: 4px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.panel__head {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--k-color-text);
}
.panel__meta {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.panel__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
}
.panel__field {
  display: flex;
  gap: 8px;
}
.panel__label {
  color: var(--k-color-text-tertiary);
}
.panel > .k-button {
  justify-self: start;
}
</style>