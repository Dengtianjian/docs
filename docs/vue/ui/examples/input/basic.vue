<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KInput v-model="text" placeholder="基础输入" clearable />
    <KInput type="password" :model-value="pwd" placeholder="密码（原生 type=password）" @update:model-value="pwd = $event" />
    <KInput placeholder="disabled" disabled model-value="已有内容" />
    <KInput placeholder="readonly" readonly model-value="只读内容" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const text = ref('')
const pwd = ref('')
</script>
