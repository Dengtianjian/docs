<template>
  <KFlex vertical gap="md">
    <KMarquee
      text="K UI P8 增强件已发布：右键菜单、分隔面板、二维码、水印与引导上线。"
      :duration="16"
      aria-label="产品公告"
    />
    <KMarquee
      text="右向滚动 · 悬停暂停 · 渐变遮罩"
      direction="right"
      :duration="20"
      :gap="64"
    />
  </KFlex>
</template>

<script setup lang="ts">
import KMarquee from 'kit/vue/ui/components/other/Marquee/Marquee.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>