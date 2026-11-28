<template>
  <KFlex vertical gap="lg">
    <KTree :data="data" :load-data="loadData" @expand="onExpand" />
    <p class="hint">{{ hint || '点击根节点的箭头异步加载子节点。' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KTree from 'kit/vue/ui/components/data-display/Tree/Tree.vue'

const data = [
  { label: '华东区', value: 'east', isLeaf: false },
  { label: '华南区', value: 'south', isLeaf: false },
]
const hint = ref('')

async function loadData(node: { value: string | number; label: string }) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return Array.from({ length: 3 }, (_, index) => ({
    label: `${node.label}节点 ${index + 1}`,
    value: `${node.value}-${index + 1}`,
  }))
}

function onExpand(_keys: (string | number)[], node: { label: string }, expanded: boolean) {
  hint.value = `${node.label}${expanded ? '展开' : '收起'}`
}
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>