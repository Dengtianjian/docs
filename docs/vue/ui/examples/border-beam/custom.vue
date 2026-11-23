<template>
  <KFlex :gap="16" wrap>
    <KBorderBeam :size="3" :duration="3" :color="['#4f8cff', '#22c55e']" :radius="12">
      <div class="panel small">
        <strong>蓝绿光束</strong>
        <span>3px / 3s</span>
      </div>
    </KBorderBeam>
    <KBorderBeam :size="1" :duration="8" :color="['var(--k-color-warning)', 'transparent']" :radius="999">
      <div class="panel small">
        <strong>细描边</strong>
        <span>1px / 8s</span>
      </div>
    </KBorderBeam>
    <KBorderBeam paused>
      <div class="panel small">
        <strong>已暂停</strong>
        <span>paused · 光束保留</span>
      </div>
    </KBorderBeam>
  </KFlex>
</template>

<script setup lang="ts">
import KBorderBeam from 'kit/vue/ui/components/BorderBeam/BorderBeam.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>

<style scoped>
.panel {
  padding: 20px 22px;
}
.panel.small {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
  padding: 16px;
}
.panel strong {
  font-size: var(--k-font-size);
}
.panel span {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>