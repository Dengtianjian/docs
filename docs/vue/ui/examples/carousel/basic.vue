<template>
  <KCarousel autoplay :interval="3500" arrows height="260px" aria-label="示例图集">
    <img v-for="item in images" :key="item.src" :src="item.src" :alt="item.alt" />
  </KCarousel>
</template>

<script setup lang="ts">
import KCarousel from 'kit/vue/ui/components/Carousel/Carousel.vue'

const images = [
  { src: 'https://picsum.photos/seed/kit-carousel-1/1200/600', alt: '山谷' },
  { src: 'https://picsum.photos/seed/kit-carousel-2/1200/600', alt: '海岸' },
  { src: 'https://picsum.photos/seed/kit-carousel-3/1200/600', alt: '城市' },
]
</script>
