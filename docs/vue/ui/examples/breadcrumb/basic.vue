<template>
  <KSpace direction="vertical" size="md">
    <KBreadcrumb :items="items" />
    <KBreadcrumb>
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api">组件</KBreadcrumbItem>
      <KBreadcrumbItem current>面包屑</KBreadcrumbItem>
    </KBreadcrumb>
    <KBreadcrumb :items="items" size="sm" />
  </KSpace>
</template>

<script setup lang="ts">
import KBreadcrumb from 'kit/vue/ui/components/Breadcrumb/Breadcrumb.vue'
import KBreadcrumbItem from 'kit/vue/ui/components/Breadcrumb/BreadcrumbItem.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KBreadcrumbItemOption } from 'kit/vue/ui'

const items: KBreadcrumbItemOption[] = [
  { label: '首页', href: '#api' },
  { label: '组件', href: '#api' },
  { label: 'KBreadcrumb 面包屑' },
]
</script>