<script setup lang="ts">
import { useResponsiveValue, getSharedBreakpoint } from 'kit/vue/ui'

const breakpoint = getSharedBreakpoint().current
const width = useResponsiveValue<number>(() => ({ xs: 140, sm: 180, md: 240, lg: 300, xl: 340 }))
const padding = useResponsiveValue<string>(() => 'xs:8px sm:12px md:16px lg:24px')
</script>

<template>
  <div class="responsive-composable">
    <div
      class="responsive-composable__card"
      :style="{ width: width ? `${width}px` : undefined, padding }"
    >
      <strong>useResponsiveValue</strong>
      <span>断点 {{ breakpoint }}</span>
      <span>width {{ width ?? '—' }}px</span>
      <span>padding {{ padding ?? '—' }}</span>
    </div>
    <p class="responsive-composable__hint">
      业务自研组件可直接用组合式函数取当前档；常量/对象/字符串三种入参都支持，返回值已缓存。
    </p>
  </div>
</template>

<style scoped>
.responsive-composable { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.responsive-composable__card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  border: 1px solid var(--k-color-primary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-primary-bg);
  color: var(--k-color-text);
  font-size: 12px;
  transition: width 0.2s ease, padding 0.2s ease;
}
.responsive-composable__hint { margin: 0; font-size: 12px; color: var(--vp-c-text-3); }
</style>
