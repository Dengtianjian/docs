<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KButtonGroup from 'kit/vue/ui/components/Button/ButtonGroup.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import { getSharedBreakpoint } from 'kit/vue/ui'

const breakpoint = getSharedBreakpoint().current
</script>

<template>
  <div class="responsive-button-demo">
    <div class="responsive-button-demo__hint">当前断点：<code>{{ breakpoint }}</code></div>
    <KSpace wrap align="center">
      <KButton type="primary" size="xs:xs sm:sm md:md lg:lg">字符串 size</KButton>
      <KButton :size="{ xs: 'xs', md: 'sm', lg: 'lg' }">对象 size</KButton>
      <KButtonGroup size="xs:xs md:md lg:lg">
        <KButton>左</KButton>
        <KButton>中</KButton>
        <KButton>右</KButton>
      </KButtonGroup>
    </KSpace>
  </div>
</template>

<style scoped>
.responsive-button-demo { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.responsive-button-demo__hint { font-size: 12px; color: var(--vp-c-text-3); }
</style>
