<template>
  <KFlex vertical gap="md">
    <KFlex gap="lg" wrap align="center">
      <KPopover title="hover" content="hover 触发（默认）" trigger="hover">
        <template #trigger><KButton>hover</KButton></template>
      </KPopover>
      <KPopover title="focus" content="focus 触发" trigger="focus">
        <template #trigger><KButton>focus</KButton></template>
      </KPopover>
      <KPopover title="click" content="click 触发，移入卡片不消失" trigger="click">
        <template #trigger><KButton>click</KButton></template>
      </KPopover>
      <KPopover title="组合" content="hover + click 任一路径都能打开" :trigger="['hover', 'click']">
        <template #trigger><KButton>hover + click</KButton></template>
      </KPopover>
    </KFlex>

    <KFlex gap="sm" align="center">
      <KSwitch v-model="enabled" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">
        条件：{{ enabled ? '允许触发' : 'disabled 不弹出' }}
      </span>
      <KPopover title="条件卡片" content="仅开关打开时可见" :disabled="!enabled" trigger="hover">
        <template #trigger><KButton>受条件控制</KButton></template>
      </KPopover>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPopover from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const enabled = ref(true)
</script>