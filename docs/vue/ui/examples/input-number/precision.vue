<template>
  <KSpace size="md" direction="vertical" style="width: 220px">
    <KInputNumber v-model="px" :precision="2" :step="0.01" placeholder="两位小数" />
    <KInputNumber v-model="status" status="error" />
    <KInputNumber v-model="status" size="lg" />
    <KInputNumber v-model="status" variant="filled" placeholder="filled" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const px = ref<number | null>(2.718)
const status = ref<number | null>(-1)
</script>
