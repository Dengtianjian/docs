<template>
  <KTable
    :columns="columns"
    :data-source="rows"
    :row-selection="{ type: 'checkbox' }"
    sticky
    :scroll="{ x: 900, y: 240 }"
  />
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
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
  {
    key: 'profile',
    title: '基本信息',
    children: [
      { key: 'name', dataIndex: 'name', title: '姓名', width: 140 },
      { key: 'team', dataIndex: 'team', title: '团队', width: 120 },
    ],
  },
  {
    key: 'contact',
    title: '联系方式',
    children: [
      { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
      { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
    ],
  },
  {
    key: 'group-score',
    title: '评分',
    children: [
      {
        key: 'score',
        dataIndex: 'score',
        title: '分数',
        width: 120,
        align: 'right',
        sortable: true,
        filters: [
          { label: '≥ 80', value: 80 },
          { label: '< 80', value: 0 },
        ],
        filterMethod: (value, row) =>
          value === 80 ? row.score >= 80 : row.score < 80,
      },
    ],
  },
]

const rows: Row[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 9) % 40),
}))
</script>