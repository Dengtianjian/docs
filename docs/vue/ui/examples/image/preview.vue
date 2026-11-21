<template>
  <KSpace direction="vertical" size="md">
    <KImage
      src="https://picsum.photos/seed/kit-preview/800/500"
      alt="可预览图片"
      :width="320"
      preview
      preview-text="查看大图"
    />
    <p class="tip">点击图片或聚焦后按 Enter / 空格打开预览，Esc 关闭。</p>
  </KSpace>
</template>

<script setup lang="ts">
import KImage from 'kit/vue/ui/components/Image/Image.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>
