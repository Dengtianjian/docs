<template>
  <div>
    <div class="bar">
      <span>受控排序：{{ sort ? `${sort.columnKey} · ${sort.order}` : '未排序' }}</span>
      <span>受控筛选：{{ Object.keys(filters).length ? Object.keys(filters).join(' / ') : '无' }}</span>
      <KButton size="xs" @click="reset">重置</KButton>
    </div>
    <KTable
      :columns="columns"
      :data-source="rows"
      :sort-state="sort"
      :filters="filters"
      @sort-change="sort = $event"
      @filter-change="filters = $event"
    />
    <p class="hint">团队列设为 `filterMultiple: false`：面板内单选，点击新选项直接替换。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn, KTableFilterState, KTableSortState } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', sortable: true },
  {
    key: 'team',
    dataIndex: 'team',
    title: '团队',
    filterMultiple: false,
    filters: ['前端', '后端', '设计'].map(value => ({ label: value, value })),
  },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right', sortable: true },
]

const rows: Row[] = [
  { id: 1, name: '张三', team: '前端', score: 92 },
  { id: 2, name: '李四', team: '后端', score: 88 },
  { id: 3, name: '王五', team: '设计', score: 95 },
  { id: 4, name: '赵六', team: '前端', score: 76 },
]

const sort = ref<KTableSortState | null>(null)
const filters = ref<KTableFilterState>({})

function reset() {
  sort.value = null
  filters.value = {}
}
</script>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>