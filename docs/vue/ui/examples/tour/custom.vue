<template>
  <KButton id="tour-custom-target" @click="open = true">打开自定义引导</KButton>

  <KTour v-model:open="open" :steps="steps" :closable="false" :close-on-overlay="false">
    <template #step="{ step }">
      <div class="rich">
        <strong>{{ step.title }}</strong>
        <p>{{ step.description }}</p>
        <ul>
          <li>支持自定义标题、正文与底部操作</li>
          <li>每步可指定 placement</li>
          <li>Esc 关闭，← / → 切换</li>
        </ul>
      </div>
    </template>
    <template #footer="{ index, next, prev, finish }">
      <div class="footer">
        <KButton size="sm" variant="text" :disabled="index === 0" @click="prev">返回</KButton>
        <KButton size="sm" @click="index === 0 ? next() : finish()">
          {{ index === 0 ? '继续' : '知道了' }}
        </KButton>
      </div>
    </template>
  </KTour>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KTour from 'kit/vue/ui/components/Tour/Tour.vue'
import type { KTourStep } from 'kit/vue/ui/components/Tour/Tour.vue'

const open = ref(false)
const steps: KTourStep[] = [
  {
    title: '富文本步骤',
    description: '默认内容区可以完全替换。',
    target: '#tour-custom-target',
    placement: 'bottom',
  },
]
</script>

<style scoped>
.rich strong {
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
.rich p {
  margin: 6px 0 8px;
}
.rich ul {
  margin: 0;
  padding-left: 18px;
}
.rich li {
  margin: 3px 0;
}
.footer {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
}
</style>