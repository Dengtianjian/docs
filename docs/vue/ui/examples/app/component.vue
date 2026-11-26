<template>
  <KFlex vertical gap="md">
    <KSegmented v-model="tag" :options="options" />
    <div class="component-frame">
      <KApp :component="tag === 'none' ? false : tag">
        <UsePanel :title="tag === 'none' ? 'component=false' : `component=${tag}`" />
      </KApp>
    </div>
    <p class="component-hint">
      {{ tag === 'none'
        ? '无包裹层：useKApp().root 为 undefined，反馈队列仍随 KApp 存活并回落 body 挂载。'
        : `component=${tag}：root 指向带 .k-app 类的包裹元素。` }}
    </p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KApp from 'kit/vue/ui/components/general/App/App.vue'
import KSegmented from 'kit/vue/ui/components/data-entry/Segmented/Segmented.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import UsePanel from './_use-panel.vue'

const tag = ref<'div' | 'section' | 'none'>('div')
const options = [
  { label: 'div', value: 'div' },
  { label: 'section', value: 'section' },
  { label: 'component=false', value: 'none' },
]
</script>

<style scoped>
.component-frame {
  padding: 14px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
}
.component-hint {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>