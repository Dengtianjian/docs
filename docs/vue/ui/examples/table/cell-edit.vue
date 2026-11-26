<template>
  <div>
    <p class="hint">
      列配 <code>editable</code>，<code>editTrigger</code> 决定单击 / 双击进入，也可设为 manual 由按钮打开；
      默认编辑控件是 KInput，Enter 或失焦提交，Esc 取消。提交只发 <code>cellEdit</code>，数据由业务回写。
    </p>
    <div class="trigger">
      <span>进入方式</span>
      <KButton
        v-for="item in triggers"
        :key="item.value"
        size="sm"
        :variant="editTrigger === item.value ? 'tonal' : 'text'"
        @click="editTrigger = item.value"
      >
        {{ item.label }}
      </KButton>
      <KButton v-if="editTrigger === 'manual'" size="sm" type="primary" @click="openFirstCell">
        手动打开第一行姓名
      </KButton>
    </div>
    <KTable
      v-model:editing-cell="editingCell"
      row-key="id"
      :edit-trigger="editTrigger"
      :columns="columns"
      :data-source="rows"
      :pagination="false"
      @cell-edit="onCellEdit"
    />
    <p class="log">最近提交：{{ lastEdit || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableCellEditEvent, KTableColumn, KTableEditTrigger, KTableRowKey } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  role: string
  city: string
  score: number
}

const rows = ref<Row[]>([
  { id: 1, name: '林一', role: '工程师', city: '杭州', score: 88 },
  { id: 2, name: '周舟', role: '负责人', city: '上海', score: 92 },
  { id: 3, name: '陈默', role: '实习生', city: '北京', score: 75 },
  { id: 4, name: '苏芮', role: '工程师', city: '深圳', score: 81 },
])

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 160, editable: true },
  { key: 'role', dataIndex: 'role', title: '角色', width: 160, editable: true },
  { key: 'city', dataIndex: 'city', title: '城市', width: 120 },
  { key: 'score', dataIndex: 'score', title: '评分', width: 120, align: 'right', editable: true },
]

const triggers: Array<{ label: string; value: KTableEditTrigger }> = [
  { label: '单击', value: 'click' },
  { label: '双击', value: 'dblclick' },
  { label: '手动', value: 'manual' },
]

const editTrigger = ref<KTableEditTrigger>('click')
const editingCell = ref<{ rowKey: KTableRowKey; columnKey: string } | null>(null)
const lastEdit = ref('')

function openFirstCell() {
  editingCell.value = { rowKey: rows.value[0].id, columnKey: 'name' }
}

function onCellEdit(payload: KTableCellEditEvent<Row>) {
  const key = payload.column.dataIndex
  if (!key) return
  if (key === 'score') {
    const next = Number(payload.value)
    if (Number.isFinite(next)) payload.row.score = next
  } else {
    ;(payload.row as unknown as Record<string, unknown>)[key] = payload.value
  }
  lastEdit.value = `${payload.column.title}：${String(payload.value)}`
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
.trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>