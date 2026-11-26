<template>
  <KTable :columns="columns" :data-source="rows" />
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', minWidth: 120 },
  { key: 'role', dataIndex: 'role', title: '角色' },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right' },
]

const rows: Row[] = [
  { id: 1, name: '张三', role: '前端', score: 92 },
  { id: 2, name: '李四', role: '后端', score: 88 },
  { id: 3, name: '王五', role: '设计', score: 95 },
]
</script>