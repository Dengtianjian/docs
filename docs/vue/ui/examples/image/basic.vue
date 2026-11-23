<template>
  <KFlex :gap="20" wrap align="start">
    <div class="item">
      <KImage :src="cover" alt="设计系统封面" :width="280" :height="168" />
      <span>圆角封面</span>
    </div>
    <div class="item">
      <KImage :src="cover" alt="圆形头像" :width="120" :height="120" shape="circle" />
      <span>圆形</span>
    </div>
    <div class="item">
      <KImage src="https://invalid.invalid/missing.png" alt="缺失图片" :width="200" :height="128" fallback="图片加载失败" />
      <span>失败兜底</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import KImage from 'kit/vue/ui/components/Image/Image.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const cover = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="560" height="336">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4f8cff"/><stop offset="1" stop-color="#22c55e"/></linearGradient></defs>
  <rect width="560" height="336" fill="url(#g)"/>
  <circle cx="430" cy="90" r="120" fill="rgba(255,255,255,.18)"/>
  <text x="40" y="280" fill="#fff" font-size="44" font-family="sans-serif" font-weight="700">K UI</text>
</svg>`)}`
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>