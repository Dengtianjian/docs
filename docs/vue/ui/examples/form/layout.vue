<template>
  <KForm :model="model" layout="horizontal" label-width="72px" label-align="right" style="max-width: 420px">
    <KFormItem label="用户名" name="user">
      <KInput v-model="model.user" />
    </KFormItem>
    <KFormItem label="邮箱" name="mail">
      <KInput v-model="model.mail" placeholder="horizontal + labelWidth + 冒号" />
    </KFormItem>
  </KForm>

  <KForm :model="model" layout="inline" label-width="64px" style="margin-top: 24px">
    <KFormItem label="关键词" name="user">
      <KInput v-model="model.user" />
    </KFormItem>
    <KFormItem label="邮箱" name="mail">
      <KInput v-model="model.mail" />
    </KFormItem>
  </KForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const model = reactive<Record<string, unknown>>({ user: '', mail: '' })
</script>
