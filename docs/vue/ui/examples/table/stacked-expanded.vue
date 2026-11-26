<template>
  <div class="demo">
    <p class="hint">
      卡片展开区用 <code>expanded-render</code> 渲染自定义组件：商品明细、收货信息与操作按钮都渲染在卡片内部。
    </p>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      stacked
      :pagination="false"
      :expanded-render="renderDetail"
      :expanded-row-keys="expanded"
      @update:expanded-row-keys="expanded = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableColumn, KTableExpandedRenderContext, KTableRowKey } from 'kit/vue/ui'

interface OrderLine {
  name: string
  qty: number
  price: number
}

interface Order extends Record<string, unknown> {
  id: number
  code: string
  customer: string
  city: string
  amount: number
  status: string
  address: string
  items: OrderLine[]
}

const rows: Order[] = [
  {
    id: 1,
    code: 'SO-20260031',
    customer: '林一',
    city: '杭州',
    amount: 4280,
    status: '已发货',
    address: '西湖区文三路 88 号',
    items: [
      { name: '人体工学椅', qty: 2, price: 1680 },
      { name: '升降桌', qty: 1, price: 920 },
    ],
  },
  {
    id: 2,
    code: 'SO-20260032',
    customer: '周舟',
    city: '上海',
    amount: 2360,
    status: '待付款',
    address: '浦东新区世纪大道 1 号',
    items: [
      { name: '显示器挂灯', qty: 1, price: 560 },
      { name: '机械键盘', qty: 2, price: 900 },
    ],
  },
  {
    id: 3,
    code: 'SO-20260033',
    customer: '陈默',
    city: '成都',
    amount: 1590,
    status: '已完成',
    address: '武侯区天府大道 9 号',
    items: [{ name: '降噪耳机', qty: 1, price: 1590 }],
  },
  {
    id: 4,
    code: 'SO-20260034',
    customer: '苏禾',
    city: '深圳',
    amount: 3020,
    status: '已发货',
    address: '南山区科技园 6 号',
    items: [
      { name: '便携屏', qty: 2, price: 1260 },
      { name: '收纳架', qty: 2, price: 250 },
    ],
  },
]

const expanded = ref<KTableRowKey[]>([1])

const columns: KTableColumn<Order>[] = [
  { key: 'code', dataIndex: 'code', title: '订单号' },
  { key: 'customer', dataIndex: 'customer', title: '客户', stack: 'subtitle' },
  { key: 'city', dataIndex: 'city', title: '城市', stack: 'subtitle' },
  { key: 'amount', dataIndex: 'amount', title: '金额', render: ({ value }) => `¥ ${Number(value).toLocaleString()}` },
  { key: 'status', dataIndex: 'status', title: '状态' },
]

const OrderDetailPanel = defineComponent({
  name: 'CardOrderDetail',
  props: { row: { type: Object as () => Order, required: true } },
  setup(props) {
    const bought = ref(0)
    return () =>
      h('div', { class: 'detail' }, [
        h('div', { class: 'detail__head' }, [
          h('strong', '商品明细'),
          h('span', { class: 'detail__total' }, `合计 ¥${props.row.amount.toLocaleString()}`),
        ]),
        h(
          'ul',
          { class: 'detail__list' },
          props.row.items.map(item =>
            h('li', { key: item.name }, [
              h('span', item.name),
              h('span', { class: 'detail__qty' }, `×${item.qty}`),
              h('span', { class: 'detail__price' }, `¥${(item.price * item.qty).toLocaleString()}`),
            ]),
          ),
        ),
        h('div', { class: 'detail__meta' }, [
          h('span', { class: 'detail__label' }, '收货地址'),
          h('span', props.row.address),
        ]),
        h(
          KButton,
          { size: 'sm', variant: 'outlined', onClick: () => (bought.value += 1) },
          () => `再次购买（${bought.value}）`,
        ),
      ])
  },
})

function renderDetail({ row }: KTableExpandedRenderContext<Order>) {
  return h(OrderDetailPanel, { row })
}
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
.demo :deep(.detail) {
  display: grid;
  gap: 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.demo :deep(.detail__head) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--k-color-text);
}
.demo :deep(.detail__total) {
  color: var(--k-color-primary);
  font-variant-numeric: tabular-nums;
}
.demo :deep(.detail__list) {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.demo :deep(.detail__list li) {
  display: grid;
  grid-template-columns: 1fr 48px 88px;
  gap: 8px;
}
.demo :deep(.detail__qty),
.demo :deep(.detail__price) {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
.demo :deep(.detail__meta) {
  display: flex;
  gap: 8px;
}
.demo :deep(.detail__label) {
  color: var(--k-color-text-tertiary);
}
.demo :deep(.detail > .k-button) {
  justify-self: start;
}
</style>