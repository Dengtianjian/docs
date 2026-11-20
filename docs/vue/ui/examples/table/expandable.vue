<template>
  <div>
    <KTable
      v-model:expanded-row-keys="expanded"
      :columns="columns"
      :data-source="rows"
      :row-expandable="row => !row.noDetail"
      @expand-change="onExpandChange"
    >
      <template #expanded="{ row }">
        <div class="detail">
          <span>邮箱：{{ row.email }}</span>
          <span>城市：{{ row.city }}</span>
          <span>评分：{{ row.score }}</span>
        </div>
      </template>
    </KTable>
    <p class="log">最近展开事件：{{ lastExpand || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  role: string
  email: string
  city: string
  score: number
  noDetail?: boolean
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 140 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 160 },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right', width: 120 },
]

const expanded = ref<KTableRowKey[]>([2])
const lastExpand = ref('')

function onExpandChange(keys: KTableRowKey[], row: Row, open: boolean) {
  lastExpand.value = `${row.name} ${open ? '展开' : '收起'}（当前 ${keys.length} 行）`
}

const rows: Row[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  role: ['工程师', '负责人', '实习生'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 9) % 40),
  noDetail: index === 4,
}))
</script>

<style scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.log {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>