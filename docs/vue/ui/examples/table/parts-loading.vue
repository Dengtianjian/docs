<template>
  <div class="parts-loading-demo">
    <div class="bar">
      <KSwitch v-model="loading" size="sm">loading</KSwitch>
      <KSwitch v-model="loadingMore" size="sm">loadingMore</KSwitch>
    </div>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :loading-more="loadingMore"
      :pagination="false"
      :scroll="{ y: 220 }"
      :class-names="{ loading: 'parts-loading', loadMore: 'parts-load-more' }"
    />
    <p class="hint">`classNames.loading` 作用于遮罩层，`classNames.loadMore` 作用于触底加载指示。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right' },
]

const rows: Row[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  score: 60 + ((index * 7) % 40),
}))

const loading = ref(false)
const loadingMore = ref(false)
</script>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 8px;
}
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.parts-loading-demo :deep(.parts-loading) {
  background: color-mix(in oklab, var(--k-color-bg-container) 82%, transparent);
}
.parts-loading-demo :deep(.parts-load-more) {
  color: var(--k-color-primary);
}
</style>