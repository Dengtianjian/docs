<template>
  <KFlex wrap align="center">
    <KPopconfirm
      v-for="size in sizes"
      :key="size"
      :size="size"
      title="确认删除？"
      description="尺寸变化会同步作用于标题、描述和操作按钮。"
      ok-text="删除"
      ok-type="danger"
    >
      <template #trigger>
        <KButton :size="size" type="danger" variant="outlined">{{ size.toUpperCase() }}</KButton>
      </template>
    </KPopconfirm>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KPopconfirmSize } from 'kit/vue/ui'

const sizes: KPopconfirmSize[] = ['sm', 'md', 'lg']
</script>