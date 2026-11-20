<template>
  <div>
    <p class="hint">
      拖表头抓手换位（同一列可并入别的分组），拖右缘改列宽（挤右邻列，末列加宽表格），双击右缘复位；顺序与宽度分别走
      <code>v-model:column-order</code> / <code>v-model:column-widths</code>，可保存后还原。
    </p>
    <KTable
      v-model:column-order="order"
      v-model:column-widths="widths"
      row-key="id"
      column-draggable
      column-resizable
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :scroll="{ x: 920 }"
    />
    <div class="ops">
      <KButton size="sm" @click="reset">重置列顺序与列宽</KButton>
      <span>当前列宽：{{ widthSummary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
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
  { key: 'name', dataIndex: 'name', title: '姓名', width: 150 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 110 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 120 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 230, ellipsis: true },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 90, align: 'right', sortable: true },
]

const initialOrder = columns.map(column => String(column.key))
const order = ref<string[]>([...initialOrder])
const widths = ref<Record<string, number>>({})

const rows: Row[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  role: ['工程师', '负责人', '实习生'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  score: 60 + ((index * 7) % 40),
}))

const widthSummary = computed(() => {
  const entries = Object.entries(widths.value)
  return entries.length ? entries.map(([key, value]) => `${key} ${value}px`).join(' · ') : '默认'
})

function reset() {
  order.value = [...initialOrder]
  widths.value = {}
}
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
.ops {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>