<template>
  <div class="recipe-dashboard">
    <header class="appbar">
      <div class="brand">
        <span class="brand-mark">K</span>
        <div class="brand-copy">
          <strong>如意工作台</strong>
          <span>运营概览</span>
        </div>
      </div>
      <div class="appbar-actions">
        <KButton size="sm" variant="text">导出报表</KButton>
        <KButton size="sm" type="primary">新建活动</KButton>
        <KAvatarGroup :max-count="3" :gap="6" size="sm">
          <KAvatar text="林" size="sm" />
          <KAvatar text="周" size="sm" color="var(--k-color-success)" />
          <KAvatar text="陈" size="sm" color="var(--k-color-warning)" />
          <KAvatar text="赵" size="sm" color="var(--k-color-info)" />
        </KAvatarGroup>
      </div>
    </header>

    <div class="welcome">
      <div>
        <p class="eyebrow">2026 年 11 月 · 第 47 周</p>
        <h2>下午好，林一</h2>
        <p class="muted">这里是今天的业务概况，数据仅用于演示页面结构。</p>
      </div>
      <span class="range">近 7 天</span>
    </div>

    <section class="kpis">
      <KCard v-for="item in metrics" :key="item.title" size="sm">
        <KStatistic
          :title="item.title"
          :value="item.value"
          :prefix="item.prefix"
          :suffix="item.suffix"
          :precision="item.precision"
          size="md"
        />
        <div class="trend" :class="item.tone">
          <span>{{ item.trend }}</span>
          <span class="muted">较上周</span>
        </div>
      </KCard>
    </section>

    <section class="main-grid">
      <KCard title="成交趋势" class="chart-card">
        <template #extra>
          <span class="legend"><i />成交额 <i class="soft" />订单量</span>
        </template>
        <KChart
          type="line"
          :categories="chartCategories"
          :series="chartSeries"
          smooth
          area
          :height="236"
        />
      </KCard>

      <KCard title="本月目标" class="goal-card">
        <div class="goal">
          <KProgress type="circle" :percent="72" size="lg" />
          <div class="goal-copy">
            <p class="goal-value">¥ 1,440,000</p>
            <p class="muted">目标 ¥ 2,000,000</p>
          </div>
        </div>
        <KList :items="goalItems" size="sm" :bordered="false" />
      </KCard>
    </section>

    <KCard title="最近订单" class="table-card">
      <template #extra>
        <KButton size="sm" variant="text">查看全部</KButton>
      </template>
      <KTable
        row-key="id"
        :columns="columns"
        :data-source="orders"
        :pagination="false"
        size="sm"
        :scroll="{ x: 640 }"
      />
    </KCard>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KAvatarGroup from 'kit/vue/ui/components/Avatar/AvatarGroup.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'
import KList from 'kit/vue/ui/components/List/List.vue'
import KProgress from 'kit/vue/ui/components/Progress/Progress.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Order {
  id: string
  customer: string
  amount: number
  channel: string
  status: '已支付' | '待发货' | '退款中'
}

const metrics = [
  { title: '成交额', value: 1284560, prefix: '¥', suffix: '', precision: 0, trend: '+12.8%', tone: 'up' },
  { title: '订单量', value: 12849, prefix: '', suffix: '单', precision: 0, trend: '+6.2%', tone: 'up' },
  { title: '新增客户', value: 1284, prefix: '', suffix: '人', precision: 0, trend: '+18.4%', tone: 'up' },
  { title: '退款率', value: 1.8, prefix: '', suffix: '%', precision: 1, trend: '-0.4%', tone: 'down' },
]

const chartCategories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const chartSeries = [
  { name: '成交额', data: [182, 224, 198, 268, 312, 286, 338] },
  { name: '订单量', data: [118, 146, 132, 176, 208, 194, 226] },
]

const goalItems = [
  { key: 1, title: '已完成', description: '较上月同期 +8.6%', extra: '72%' },
  { key: 2, title: '剩余天数', description: '本自然月', extra: '9 天' },
  { key: 3, title: '日均需达成', description: '按当前进度估算', extra: '¥ 62,222' },
]

const statusColor = {
  已支付: 'success',
  待发货: 'processing',
  退款中: 'warning',
} as const

const columns: KTableColumn<Order>[] = [
  { key: 'id', dataIndex: 'id', title: '订单号', width: 150 },
  { key: 'customer', dataIndex: 'customer', title: '客户', width: 140 },
  {
    key: 'amount',
    dataIndex: 'amount',
    title: '金额',
    width: 110,
    align: 'right',
    render: ({ value }) => `¥ ${Number(value).toLocaleString()}`,
  },
  { key: 'channel', dataIndex: 'channel', title: '渠道', width: 100 },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: 100,
    render: ({ value }) =>
      h(
        KTag,
        { color: statusColor[value as Order['status']], variant: 'borderless', size: 'sm' },
        () => String(value),
      ),
  },
]

const orders: Order[] = [
  { id: 'SO-20261121-0182', customer: '林一', amount: 1280, channel: '小程序', status: '已支付' },
  { id: 'SO-20261121-0181', customer: '周舟', amount: 860, channel: 'Web', status: '待发货' },
  { id: 'SO-20261121-0179', customer: '陈默', amount: 2280, channel: '小程序', status: '已支付' },
  { id: 'SO-20261121-0176', customer: '赵知远', amount: 399, channel: '线下', status: '退款中' },
]
</script>

<style scoped>
.recipe-dashboard {
  padding: 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 16px;
  background: var(--k-color-bg-layout);
  color: var(--k-color-text);
}
.appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 12px;
  background: var(--k-color-bg-container);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-mark {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
  font-weight: 700;
}
.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-size: 13px;
  line-height: 18px;
}
.brand-copy span {
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
.appbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.welcome {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 2px 16px;
}
.eyebrow {
  margin: 0 0 6px;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.welcome h2 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
}
.muted {
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.welcome p {
  margin: 6px 0 0;
}
.range {
  flex: none;
  padding: 4px 10px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 999px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.trend {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 12px;
}
.trend.up > span:first-child {
  color: var(--k-color-success-text);
}
.trend.down > span:first-child {
  color: var(--k-color-error-text);
}
.main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
  gap: 12px;
  margin-top: 12px;
}
.legend {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--k-color-text-secondary);
  font-size: 11px;
}
.legend i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--k-color-primary);
}
.legend i.soft {
  background: var(--k-color-success);
}
.goal {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-bottom: 8px;
}
.goal-copy p {
  margin: 0;
}
.goal-value {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.table-card {
  margin-top: 12px;
}
@media (max-width: 900px) {
  .kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .main-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .recipe-dashboard {
    padding: 12px;
  }
  .appbar {
    align-items: flex-start;
    flex-direction: column;
  }
  .appbar-actions {
    width: 100%;
    justify-content: space-between;
  }
  .welcome {
    align-items: flex-start;
    padding-top: 18px;
  }
  .welcome h2 {
    font-size: 21px;
  }
  .kpis {
    grid-template-columns: minmax(0, 1fr);
  }
  .goal {
    flex-wrap: wrap;
  }
}
</style>