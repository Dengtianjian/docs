<template>
  <KSpace wrap align="center">
    <KTooltip v-for="size in sizes" :key="size" :size="size" :content="`${size} tooltip`">
      <template #trigger>
        <KButton :size="size">{{ size.toUpperCase() }}</KButton>
      </template>
    </KTooltip>
  </KSpace>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KTooltip from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import type { KTooltipSize } from 'kit/vue/ui'

const sizes: KTooltipSize[] = ['sm', 'md', 'lg']
</script>