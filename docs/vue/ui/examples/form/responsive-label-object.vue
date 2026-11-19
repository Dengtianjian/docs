<script setup lang="ts">
import { reactive } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const model = reactive<Record<string, unknown>>({ user: '', mail: '' })
</script>

<template>
  <KForm
    :model="model"
    :layout="{ xs: 'vertical', md: 'horizontal' }"
    :label-width="{ xs: 72, sm: 88, md: 100, lg: 120 }"
    :label-align="{ xs: 'left', md: 'right' }"
    :colon="{ xs: false, md: true }"
    style="max-width: 420px"
  >
    <KFormItem label="用户名" name="user">
      <KInput v-model="model.user" />
    </KFormItem>
    <KFormItem label="邮箱" name="mail">
      <KInput v-model="model.mail" placeholder="对象写法：类型完整，推荐业务使用" />
    </KFormItem>
  </KForm>
</template>
