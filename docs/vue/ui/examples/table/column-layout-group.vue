<template>
  <div>
    <p class="hint">
      左/右固定列的表头在浮层里也能拖；把列拖到别的分组列旁会并入该分组，拖到顶层列旁则回到顶层。
      顺序与分组分别走 <code>v-model:column-order</code> / <code>v-model:column-groups</code>。
    </p>
    <KTable
      v-model:column-order="order"
      v-model:column-groups="groups"
      row-key="id"
      column-draggable
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      :scroll="{ x: 786 }"
    />
    <div class="ops">
      <KButton size="sm" @click="reset">重置列顺序与分组</KButton>
      <span>{{ groupSummary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  role: string
  email: string
  city: string
  joined: string
  score: number
  activity: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'id', dataIndex: 'id', title: 'ID', width: 56, fixed: 'left' },
  { key: 'name', dataIndex: 'name', title: '姓名', width: 90, fixed: 'left' },
  { key: 'joined', dataIndex: 'joined', title: '入职日期', width: 90 },
  {
    key: 'contact',
    title: '联系方式',
    children: [
      { key: 'email', dataIndex: 'email', title: '邮箱', width: 150, ellipsis: true },
      { key: 'city', dataIndex: 'city', title: '城市', width: 80 },
    ],
  },
  {
    key: 'profile',
    title: '基本信息',
    children: [
      { key: 'team', dataIndex: 'team', title: '团队', width: 80 },
      { key: 'role', dataIndex: 'role', title: '角色', width: 90 },
    ],
  },
  { key: 'score', dataIndex: 'score', title: '评分', width: 70, align: 'right', fixed: 'right' },
  { key: 'activity', dataIndex: 'activity', title: '最近活跃', width: 80, fixed: 'right' },
]

const initialOrder = ['id', 'name', 'joined', 'email', 'city', 'team', 'role', 'score', 'activity']
const order = ref<string[]>([...initialOrder])
const groups = ref<Record<string, string[]>>({})

const rows: Row[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `用户 ${index + 1}`,
  team: ['前端', '后端', '设计'][index % 3],
  role: ['工程师', '负责人', '实习生'][index % 3],
  email: `user${index + 1}@example.com`,
  city: ['杭州', '上海', '北京'][index % 3],
  joined: `2026-0${(index % 9) + 1}-12`,
  score: 60 + ((index * 7) % 40),
  activity: ['2 小时前', '昨天', '3 天前'][index % 3],
}))

const groupSummary = computed(() => {
  const entries = Object.entries(groups.value)
  return entries.length
    ? entries.map(([key, path]) => `${key} → ${path.length ? path.join(' / ') : '顶层'}`).join(' · ')
    : '分组：默认'
})

function reset() {
  order.value = [...initialOrder]
  groups.value = {}
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
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
.ops {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>
