<template>
  <KSpace wrap align="center">
    <KButton href="https://vuejs.org" target="_blank" type="primary">跳转链接（渲染为 a）</KButton>
    <KButton type="link">Link 型按钮</KButton>
    <KButton type="link" disabled>Link Disabled</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
