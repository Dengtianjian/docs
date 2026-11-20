<template>
  <div>
    <p class="hint">
      树形箭头保留在卡片标题里；展开后子行以卡片追加在父卡片下方，缩进随层级保留。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      tree
      stacked
      :pagination="false"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="expandedKeys = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface TeamNode extends Record<string, unknown> {
  id: string
  name: string
  owner: string
  status: string
  progress: number
  children?: TeamNode[]
}

const rows: TeamNode[] = [
  {
    id: 'g1',
    name: '平台组',
    owner: '林一',
    status: '进行中',
    progress: 72,
    children: [
      { id: 'g1-1', name: '表格重构', owner: '林一', status: '进行中', progress: 80 },
      { id: 'g1-2', name: '主题生成', owner: '周舟', status: '已完成', progress: 100 },
    ],
  },
  {
    id: 'g2',
    name: '业务组',
    owner: '陈默',
    status: '进行中',
    progress: 45,
    children: [
      { id: 'g2-1', name: '订单中心', owner: '陈默', status: '待开始', progress: 20 },
    ],
  },
  { id: 'g3', name: '设计组', owner: '苏禾', status: '已完成', progress: 100 },
]

const expandedKeys = ref<KTableRowKey[]>(['g1'])

const columns: KTableColumn<TeamNode>[] = [
  { key: 'name', dataIndex: 'name', title: '团队 / 项目' },
  { key: 'owner', dataIndex: 'owner', title: '负责人', stack: 'subtitle' },
  { key: 'status', dataIndex: 'status', title: '状态' },
  { key: 'progress', dataIndex: 'progress', title: '进度', render: ({ value }) => `${value}%` },
]
</script>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>