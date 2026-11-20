<template>
  <div class="progress-row">
    <KProgress type="circle" :percent="75" />
    <KProgress type="dashboard" :percent="42" status="warning" />
    <div style="flex: 1; min-width: 240px">
      <KProgress type="steps" :percent="60" :steps="5" />
      <div style="margin-top: 16px">
        <KProgress type="steps" :percent="100" :steps="8" status="success" :show-info="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/Progress/Progress.vue'
</script>

<style scoped>
.progress-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 32px;
}
</style>