<template>
  <KForm
    ref="form"
    :model="model"
    :rules="rules"
    layout="vertical"
    style="max-width: 360px"
  >
    <KFormItem label="姓名" name="name">
      <KInput v-model="model.name" placeholder="blur/change 都会触发校验，错误态边框自动下发" />
    </KFormItem>
    <KFormItem label="年龄" name="age" extra="0 ~ 150">
      <KInputNumber v-model="model.age" :min="0" :max="150" />
    </KFormItem>
    <KFormItem label="城市" name="city">
      <KSelect v-model="model.city" :options="cities" allow-clear />
    </KFormItem>
    <KFormItem name="agree">
      <KCheckbox v-model="model.agree">我已阅读并同意</KCheckbox>
    </KFormItem>
    <KFormItem>
      <KSpace>
        <KButton type="primary" @click="onSubmit">校验提交</KButton>
        <KButton @click="onReset">重置</KButton>
      </KSpace>
    </KFormItem>
    <div>{{ result }}</div>
  </KForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const form = ref<InstanceType<typeof KForm> | null>(null)
const model = reactive<Record<string, unknown>>({
  name: '',
  age: null,
  city: null,
  agree: false,
})
const rules: Record<string, unknown> = {
  name: [
    { required: true, message: '请输入姓名' },
    { min: 2, message: '至少 2 个字符' },
  ],
  age: [{ type: 'number', required: true, message: '年龄必填', min: 0, max: 150 }],
  city: [{ required: true, message: '选择城市' }],
  agree: [
    {
      validator: (_r: unknown, value: unknown, cb: (e?: Error) => void) =>
        value ? cb() : cb(new Error('需先勾选同意')),
    },
  ],
}
const cities = [
  { label: '杭州', value: 'hz' },
  { label: '北京', value: 'bj' },
  { label: '深圳', value: 'sz' },
]
const result = ref('')

function onSubmit() {
  form.value?.validate().then(
    () => (result.value = '校验通过'),
    () => (result.value = '未通过：见各字段错误回显'),
  )
}
function onReset() {
  model.name = ''
  model.age = null
  model.city = null
  model.agree = false
  form.value?.resetFields()
  result.value = ''
}
</script>
