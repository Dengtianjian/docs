<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="percent" status="active" :format="formatUpload" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="percent" />
      <KProgress type="dashboard" :percent="percent" status="exception" />
      <div style="flex: 1; min-width: 200px">
        <KProgress type="steps" :percent="percent" :steps="10" :show-info="false" />
      </div>
    </KFlex>
    <KProgress :percent="percent" :items="stackItems" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="percent" :items="stackItems" />
      <KProgress type="dashboard" :percent="percent" :items="stackItems" />
    </KFlex>
    <KFlex gap="sm" align="center" wrap>
      <KButton size="sm" @click="toggle">
        {{ running ? '暂停' : percent >= 100 ? '重播' : '继续' }}
      </KButton>
      <KButton size="sm" @click="nudge(-10)">−10%</KButton>
      <KButton size="sm" @click="nudge(10)">+10%</KButton>
      <KButton size="sm" @click="nudge(25)">+25%</KButton>
      <KButton size="sm" variant="text" @click="reset">重置</KButton>
      <span class="hint">{{ running ? '模拟上传中…' : `已暂停在 ${percent}%` }}</span>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const percent = ref(0)
const running = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

/* items 动态进度：随 percent 逐段展开 */
const stackItems = [
  { percent: 30, color: ['#1677ff', '#36cfc9'] },
  { percent: 25, color: ['#52c41a', '#a0d911'] },
  { percent: 25, color: ['#fa8c16', '#f5222d'] },
  { percent: 20, color: ['#722ed1', '#eb2f96'] },
]

function formatUpload(value: number) {
  return `上传中 ${value}%`
}

function start() {
  if (timer) return
  running.value = true
  timer = setInterval(() => {
    percent.value = Math.min(100, percent.value + 2)
    if (percent.value >= 100) stop()
  }, 160)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  running.value = false
}

function toggle() {
  if (running.value) stop()
  else if (percent.value >= 100) {
    percent.value = 0
    start()
  } else start()
}

function nudge(delta: number) {
  stop()
  percent.value = Math.min(100, Math.max(0, percent.value + delta))
}

function reset() {
  stop()
  percent.value = 0
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<style scoped>
.hint {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>