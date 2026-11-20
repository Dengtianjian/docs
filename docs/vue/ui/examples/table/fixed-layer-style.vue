<template>
  <div>
    <KTable
      class="fixed-style-demo"
      row-key="id"
      sticky
      :columns="columns"
      :data-source="rows"
      :scroll="{ x: 760, y: 320 }"
      :class-names="{ fixedLayer: 'tinted-fixed' }"
      :styles="{ fixedLayer: { boxShadow: 'inset 0 0 0 1px var(--k-color-primary)' } }"
    />
    <p class="hint">
      `styles.fixedLayer` 同时作用于左右两块固定列浮层；`classNames.fixedLayer` 可再加背景、描边等类样式。
    </p>
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  email: string
  city: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 120, fixed: 'left' },
  { key: 'team', dataIndex: 'team', title: '团队', width: 110 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 110 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 90, align: 'right', fixed: 'right' },
]

const rows: Row[] = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 7) % 40),
}))
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.fixed-style-demo :deep(.tinted-fixed) {
  background-color: color-mix(in oklab, var(--k-color-primary) 3%, var(--k-color-bg-container));
}
</style>