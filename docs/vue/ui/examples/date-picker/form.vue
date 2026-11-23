<template>
  <KForm ref="form" :model="model" :rules="rules" layout="vertical" style="max-width: 320px">
    <KFormItem label="生日" name="birthday">
      <KDatePicker v-model="model.birthday" clearable placeholder="选值即触发 change 校验" />
    </KFormItem>
    <KFormItem label="起始月份" name="startMonth">
      <KDatePicker v-model="model.startMonth" picker="month" clearable />
    </KFormItem>
    <KFormItem>
      <KFlex>
        <KButton type="primary" @click="onSubmit">校验提交</KButton>
        <KButton @click="onReset">重置</KButton>
      </KFlex>
    </KFormItem>
    <div>{{ result }}</div>
  </KForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const form = ref<InstanceType<typeof KForm> | null>(null)
const model = reactive<Record<string, unknown>>({
  birthday: null,
  startMonth: null,
})
const rules: Record<string, unknown> = {
  birthday: [{ type: 'number', required: true, message: '请选择生日' }],
  startMonth: [{ type: 'number', required: true, message: '请选择起始月份' }],
}
const result = ref('')

function onSubmit() {
  form.value?.validate().then(
    () => (result.value = '校验通过'),
    () => (result.value = '未通过：见各字段错误回显'),
  )
}
function onReset() {
  model.birthday = null
  model.startMonth = null
  form.value?.resetFields()
  result.value = ''
}
</script>
