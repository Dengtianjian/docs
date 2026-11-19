<template>
  <KSpace wrap align="center">
    <KLink href="#api">primary（缺省）</KLink>
    <KLink href="#api" type="default">default</KLink>
    <KLink href="#api" type="secondary">secondary</KLink>
    <KLink href="#api" underline="always">总是下划线</KLink>
    <KLink href="#api" underline="never">永不下划线</KLink>
    <KLink disabled>disabled（渲染为 span）</KLink>
  </KSpace>
</template>

<script setup lang="ts">
import KLink from 'kit/vue/ui/components/Link/Link.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
