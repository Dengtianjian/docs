<script setup lang="ts">
import KLink from 'kit/vue/ui/components/Link/Link.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
</script>

<template>
  <KSpace direction="vertical" :size="12">
    <KSpace :size="12">
      <KLink href="#colors">type=link（缺省）</KLink>
      <KText type="secondary">常态链接色 → hover 链接 hover 色</KText>
    </KSpace>
    <KSpace :size="12">
      <KLink href="#colors" type="subtle">type=subtle</KLink>
      <KText type="secondary">常态正文字色 → hover 变链接色</KText>
    </KSpace>
    <KSpace :size="12">
      <KLink href="#colors" type="primary">type=primary</KLink>
      <KText type="secondary">常态主色 → hover 主色 hover 档</KText>
    </KSpace>
    <KSpace :size="12">
      <KLink href="#colors" type="subtle-primary">type=subtle-primary</KLink>
      <KText type="secondary">常态正文字色 → hover 变主色</KText>
    </KSpace>
    <KSpace :size="12">
      <KLink href="#colors" color="#722ed1">自定义 color</KLink>
      <KText type="secondary">常态自定义色 → hover/active 按 color-mix 自动派生</KText>
    </KSpace>
  </KSpace>
</template>
