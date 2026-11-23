<template>
  <KFlex gap="md" vertical style="width: 200px">
    <KInputNumber v-model="limited" :min="1" :max="9" />
    <KInputNumber v-model="decimal" :step="0.1" />
    <KInputNumber v-model="noControls" :step="100" :controls="false" placeholder="无步进列，仅键盘 ↑↓" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const limited = ref<number | null>(3)
const decimal = ref<number | null>(1.5)
const noControls = ref<number | null>(100)
</script>
