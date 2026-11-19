<template>
  <div>
    <KSpace size="md" style="margin-bottom: 12px">
      <KSwitch v-model="loading">加载中</KSwitch>
      <KSwitch v-model="empty">空数据</KSwitch>
      <KSwitch v-model="striped">斑马纹</KSwitch>
      <KSwitch v-model="bordered">边框</KSwitch>
      <KSwitch v-model="summary">汇总</KSwitch>
    </KSpace>
    <KTable
      :columns="columns"
      :data-source="empty ? [] : rows"
      :loading="loading"
      :striped="striped"
      :bordered="bordered"
      empty-text="没有符合条件的数据"
    >
      <template v-if="summary" #summary="{ rows: summaryRows }">
        共 {{ summaryRows.length }} 条记录
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  { key: 'role', dataIndex: 'role', title: '角色' },
]
const rows: Row[] = [
  { id: 1, name: '张三', role: '前端' },
  { id: 2, name: '李四', role: '后端' },
]

const loading = ref(false)
const empty = ref(false)
const striped = ref(false)
const bordered = ref(true)
const summary = ref(true)
</script>