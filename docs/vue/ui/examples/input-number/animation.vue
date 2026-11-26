<template>
  <KFlex gap="md" vertical style="width: 300px">
    <KInputNumber v-model="qty" animated placeholder="点击步进看滚动" />
    <KInputNumber v-model="price" animated before="¥" :step="10" placeholder="带组合标签" />
    <KInputNumber v-model="plain" placeholder="默认关闭动画" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/data-entry/InputNumber/InputNumber.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const qty = ref(8)
const price = ref(90)
const plain = ref(3)
</script>