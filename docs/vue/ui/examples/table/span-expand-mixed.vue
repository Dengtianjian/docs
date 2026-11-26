<template>
  <div class="demo">
    <KTable
      v-model:expanded-row-keys="expanded"
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      :expanded-render="renderExpanded"
    >
      <template #expanded="{ row, index, rowKey }">
        <div class="slot">
          <span class="tag">插槽</span>
          <strong>{{ row.name }} · {{ row.dept }}</strong>
          <span class="meta">第 {{ index + 1 }} 行 · key {{ rowKey }}</span>
          <span>任务：{{ row.task }} · 进度 {{ row.progress }}%</span>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type {
  KTableCellSpan,
  KTableColumn,
  KTableExpandedRenderContext,
  KTableRowKey,
  KTableSpanContext,
} from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  name: string
  task: string
  progress: number
}

const columns: KTableColumn<Row>[] = [
  { key: 'dept', dataIndex: 'dept', title: '部门', width: 120 },
  { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
  { key: 'task', dataIndex: 'task', title: '任务', width: 280, ellipsis: true },
  { key: 'progress', dataIndex: 'progress', title: '进度', width: 100, align: 'right' },
]

const rows: Row[] = [
  { id: 1, dept: '研发部', name: '成员 1', task: '组件库表格合并能力', progress: 80 },
  { id: 2, dept: '研发部', name: '成员 2', task: '虚拟滚动不定高测量', progress: 60 },
  { id: 3, dept: '研发部', name: '成员 3', task: '展开内容组尾渲染', progress: 45 },
  { id: 4, dept: '设计部', name: '成员 4', task: '合并场景视觉走查', progress: 70 },
  { id: 5, dept: '设计部', name: '成员 5', task: '固定列浮层对齐', progress: 55 },
  { id: 6, dept: '设计部', name: '成员 6', task: '空态与加载状态', progress: 35 },
]

const expanded = ref<KTableRowKey[]>([2, 3, 5])

const TaskPanel = defineComponent({
  name: 'TaskPanel',
  props: { row: { type: Object as () => Row, required: true } },
  setup(props) {
    const done = ref(false)
    return () =>
      h('div', { class: 'panel' }, [
        h('span', { class: 'tag' }, '组件'),
        h('strong', `${props.row.name} · ${props.row.dept}`),
        h('span', { class: ['panel__badge', done.value ? 'is-done' : ''] }, done.value ? '已完成' : '进行中'),
        h('span', `${props.row.task} · ${props.row.progress}%`),
        h(
          KButton,
          { size: 'sm', variant: 'outlined', onClick: () => (done.value = true) },
          () => (done.value ? '已完成' : '标记完成'),
        ),
      ])
  },
})

function renderExpanded({ row }: KTableExpandedRenderContext<Row>) {
  if (row.id === 2) {
    return h('div', { class: 'plain' }, [
      h('span', { class: 'tag' }, '渲染函数'),
      h('strong', `${row.name} · ${row.dept}`),
      h('span', `${row.task} · ${row.progress}%`),
    ])
  }
  if (row.id === 3) return h(TaskPanel, { row })
  return undefined
}

function spanMethod({ row, rowIndex, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex !== 0) return undefined
  if (rowIndex > 0 && rows[rowIndex - 1].dept === row.dept) return undefined
  let span = 1
  while (rows[rowIndex + span] && rows[rowIndex + span].dept === row.dept) span += 1
  return span > 1 ? { rowSpan: span } : undefined
}
</script>

<style scoped>
.tag {
  padding: 0 8px;
  border-radius: 999px;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
  line-height: 20px;
}
.slot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 4px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.slot strong {
  color: var(--k-color-text);
}
.meta {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.demo :deep(.plain),
.demo :deep(.panel) {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 4px 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.demo :deep(.plain strong),
.demo :deep(.panel strong) {
  color: var(--k-color-text);
}
.demo :deep(.panel__badge) {
  padding: 0 8px;
  border-radius: 999px;
  background: var(--k-color-fill-secondary);
  font-size: var(--k-font-size-xs);
  line-height: 20px;
}
.demo :deep(.panel__badge.is-done) {
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary-text);
}
</style>