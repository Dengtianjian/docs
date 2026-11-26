<template>
  <KLayout style="height: 320px; border-radius: var(--k-border-radius); overflow: hidden">
    <KLayoutHeader>Header</KLayoutHeader>
    <KLayoutContent>Content（滚动容器）</KLayoutContent>
    <KLayoutFooter>Footer</KLayoutFooter>
  </KLayout>
</template>

<script setup lang="ts">
import KLayout from 'kit/vue/ui/components/layouts/Layout/Layout.vue'
import KLayoutHeader from 'kit/vue/ui/components/layouts/Layout/Header.vue'
import KLayoutContent from 'kit/vue/ui/components/layouts/Layout/Content.vue'
import KLayoutFooter from 'kit/vue/ui/components/layouts/Layout/Footer.vue'
</script>

<style scoped>
/* 组件缺省 header/footer 同为 bg-container（白），演示区分配色：仅示例样式，非组件行为 */
:deep(.k-layout-header) {
  justify-content: center;
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
}
:deep(.k-layout-footer) {
  justify-content: center;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text);
}
:deep(.k-layout-content) {
  background: var(--k-color-bg-container);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
