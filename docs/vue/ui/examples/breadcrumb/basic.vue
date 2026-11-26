<template>
  <KFlex vertical gap="md">
    <KBreadcrumb :items="items" />
    <KBreadcrumb>
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api">组件</KBreadcrumbItem>
      <KBreadcrumbItem current>面包屑</KBreadcrumbItem>
    </KBreadcrumb>
    <KBreadcrumb :items="items" size="sm" />
  </KFlex>
</template>

<script setup lang="ts">
import KBreadcrumb from 'kit/vue/ui/components/navigation/Breadcrumb/Breadcrumb.vue'
import KBreadcrumbItem from 'kit/vue/ui/components/navigation/Breadcrumb/BreadcrumbItem.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KBreadcrumbItemOption } from 'kit/vue/ui'

const items: KBreadcrumbItemOption[] = [
  { label: '首页', href: '#api' },
  { label: '组件', href: '#api' },
  { label: 'KBreadcrumb 面包屑' },
]
</script>