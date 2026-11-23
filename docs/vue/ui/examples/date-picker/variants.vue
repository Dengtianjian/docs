<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KDatePicker v-model="picked[v]" :variant="v" :placeholder="v" style="width: 240px" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const picked = reactive<Record<(typeof variants)[number], number | null>>({
  outlined: null,
  filled: null,
  borderless: null,
  underlined: null,
})
</script>