<template>
  <KSpace size="lg" direction="vertical">
    <KRadioGroup
      v-model="plan"
      :options="[
        { label: '方案 A', value: 'a' },
        { label: '方案 B', value: 'b' },
        { label: '禁用项', value: 'c', disabled: true },
      ]"
    />
    <KRadioGroup v-model="bySlot">
      <KRadio :value="1">插槽子件 1</KRadio>
      <KRadio :value="2">插槽子件 2</KRadio>
    </KRadioGroup>
    <div>当前值：{{ plan }} / {{ bySlot }}</div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KRadio from 'kit/vue/ui/components/Radio/Radio.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const plan = ref<string | number>('a')
const bySlot = ref<string | number>('1')
</script>
