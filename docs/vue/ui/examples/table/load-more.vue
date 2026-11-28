<template>
  <div>
    <p class="hint">
      容器滚动到底部前 30px 触发 <code>reach-end</code>；<code>loadingMore</code> 期间不再触发，并显示底部加载指示。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :scroll="{ y: 360 }"
      :reach-end-threshold="30"
      :loading-more="loadingMore"
      :pagination="false"
      @reach-end="onReachEnd"
    />
    <p class="log">
      已加载 {{ rows.length }} / 36 条 · 触发 {{ hits }} 次 · 最近距离 {{ lastDistance }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  status: string
  amount: number
}

const TOTAL = 36
const BATCH = 12

const cities = ['杭州', '上海', '成都', '深圳']
const statuses = ['待付款', '已发货', '已完成']

function makeRows(start: number, count: number): Row[] {
  return Array.from({ length: count }, (_, offset) => {
    const index = start + offset
    return {
      id: index + 1,
      code: `SO-2026${String(index + 1).padStart(4, '0')}`,
      customer: cities[index % cities.length],
      status: statuses[index % statuses.length],
      amount: 1200 + index * 380,
    }
  })
}

const rows = ref<Row[]>(makeRows(0, BATCH))
const loadingMore = ref(false)
const hits = ref(0)
const lastDistance = ref(0)

const columns: KTableColumn<Row>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号' },
  { key: 'customer', dataIndex: 'customer', title: '区域' },
  { key: 'status', dataIndex: 'status', title: '状态' },
  { key: 'amount', dataIndex: 'amount', title: '金额', align: 'right', render: ({ value }) => `¥ ${Number(value).toLocaleString()}` },
]

function onReachEnd(distance: number) {
  hits.value += 1
  lastDistance.value = distance
  if (loadingMore.value || rows.value.length >= TOTAL) return
  loadingMore.value = true
  window.setTimeout(() => {
    rows.value = [...rows.value, ...makeRows(rows.value.length, BATCH)].slice(0, TOTAL)
    loadingMore.value = false
  }, 600)
}
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
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>