<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KCheckboxGroup from 'kit/vue/ui/components/Checkbox/CheckboxGroup.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const form = ref()
const model = reactive<{ plan: string; channels: string[]; enabled: boolean }>({
  plan: '',
  channels: [],
  enabled: false,
})
const rules = {
  plan: { required: true, message: '请选择套餐' },
  channels: { type: 'array', required: true, message: '至少选择一个渠道' },
}
const result = ref('—')

async function submit() {
  try {
    await form.value?.validate()
    result.value = '校验通过'
  } catch {
    result.value = '校验失败'
  }
}
</script>

<template>
  <KForm ref="form" :model="model" :rules="rules" layout="vertical" style="max-width: 420px">
    <KFormItem label="套餐" name="plan">
      <KRadioGroup v-model="model.plan" :options="['基础版', '专业版']" />
    </KFormItem>
    <KFormItem label="通知渠道" name="channels">
      <KCheckboxGroup v-model="model.channels" :options="['邮件', '短信', '站内信']" />
    </KFormItem>
    <KFormItem label="启用" name="enabled" extra="开关也会关联标签与错误信息">
      <KSwitch v-model="model.enabled" />
    </KFormItem>
    <KFormItem>
      <KSpace align="center">
        <KButton type="primary" @click="submit">校验</KButton>
        <span style="color: var(--k-color-text-tertiary); font-size: 12px">{{ result }}</span>
      </KSpace>
    </KFormItem>
  </KForm>
</template>