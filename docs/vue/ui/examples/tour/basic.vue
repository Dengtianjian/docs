<template>
  <div class="demo">
    <KButton id="tour-demo-start" @click="start">开始引导</KButton>
    <div id="tour-demo-panel" class="panel">
      <strong>项目概览</strong>
      <span>这里汇总构建、测试与发布状态。</span>
    </div>
    <p class="tip">{{ finished ? '引导已完成' : '点击按钮体验两步引导' }}</p>
  </div>

  <KTour
    v-model:open="open"
    v-model:current="current"
    :steps="steps"
    @finish="finished = true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KTour from 'kit/vue/ui/components/feedback/Tour/Tour.vue'
import type { KTourStep } from 'kit/vue/ui/components/feedback/Tour/Tour.vue'

const open = ref(false)
const current = ref(0)
const finished = ref(false)
const steps: KTourStep[] = [
  { title: '从这里开始', description: '点击按钮会打开引导浮层。', target: '#tour-demo-start', placement: 'bottom' },
  { title: '查看项目概览', description: '第二个步骤高亮这张卡片。', target: '#tour-demo-panel', placement: 'top' },
]

function start() {
  finished.value = false
  open.value = true
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.panel {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.panel strong {
  font-size: var(--k-font-size);
}
.panel span {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>