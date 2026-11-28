<template>
  <KFlex vertical gap="sm" style="width: 340px">
    <div v-for="v in variants" :key="v">
      <div style="margin-bottom: 4px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</div>
      <KSearchBar v-model="picked[v]" :variant="v" :placeholder="v" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KSearchBar from 'kit/vue/ui/components/data-entry/SearchBar/SearchBar.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const picked = reactive<Record<(typeof variants)[number], string>>({
  outlined: '',
  filled: '',
  borderless: '',
  underlined: '',
})
</script>