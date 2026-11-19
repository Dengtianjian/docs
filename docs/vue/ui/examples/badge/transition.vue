<template>
  <KSpace align="center" size="lg">
    <KBadge :count="countOn ? 5 : undefined">
      <KButton @click="countOn = !countOn">计数：{{ countOn ? '隐藏' : '显示' }}</KButton>
    </KBadge>
    <KBadge :dot="dotOn">
      <KButton @click="dotOn = !dotOn">圆点：{{ dotOn ? '隐藏' : '显示' }}</KButton>
    </KBadge>
    <KBadge :color="statusOn ? 'success' : undefined" :text="statusOn ? '已完成' : undefined" />
    <KButton @click="statusOn = !statusOn">状态：{{ statusOn ? '隐藏' : '显示' }}</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KBadge from 'kit/vue/ui/components/Badge/Badge.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const countOn = ref(true)
const dotOn = ref(true)
const statusOn = ref(true)
</script>
