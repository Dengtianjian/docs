<template>
  <KSpace direction="vertical" size="lg">
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
      <KBreadcrumbItem separator="|" current>当前页</KBreadcrumbItem>
    </KBreadcrumb>
  </KSpace>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KBreadcrumb from 'kit/vue/ui/components/Breadcrumb/Breadcrumb.vue'
import KBreadcrumbItem from 'kit/vue/ui/components/Breadcrumb/BreadcrumbItem.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

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