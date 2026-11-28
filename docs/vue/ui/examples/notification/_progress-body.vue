<template>
  <KFlex gap="lg" wrap>
    <KButton type="primary" @click="openProgress(true)">showProgress（8s，悬停暂停）</KButton>
    <KButton @click="openProgress(false)">showProgress（8s，悬停不暂停）</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const { notification } = useKApp()!

function openProgress(pauseOnHover: boolean) {
  notification!.info({
    title: pauseOnHover ? '下载中（悬停暂停）' : '下载中（悬停不暂停）',
    description: '底部进度条与自动关闭同源计时；悬停暂停时进度条同步冻结。',
    duration: 8,
    showProgress: true,
    pauseOnHover,
  })
}
</script>
