<template>
  <div>
    <KTable
      row-key="id"
      :columns="columns"
      :data-source="rows"
      stacked
      virtual
      :pagination="false"
      :scroll="{ y: 420 }"
    />
    <p class="hint">
      共 {{ rows.length }} 张卡片，只渲染可视窗口。卡片高度按实测缓存累加，长短备注混排滚动条也不会漂移。
    </p>
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  city: string
  amount: number
  note: string
}

const TEAMS = ['前端', '后端', '设计']
const CITIES = ['杭州', '上海', '北京', '深圳']
const NOTES = [
  '常规跟进，下周一回访。',
  '客户要求拆分两批交付，第一批先走空运。',
  '合同还在法务审核，预计本周内确认；确认后安排演示与培训，并同步开票信息。',
  '暂无备注。',
]

const rows: Row[] = Array.from({ length: 400 }, (_, index) => ({
  id: index + 1,
  name: `成员 ${index + 1}`,
  team: TEAMS[index % TEAMS.length],
  city: CITIES[index % CITIES.length],
  amount: 1200 + ((index * 137) % 8000),
  note: NOTES[index % NOTES.length],
}))

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名' },
  {
    key: 'team',
    dataIndex: 'team',
    title: '团队',
    stack: 'subtitle',
    filters: TEAMS.map(value => ({ label: value, value })),
  },
  { key: 'city', dataIndex: 'city', title: '城市' },
  { key: 'amount', dataIndex: 'amount', title: '预算', align: 'right' },
  { key: 'note', dataIndex: 'note', title: '备注' },
]
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>
