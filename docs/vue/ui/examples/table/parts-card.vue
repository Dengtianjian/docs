<template>
  <div class="parts-card-demo">
    <KTable
      row-key="id"
      stacked
      :columns="columns"
      :data-source="rows"
      :class-names="{ stack: 'parts-stack' }"
      :styles="{ stack: { gap: '10px' } }"
    />
    <p class="hint">`classNames.stack` / `styles.stack` 作用于卡片列表容器；卡片本身仍是常规 KCard 视觉。</p>
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  status: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'team', dataIndex: 'team', title: '团队', stack: 'subtitle' },
  { key: 'status', dataIndex: 'status', title: '状态' },
]

const rows: Row[] = [
  { id: 1, name: '张三', team: '前端', status: '在职' },
  { id: 2, name: '李四', team: '后端', status: '休假' },
]
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.parts-card-demo :deep(.parts-stack .k-table__card) {
  border-color: color-mix(in oklab, var(--k-color-primary) 30%, var(--k-color-border-secondary));
}
</style>