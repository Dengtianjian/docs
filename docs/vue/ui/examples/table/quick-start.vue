<template>
  <div>
    <KTable row-key="id" :columns="columns" :data-source="rows" />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Member {
  id: number
  name: string
  team: string
  status: string
}

const rows: Member[] = [
  { id: 1, name: '林一', team: '前端', status: '在职' },
  { id: 2, name: '周舟', team: '后端', status: '在职' },
  { id: 3, name: '陈默', team: '设计', status: '休假' },
]

const columns: KTableColumn<Member>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'team', dataIndex: 'team', title: '团队' },
  { key: 'status', dataIndex: 'status', title: '状态' },
]
</script>