<template>
  <div>
    <div class="bar">
      <KSwitch v-model="forceCards" size="sm">强制卡片</KSwitch>
      <span class="hint">
        演示同时设了 <code>stack-breakpoint="md"</code>：关掉开关后，窗口缩到 768px 以下仍会自动切卡片。
      </span>
    </div>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :stacked="forceCards"
      stack-breakpoint="md"
      :row-selection="selection"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="expandedKeys = $event"
      @cell-edit="onCellEdit"
    >
      <template #expanded="{ row }">
        <div class="detail">
          <span>收货地址：{{ row.address }}</span>
          <span>备注：{{ row.note }}</span>
        </div>
      </template>
    </KTable>
    <p class="log">已选 {{ selected.length }} 项；最近操作：{{ lastAction || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import type { KTableCellEditEvent, KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Order extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: string
  created: string
  address: string
  note: string
}

const rows = ref<Order[]>(Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  code: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: ['林一', '周舟', '陈默', '苏禾'][index % 4],
  city: ['杭州', '上海', '成都', '深圳'][index % 4],
  amount: 1200 + index * 860,
  status: ['待付款', '已发货', '已完成'][index % 3],
  created: `11-${String(10 + index).padStart(2, '0')} 14:20`,
  address: ['西湖区文三路 88 号', '浦东新区世纪大道 1 号', '武侯区天府大道 9 号', '南山区科技园 6 号'][index % 4],
  note: index % 2 === 0 ? '工作日送货' : '周末配送',
})))

const forceCards = ref(true)
const selected = ref<KTableRowKey[]>([])
const expandedKeys = ref<KTableRowKey[]>([2])
const lastAction = ref('')

function onCellEdit({ row, value }: KTableCellEditEvent<Order>) {
  row.status = String(value)
  lastAction.value = `修改 ${row.code} 状态为「${row.status}」`
}

const selection = computed(() => ({
  selectedRowKeys: selected.value,
  onChange: (keys: KTableRowKey[]) => (selected.value = keys),
}))

const columns: KTableColumn<Order>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号' },
  { key: 'customer', dataIndex: 'customer', title: '客户', stack: 'subtitle' },
  {
    key: 'city',
    dataIndex: 'city',
    title: '城市',
    stack: 'subtitle',
    filters: ['杭州', '上海', '成都', '深圳'].map(value => ({ label: value, value })),
  },
  { key: 'amount', dataIndex: 'amount', title: '金额', render: ({ value }) => `¥ ${Number(value).toLocaleString()}` },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    editable: true,
    filters: ['待付款', '已发货', '已完成'].map(value => ({ label: value, value })),
    render: ({ value }) => value,
  },
  { key: 'created', dataIndex: 'created', title: '创建时间' },
  { key: 'address', dataIndex: 'address', title: '地址', stack: false, ellipsis: true },
  {
    key: 'actions',
    title: '操作',
    maxActions: 2,
    actions: [
      { key: 'view', label: '查看', icon: 'view', onClick: ({ row }) => (lastAction.value = `查看 ${row.code}`) },
      { key: 'edit', label: '编辑', icon: 'edit', onClick: ({ row }) => (lastAction.value = `编辑 ${row.code}`) },
      { key: 'remove', label: '删除', icon: 'remove', danger: true, onClick: ({ row }) => (lastAction.value = `删除 ${row.code}`) },
    ],
  },
]
</script>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.hint {
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
.detail {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>