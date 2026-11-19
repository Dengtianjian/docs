<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KInput v-model="text" :maxlength="10" show-count placeholder="最多 10 字" />
    <KButton size="sm" @click="fill">程序写入 14 字（超限标红）</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const text = ref('ruyi-kit')

function fill() {
  text.value = '超出最大长度的程序写入内容'
}
</script>