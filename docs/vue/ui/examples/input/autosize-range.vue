<template>
  <KInput v-model="value" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="minRows=2 / maxRows=6" style="width: 100%; max-width: 340px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const value = ref('minRows = 2，初始至少两行高；maxRows = 6，超过后出现内部滚动。')
</script>
