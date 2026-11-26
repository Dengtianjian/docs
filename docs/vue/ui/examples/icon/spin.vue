<template>
  <KFlex wrap align="center">
    <KIcon :component="Loader" spin size="lg" label="加载中" />
    <KButton :icon="Loader" loading>提交中</KButton>
    <!-- 装饰性图标（无 label）自动 aria-hidden，屏读跳过 -->
    <KButton type="link" :icon="Loader" />
  </KFlex>
</template>

<script setup lang="ts">
import { Loader } from '@vicons/tabler'
import KIcon from 'kit/vue/ui/components/general/Icon/Icon.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>
