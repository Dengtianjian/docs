<template>
  <div class="ledger">
    <div class="ledger-head">
      <span>时间</span>
      <span>摘要</span>
      <span>渠道</span>
      <span class="is-amount">金额</span>
    </div>
    <KVirtualList :items="items" :item-height="48" :height="336" item-key="id">
      <template #default="{ item }">
        <div class="ledger-row">
          <span class="is-time">{{ item.time }}</span>
          <span class="is-title">{{ item.title }}</span>
          <span><KTag size="sm" :color="item.tagColor">{{ item.channel }}</KTag></span>
          <span class="is-amount" :class="{ 'is-income': item.amount > 0 }">{{ formatAmount(item.amount) }}</span>
        </div>
      </template>
    </KVirtualList>
    <div class="ledger-foot">
      <span>共 {{ items.length }} 笔</span>
      <span>收入 {{ formatAmount(income) }} · 支出 {{ formatAmount(-expense) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import KVirtualList from 'kit/vue/ui/components/data-display/VirtualList/VirtualList.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'

const titles = ['订单结算', '运费补贴', '广告投放', '会员续费', '退款', '平台佣金', '优惠券核销', '提现']
const channels = [
  { name: '微信支付', color: 'success' as const },
  { name: '支付宝', color: 'primary' as const },
  { name: '银联', color: 'warning' as const },
  { name: '余额', color: 'default' as const },
]

const items = Array.from({ length: 6000 }, (_, index) => {
  const channel = channels[index % channels.length]!
  const day = 25 - Math.floor(index / 240)
  const hour = 8 + (index % 12)
  const minute = (index * 13) % 60
  const amount = (index % 5 === 0 ? -1 : 1) * ((index % 97) + 1) * 12.5
  return {
    id: index + 1,
    time: `11-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    title: titles[index % titles.length],
    channel: channel.name,
    tagColor: channel.color,
    amount,
  }
})

const income = items.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0)
const expense = items.filter(item => item.amount < 0).reduce((sum, item) => sum + Math.abs(item.amount), 0)

function formatAmount(value: number) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : ''
  return `${sign}¥${Math.abs(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
</script>

<style scoped>
.ledger {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.ledger-head,
.ledger-row {
  display: grid;
  grid-template-columns: 104px 1fr 96px 120px;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}
.ledger-head {
  height: 40px;
  background: var(--k-color-fill-quaternary);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  font-weight: var(--k-font-weight-strong);
}
.ledger-row {
  height: 48px;
  border-bottom: 1px solid var(--k-color-border-secondary);
  font-size: var(--k-font-size-sm);
}
.is-time {
  color: var(--k-color-text-secondary);
  font-variant-numeric: tabular-nums;
}
.is-title {
  color: var(--k-color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.is-amount {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
.ledger-row .is-amount {
  color: var(--k-color-text);
}
.ledger-row .is-amount.is-income {
  color: var(--k-color-success);
}
.ledger-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  height: 40px;
  align-items: center;
  padding: 0 12px;
  border-top: 1px solid var(--k-color-border);
  background: var(--k-color-fill-quaternary);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>