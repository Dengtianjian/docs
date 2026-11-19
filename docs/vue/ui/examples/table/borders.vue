<template>
  <div>
    <KSpace size="md" style="margin-bottom: 12px">
      <KSwitch v-model="bordered">外框</KSwitch>
      <KSwitch v-model="rowBorders">行边框</KSwitch>
      <KSwitch v-model="columnBorders">列边框</KSwitch>
    </KSpace>
    <KTable
      :columns="columns"
      :data-source="rows"
      :bordered="bordered"
      :row-borders="rowBorders"
      :column-borders="columnBorders"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'role', dataIndex: 'role', title: '角色' },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right' },
]
const rows: Row[] = [
  { id: 1, name: '张三', role: '前端', score: 92 },
  { id: 2, name: '李四', role: '后端', score: 88 },
  { id: 3, name: '王五', role: '设计', score: 95 },
]

const bordered = ref(true)
const rowBorders = ref(true)
const columnBorders = ref(true)
</script>