<template>
  <div>
    <div class="positions">
      <KButton
        v-for="item in positions"
        :key="item.value"
        size="sm"
        :type="position === item.value ? 'primary' : 'default'"
        @click="position = item.value"
      >
        {{ item.label }}
      </KButton>
    </div>
    <KTable
      v-model:current="page"
      :columns="columns"
      :data-source="rows"
      :pagination="{ showTotal: true }"
      :pagination-position="position"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn, KTablePaginationPosition } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
}

const positions: { label: string; value: KTablePaginationPosition }[] = [
  { label: '左上', value: 'top-left' },
  { label: '中上', value: 'top-center' },
  { label: '右上', value: 'top-right' },
  { label: '左下', value: 'bottom-left' },
  { label: '中下', value: 'bottom-center' },
  { label: '右下', value: 'bottom-right' },
]

const position = ref<KTablePaginationPosition>('bottom-right')
const page = ref(1)

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'team', dataIndex: 'team', title: '团队' },
]

const rows: Row[] = Array.from({ length: 46 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
}))
</script>

<style scoped>
.positions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
</style>