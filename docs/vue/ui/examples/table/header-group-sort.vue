<template>
  <KTable
    :columns="columns"
    :data-source="rows"
    :row-selection="{ type: 'checkbox' }"
    sticky
    :scroll="{ x: 980, y: 260 }"
  />
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
  joined: string
  score: number
  status: string
}

const columns: KTableColumn<Row>[] = [
  {
    key: 'profile',
    title: '基本信息',
    children: [
      { key: 'name', dataIndex: 'name', title: '姓名', width: 150, fixed: 'left', sortable: true },
      { key: 'team', dataIndex: 'team', title: '团队', width: 110, fixed: 'left' },
    ],
  },
  {
    key: 'contact',
    title: '联系方式',
    children: [
      { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
      { key: 'city', dataIndex: 'city', title: '城市', width: 110 },
    ],
  },
  {
    key: 'perf',
    title: '绩效',
    children: [
      {
        key: 'score',
        dataIndex: 'score',
        title: '分数',
        width: 130,
        align: 'right',
        sortable: true,
        filters: [
          { label: '≥ 80', value: 80 },
          { label: '< 80', value: 0 },
        ],
        filterMethod: (value, row) => (value === 80 ? row.score >= 80 : row.score < 80),
      },
      {
        key: 'joined',
        dataIndex: 'joined',
        title: '入职时间',
        width: 150,
        sortable: true,
      },
    ],
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: 110,
    fixed: 'right',
    filters: [
      { label: '在职', value: '在职' },
      { label: '休假', value: '休假' },
      { label: '试用', value: '试用' },
    ],
    filterMethod: (value, row) => row.status === value,
  },
]

const rows: Row[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  joined: `202${index % 5}-0${(index % 9) + 1}-12`,
  score: 60 + ((index * 9) % 40),
  status: ['在职', '休假', '试用'][index % 3],
}))
</script>