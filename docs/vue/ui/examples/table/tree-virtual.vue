<template>
  <div>
    <p class="hint">
      20 个分组 × 4 个团队 × 12 名成员，共 1060 行：三级树 + `virtual` 同时开启。展开/收起任意层级只改变
      窗口内的行，前缀和立即重建，快速滚动也不会与固定列错开。
    </p>
    <KTable
      class="tree-virtual-demo"
      row-key="id"
      tree
      virtual
      sticky
      :columns="columns"
      :data-source="tree"
      :pagination="false"
      :scroll="{ x: 800, y: 380 }"
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
  email: string
  city: string
  score: number
  children?: Node[]
}

const cities = ['杭州', '上海', '北京', '深圳']
const tree: Node[] = Array.from({ length: 20 }, (_, group) => ({
  id: `g${group + 1}`,
  name: `部门 ${group + 1}`,
  owner: `负责人 ${group + 1}`,
  email: `group${group + 1}@example.com`,
  city: cities[group % cities.length],
  score: 70 + (group % 20),
  children: Array.from({ length: 4 }, (_, team) => ({
    id: `g${group + 1}-t${team + 1}`,
    name: `团队 ${group + 1}-${team + 1}`,
    owner: `组长 ${group + 1}-${team + 1}`,
    email: `team${group + 1}-${team + 1}@example.com`,
    city: cities[(group + team) % cities.length],
    score: 65 + ((group * 3 + team) % 25),
    children: Array.from({ length: 12 }, (_, member) => ({
      id: `g${group + 1}-t${team + 1}-m${member + 1}`,
      name: `成员 ${group + 1}-${team + 1}-${member + 1}`,
      owner: `员工 ${group + 1}-${team + 1}-${member + 1}`,
      email: `member${group + 1}-${team + 1}-${member + 1}@example.com`,
      city: cities[(group + team + member) % cities.length],
      score: 60 + ((group * 7 + team * 5 + member * 3) % 40),
    })),
  })),
}))

const columns: KTableColumn<Node>[] = [
  { key: 'name', dataIndex: 'name', title: '分组 / 成员', width: 260, fixed: 'left', ellipsis: true },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 130 },
  {
    key: 'email',
    dataIndex: 'email',
    title: '邮箱',
    width: 220,
    ellipsis: true,
    ellipsisTooltip: true,
  },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  {
    key: 'score',
    dataIndex: 'score',
    title: '评分',
    width: 90,
    align: 'right',
    fixed: 'right',
    sortable: true,
  },
]

const expandedKeys = ref<KTableRowKey[]>(['g1', 'g1-t1', 'g2', 'g2-t1'])
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>