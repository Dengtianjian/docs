<template>
  <KTable :columns="columns" :data-source="rows" :scroll="{ x: 760 }" />
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  description: string
  note: string
  email: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 120 },
  { key: 'description', dataIndex: 'description', title: '单行省略', width: 180, ellipsis: true },
  {
    key: 'note',
    dataIndex: 'note',
    title: '省略 + 提示',
    width: 180,
    ellipsis: true,
    ellipsisTooltip: true,
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: '邮箱',
    width: 200,
    ellipsis: true,
    ellipsisTooltip: true,
  },
]

const rows: Row[] = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  description: '这是一段很长很长的描述文本，用于演示单元格单行省略的截断效果。',
  note: '鼠标悬浮在溢出内容上才会显示完整文本提示。',
  email: `very.long.user.name.${index + 1}@example-internal.example.com`,
}))
</script>