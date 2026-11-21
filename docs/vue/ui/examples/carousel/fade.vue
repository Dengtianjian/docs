<template>
  <KCarousel
    effect="fade"
    indicator="line"
    indicator-placement="outside"
    arrows
    height="240px"
  >
    <div v-for="(item, index) in items" :key="item.title" class="slide" :style="{ background: item.bg }">
      <strong>0{{ index + 1 }}</strong>
      <span>{{ item.title }}</span>
    </div>
  </KCarousel>
</template>

<script setup lang="ts">
import KCarousel from 'kit/vue/ui/components/Carousel/Carousel.vue'

const items = [
  { title: '主题 token', bg: 'linear-gradient(135deg, var(--k-color-primary), var(--k-color-primary-hover))' },
  { title: '双端适配', bg: 'linear-gradient(135deg, var(--k-color-success), var(--k-color-info))' },
  { title: '无障碍交互', bg: 'linear-gradient(135deg, var(--k-color-warning), var(--k-color-error))' },
]
</script>

<style scoped>
.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  color: var(--k-color-text-light-solid);
  font-size: var(--k-font-size-lg);
  letter-spacing: 2px;
}
.slide strong {
  font-size: 42px;
  line-height: 1;
}
</style>
