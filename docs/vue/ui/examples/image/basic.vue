<template>
  <KSpace size="lg" align="center" wrap>
    <KImage src="https://picsum.photos/seed/kit-image-1/640/400" alt="示例风景" :width="240" :height="160" />
    <KImage src="https://picsum.photos/seed/kit-image-2/640/400" alt="圆角" :width="160" :height="160" shape="rounded" :radius="16" />
    <KImage src="https://picsum.photos/seed/kit-image-3/640/400" alt="头像" :width="96" :height="96" shape="circle" />
    <KImage src="https://picsum.photos/seed/kit-image-4/800/450" alt="固定比例" :width="240" :ratio="16 / 9" />
  </KSpace>
</template>

<script setup lang="ts">
import KImage from 'kit/vue/ui/components/Image/Image.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
