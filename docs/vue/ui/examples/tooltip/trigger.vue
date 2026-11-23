<template>
  <KFlex vertical gap="md">
    <KFlex gap="lg" wrap align="center">
      <KTooltip content="hover 触发（默认）" trigger="hover">
        <template #trigger><KButton>hover</KButton></template>
      </KTooltip>
      <KTooltip content="focus 触发" trigger="focus">
        <template #trigger><KButton>focus</KButton></template>
      </KTooltip>
      <KTooltip content="click 触发" trigger="click">
        <template #trigger><KButton>click</KButton></template>
      </KTooltip>
      <KTooltip content="hover + click 组合" :trigger="['hover', 'click']">
        <template #trigger><KButton>hover + click</KButton></template>
      </KTooltip>
    </KFlex>

    <KFlex gap="sm" align="center">
      <KSwitch v-model="enabled" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">
        条件：{{ enabled ? '允许触发' : 'disabled 不弹出' }}
      </span>
      <KTooltip content="仅开关打开时可见" :disabled="!enabled" trigger="hover">
        <template #trigger><KButton>受条件控制</KButton></template>
      </KTooltip>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTooltip from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const enabled = ref(true)
</script>