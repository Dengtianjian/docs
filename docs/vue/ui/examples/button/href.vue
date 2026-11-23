<template>
  <KFlex wrap align="center">
    <KButton href="https://vuejs.org" target="_blank" type="primary">跳转链接（渲染为 a）</KButton>
    <KButton type="link">Link 型按钮</KButton>
    <KButton type="link" disabled>Link Disabled</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>
