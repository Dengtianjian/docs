<template>
  <div class="wide-demo">
    <div class="toolbar">
      <KButton size="sm" @click="list?.scrollToTop()">回到顶部</KButton>
      <KButton size="sm" @click="list?.scrollToIndex(9999, 'center')">跳到第 10000 条</KButton>
      <span class="tip">左右拖动查看全部列，纵向由虚拟列表负责</span>
    </div>
    <div class="head-clip">
      <div
        class="head"
        :style="{ width: `${TOTAL_WIDTH}px`, gridTemplateColumns: templateColumns, transform: `translateX(${-scrollLeft}px)` }"
      >
        <span v-for="col in columns" :key="col.key" class="cell" :class="{ 'is-end': col.align === 'end' }">
          {{ col.label }}
        </span>
      </div>
    </div>
    <KVirtualList
      ref="list"
      :items="items"
      :item-height="44"
      :height="360"
      item-key="id"
      :styles="{ content: { width: `${TOTAL_WIDTH}px` } }"
      class="frame"
      @scroll="onScroll"
    >
      <template #default="{ item }">
        <div class="row" :style="{ gridTemplateColumns: templateColumns }">
          <span class="cell">{{ item.id }}</span>
          <span class="cell">{{ item.code }}</span>
          <span class="cell">{{ item.customer }}</span>
          <span class="cell">{{ item.city }}</span>
          <span class="cell">{{ item.owner }}</span>
          <span class="cell">
            <KTag size="sm" variant="borderless" :color="item.statusColor">{{ item.status }}</KTag>
          </span>
          <span class="cell">{{ item.priority }}</span>
          <span class="cell">{{ item.created }}</span>
          <span class="cell">{{ item.deadline }}</span>
          <span class="cell is-end">{{ item.hours }}h</span>
          <span class="cell is-end">¥{{ item.amount.toLocaleString('zh-CN') }}</span>
          <span class="cell">{{ item.note }}</span>
        </div>
      </template>
    </KVirtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KVirtualList from 'kit/vue/ui/components/VirtualList/VirtualList.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const columns = [
  { key: 'id', label: '工单号', width: 96 },
  { key: 'code', label: '编码', width: 110 },
  { key: 'customer', label: '客户', width: 120 },
  { key: 'city', label: '城市', width: 80 },
  { key: 'owner', label: '负责人', width: 88 },
  { key: 'status', label: '状态', width: 96 },
  { key: 'priority', label: '优先级', width: 88 },
  { key: 'created', label: '创建时间', width: 132 },
  { key: 'deadline', label: '截止时间', width: 132 },
  { key: 'hours', label: '工时', width: 72, align: 'end' as const },
  { key: 'amount', label: '金额', width: 108, align: 'end' as const },
  { key: 'note', label: '备注', width: 220 },
]
const templateColumns = columns.map(col => `${col.width}px`).join(' ')
const TOTAL_WIDTH = columns.reduce((sum, col) => sum + col.width, 0)

const customers = ['雪见科技', '青丘传媒', '南山物流', '北辰制造', '洛水食品', '云栖教育']
const cities = ['杭州', '上海', '深圳', '成都', '武汉']
const owners = ['林晚', '周野', '苏念', '顾清明', '许知远']
const statuses = [
  { status: '待处理', color: 'default' as const },
  { status: '进行中', color: 'primary' as const },
  { status: '已逾期', color: 'error' as const },
  { status: '已完成', color: 'success' as const },
]
const priorities = ['P0', 'P1', 'P2', 'P3']

const items = Array.from({ length: 20000 }, (_, index) => {
  const status = statuses[index % statuses.length]!
  const month = 11
  const day = (index % 28) + 1
  return {
    id: `GD-${String(index + 1).padStart(6, '0')}`,
    code: `WO${String((index * 37) % 100000).padStart(5, '0')}`,
    customer: customers[index % customers.length],
    city: cities[index % cities.length],
    owner: owners[index % owners.length],
    status: status.status,
    statusColor: status.color,
    priority: priorities[index % priorities.length],
    created: `2026-${month}-${String(day).padStart(2, '0')} ${String(8 + (index % 10)).padStart(2, '0')}:${String((index * 11) % 60).padStart(2, '0')}`,
    deadline: `2026-12-${String(day).padStart(2, '0')} 18:00`,
    hours: (index % 24) + 1,
    amount: ((index % 97) + 1) * 120,
    note: index % 3 === 0 ? '客户要求拆单发货' : index % 3 === 1 ? '需回访确认收货地址' : '—',
  }
})

const list = ref<InstanceType<typeof KVirtualList> | null>(null)
const scrollLeft = ref(0)

function onScroll() {
  scrollLeft.value = list.value?.viewportEl?.scrollLeft ?? 0
}
</script>

<style scoped>
.wide-demo {
  max-width: 680px;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.tip {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.head-clip {
  overflow: hidden;
  border: 1px solid var(--k-color-border);
  border-bottom: 0;
  border-radius: var(--k-border-radius) var(--k-border-radius) 0 0;
  background: var(--k-color-fill-quaternary);
}
.head {
  display: grid;
  height: 40px;
  align-items: center;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  font-weight: var(--k-font-weight-strong);
}
.frame {
  border: 1px solid var(--k-color-border);
  border-top: 0;
  border-radius: 0 0 var(--k-border-radius) var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.row {
  display: grid;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid var(--k-color-border-secondary);
  font-size: var(--k-font-size-sm);
}
.cell {
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell.is-end {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
</style>