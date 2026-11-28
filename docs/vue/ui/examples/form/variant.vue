<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KForm :model="model" variant="filled" layout="vertical" style="max-width: 320px">
      <KFormItem label="姓名" name="name">
        <KInput v-model="model.name" placeholder="继承 filled" />
      </KFormItem>
      <KFormItem label="城市" name="city">
        <KSelect v-model="model.city" :options="cities" placeholder="继承 filled" />
      </KFormItem>
      <KFormItem label="备注" name="note">
        <KInput v-model="model.note" variant="underlined" placeholder="显式覆盖为 underlined" />
      </KFormItem>
    </KForm>

    <KForm :model="inline" variant="underlined" layout="inline">
      <KFormItem label="关键词">
        <KInput v-model="inline.keyword" placeholder="表单级 underlined" />
      </KFormItem>
      <KFormItem>
        <KButton type="primary">搜索</KButton>
      </KFormItem>
    </KForm>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KForm from 'kit/vue/ui/components/data-entry/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/data-entry/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const model = reactive({ name: '', city: null as string | null, note: '' })
const inline = reactive({ keyword: '' })
const cities = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
]
</script>