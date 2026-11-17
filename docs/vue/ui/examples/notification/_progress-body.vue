<script setup lang="ts">
import { ref } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'

const { notification } = useKApp()!
const pauseOnHover = ref(true)

function openProgress() {
  notification!.info({
    title: '下载中（8s 常驻倒计时）',
    description: '底部进度条与自动关闭同源计时；悬停暂停时进度条同步冻结。',
    duration: 8,
    showProgress: true,
    pauseOnHover: pauseOnHover.value,
  })
}
</script>

<template>
  <KSpace size="lg" wrap align="center">
    <KButton type="primary" @click="openProgress">showProgress（8s）</KButton>
    <KSpace size="xs" align="center">
      <KSwitch v-model="pauseOnHover" size="small" />
      <span style="color: var(--k-color-text-secondary)">pauseOnHover（悬停暂停关闭）</span>
    </KSpace>
  </KSpace>
</template>
