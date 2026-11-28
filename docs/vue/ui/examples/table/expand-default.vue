<template>
  <div>
    <KTable
      row-key="id"
      tree
      default-expand-all
      :columns="columns"
      :data-source="tree"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Node {
  id: string
  name: string
  owner: string
  children?: Node[]
}

const tree: Node[] = [
  {
    id: 'd1',
    name: '研发中心',
    owner: '李雷',
    children: [
      { id: 'd1-1', name: '前端组', owner: '韩梅梅' },
      { id: 'd1-2', name: '后端组', owner: '张三' },
    ],
  },
  {
    id: 'd2',
    name: '设计中心',
    owner: '王五',
    children: [{ id: 'd2-1', name: '交互组', owner: '赵六' }],
  },
]

const columns: KTableColumn<Node>[] = [
  { key: 'name', dataIndex: 'name', title: '名称', width: 220 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 160 },
]
</script>