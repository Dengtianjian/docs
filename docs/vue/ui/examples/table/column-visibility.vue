<template>
  <div>
    <p class="hint">「姓名」固定显示；「内部备注」默认隐藏，可在「列设置」中勾选打开；其余列可自由切换。</p>
    <KTable
      v-model:column-visibility="visibility"
      :columns="columns"
      :data-source="rows"
      column-setting
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  email: string
  city: string
  remark: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', hideable: false, width: 140 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 120 },
  { key: 'email', dataIndex: 'email', title: '邮箱', width: 220 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
  { key: 'remark', dataIndex: 'remark', title: '内部备注', hidden: true },
]

const visibility = ref<Record<string, boolean>>({})

const rows: Row[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  remark: `第 ${index + 1} 条内部备注`,
}))
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>