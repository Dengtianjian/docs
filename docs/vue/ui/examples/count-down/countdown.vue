<template>
  <KSpace direction="vertical" size="md">
    <KCountDown ref="countdown" :time="90000" format="mm:ss" @finish="finished = true" />
    <KSpace>
      <KButton size="sm" @click="countdown?.start()">开始</KButton>
      <KButton size="sm" variant="outline" @click="countdown?.pause()">暂停</KButton>
      <KButton size="sm" variant="text" @click="countdown?.reset()">重置</KButton>
    </KSpace>
    <p class="tip">{{ finished ? '倒计时结束' : '默认自动开始，可暂停与重置' }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCountDown from 'kit/vue/ui/components/CountDown/CountDown.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const countdown = ref<{ start: () => void; pause: () => void; reset: () => void } | null>(null)
const finished = ref(false)
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>