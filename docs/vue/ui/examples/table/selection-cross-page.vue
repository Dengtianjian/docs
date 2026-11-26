<template>
  <div>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :pagination="{ showSizeChanger: true, pageSizeOptions: [6, 10, 20] }"
      v-model:page-size="pageSize"
      :row-selection="selection"
    />
    <p class="hint">
      已选 {{ selected.length }} 条
      <template v-if="selected.length">：{{ selected.slice(0, 6).join('、') }}{{ selected.length > 6 ? ' …' : '' }}</template>
      <button type="button" class="reset" :disabled="!selected.length" @click="selected = []">清空</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  city: string
}

const TEAMS = ['前端', '后端', '设计']
const CITIES = ['杭州', '上海', '北京', '深圳']

const rows: Row[] = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
  team: TEAMS[index % TEAMS.length],
  city: CITIES[index % CITIES.length],
}))

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 120 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 100 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
]

const selected = ref<Array<string | number>>([])
const pageSize = ref(6)

const selection = computed(() => ({
  selectedRowKeys: selected.value,
  selectAllScope: 'all' as const,
  onChange: (keys: Array<string | number>) => {
    selected.value = keys
  },
}))
</script>

<style scoped>
.hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.reset {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--k-color-primary);
  font: inherit;
  cursor: pointer;
}
.reset:disabled {
  color: var(--k-color-text-quaternary);
  cursor: not-allowed;
}
</style>
