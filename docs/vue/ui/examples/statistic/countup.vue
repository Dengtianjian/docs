<template>
  <KFlex vertical gap="md">
    <KStatistic title="累计访问" :value="value" count-up :duration="700" />
    <KFlex>
      <KButton size="sm" @click="value += 1280">增加 1,280</KButton>
      <KButton size="sm" variant="outline" @click="value = 0">归零</KButton>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'

const value = ref(12800)
</script>