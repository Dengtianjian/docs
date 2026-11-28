<template>
  <KTree
    v-model:selected-keys="selected"
    :data="data"
    default-expand-all
    @select="onSelect"
  />
  <p class="hint">选中：{{ selected.join(' / ') || '无' }}；事件：{{ last }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTree from 'kit/vue/ui/components/data-display/Tree/Tree.vue'

const data = [
  {
    label: '组件库',
    value: 'ui',
    children: [
      { label: '基础组件', value: 'basic', children: [
        { label: 'Button', value: 'button' },
        { label: 'Avatar', value: 'avatar' },
      ] },
      { label: '数据展示', value: 'data', children: [
        { label: 'Table', value: 'table' },
        { label: 'Tree', value: 'tree' },
      ] },
    ],
  },
  { label: '工具库', value: 'utils' },
]
const selected = ref<(string | number)[]>(['tree'])
const last = ref('无')

function onSelect(keys: (string | number)[], node: { label: string }, isSelected: boolean) {
  last.value = `${node.label} ${isSelected ? '选中' : '取消'}`
}
</script>

<style scoped>
.hint {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>