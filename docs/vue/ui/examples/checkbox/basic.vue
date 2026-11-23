<template>
  <KFlex gap="lg" vertical>
    <KFlex :gap="24">
      <KCheckbox v-model="a">选中</KCheckbox>
      <KCheckbox v-model="b">未选中</KCheckbox>
      <KCheckbox :model-value="false" indeterminate>半选（indeterminate）</KCheckbox>
    </KFlex>
    <KFlex :gap="24">
      <KCheckbox disabled :model-value="true">禁用选中</KCheckbox>
      <KCheckbox disabled :model-value="false">禁用未选</KCheckbox>
      <KCheckbox disabled indeterminate :model-value="true">禁用半选</KCheckbox>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const a = ref(true)
const b = ref(false)
const c = ref(false)
</script>
