<template>
  <KFlex vertical gap="md">
    <div v-for="variant in variants" :key="variant.name" class="row">
      <span class="label">{{ variant.label }}</span>
      <KFlex>
        <KTag v-for="color in colors" :key="color" :color="color" :variant="variant.name">{{ color }}</KTag>
      </KFlex>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTagPresetColor, KTagVariant } from 'kit/vue/ui'

const variants: { name: KTagVariant; label: string }[] = [
  { name: 'filled', label: 'filled（默认）' },
  { name: 'outlined', label: 'outlined' },
  { name: 'dashed', label: 'dashed' },
  { name: 'borderless', label: 'borderless' },
  { name: 'text', label: 'text（无底，悬停变色）' },
]

const colors: KTagPresetColor[] = ['default', 'processing', 'success', 'warning', 'error']
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.label {
  width: 110px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>