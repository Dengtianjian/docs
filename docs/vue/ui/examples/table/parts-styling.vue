<template>
  <div>
    <KTable
      class="parts-demo"
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :class-names="{ root: 'parts-root', row: 'parts-row' }"
      :styles="{ root: { borderRadius: '12px' } }"
    />
    <p class="hint">
      表格级 `classNames.root / row` 与列级 `classNames.cell`、`styles.cell` 一起使用；部件名见 API 的 `Part` 列表。
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
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', classNames: { cell: 'parts-cell' } },
  { key: 'team', dataIndex: 'team', title: '团队' },
  {
    key: 'score',
    dataIndex: 'score',
    title: '评分',
    align: 'right',
    styles: { cell: { fontWeight: 600 } },
  },
]

const rows: Row[] = [
  { id: 1, name: '张三', team: '前端', score: 92 },
  { id: 2, name: '李四', team: '后端', score: 88 },
  { id: 3, name: '王五', team: '设计', score: 95 },
]
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.parts-demo :deep(.parts-row > .k-table__cell) {
  background-color: color-mix(in oklab, var(--k-color-primary) 4%, var(--k-color-bg-container));
}
.parts-demo :deep(.parts-cell) {
  color: var(--k-color-primary);
}
</style>