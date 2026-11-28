<template>
  <KFlex gap="lg" align="center" wrap>
    <KPopover title="带箭头" content="默认 arrow=true" :arrow="true">
      <template #trigger><KButton>箭头开</KButton></template>
    </KPopover>
    <KPopover title="无箭头" content="arrow=false 隐藏箭头" :arrow="false">
      <template #trigger><KButton>箭头关</KButton></template>
    </KPopover>
    <KFlex align="center" gap="sm">
      <KSwitch v-model="arrow" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">动态：{{ arrow ? '显示箭头' : '隐藏箭头' }}</span>
    </KFlex>
    <KPopover title="动态" :arrow="arrow">
      <template #trigger><KButton>动态箭头</KButton></template>
      开关切换后箭头实时出现 / 消失。
    </KPopover>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPopover from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const arrow = ref(true)
</script>