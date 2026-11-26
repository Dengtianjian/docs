<template>
  <div>
    <p class="hint">
      备注列的自定义编辑器是两行 <code>KInput</code>（textarea）。列上设 <code>editHeight: 104</code> 后，整表按较高控件预留行高，
      进入 / 退出编辑都不再撑高或收回行。
    </p>
    <KTable row-key="id" :columns="columns" :data-source="rows" :pagination="false" @cell-edit="onCellEdit" />
    <p class="log">最近提交：{{ lastEdit || '—' }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import type { PropType } from 'vue'
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KTableCellEditEvent, KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  name: string
  note: string
}

const rows = ref<Row[]>([
  { id: 1, name: '林一', note: '周会同步排期' },
  { id: 2, name: '周舟', note: '等法务确认合同条款' },
  { id: 3, name: '陈默', note: '下周一回访' },
])

const TallEditor = defineComponent({
  props: {
    initial: { type: String, default: '' },
    commit: { type: Function as PropType<(value: unknown) => void>, required: true },
    cancel: { type: Function as PropType<() => void>, required: true },
  },
  setup(props) {
    const draft = ref(props.initial)
    return () =>
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } }, [
        h(KInput, {
          type: 'textarea',
          rows: 2,
          modelValue: draft.value,
          'onUpdate:modelValue': (value: string) => (draft.value = value),
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
              event.preventDefault()
              props.cancel()
            } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              props.commit(draft.value)
            }
          },
        }),
        h('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: '6px' } }, [
          h(KButton, { size: 'xs', onClick: props.cancel }, () => '取消'),
          h(KButton, { size: 'xs', type: 'primary', onClick: () => props.commit(draft.value) }, () => '提交'),
        ]),
      ])
  },
})

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '姓名', width: 140 },
  {
    key: 'note',
    dataIndex: 'note',
    title: '备注',
    editable: true,
    editHeight: 104,
    editRender: ({ value, commit, cancel }) =>
      h(TallEditor, { initial: String(value ?? ''), commit, cancel }),
  },
]

const lastEdit = ref('')

function onCellEdit(payload: KTableCellEditEvent<Row>) {
  payload.row.note = String(payload.value)
  lastEdit.value = `${payload.row.name}：${payload.row.note}`
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
.log {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>
