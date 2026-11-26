<template>
  <div class="layout-responsive">
    <div class="layout-responsive__meta">当前断点 <b>{{ current }}</b> · Sider 宽度 xs120 / sm160 / md200</div>
    <KLayout style="height: 220px; border-radius: var(--k-border-radius); overflow: hidden">
      <KLayout has-sider>
        <KLayoutSider width="xs:120 sm:160 md:200">Sider</KLayoutSider>
        <KLayoutContent>拖动窗口宽度观察 Sider</KLayoutContent>
      </KLayout>
    </KLayout>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoint } from 'kit/vue/ui'
import KLayout from 'kit/vue/ui/components/layouts/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/layouts/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/layouts/Layout/Content.vue'

const { current } = useBreakpoint()
</script>

<style scoped>
.layout-responsive {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.layout-responsive__meta {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.layout-responsive__meta b {
  color: var(--k-color-primary);
}
:deep(.k-layout-sider) {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--k-color-primary-bg);
  font-size: var(--k-font-size-sm);
}
:deep(.k-layout-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--k-color-bg-container);
  font-size: var(--k-font-size-sm);
}
</style>