<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KInput v-model="text" placeholder="基础输入" clearable />
    <KInput type="password" :model-value="pwd" disable-autofill placeholder="密码（原生 type=password）" @update:model-value="pwd = $event" />
    <KInput placeholder="disabled" disabled model-value="已有内容" />
    <KInput placeholder="readonly" readonly model-value="只读内容" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const text = ref('')
const pwd = ref('')
</script>
