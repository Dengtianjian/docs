<template>
  <div>
    <p class="hint">
      1000 行不定高：每 5 行有一段多行摘要，行高从 48px 到 90px 不等。虚拟滚动按实测高度计算窗口与占位，
      滚动时只渲染可视行，滚动条总高与真实内容一致。未测量行按 <code>virtualRowHeight=56</code> 估算，
      overscan 8 行、缓冲 4 行。
    </p>
    <KTable
      class="variable-demo"
      :columns="columns"
      :data-source="rows"
      virtual
      sticky
      :virtual-row-height="56"
      :virtual-overscan="8"
      :virtual-buffer="4"
      :scroll="{ x: 760, y: 360 }"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/data-display/Table/Table.vue'
import type { KTableColumn } from 'kit/vue/ui'

interface Row {
  id: number
  no: number
  content: string
  owner: string
  status: string
}

const columns: KTableColumn<Row>[] = [
  { key: 'no', dataIndex: 'no', title: '序号', width: 90 },
  {
    key: 'content',
    dataIndex: 'content',
    title: '内容',
    width: 380,
    styles: { cell: { whiteSpace: 'normal', lineHeight: '22px' } },
  },
  { key: 'owner', dataIndex: 'owner', title: '负责人', width: 120 },
  { key: 'status', dataIndex: 'status', title: '状态', width: 110 },
]

const longText =
  '本周重点推进表格合并与虚拟滚动的协同：窗口上探到合并起始行，下探到覆盖末行，配合实测行高前缀和与滚动锚定，避免快速滚动时内容跳动。'

const rows: Row[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  no: index + 1,
  content: index % 5 === 0 ? longText : `第 ${index + 1} 行：常规单行任务内容`,
  owner: ['张三', '李四', '王五', '赵六'][index % 4],
  status: index % 3 === 0 ? '进行中' : '已完成',
}))
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.variable-demo :deep(.k-table__table) {
  table-layout: fixed;
}
</style>