<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const value = ref('')
</script>

<template>
  <KInput v-model="value" passively-activated placeholder="点外壳空白也能聚焦" style="width: 100%; max-width: 340px" />
</template>
