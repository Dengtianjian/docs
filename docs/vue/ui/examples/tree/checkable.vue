<template>
  <KSpace direction="vertical" size="lg">
    <KSpace align="center">
      <KSwitch v-model="strict">严格模式</KSwitch>
      <span class="hint">严格模式只影响当前节点</span>
    </KSpace>
    <KTree
      v-model:checked-keys="checked"
      :data="data"
      checkable
      :check-strictly="strict"
      default-expand-all
    />
    <p class="hint">已勾选：{{ checked.join('、') || '无' }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KTree from 'kit/vue/ui/components/Tree/Tree.vue'

const strict = ref(false)
const checked = ref<(string | number)[]>(['avatar'])
const data = [
  {
    label: '基础组件',
    value: 'basic',
    children: [
      { label: 'Button', value: 'button' },
      { label: 'Avatar', value: 'avatar' },
      { label: 'Icon', value: 'icon' },
    ],
  },
  {
    label: '数据展示',
    value: 'data',
    children: [
      { label: 'Table', value: 'table' },
      { label: 'Tree', value: 'tree' },
    ],
  },
]
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>