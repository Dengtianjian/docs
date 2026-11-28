<template>
  <KFloatButton
    position="left-top"
    shape="square"
    type="default"
    content="帮助"
    tooltip="hover / 聚焦提示 · 帮助中心"
    :badge="{ count: 12, color: 'var(--k-color-primary)' }"
    href="https://mobile.ant.design/components/float-button"
    target="_blank"
    :offset="[24, 96]"
  >
    <template #icon>
      <span class="help-icon">?</span>
    </template>
  </KFloatButton>
</template>

<script setup lang="ts">
import KFloatButton from 'kit/vue/ui/components/other/FloatButton/FloatButton.vue'
</script>

<style scoped>
.help-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}
</style>