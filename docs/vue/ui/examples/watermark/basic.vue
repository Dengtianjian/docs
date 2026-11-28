<template>
  <KWatermark text="K UI · 内部预览" :gap="[120, 96]" :font-size="13" color="rgba(79, 140, 255, 0.16)">
    <div class="card">
      <h4>项目周报</h4>
      <p>水印层覆盖在内容上方且不拦截指针事件，按钮、输入框仍可正常操作。</p>
      <KButton size="sm">下载附件</KButton>
    </div>
  </KWatermark>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KWatermark from 'kit/vue/ui/components/layouts/Watermark/Watermark.vue'
</script>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.card h4 {
  margin: 0 0 8px;
  font-size: var(--k-font-size-lg);
}
.card p {
  margin: 0 0 14px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>