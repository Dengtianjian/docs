<template>
  <KFlex vertical gap="sm">
    <KButton @click="open = true">选择城市</KButton>
    <p class="tip">当前：{{ values.join(' / ') }}</p>
    <KPicker
      v-model:open="open"
      v-model="values"
      title="选择城市"
      :columns="columns"
      @confirm="last = $event.join(' / ')"
    />
    <p class="tip">确认值：{{ last || '（未确认）' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KPicker from 'kit/vue/ui/components/Picker/Picker.vue'
import type { KPickerColumn, KPickerValue } from 'kit/vue/ui/components/Picker/PickerView.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const open = ref(false)
const values = ref<KPickerValue[]>(['杭州', '西湖区'])
const last = ref('')
const columns: KPickerColumn[] = [
  {
    label: '城市',
    options: [
      { label: '杭州', value: '杭州' },
      { label: '上海', value: '上海' },
      { label: '北京', value: '北京' },
    ],
  },
  {
    label: '区域',
    options: [
      { label: '西湖区', value: '西湖区' },
      { label: '滨江区', value: '滨江区' },
      { label: '余杭区', value: '余杭区' },
      { label: '浦东新区', value: '浦东新区', disabled: true },
    ],
  },
]
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>