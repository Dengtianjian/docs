<template>
  <div class="phone">
    <KSafeArea position="top" background="var(--k-color-fill-secondary)">
      <div class="status">9:41</div>
    </KSafeArea>
    <div class="screen">内容区域</div>
    <KSafeArea position="bottom" background="var(--k-color-fill-secondary)">
      <div class="home-bar"><span /></div>
    </KSafeArea>
  </div>
  <p class="tip">真机上会读取 env(safe-area-inset-*)，在刘海屏和全面屏底部自动留白。</p>
</template>

<script setup lang="ts">
import KSafeArea from 'kit/vue/ui/components/SafeArea/SafeArea.vue'
</script>

<style scoped>
.phone {
  max-width: 320px;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 24px;
  background: var(--k-color-bg-container);
}
.status {
  padding: 6px 16px;
  color: var(--k-color-text-secondary);
  font-size: 11px;
  font-weight: 600;
}
.screen {
  display: flex;
  min-height: 160px;
  align-items: center;
  justify-content: center;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.home-bar {
  display: flex;
  justify-content: center;
  padding: 6px 0;
}
.home-bar span {
  width: 96px;
  height: 4px;
  border-radius: 999px;
  background: var(--k-color-text-quaternary);
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>