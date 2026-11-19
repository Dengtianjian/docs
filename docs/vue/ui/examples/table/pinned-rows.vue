<template>
  <div>
    <p class="hint">
      左右两列与右侧两列固定，同时顶部固定前两行、底部固定末两行；横向滚动时列堆叠固定，纵向滚动时行堆叠固定。
    </p>
    <KTable
      class="pinned-demo"
      :columns="columns"
      :data-source="rows"
      :row-pinning="{ top: [1, 2], bottom: [29, 30] }"
      sticky
      :scroll="{ x: 1000, y: 300 }"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  role: string
  email: string
  city: string
  score: number
  status: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160, fixed: 'left' },
  { key: 'team', dataIndex: 'team', title: '团队', width: 120, fixed: 'left' },
  { key: 'role', dataIndex: 'role', title: '角色', width: 140 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right', fixed: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100, fixed: 'right' },
]

const rows: Row[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  role: ['工程师', '负责人', '实习生'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 7) % 40),
  status: ['在职', '休假', '试用'][index % 3],
}))
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.pinned-demo :deep(.k-table__wrap) {
  scrollbar-width: thin;
  scrollbar-color: var(--k-color-border) var(--k-color-fill-quaternary);
}
.pinned-demo :deep(.k-table__wrap)::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.pinned-demo :deep(.k-table__wrap)::-webkit-scrollbar-track {
  background: var(--k-color-fill-quaternary);
}
.pinned-demo :deep(.k-table__wrap)::-webkit-scrollbar-thumb {
  border: 2px solid var(--k-color-fill-quaternary);
  border-radius: 6px;
  background: var(--k-color-border);
}
</style>