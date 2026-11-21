<template>
  <KSpace size="lg" align="center" wrap>
    <KImage src="https://invalid.invalid/missing.png" alt="加载失败" :width="200" :height="140" fallback="图片加载失败" />
    <KImage
      src="https://picsum.photos/seed/kit-lazy/600/400"
      alt="懒加载"
      :width="200"
      :height="140"
      lazy
      placeholder="加载中"
    />
    <KImage
      src="https://picsum.photos/seed/kit-disabled/600/400"
      alt="禁用预览"
      :width="200"
      :height="140"
      preview
      disabled
    />
  </KSpace>
</template>

<script setup lang="ts">
import KImage from 'kit/vue/ui/components/Image/Image.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
