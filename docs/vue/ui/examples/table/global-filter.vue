<template>
  <div>
    <p class="hint">
      工具条搜索框绑定 <code>v-model:global-filter</code>：默认按可见叶子列的文本做包含匹配，命中片段在单元格内高亮，可与列筛选、排序、分页叠加。
    </p>
    <KTable
      v-model:global-filter="keyword"
      row-key="id"
      searchable
      search-placeholder="搜索姓名 / 团队 / 城市"
      :columns="columns"
      :data-source="rows"
      :pagination="{ pageSize: 8, showSizeChanger: true }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
}

const TEAMS = ['前端', '后端', '设计']
const ROLES = ['工程师', '负责人', '实习生']
const CITIES = ['杭州', '上海', '北京', '深圳']

const rows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: TEAMS[index % TEAMS.length],
  role: ROLES[index % ROLES.length],
  email: `user${index + 1}@example.com`,
  city: CITIES[index % CITIES.length],
  score: 60 + ((index * 7) % 40),
}))

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 140 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 110 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 110 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 220, ellipsis: true },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 90, align: 'right', sortable: true },
]

const keyword = ref('')
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.hint code {
  padding: 0 4px;
  border-radius: 4px;
  background: var(--k-color-fill-tertiary);
  font-size: 11px;
}
</style>