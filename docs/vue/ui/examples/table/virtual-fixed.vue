<template>
  <div>
    <p class="hint">1000 行数据 + 虚拟滚动；前两行/末两行固定，姓名与评分固定列，表头吸顶。</p>
    <KTable
      class="virtual-fixed-demo"
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :row-pinning="{ top: [1, 2], bottom: [999, 1000] }"
      virtual
      sticky
      :scroll="{ x: 980, y: 420 }"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

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
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160, fixed: 'left' },
  { key: 'team', dataIndex: 'team', title: '团队', width: 110 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 130 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 240 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 110 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right', fixed: 'right', sortable: true },
]

const rows: Row[] = Array.from({ length: 1000 }, (_, index) => ({
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
</style>