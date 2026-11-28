<template>
  <div>
    <p class="hint">
      1000 行 + 行展开：展开内容高度单独测量并计入所属行的虚拟偏移；展开/收起后前缀和重建，快速上下滚动时固定列与主表仍逐行对齐。
    </p>
    <KTable
      class="virtual-expand-demo"
      row-key="id"
      virtual
      sticky
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :scroll="{ x: 900, y: 400 }"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="keys => (expandedKeys = keys)"
    >
      <template #expanded="{ row }">
        <div class="detail">
          <strong>订单 {{ row.id }} · {{ row.customer }}</strong>
          <p>{{ row.note }}</p>
          <p>
            收货信息：{{ row.city }} / {{ row.product }}；物流状态由仓库实时回传，异常件会在 24 小时内重新安排配送。
          </p>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  customer: string
  product: string
  city: string
  amount: number
  status: string
  note: string
}

const cities = ['杭州', '上海', '北京', '深圳', '成都']
const rows: Row[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  customer: `客户 ${index + 1}`,
  product: ['键盘', '显示器', '耳机', '支架'][index % 4],
  city: cities[index % cities.length],
  amount: 99 + ((index * 37) % 900),
  status: ['待发货', '运输中', '已签收'][index % 3],
  note: `第 ${index + 1} 笔订单：共 ${1 + (index % 4)} 件商品，发票抬头为「客户 ${index + 1}」，需要在工作日 18:00 前送达。`,
}))

const columns: KTableColumn<Row>[] = [
  { key: 'id', dataIndex: 'id', title: '订单号', width: 100, fixed: 'left' },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 150 },
  { key: 'product', dataIndex: 'product', title: '商品', width: 160 },
  { key: 'city', dataIndex: 'city', title: '城市', width: 100 },
  { key: 'amount', dataIndex: 'amount', title: '金额', width: 110, align: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110, fixed: 'right' },
]

const expandedKeys = ref<number[]>([2, 3])
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  line-height: 1.6;
}

.detail p {
  margin: 0;
  color: var(--k-color-text-secondary);
}
</style>