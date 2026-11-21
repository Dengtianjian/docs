<template>
  <KSpace direction="vertical" size="lg" :style="{ width: '100%' }">
    <KStatistic title="实时在线" :value="online" suffix="人" count-up />
    <KSpace>
      <KButton size="sm" @click="online += 128">增加 128</KButton>
      <KButton size="sm" @click="online = 0">归零</KButton>
      <KButton size="sm" @click="loading = !loading">{{ loading ? '结束加载' : '模拟加载' }}</KButton>
    </KSpace>
    <KStatistic title="加载态" :value="online" :loading="loading" suffix="人" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'

const online = ref(1024)
const loading = ref(false)
</script>
