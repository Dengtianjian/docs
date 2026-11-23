<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KTreeSelect v-model="picked[v]" :variant="v" :options="options" :placeholder="v" style="width: 260px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KTreeSelect from 'kit/vue/ui/components/TreeSelect/TreeSelect.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = [
  {
    label: '产品部',
    value: 'product',
    children: [
      { label: '设计', value: 'design' },
      { label: '前端', value: 'frontend' },
    ],
  },
  {
    label: '技术部',
    value: 'tech',
    children: [
      { label: '后端', value: 'backend' },
      { label: '测试', value: 'qa' },
    ],
  },
]
const picked = reactive<Record<(typeof variants)[number], string | number | null>>({
  outlined: null,
  filled: null,
  borderless: null,
  underlined: null,
})
</script>