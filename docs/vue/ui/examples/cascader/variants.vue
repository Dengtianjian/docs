<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KCascader v-model="picked[v]" :variant="v" :options="options" :placeholder="v" style="width: 260px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KCascader from 'kit/vue/ui/components/data-entry/Cascader/Cascader.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'sh' },
      { label: '杭州', value: 'hz' },
    ],
  },
  {
    label: '华南',
    value: 'south',
    children: [
      { label: '广州', value: 'gz' },
      { label: '深圳', value: 'sz' },
    ],
  },
]
const picked = reactive<Record<(typeof variants)[number], (string | number)[] | null>>({
  outlined: null,
  filled: null,
  borderless: null,
  underlined: null,
})
</script>