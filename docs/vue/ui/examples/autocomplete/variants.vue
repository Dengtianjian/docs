<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KAutoComplete v-model="picked[v]" :variant="v" :options="options" :placeholder="v" style="width: 240px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KAutoComplete from 'kit/vue/ui/components/data-entry/AutoComplete/AutoComplete.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const options = ['Vue', 'Vite', 'Vitest', 'VitePress'].map(value => ({ label: value, value }))
const picked = reactive<Record<(typeof variants)[number], string>>({
  outlined: '',
  filled: '',
  borderless: '',
  underlined: '',
})
</script>