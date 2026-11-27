<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="68" :stroke-color="['#6a5cff', '#12c2e9']" />
    <KProgress :percent="45" :stroke-color="['#6a5cff', '#b37feb', '#12c2e9']" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="72" :stroke-color="['#6a5cff', '#12c2e9']" />
      <KProgress type="dashboard" :percent="56" :stroke-color="['#fa8c16', '#f5222d']" />
      <div style="flex: 1; min-width: 220px">
        <KProgress
          type="steps"
          :percent="66"
          :steps="6"
          :show-info="false"
          :stroke-color="['#1677ff', '#52c41a']"
        />
      </div>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>