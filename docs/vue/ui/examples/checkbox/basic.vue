<script setup lang="ts">
import { ref } from 'vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const a = ref(true)
const b = ref(false)
const c = ref(false)
</script>

<template>
  <KSpace size="lg" direction="vertical">
    <KSpace :size="24">
      <KCheckbox v-model="a">选中</KCheckbox>
      <KCheckbox v-model="b">未选中</KCheckbox>
      <KCheckbox :model-value="false" indeterminate>半选（indeterminate）</KCheckbox>
    </KSpace>
    <KSpace :size="24">
      <KCheckbox disabled :model-value="true">禁用选中</KCheckbox>
      <KCheckbox disabled :model-value="false">禁用未选</KCheckbox>
      <KCheckbox disabled indeterminate :model-value="true">禁用半选</KCheckbox>
    </KSpace>
  </KSpace>
</template>
