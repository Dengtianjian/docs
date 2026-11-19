<template>
  <div>
    <p class="hint">
      `tree` 按 `children` 展开：展开箭头与缩进在首列，内部层级不额外占列；展开状态与行详情共用
      `expandedRowKeys`。筛选状态列后，命中行的祖先链会保留并自动展开。
    </p>
    <KTable
      class="tree-demo"
      row-key="id"
      tree
      sticky
      :columns="columns"
      :data-source="tree"
      :row-selection="rowSelection"
      :pagination="false"
      :scroll="{ x: 820, y: 360 }"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="keys => (expandedKeys = keys)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface Node {
  id: string
  name: string
  owner: string
  city: string
  headcount: number
  status: '启用' | '停用'
  children?: Node[]
}

const tree: Node[] = [
  {
    id: 'd1',
    name: '研发中心',
    owner: '李雷',
    city: '杭州',
    headcount: 96,
    status: '启用',
    children: [
      {
        id: 'd1-1',
        name: '前端组',
        owner: '韩梅梅',
        city: '杭州',
        headcount: 24,
        status: '启用',
        children: [
          { id: 'd1-1-1', name: '组件平台', owner: '王五', city: '杭州', headcount: 9, status: '启用' },
          { id: 'd1-1-2', name: '业务前端', owner: '赵六', city: '上海', headcount: 15, status: '停用' },
        ],
      },
      {
        id: 'd1-2',
        name: '后端组',
        owner: '张伟',
        city: '北京',
        headcount: 42,
        status: '启用',
        children: [
          { id: 'd1-2-1', name: '基础服务', owner: '陈晨', city: '北京', headcount: 20, status: '启用' },
          { id: 'd1-2-2', name: '数据平台', owner: '孙悦', city: '北京', headcount: 22, status: '停用' },
        ],
      },
      { id: 'd1-3', name: '质量组', owner: '刘洋', city: '杭州', headcount: 12, status: '启用' },
    ],
  },
  {
    id: 'd2',
    name: '设计中心',
    owner: '周迅',
    city: '上海',
    headcount: 38,
    status: '启用',
    children: [
      { id: 'd2-1', name: '产品设计', owner: '吴倩', city: '上海', headcount: 18, status: '启用' },
      { id: 'd2-2', name: '视觉设计', owner: '郑爽', city: '深圳', headcount: 20, status: '停用' },
    ],
  },
  {
    id: 'd3',
    name: '市场部',
    owner: '冯绍峰',
    city: '广州',
    headcount: 45,
    status: '启用',
    children: [
      { id: 'd3-1', name: '品牌组', owner: '何炅', city: '广州', headcount: 15, status: '启用' },
      { id: 'd3-2', name: '增长组', owner: '谢娜', city: '广州', headcount: 30, status: '启用' },
    ],
  },
]

const columns: KTableColumn<Node>[] = [
  { key: 'name', dataIndex: 'name', title: '组织 / 团队', width: 280, fixed: 'left', ellipsis: true },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 110 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  { key: 'headcount', dataIndex: 'headcount', title: '人数', width: 90, align: 'right' },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: 110,
    fixed: 'right',
    filters: [
      { label: '启用', value: '启用' },
      { label: '停用', value: '停用' },
    ],
  },
]

const expandedKeys = ref<KTableRowKey[]>(['d1', 'd1-1'])

const rowSelection = {
  type: 'checkbox' as const,
  onChange: () => {},
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>