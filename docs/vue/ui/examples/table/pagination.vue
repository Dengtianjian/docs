<template>
  <div>
    <KTable
      v-model:current="page"
      v-model:page-size="size"
      :columns="columns"
      :data-source="rows"
      :pagination="{ showSizeChanger: true, showQuickJumper: true, showTotal: true }"
      @page-change="onPageChange"
      @update:current="currentModel = $event"
      @update:page-size="sizeModel = $event"
    />
    <p class="hint">当前页 {{ page }}，每页 {{ size }} 条；最近事件：{{ lastEvent || '—' }}；最近 model 更新：{{ modelEvent || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  score: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'score', dataIndex: 'score', title: '评分', align: 'right', sortable: true },
]
const rows: Row[] = Array.from({ length: 46 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
  score: (index * 13) % 100,
}))

const page = ref(1)
const size = ref(10)
const lastEvent = ref('')
const currentModel = ref(1)
const sizeModel = ref(10)
const modelEvent = computed(() => `update:current=${currentModel.value} / update:page-size=${sizeModel.value}`)

function onPageChange(nextPage: number, nextSize: number) {
  lastEvent.value = `pageChange(${nextPage}, ${nextSize})`
}
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>