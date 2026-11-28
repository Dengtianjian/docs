<template>
  <KFlex :inline="false" vertical gap="md" align="start">
    <KText shimmer type="secondary">正在连接服务器…</KText>
    <KText shimmer strong>数据同步中</KText>
    <KText shimmer strong type="warning">请勿关闭页面</KText>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
</script>