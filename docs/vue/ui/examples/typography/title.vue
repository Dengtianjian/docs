<template>
  <div>
    <KTitle :level="1">h1 标题</KTitle>
    <KTitle :level="2">h2 标题</KTitle>
    <KTitle :level="3">h3 标题</KTitle>
    <KTitle :level="4">h4 标题</KTitle>
    <KTitle :level="5">h5 标题</KTitle>
    <KParagraph>
      KParagraph 渲染语义 `p`，自带 1em 下间距。标题字阶与正文的跳跃比例由 heading token 阶梯驱动，改 seed 的
      fontSize/lineHeight 即可整档联动。
    </KParagraph>
  </div>
</template>

<script setup lang="ts">
import KTitle from 'kit/vue/ui/components/Typography/Title.vue'
import KParagraph from 'kit/vue/ui/components/Typography/Paragraph.vue'
</script>
