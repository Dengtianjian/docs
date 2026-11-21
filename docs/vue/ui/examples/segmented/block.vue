<template>
  <KSpace direction="vertical" size="lg" style="width: 420px; max-width: 100%">
    <KSegmented v-model="value" :options="options" block variant="outlined" />
    <KSegmented v-model="value" :options="options" block disabled />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSegmented from 'kit/vue/ui/components/Segmented/Segmented.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const options = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done', disabled: true },
]
const value = ref('doing')
</script>