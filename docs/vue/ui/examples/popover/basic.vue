<template>
  <KFlex gap="lg" wrap>
    <KPopover title="卡片标题" content="hover/focus 触发的浮层卡片，移入弹层不消失（0.1s 容差）。" placement="right">
      <template #trigger><KButton>Hover 卡片</KButton></template>
    </KPopover>
    <KPopover placement="bottom" trigger="click" closable>
      <template #trigger><KButton type="primary">Click 卡片</KButton></template>
      <template #title>Click + closable</template>
      <p style="margin: 0">默认插槽 = 内容区，可放任意结构：表单、操作列表、图片预览。</p>
      <a href="#" style="color: var(--k-color-primary)" @click.prevent>一个链接</a>
    </KPopover>
    <KPopover title="翻转到上方" content="左侧空间不足时 left 自动翻到 right。" placement="left">
      <template #trigger><KButton>Left→翻转</KButton></template>
    </KPopover>
    <KPopover placement="top" trigger="click" closable content="无标题时右上角也保留关闭 X。">
      <template #trigger><KButton>无标题 + closable</KButton></template>
    </KPopover>
  </KFlex>
</template>

<script setup lang="ts">
import KPopover from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>
