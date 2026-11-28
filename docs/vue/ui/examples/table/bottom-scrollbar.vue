<template>
  <div>
    <div class="bar">
      <KSwitch v-model="fixedHeight" size="sm">固定高度（scroll.y）</KSwitch>
      <span class="hint">开启后改用容器内原生横向条</span>
    </div>
    <p class="hint">
      底部滚动条常驻在表格下方：拖动它或滚动表体，两侧位置实时同步；页面继续下滚时它贴在视口底部。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :scroll="scroll"
      bottom-scrollbar
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: string
  owner: string
  channel: string
  created: string
  updated: string
  note: string
  priority: string
}

const fixedHeight = ref(false)
const scroll = computed(() => (fixedHeight.value ? { x: 1580, y: 420 } : { x: 1580 }))

const statuses = ['待付款', '已发货', '已完成']
const cities = ['杭州', '上海', '成都', '深圳']
const owners = ['林一', '周舟', '陈默', '苏禾']
const channels = ['官网', '小程序', '分销', '线下']

const rows: Row[] = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  code: `SO-2026${String(index + 1).padStart(4, '0')}`,
  customer: `客户 ${index + 1}`,
  city: cities[index % cities.length],
  amount: 1200 + index * 460,
  status: statuses[index % statuses.length],
  owner: owners[index % owners.length],
  channel: channels[index % channels.length],
  created: `11-${String(8 + (index % 10)).padStart(2, '0')} 09:30`,
  updated: `11-${String(10 + (index % 9)).padStart(2, '0')} 16:20`,
  note: index % 3 === 0 ? '工作日送货' : index % 3 === 1 ? '周末配送' : '到店自提',
  priority: index % 4 === 0 ? '高' : '普通',
}))

const columns: KTableColumn<Row>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号', width: 140, fixed: 'left' },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 120 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  { key: 'amount', dataIndex: 'amount', title: '金额', width: 120, render: ({ value }) => `¥ ${Number(value).toLocaleString()}` },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 100 },
  { key: 'channel', dataIndex: 'channel', title: '渠道', width: 100 },
  { key: 'created', dataIndex: 'created', title: '创建时间', width: 140 },
  { key: 'updated', dataIndex: 'updated', title: '更新时间', width: 140 },
  { key: 'priority', dataIndex: 'priority', title: '优先级', width: 90 },
  { key: 'note', dataIndex: 'note', title: '备注', width: 160 },
]
</script>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>