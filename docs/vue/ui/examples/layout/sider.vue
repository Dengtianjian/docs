<template>
  <KLayout style="height: 320px; border-radius: var(--k-border-radius); overflow: hidden">
    <KLayoutHeader>Header</KLayoutHeader>
    <KLayout has-sider>
      <KLayoutSider>Sider（固定 208px）</KLayoutSider>
      <KLayoutContent>Content</KLayoutContent>
    </KLayout>
  </KLayout>
</template>

<script setup lang="ts">
import KLayout from 'kit/vue/ui/components/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/Layout/Sider.vue'
import KLayoutHeader from 'kit/vue/ui/components/Layout/Header.vue'
import KLayoutContent from 'kit/vue/ui/components/Layout/Content.vue'
</script>

<style scoped>
/* 组件缺省 header/sider/footer 同为 bg-container（白），演示区分配色：仅示例样式，非组件行为 */
:deep(.k-layout-header) {
  justify-content: center;
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
}
:deep(.k-layout-sider) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text);
  background: var(--k-color-primary-bg);
}
:deep(.k-layout-content) {
  background: var(--k-color-bg-container);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
