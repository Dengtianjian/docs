<template>
  <KInput v-model="value" type="textarea" :rows="4" placeholder="多行输入" style="width: 100%; max-width: 340px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const value = ref('第一行\n第二行\n第三行')
</script>
