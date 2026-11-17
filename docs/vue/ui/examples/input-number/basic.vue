<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const v1 = ref<number | null>(1)
const v2 = ref<number | null>(null)
</script>

<template>
  <KSpace size="md" direction="vertical" style="width: 200px">
    <KInputNumber v-model="v1" />
    <KInputNumber v-model="v2" placeholder="可为空" />
    <KInputNumber :model-value="3" disabled />
    <div>当前值：{{ v1 }}</div>
  </KSpace>
</template>
