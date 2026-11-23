<template>
  <KFlex vertical gap="lg" align="start">
    <KFlex gap="lg" align="center" wrap>
      <KSpin :percent="percent" tip="上传中" />
      <KSpin :percent="percent" size="sm" />
      <KSpin :percent="percent" size="lg" />
    </KFlex>

    <KFlex gap="sm" align="center">
      <KButton size="sm" :disabled="running" @click="start">模拟进度</KButton>
      <KButton size="sm" variant="text" @click="reset">重置</KButton>
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">
        {{ running ? '进行中…' : `当前 ${percent}%` }}
      </span>
    </KFlex>

    <KSpin :percent="percent" tip="包裹模式：内容压暗">
      <div style="width: 280px; height: 120px; border-radius: 8px; background: var(--k-color-fill-tertiary)"></div>
    </KSpin>
  </KFlex>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import KSpin from 'kit/vue/ui/components/Spin/Spin.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const percent = ref(0)
const running = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  reset()
  running.value = true
  timer = setInterval(() => {
    percent.value = Math.min(100, percent.value + 7)
    if (percent.value >= 100) {
      percent.value = 100
      if (timer) clearInterval(timer)
      timer = null
      running.value = false
    }
  }, 220)
}

function reset() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  percent.value = 0
  running.value = false
}

onBeforeUnmount(reset)
</script>