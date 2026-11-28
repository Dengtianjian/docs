<template>
  <KFlex :gap="20" wrap align="start">
    <KImage
      v-for="item in images"
      :key="item.name"
      :src="item.src"
      :alt="item.name"
      :width="180"
      :height="120"
      preview
      :preview-items="images"
    />
  </KFlex>
  <p class="tip">点击图片打开 KPreview，支持缩放、旋转与切换。</p>
</template>

<script setup lang="ts">
import KImage from 'kit/vue/ui/components/data-display/Image/Image.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

function makeImage(label: string, from: string, to: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="480">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
  <rect width="720" height="480" fill="url(#g)"/>
  <text x="48" y="400" fill="#fff" font-size="64" font-family="sans-serif" font-weight="700">${label}</text>
</svg>`)}`
}

const images = [
  { name: '蓝色渐变', src: makeImage('Blue', '#4f8cff', '#22d3ee') },
  { name: '绿色渐变', src: makeImage('Green', '#16a34a', '#84cc16') },
  { name: '橙色渐变', src: makeImage('Orange', '#f97316', '#facc15') },
]
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>