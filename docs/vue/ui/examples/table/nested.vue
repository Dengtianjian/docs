<template>
  <div>
    <p class="hint">
      父表开启行展开，展开内容里再放一张 KTable：子表有自己的列、排序、选中态与汇总行。
      父子表的排序与状态互不影响，展开行高度按子表实际内容自适应。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="projects"
      :pagination="false"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="onExpandedChange"
    >
      <template #expanded="{ row }">
        <div class="nested">
          <div class="nested-head">{{ row.name }} · {{ row.items.length }} 条明细</div>
          <KTable
            row-key="id"
            size="sm"
            :bordered="false"
            :columns="itemColumns"
            :data-source="row.items"
            :pagination="false"
          >
            <template #summary="{ rows }">
              <div class="nested-summary">
                <span>{{ rows.length }} 条明细</span>
                <span>合计 ¥{{ totalOf(rows) }}</span>
              </div>
            </template>
          </KTable>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn, KTableRowKey } from 'kit/vue/ui'

interface ItemRow {
  id: string
  name: string
  owner: string
  qty: number
  price: number
  status: string
}

interface ProjectRow {
  id: string
  name: string
  owner: string
  budget: number
  status: string
  items: ItemRow[]
}

const ITEM_NAMES = ['需求梳理', '接口联调', '视觉走查', '数据迁移', '性能优化', '回归测试']
const OWNERS = ['林一', '周舟', '陈默', '苏芮', '高远']
const COSTS = [120, 240, 360, 480, 600]

const projects: ProjectRow[] = Array.from({ length: 6 }, (_, index) => {
  const id = `p${index + 1}`
  const count = 3 + (index % 4)
  return {
    id,
    name: `项目 ${index + 1}`,
    owner: OWNERS[index % OWNERS.length],
    budget: 4000 + index * 1200,
    status: index % 3 === 0 ? '进行中' : index % 3 === 1 ? '已完成' : '待开始',
    items: Array.from({ length: count }, (_, itemIndex) => ({
      id: `${id}-i${itemIndex + 1}`,
      name: ITEM_NAMES[(index + itemIndex) % ITEM_NAMES.length],
      owner: OWNERS[(index + itemIndex) % OWNERS.length],
      qty: 1 + ((index + itemIndex) % 5),
      price: COSTS[(index * 2 + itemIndex) % COSTS.length],
      status: itemIndex % 2 === 0 ? '已完成' : '进行中',
    })),
  }
})

const columns: KTableColumn<ProjectRow>[] = [
  { key: 'name', dataIndex: 'name', title: '项目', width: 180 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 120 },
  {
    key: 'items',
    title: '明细数',
    width: 100,
    align: 'right',
    render: ({ row }) => `${row.items.length} 条`,
  },
  {
    key: 'budget',
    dataIndex: 'budget',
    title: '预算',
    width: 120,
    align: 'right',
    sortable: true,
    render: ({ value }) => `¥${Number(value).toLocaleString()}`,
  },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100 },
]

const itemColumns: KTableColumn<ItemRow>[] = [
  { key: 'name', dataIndex: 'name', title: '明细', width: 180 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 120 },
  { key: 'qty', dataIndex: 'qty', title: '数量', width: 90, align: 'right' },
  {
    key: 'price',
    dataIndex: 'price',
    title: '单价',
    width: 110,
    align: 'right',
    render: ({ value }) => `¥${Number(value).toLocaleString()}`,
  },
  {
    key: 'amount',
    title: '金额',
    width: 120,
    align: 'right',
    sortable: ({ qty, price }: ItemRow, other: ItemRow) => qty * price - other.qty * other.price,
    render: ({ row }) => `¥${(row.qty * row.price).toLocaleString()}`,
  },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100 },
]

const expandedKeys = ref<KTableRowKey[]>(['p1', 'p4'])

function onExpandedChange(keys: KTableRowKey[]) {
  expandedKeys.value = keys
}

function totalOf(rows: ItemRow[]) {
  return rows.reduce((sum, item) => sum + item.qty * item.price, 0).toLocaleString()
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.nested {
  padding: 4px 0 8px;
}
.nested-head {
  margin-bottom: 8px;
  color: var(--k-color-text);
  font-size: var(--k-font-size-sm);
  font-weight: var(--k-font-weight-heading);
}
.nested-summary {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>