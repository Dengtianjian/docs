<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const value = ref('一行内容')
</script>

<template>
  <KInput v-model="value" type="textarea" autosize placeholder="autosize" style="width: 100%; max-width: 340px" />
</template>
