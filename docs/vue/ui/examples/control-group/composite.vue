<script setup lang="ts">
import { ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/ControlGroup/ControlGroup.vue'
import KControlGroupItem from 'kit/vue/ui/components/ControlGroup/ControlGroupItem.vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KRadio from 'kit/vue/ui/components/Radio/Radio.vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const qty = ref(1)
const unit = ref('piece')
const cycle = ref('day')
const enabled = ref(true)
const mode = ref('auto')
const autoSave = ref(true)

const units = [
  { label: '件', value: 'piece' },
  { label: '箱', value: 'box' },
  { label: '托', value: 'pallet' },
]
</script>

<template>
  <KSpace direction="vertical" size="lg">
    <KControlGroup>
      <KInputNumber v-model="qty" :min="1" :max="99" style="width: 110px" />
      <KSelect v-model="unit" :options="units" style="width: 120px" />
      <KButton type="primary">应用</KButton>
    </KControlGroup>
    <KControlGroup>
      <KRadioGroup v-model="cycle" shape="button">
        <KRadio value="day">按日</KRadio>
        <KRadio value="week">按周</KRadio>
        <KRadio value="month">按月</KRadio>
      </KRadioGroup>
      <KControlGroupItem>切换周期</KControlGroupItem>
      <KButton>确定</KButton>
    </KControlGroup>
    <KControlGroup>
      <KControlGroupItem>
        <KCheckbox v-model="enabled">启用</KCheckbox>
      </KControlGroupItem>
      <KControlGroupItem>
        <KRadio v-model="mode" value="auto">自动</KRadio>
      </KControlGroupItem>
      <KControlGroupItem>
        <KSwitch v-model="autoSave" size="small" />
      </KControlGroupItem>
      <KControlGroupItem>单位：件</KControlGroupItem>
      <KButton>保存</KButton>
    </KControlGroup>
  </KSpace>
</template>