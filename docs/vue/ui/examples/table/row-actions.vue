<template>
  <div>
    <p class="hint">
      列配置 <code>actions</code> 直排按钮，超出 <code>maxActions</code> 的收进竖向点下拉菜单；点击操作不会触发行的
      <code>rowClick</code>。
    </p>
    <KTable row-key="id" :columns="columns" :data-source="rows" :pagination="false">
      <template #actions="{ row }">
        <span class="state" :class="row.status === '已完成' ? 'is-done' : 'is-open'">
          {{ row.status }}
        </span>
      </template>
    </KTable>
    <p class="log">最近操作：{{ lastAction || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  owner: string
  status: string
  updated: string
}

const rows: Row[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `项目 ${index + 1}`,
  owner: ['林一', '周舟', '陈默'][index % 3],
  status: index % 3 === 0 ? '进行中' : index % 3 === 1 ? '已完成' : '待开始',
  updated: `11-${String(index + 10).padStart(2, '0')}`,
}))

const lastAction = ref('')

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '项目', width: 180 },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 120 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
  { key: 'updated', dataIndex: 'updated', title: '更新于', width: 110 },
  {
    key: 'actions',
    title: '操作',
    width: 170,
    maxActions: 2,
    actions: [
      {
        key: 'view',
        label: '查看',
        icon: 'view',
        onClick: ({ row }) => (lastAction.value = `查看「${row.name}」`),
      },
      {
        key: 'handle',
        label: '处理',
        icon: 'edit',
        disabled: row => row.status === '已完成',
        onClick: ({ row }) => (lastAction.value = `处理「${row.name}」`),
      },
      {
        key: 'copy',
        label: '复制',
        icon: 'copy',
        onClick: ({ row }) => (lastAction.value = `复制「${row.name}」`),
      },
      {
        key: 'remove',
        label: '删除',
        icon: 'remove',
        danger: true,
        onClick: ({ row }) => (lastAction.value = `删除「${row.name}」`),
      },
    ],
  },
]
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
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.state {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  color: var(--k-color-text-secondary);
  background: var(--k-color-fill-tertiary);
}
.state.is-done {
  color: var(--k-color-primary);
  background: var(--k-color-primary-bg);
}
</style>