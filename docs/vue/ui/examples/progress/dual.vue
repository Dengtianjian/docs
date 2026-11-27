<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="70" :success-percent="45" />
    <KProgress :percent="90" :items="[{ percent: 30 }, { percent: 25 }, { percent: 20 }]" />
    <KProgress
      type="steps"
      :percent="90"
      :steps="10"
      :items="[{ percent: 30 }, { percent: 25 }, { percent: 20 }]"
    />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="75" :success-percent="40" />
      <KProgress
        type="circle"
        :percent="90"
        :items="[{ percent: 40 }, { percent: 30 }, { percent: 10 }]"
      />
      <KProgress type="circle" :segments="8" :percent="75" :success-percent="40" />
      <KProgress
        type="circle"
        :segments="10"
        :percent="90"
        :items="[{ percent: 30 }, { percent: 25 }, { percent: 20 }]"
      />
      <KProgress
        type="circle"
        size="sm"
        :percent="90"
        :items="[
          { percent: 30, color: ['#0a84ff', '#5ac8fa'] },
          { percent: 25, color: '#30d158' },
          { percent: 20, color: '#ff9f0a' },
        ]"
      />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>