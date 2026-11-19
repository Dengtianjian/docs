<template>
  <KSpace direction="vertical" size="lg">
    <div>
      <p class="label">size="sm"</p>
      <KTable size="sm" :columns="columns" :data-source="rows" />
    </div>
    <div>
      <p class="label">size="md"（默认）</p>
      <KTable :columns="columns" :data-source="rows" />
    </div>
    <div>
      <p class="label">size="lg"</p>
      <KTable size="lg" :columns="columns" :data-source="rows" />
    </div>
  </KSpace>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'role', dataIndex: 'role', title: '角色' },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right' },
]
const rows: Row[] = [
  { id: 1, name: '张三', role: '前端', score: 92 },
  { id: 2, name: '李四', role: '后端', score: 88 },
]
</script>

<style scoped>
.label {
  margin: 0 0 6px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>