<template>
  <div class="expand-forms-demo">
    <KTable
      v-model:expanded-row-keys="expanded"
      row-key="id"
      :columns="columns"
      :data-source="rows"
      :expanded-render="renderExpanded"
    >
      <template #expanded="{ row, index }">
        <div class="panel">
          <span class="tag">插槽</span>
          <strong>{{ row.name }} · {{ row.team }}</strong>
          <span class="meta">第 {{ index + 1 }} 行 · {{ row.note }}</span>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KTableColumn, KTableExpandedRenderContext, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  team: string
  note: string
}

const rows: Row[] = [
  { id: 1, name: '林一', team: '前端', note: '组件渲染，带本地状态' },
  { id: 2, name: '周舟', team: '后端', note: '回退 #expanded 插槽' },
  { id: 3, name: '陈默', team: '设计', note: '组件渲染，带本地状态' },
  { id: 4, name: '苏禾', team: '测试', note: '回退 #expanded 插槽' },
]

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160 },
  { key: 'team', dataIndex: 'team', title: '团队', width: 140 },
  { key: 'note', dataIndex: 'note', title: '备注' },
]

const expanded = ref<KTableRowKey[]>([1, 2, 3, 4])

const StatusPanel = defineComponent({
  name: 'StatusPanel',
  props: { row: { type: Object as () => Row, required: true } },
  setup(props) {
    const marked = ref(false)
    return () =>
      h('div', { class: 'panel' }, [
        h('span', { class: 'tag' }, '组件'),
        h('strong', `${props.row.name} · ${props.row.team}`),
        h('span', { class: 'meta' }, props.row.note),
        h(
          KButton,
          { size: 'sm', variant: 'outlined', onClick: () => (marked.value = true) },
          () => (marked.value ? '已标记' : '标记关注'),
        ),
      ])
  },
})

function renderExpanded({ row }: KTableExpandedRenderContext<Row>) {
  if (row.id % 2 === 0) return undefined
  return h(StatusPanel, { row })
}
</script>

<style>
.expand-forms-demo .panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.expand-forms-demo .tag {
  padding: 0 6px;
  border-radius: 4px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 11px;
  line-height: 18px;
}
.expand-forms-demo .meta {
  color: var(--k-color-text-tertiary);
}
</style>