<template>
  <KFlex align="center" wrap>
    <KButton type="primary" shape="round">Round</KButton>
    <KButton type="primary" shape="circle" :icon="Plus" aria-label="添加" />
    <KButton type="primary" shape="square" :icon="Plus" aria-label="添加" />
    <KButton shape="round">Round</KButton>
    <KButton shape="circle" :icon="Plus" aria-label="添加" />
    <KButton shape="square" :icon="Plus" aria-label="添加" />
  </KFlex>
</template>

<script setup lang="ts">
// 图标集 = @vicons/tabler（推荐方案，见 icon.md）
import { Plus } from '@vicons/tabler'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>
