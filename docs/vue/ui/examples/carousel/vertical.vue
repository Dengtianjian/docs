<template>
  <div class="demo">
    <KCarousel v-model:active-index="active" direction="vertical" :loop="false" :arrows="true" height="220px">
      <div v-for="item in cards" :key="item.title" class="card">
        <strong>{{ item.title }}</strong>
        <p>{{ item.desc }}</p>
      </div>
    </KCarousel>
    <KSpace justify="center">
      <KButton size="sm" :disabled="active === 0" @click="active -= 1">上一张</KButton>
      <span class="index">{{ active + 1 }} / {{ cards.length }}</span>
      <KButton size="sm" :disabled="active === cards.length - 1" @click="active += 1">下一张</KButton>
    </KSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCarousel from 'kit/vue/ui/components/Carousel/Carousel.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const active = ref(0)
const cards = [
  { title: '可拖拽', desc: '指针拖拽超过 15% 容器宽度即切换。' },
  { title: '可键盘操作', desc: '聚焦轮播后使用方向键、Home / End 切换。' },
  { title: '可无障碍朗读', desc: '每张幻灯片提供序号与角色描述。' },
]
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  height: 100%;
  padding: 24px;
  background: var(--k-color-fill-secondary);
}
.card strong {
  font-size: var(--k-font-size-lg);
}
.card p {
  margin: 0;
  color: var(--k-color-text-secondary);
}
.index {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  font-variant-numeric: tabular-nums;
}
</style>
