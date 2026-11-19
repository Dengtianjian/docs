<template>
  <div>
    <KSpace style="margin-bottom: 12px">
      <KSwitch v-model="empty">空数据</KSwitch>
    </KSpace>
    <KTable :columns="columns" :data-source="empty ? [] : rows">
      <template #empty>
        <KEmpty description="还没有成员，先邀请一位吧">
          <template #actions>
            <KButton type="primary" size="sm">邀请成员</KButton>
          </template>
        </KEmpty>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KEmpty from 'kit/vue/ui/components/Empty/Empty.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
}

const empty = ref(true)

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'team', dataIndex: 'team', title: '团队' },
]

const rows: Row[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
}))
</script>