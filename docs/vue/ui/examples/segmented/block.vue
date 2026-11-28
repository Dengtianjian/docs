<template>
  <KFlex vertical gap="lg" style="width: 420px; max-width: 100%">
    <KSegmented v-model="value" :options="options" block variant="outlined" />
    <KSegmented v-model="value" :options="options" block disabled />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSegmented from 'kit/vue/ui/components/data-entry/Segmented/Segmented.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const options = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done', disabled: true },
]
const value = ref('doing')
</script>