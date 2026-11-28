<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KTimePicker v-model="picked[v]" :variant="v" :placeholder="v" style="width: 240px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KTimePicker from 'kit/vue/ui/components/data-entry/TimePicker/TimePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const picked = reactive<Record<(typeof variants)[number], string | null>>({
  outlined: null,
  filled: null,
  borderless: null,
  underlined: null,
})
</script>