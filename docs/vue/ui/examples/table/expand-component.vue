<template>
  <div class="demo">
    <KTable
      v-model:expanded-row-keys="expanded"
      :columns="columns"
      :data-source="rows"
      :expanded-render="renderDetail"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn, KTableExpandedRenderContext, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  order: string
  customer: string
  amount: string
  status: string
  createdAt: string
  carrier: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'order', dataIndex: 'order', title: '订单号', width: 140 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 160 },
  { key: 'amount', dataIndex: 'amount', title: '金额', width: 130, align: 'right' },
  { key: 'status', dataIndex: 'status', title: '状态', width: 100 },
]

const rows: Row[] = [
  { id: 1, order: 'SO-2401', customer: '杭州云枢', amount: '¥1,280.00', status: '已发货', createdAt: '2026-11-12 09:20', carrier: '顺丰' },
  { id: 2, order: 'SO-2402', customer: '上海叠境', amount: '¥860.00', status: '待发货', createdAt: '2026-11-12 14:05', carrier: '京东' },
  { id: 3, order: 'SO-2403', customer: '北京分形', amount: '¥2,430.00', status: '已完成', createdAt: '2026-11-13 10:41', carrier: '顺丰' },
  { id: 4, order: 'SO-2404', customer: '深圳深空', amount: '¥540.00', status: '待付款', createdAt: '2026-11-14 16:18', carrier: '中通' },
  { id: 5, order: 'SO-2405', customer: '成都双生', amount: '¥1,090.00', status: '已完成', createdAt: '2026-11-15 08:52', carrier: '京东' },
]

const expanded = ref<KTableRowKey[]>([2])

function field(label: string, value: string) {
  return h('div', { class: 'panel__field' }, [
    h('span', { class: 'panel__label' }, label),
    h('span', value),
  ])
}

const OrderDetailPanel = defineComponent({
  name: 'OrderDetailPanel',
  props: { row: { type: Object as () => Row, required: true } },
  setup(props) {
    const follows = ref(0)
    return () =>
      h('div', { class: 'panel' }, [
        h('div', { class: 'panel__head' }, [
          h('strong', `${props.row.order} · ${props.row.customer}`),
          h('span', { class: 'panel__badge' }, props.row.status),
        ]),
        h('div', { class: 'panel__grid' }, [
          field('下单时间', props.row.createdAt),
          field('承运商', props.row.carrier),
          field('金额', props.row.amount),
        ]),
        h(
          KButton,
          { size: 'sm', variant: 'outlined', onClick: () => (follows.value += 1) },
          () => `标记关注（${follows.value}）`,
        ),
      ])
  },
})

function renderDetail({ row }: KTableExpandedRenderContext<Row>) {
  return h(OrderDetailPanel, { row })
}
</script>

<style scoped>
.demo :deep(.panel) {
  display: grid;
  gap: 8px;
  padding: 4px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.demo :deep(.panel__head) {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--k-color-text);
}
.demo :deep(.panel__badge) {
  padding: 0 8px;
  border-radius: 999px;
  background: var(--k-color-fill-secondary);
  font-size: var(--k-font-size-xs);
  line-height: 20px;
}
.demo :deep(.panel__grid) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
}
.demo :deep(.panel__field) {
  display: flex;
  gap: 8px;
}
.demo :deep(.panel__label) {
  color: var(--k-color-text-tertiary);
}
.demo :deep(.panel > .k-button) {
  justify-self: start;
}
</style>