<template>
  <KFlex vertical gap="lg">
    <KBreadcrumb :items="items" highlight-current />
    <KBreadcrumb :items="items" />
    <KBreadcrumb :items="items" separator="›" />
  </KFlex>
</template>

<script setup lang="ts">
import { Bell, Components, Compass, FileText, Forms, Home } from '@vicons/tabler'
import KBreadcrumb from 'kit/vue/ui/components/navigation/Breadcrumb/Breadcrumb.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KBreadcrumbItemOption } from 'kit/vue/ui'

const items: KBreadcrumbItemOption[] = [
  { icon: Home, href: '#api', ariaLabel: '首页' },
  {
    label: '组件',
    icon: Components,
    children: [
      { label: '反馈', icon: Bell, href: '#api' },
      { label: '表单', icon: Forms, href: '#api' },
      { label: '导航', icon: Compass, href: '#api', disabled: true },
    ],
  },
  { label: '面包屑', icon: FileText, href: '#api' },
]
</script>