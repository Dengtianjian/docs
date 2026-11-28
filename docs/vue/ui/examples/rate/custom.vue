<template>
  <KFlex vertical gap="lg">
    <KRate v-model="heart" character="♥" color="#e5484d" :count="5" />
    <KRate
      v-model="tips"
      :tooltips="['很差', '较差', '一般', '较好', '很好']"
      show-text
    />
    <KRate v-model="clearable" allow-clear allow-half />
    <span style="color: var(--k-color-text-secondary)">当前值：{{ clearable }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KRate from 'kit/vue/ui/components/data-entry/Rate/Rate.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const heart = ref(3)
const tips = ref(4)
const clearable = ref(2.5)
</script>