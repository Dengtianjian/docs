<template>
  <div>
    <KTable
      class="parts-demo"
      row-key="id"
      searchable
      column-setting
      :columns="columns"
      :data-source="rows"
      :pagination="{ pageSize: 3 }"
      :class-names="{
        root: 'parts-root',
        row: 'parts-row',
        header: 'parts-header',
        toolbar: 'parts-toolbar',
        filterPanel: 'parts-filter',
        pagination: 'parts-pagination',
        footer: 'parts-footer',
      }"
      :styles="{ root: { borderRadius: '12px' }, pagination: { paddingTop: '8px' } }"
    >
      <template #header>
        <span class="parts-header-text">页眉插槽 · classNames.header</span>
      </template>
      <template #footer="{ rows: data }">
        <span class="parts-footer-text">页脚插槽 · 当前 {{ data.length }} 条</span>
      </template>
    </KTable>
    <p class="hint">
      覆盖 `root / row / header / toolbar / filterPanel / pagination / footer` 与列级 `classNames.cell`、`styles.cell`；
      其余部件（`columnSetting / wrap / loading / stack / scrollbar / loadMore / fixedLayer`）按需加类即可。
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
  {
    key: 'team',
    dataIndex: 'team',
    title: '团队',
    filters: ['前端', '后端', '设计'].map(value => ({ label: value, value })),
  },
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
  { id: 4, name: '赵六', team: '前端', score: 76 },
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
.parts-demo :deep(.parts-header) {
  color: var(--k-color-primary);
}
.parts-demo :deep(.parts-toolbar) {
  background-color: color-mix(in oklab, var(--k-color-primary) 3%, var(--k-color-bg-container));
}
.parts-demo :deep(.parts-footer) {
  color: var(--k-color-text-secondary);
}
.parts-header-text,
.parts-footer-text {
  display: block;
  padding: 6px 16px;
  font-size: 12px;
}
</style>