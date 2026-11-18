<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const keyword = ref('')
const note = ref('')
const password = ref('')
</script>

<template>
  <div class="input-fluid-demo">
    <KInput v-model="keyword" clearable placeholder="宽度跟随容器（默认 100%）" />
    <KInput v-model="note" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="多行文本域同样跟随容器宽度" />
    <KInput v-model="password" type="password" placeholder="密码框" />
  </div>
</template>

<style scoped>
.input-fluid-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 520px;
}
</style>
