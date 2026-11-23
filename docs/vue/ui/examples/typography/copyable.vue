<template>
  <KFlex :inline="false" vertical gap="md">
    <KText copyable>行内文本可复制（按钮或点击文字）</KText>
    <KText :copyable="{ trigger: 'icon' }">仅点右侧按钮复制</KText>
    <KText :copyable="{ trigger: 'text' }">仅点击文字复制</KText>
    <KText :copyable="{ text: '复制的是这段自定义内容', tooltips: ['点我复制', '已复制到剪贴板'] }">
      显示文本与复制内容可以不同，点击文字也能复制
    </KText>
    <KText copyable>
      <template #copy="{ copied }">{{ copied ? '已复制' : '复制文本' }}</template>
      自定义复制操作内容
    </KText>
    <KParagraph copyable>
      段落也可复制；复制按钮在内容右侧，复制成功后图标切换为对勾。
    </KParagraph>
    <KTitle :level="4" copyable>可复制标题</KTitle>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KParagraph from 'kit/vue/ui/components/Typography/Paragraph.vue'
import KTitle from 'kit/vue/ui/components/Typography/Title.vue'
</script>