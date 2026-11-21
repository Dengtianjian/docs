<template>
  <KWatermark
    text="CONFIDENTIAL · 2026"
    :gap="[88, 88]"
    :rotate="-35"
    :font-size="11"
    :opacity="0.8"
    color="rgba(220, 38, 38, 0.18)"
  >
    <div class="code">
      <span>const theme = createTheme({ seed: 'k-ui' })</span>
      <span>// 水印密度、角度与颜色均可调</span>
    </div>
  </KWatermark>
</template>

<script setup lang="ts">
import KWatermark from 'kit/vue/ui/components/Watermark/Watermark.vue'
</script>

<style scoped>
.code {
  display: flex;
  min-height: 150px;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-quaternary);
  color: var(--k-color-text-secondary);
  font-family: var(--k-font-family-mono);
  font-size: var(--k-font-size-sm);
}
</style>