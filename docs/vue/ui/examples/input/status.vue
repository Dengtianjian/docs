<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KInput v-model="err" status="error" clearable />
    <KInput v-model="warn" status="warning" clearable />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const err = ref('输入了非法内容')
const warn = ref('密码强度偏弱')
</script>
