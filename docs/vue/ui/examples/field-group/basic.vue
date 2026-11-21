<template>
  <KFieldGroup label="收货信息" description="请填写真实姓名与常用联系电话">
    <KInput v-model="form.name" placeholder="收货人" />
    <KInput v-model="form.phone" placeholder="手机号" />
    <KInput v-model="form.address" type="textarea" :rows="2" placeholder="详细地址" />
  </KFieldGroup>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KFieldGroup from 'kit/vue/ui/components/FieldGroup/FieldGroup.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const form = reactive({
  name: '',
  phone: '',
  address: '',
})
</script>