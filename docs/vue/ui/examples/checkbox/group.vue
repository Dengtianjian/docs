<template>
  <KFlex gap="lg" vertical>
    <KCheckboxGroup v-model="byOptions" :options="['苹果', { label: '香蕉（不可选）', value: 'banana', disabled: true }, { label: '橙子', value: 'orange' }]" />
    <KCheckboxGroup v-model="bySlot">
      <KCheckbox value="x">插槽子件 x</KCheckbox>
      <KCheckbox value="y">插槽子件 y</KCheckbox>
    </KCheckboxGroup>
    <div>options 形态：{{ byOptions.join(', ') }}；slot 形态：{{ bySlot.join(', ') }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCheckboxGroup from 'kit/vue/ui/components/data-entry/Checkbox/CheckboxGroup.vue'
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const byOptions = ref<(string | number)[]>(['a'])
const bySlot = ref<(string | number)[]>(['x'])
</script>
