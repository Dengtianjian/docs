<template>
  <KCarousel :items="items" :height="220" :interval="2600" autoplay>
    <template #content="{ item }">
      <div class="slide" :style="{ background: item.background }">
        <strong>{{ item.content }}</strong>
        <span>{{ item.description }}</span>
      </div>
    </template>
  </KCarousel>
</template>

<script setup lang="ts">
import KCarousel from 'kit/vue/ui/components/data-display/Carousel/Carousel.vue'

const items = [
  { content: '文档与组件', description: '一套 token 驱动 85+ 组件', background: 'linear-gradient(135deg,#4f8cff,#22d3ee)' },
  { content: '无障碍基线', description: '键盘、焦点环与 ARIA 默认可用', background: 'linear-gradient(135deg,#16a34a,#84cc16)' },
  { content: '按需导入', description: 'KResolver 直达单个 SFC', background: 'linear-gradient(135deg,#f97316,#facc15)' },
]
</script>

<style scoped>
.slide {
  display: flex;
  width: 72%;
  height: 150px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--k-border-radius-lg);
  box-shadow: var(--k-box-shadow-secondary);
  color: #fff;
}
.slide strong {
  font-size: var(--k-font-size-lg);
}
.slide span {
  font-size: var(--k-font-size-sm);
  opacity: 0.9;
}
</style>