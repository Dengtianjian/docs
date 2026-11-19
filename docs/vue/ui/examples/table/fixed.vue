<template>
  <div>
    <p class="hint">左右拖动底部滚动条，观察首列与末列固定不动；滚到最左/最右时边缘阴影消失。</p>
    <div class="controls">
      <KSwitch v-model="stickyHeader" label="吸顶表头" />
    </div>
    <KTable class="fixed-demo" :columns="columns" :data-source="rows" :sticky="stickyHeader" :scroll="{ x: 920, y: 320 }" />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import { ref } from 'vue'
import type { KTableColumn } from 'kit/vue/ui'

const stickyHeader = ref(true)

interface Row {
  id: number
  name: string
  team: string
  role: string
  email: string
  city: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 140, fixed: 'left' },
  { key: 'team', dataIndex: 'team', title: '团队', width: 120 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 120 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, fixed: 'right', align: 'right' },
]

const rows: Row[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  role: ['工程师', '负责人', '实习生'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 7) % 40),
}))
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.controls {
  margin-bottom: 8px;
}
/* macOS 默认隐藏 overlay 滚动条；演示里强制显示以便观察固定列 */
.fixed-demo :deep(.k-table__wrap) {
  scrollbar-width: thin;
  scrollbar-color: var(--k-color-border) var(--k-color-fill-quaternary);
}
.fixed-demo :deep(.k-table__wrap)::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.fixed-demo :deep(.k-table__wrap)::-webkit-scrollbar-track {
  background: var(--k-color-fill-quaternary);
}
.fixed-demo :deep(.k-table__wrap)::-webkit-scrollbar-thumb {
  background: var(--k-color-border);
  border-radius: 999px;
}
</style>