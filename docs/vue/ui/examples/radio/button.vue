<script setup lang="ts">
import { ref } from 'vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'

const size = ref<string | number>('middle')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start">
    <KRadioGroup
      v-model="size"
      shape="button"
      :options="[
        { label: 'small', value: 'small' },
        { label: 'middle', value: 'middle' },
        { label: 'large', value: 'large' },
      ]"
    />
    <div>当前值：{{ size }}</div>
  </div>
</template>
