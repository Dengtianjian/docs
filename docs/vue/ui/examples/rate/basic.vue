<template>
  <KFlex vertical gap="lg">
    <KRate v-model="score" show-text :text="text" />
    <KRate v-model="half" allow-half show-text />
    <KRate v-model="readonly" disabled show-text />
    <KRate v-model="score" size="lg" allow-half />
  </KFlex>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KRate from 'kit/vue/ui/components/data-entry/Rate/Rate.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const score = ref(3)
const half = ref(2.5)
const readonly = ref(4)
const text = computed(() => ['未评分', '很差', '一般', '不错', '很好', '极佳'][score.value] ?? `${score.value} 星`)
</script>