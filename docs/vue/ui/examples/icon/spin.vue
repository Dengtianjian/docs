<script setup lang="ts">
import { Loader } from '@vicons/tabler'
import KIcon from 'kit/vue/ui/components/Icon/Icon.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<template>
  <KSpace wrap align="center">
    <KIcon :component="Loader" spin size="lg" label="加载中" />
    <KButton :icon="Loader" loading>提交中</KButton>
    <!-- 装饰性图标（无 label）自动 aria-hidden，屏读跳过 -->
    <KButton type="link" :icon="Loader" />
  </KSpace>
</template>
