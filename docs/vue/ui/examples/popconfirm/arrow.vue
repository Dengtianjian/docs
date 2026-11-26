<template>
  <KFlex gap="lg" align="center" wrap>
    <KPopconfirm title="默认带箭头" :arrow="true" placement="top">
      <template #trigger><KButton>箭头开</KButton></template>
    </KPopconfirm>
    <KPopconfirm title="arrow=false 隐藏箭头" :arrow="false" placement="top">
      <template #trigger><KButton>箭头关</KButton></template>
    </KPopconfirm>
    <KFlex align="center" gap="sm">
      <KSwitch v-model="arrow" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">动态：{{ arrow ? '显示箭头' : '隐藏箭头' }}</span>
    </KFlex>
    <KPopconfirm title="动态箭头" :arrow="arrow" placement="top">
      <template #trigger><KButton>动态箭头</KButton></template>
    </KPopconfirm>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const arrow = ref(true)
</script>