<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: flex-start; gap: 12px">
      <span style="width: 84px; padding-top: 8px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KMentions v-model="picked[v]" :variant="v" :options="options" :rows="2" :placeholder="v" style="width: 260px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
]
const picked = reactive<Record<(typeof variants)[number], string>>({
  outlined: '',
  filled: '',
  borderless: '',
  underlined: '',
})
</script>