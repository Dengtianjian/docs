<template>
  <div>
    <KTable :columns="columns" :data-source="rows" :row-selection="selection" @selection-change="onSelection" />
    <p class="hint">已选：{{ selected.join('、') || '无' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'role', dataIndex: 'role', title: '角色' },
]
const rows: Row[] = [
  { id: 1, name: '张三', role: '前端' },
  { id: 2, name: '李四', role: '后端' },
  { id: 3, name: '王五', role: '设计' },
  { id: 4, name: '赵六', role: '测试' },
]
const selected = ref<Array<string | number>>([])

const selection = {
  getCheckboxProps: (row: Row) => ({ disabled: row.id === 4 }),
  onChange: (keys: Array<string | number>) => {
    selected.value = keys
  },
}

function onSelection(keys: Array<string | number>) {
  selected.value = keys
}
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>