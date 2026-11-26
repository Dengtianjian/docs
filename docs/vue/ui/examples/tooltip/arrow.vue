<template>
  <KFlex gap="lg" align="center" wrap>
    <KTooltip content="默认带箭头" :arrow="true">
      <template #trigger><KButton>箭头开</KButton></template>
    </KTooltip>
    <KTooltip content="arrow=false 隐藏箭头" :arrow="false">
      <template #trigger><KButton>箭头关</KButton></template>
    </KTooltip>
    <KFlex align="center" gap="sm">
      <KSwitch v-model="arrow" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">动态：{{ arrow ? '显示箭头' : '隐藏箭头' }}</span>
    </KFlex>
    <KTooltip content="跟随开关实时切换" :arrow="arrow">
      <template #trigger><KButton>动态箭头</KButton></template>
    </KTooltip>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTooltip from 'kit/vue/ui/components/overlay/Tooltip/Tooltip.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const arrow = ref(true)
</script>