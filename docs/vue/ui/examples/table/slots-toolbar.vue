<template>
  <div>
    <p class="hint">
      <code>#filter</code> 放工具条左侧筛选区，<code>#toolbar</code> 放右侧操作区（位于内置列设置按钮之前）；搜索框仍用
      <code>searchable</code> + <code>v-model:global-filter</code>。
    </p>
    <KTable
      v-model:global-filter="keyword"
      :columns="columns"
      :data-source="visibleRows"
      searchable
      column-setting
      :pagination="false"
    >
      <template #filter>
        <KRadioGroup v-model="status" shape="button" :options="statusOptions" />
      </template>
      <template #toolbar="{ columns: toolbarColumns }">
        <span class="count">{{ visibleRows.length }} / {{ rows.length }} 行 · {{ toolbarColumns.length }} 列</span>
        <KButton size="sm" variant="outlined" @click="reload">刷新</KButton>
        <KButton size="sm" type="primary" @click="exportData">导出</KButton>
      </template>
    </KTable>
    <p class="log">最近操作：{{ lastAction || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  status: string
  amount: number
}

const statuses = ['待发货', '已发货', '已完成']

const rows: Row[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  order: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  status: statuses[index % statuses.length],
  amount: 1200 + index * 380,
}))

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 160 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 140 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
  { key: 'amount', dataIndex: 'amount', title: '金额', align: 'right' },
]

const statusOptions = [
  { label: '全部', value: '' },
  ...statuses.map(status => ({ label: status, value: status })),
]

const status = ref('')
const keyword = ref('')
const lastAction = ref('')

const visibleRows = computed(() =>
  status.value ? rows.filter(row => row.status === status.value) : rows,
)

function reload() {
  lastAction.value = `刷新（${new Date().toLocaleTimeString()}）`
}

function exportData() {
  lastAction.value = `导出当前 ${visibleRows.value.length} 行`
}
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.count {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>