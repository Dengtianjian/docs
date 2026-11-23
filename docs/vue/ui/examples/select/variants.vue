<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KSelect v-model="picked[v]" :variant="v" :options="options" :placeholder="v" style="width: 240px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '广州', value: 'gz' },
]
const picked = reactive<Record<(typeof variants)[number], string | number | null>>({
  outlined: null,
  filled: null,
  borderless: null,
  underlined: null,
})
</script>