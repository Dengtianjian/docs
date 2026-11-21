<template>
  <KSpace direction="vertical" size="md">
    <KCarousel :items="items" effect="fade" :height="200" indicator="line">
      <template #content="{ item }">
        <div class="panel" :style="{ background: item.background }">
          <strong>{{ item.title }}</strong>
          <p>{{ item.copy }}</p>
        </div>
      </template>
    </KCarousel>
    <KCarousel :items="items" vertical :height="220" :show-indicators="false">
      <template #content="{ item }">{{ item.title }}</template>
    </KCarousel>
  </KSpace>
</template>

<script setup lang="ts">
import KCarousel from 'kit/vue/ui/components/Carousel/Carousel.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const items = [
  { title: '淡入淡出', copy: '适合图文占比高的品牌位', background: 'linear-gradient(135deg,#0f172a,#334155)' },
  { title: '垂直滑动', copy: '方向键与拖拽同步支持', background: 'linear-gradient(135deg,#7c3aed,#2563eb)' },
  { title: '指示器变体', copy: 'dot 与 line 可按场景切换', background: 'linear-gradient(135deg,#be123c,#f97316)' },
]
</script>

<style scoped>
.panel {
  display: flex;
  width: 70%;
  height: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: var(--k-border-radius-lg);
  color: #fff;
}
.panel p {
  margin: 0;
  font-size: var(--k-font-size-sm);
  opacity: 0.85;
}
</style>