<template>
  <KFlex gap="md" vertical style="width: 320px">
    <KInputNumber v-model="price" before="¥" after="元" :step="10" placeholder="金额" />
    <KInputNumber v-model="weight" size="sm" :step="0.5" placeholder="重量">
      <template #prefix>重量</template>
      <template #suffix>kg</template>
    </KInputNumber>
    <KInputNumber v-model="count" before="数量" after="件" disabled placeholder="禁用态" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/data-entry/InputNumber/InputNumber.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const price = ref(99)
const weight = ref(2.5)
const count = ref(null)
</script>