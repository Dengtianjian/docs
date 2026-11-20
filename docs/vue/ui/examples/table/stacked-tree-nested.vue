<template>
  <div>
    <p class="hint">
      四级子树：每层子卡按 <code>depth × indent</code> 缩进（16 / 32 / 48px），收起中间层时整棵子树一起隐藏。
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
    id: 'biz-line',
    name: '交易线',
    owner: '林一',
    status: '进行中',
    progress: 64,
    children: [
      {
        id: 'order-team',
        name: '订单团队',
        owner: '周舟',
        status: '进行中',
        progress: 72,
        children: [
          {
            id: 'order-chain',
            name: '下单链路',
            owner: '周舟',
            status: '进行中',
            progress: 80,
            children: [
              { id: 'cart-module', name: '购物车模块', owner: '苏禾', status: '已完成', progress: 100 },
              { id: 'checkout-module', name: '结算模块', owner: '陈默', status: '进行中', progress: 60 },
            ],
          },
          { id: 'fulfill-module', name: '履约调度', owner: '陈默', status: '待开始', progress: 20 },
        ],
      },
      {
        id: 'settle-team',
        name: '结算团队',
        owner: '陈默',
        status: '进行中',
        progress: 45,
        children: [{ id: 'reconcile-module', name: '对账中心', owner: '林一', status: '进行中', progress: 55 }],
      },
    ],
  },
  {
    id: 'growth-line',
    name: '增长线',
    owner: '苏禾',
    status: '进行中',
    progress: 38,
    children: [
      {
        id: 'ads-team',
        name: '投放团队',
        owner: '周舟',
        status: '待开始',
        progress: 15,
        children: [{ id: 'asset-module', name: '素材平台', owner: '周舟', status: '待开始', progress: 10 }],
      },
    ],
  },
  {
    id: 'infra-line',
    name: '基础线',
    owner: '苏禾',
    status: '已完成',
    progress: 100,
    children: [{ id: 'storage-team', name: '存储团队', owner: '林一', status: '已完成', progress: 100 }],
  },
]

const expandedKeys = ref<KTableRowKey[]>([
  'biz-line',
  'order-team',
  'order-chain',
  'settle-team',
  'growth-line',
  'ads-team',
])

const columns: KTableColumn<TeamNode>[] = [
  { key: 'name', dataIndex: 'name', title: '组织 / 项目' },
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
.hint code {
  padding: 0 4px;
  border-radius: 4px;
  background: var(--k-color-fill-tertiary);
  font-size: 11px;
}
</style>