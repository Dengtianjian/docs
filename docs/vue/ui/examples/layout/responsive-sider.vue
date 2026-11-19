<template>
  <KLayout has-sider style="height: 180px; border-radius: var(--k-border-radius); overflow: hidden">
    <KLayoutSider width="xs:140 sm:180 md:208">Sider（断点宽度）</KLayoutSider>
    <KLayoutContent>拖动窗口宽度观察 Sider 宽度切换</KLayoutContent>
  </KLayout>
</template>

<script setup lang="ts">
import KLayout from 'kit/vue/ui/components/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/Layout/Content.vue'
</script>

<style scoped>
:deep(.k-layout-sider) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--k-font-size-sm);
  background: var(--k-color-primary-bg);
  text-align: center;
}
:deep(.k-layout-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--k-color-bg-container);
}
</style>
