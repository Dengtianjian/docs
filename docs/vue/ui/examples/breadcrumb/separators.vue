<template>
  <KFlex vertical gap="lg">
    <KBreadcrumb separator="›">
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api">组件</KBreadcrumbItem>
      <KBreadcrumbItem current>分隔符</KBreadcrumbItem>
    </KBreadcrumb>
    <KBreadcrumb :separator="ChevronRight">
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api">组件</KBreadcrumbItem>
      <KBreadcrumbItem current>图标分隔符</KBreadcrumbItem>
    </KBreadcrumb>
    <KBreadcrumb size="lg">
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api">组件</KBreadcrumbItem>
      <KBreadcrumbItem disabled>禁用项</KBreadcrumbItem>
      <KBreadcrumbItem current>当前页</KBreadcrumbItem>
    </KBreadcrumb>
    <KBreadcrumb>
      <KBreadcrumbItem href="#api">首页</KBreadcrumbItem>
      <KBreadcrumbItem href="#api" separator="›">组件</KBreadcrumbItem>
      <KBreadcrumbItem current>单项覆盖</KBreadcrumbItem>
    </KBreadcrumb>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KBreadcrumb from 'kit/vue/ui/components/navigation/Breadcrumb/Breadcrumb.vue'
import KBreadcrumbItem from 'kit/vue/ui/components/navigation/Breadcrumb/BreadcrumbItem.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const ChevronRight = defineComponent({
  setup() {
    return () =>
      h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: '1em',
          height: '1em',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.6,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'aria-hidden': 'true',
        },
        [h('path', { d: 'M6 3.5 10.5 8 6 12.5' })],
      )
  },
})
</script>