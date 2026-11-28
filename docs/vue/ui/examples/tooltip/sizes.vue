<template>
  <KFlex wrap align="center">
    <KTooltip v-for="size in sizes" :key="size" :size="size" :content="`${size} tooltip`">
      <template #trigger>
        <KButton :size="size">{{ size.toUpperCase() }}</KButton>
      </template>
    </KTooltip>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KTooltip from 'kit/vue/ui/components/overlay/Tooltip/Tooltip.vue'
import type { KTooltipSize } from 'kit/vue/ui'

const sizes: KTooltipSize[] = ['sm', 'md', 'lg']
</script>