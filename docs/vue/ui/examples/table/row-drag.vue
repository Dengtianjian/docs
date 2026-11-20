<template>
  <div>
    <p class="hint">
      拖行首列抓手：拖动中出现浮层副本与蓝色落位线，不插入占位行；松手发
      <code>rowReorder</code>，演示里按 from / to 重排数据。
    </p>
    <div class="bar">
      <KSwitch v-model="pressMode" size="sm">按住整行拖动</KSwitch>
    </div>
    <KTable
      row-draggable
      :row-drag-mode="pressMode ? 'press' : 'handle'"
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      @row-reorder="onReorder"
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
  owner: string
  status: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '项目', width: 200 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 140 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 100, align: 'right' },
]

const pressMode = ref(false)

const rows = ref<Row[]>(
  Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: `项目 ${index + 1}`,
    owner: ['林一', '周舟', '陈默'][index % 3],
    status: ['进行中', '已完成', '待开始'][index % 3],
    score: 60 + ((index * 7) % 40),
  })),
)

function onReorder({ from, to }: { from: number; to: number }) {
  const next = [...rows.value]
  const [moved] = next.splice(from, 1)
  if (!moved) return
  next.splice(to, 0, moved)
  rows.value = next
}
</script>

<style scoped>
.bar {
  margin-bottom: 8px;
}
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