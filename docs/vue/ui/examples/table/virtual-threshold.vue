<template>
  <div>
    <div class="bar">
      <KSwitch v-model="windowed" size="sm">启用窗口化（阈值 20）</KSwitch>
      <span>当前阈值：{{ windowed ? 20 : 1000 }}，共 60 行</span>
    </div>
    <KTable
      row-key="id"
      virtual
      :virtual-threshold="windowed ? 20 : 1000"
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :scroll="{ y: 260 }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right' },
]

const rows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  score: 60 + ((index * 7) % 40),
}))

const windowed = ref(true)
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
</style>