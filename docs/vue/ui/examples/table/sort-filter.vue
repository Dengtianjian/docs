<template>
  <KTable :columns="columns" :data-source="rows" />
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', sortable: true },
  {
    key: 'team',
    dataIndex: 'team',
    title: '团队',
    filters: [
      { label: '前端', value: '前端' },
      { label: '后端', value: '后端' },
      { label: '设计', value: '设计' },
    ],
  },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right', sortable: true },
]

const rows: Row[] = [
  { id: 1, name: '张三', team: '前端', score: 92 },
  { id: 2, name: '李四', team: '后端', score: 88 },
  { id: 3, name: '王五', team: '设计', score: 95 },
  { id: 4, name: '赵六', team: '前端', score: 76 },
]
</script>