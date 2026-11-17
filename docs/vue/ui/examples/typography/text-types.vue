<script setup lang="ts">
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<template>
  <KSpace direction="vertical" size="xxs">
    <KText>default —— 一级文本，正文默认色（不透明度 88%）</KText>
    <KText type="secondary">secondary —— 二级文本，说明与辅助信息（65%）</KText>
    <KText type="tertiary">tertiary —— 三级文本，占位与弱化提示（45%）</KText>
    <KText type="disabled">disabled —— 禁用文本（25%）</KText>
  </KSpace>
</template>
