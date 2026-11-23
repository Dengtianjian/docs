<template>
  <KFlex vertical gap="lg" style="width: 420px; max-width: 100%">
    <KInputTags
      v-model="tags"
      :max="3"
      :max-length="6"
      :status="error ? 'error' : undefined"
      :validate="validate"
      clearable
      @invalid="onInvalid"
    />
    <p class="hint">{{ message || '最多 3 个，每个不超过 6 个字符；重复值会被拦截。' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInputTags from 'kit/vue/ui/components/InputTags/InputTags.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const tags = ref<string[]>([])
const message = ref('')
const error = ref(false)

function validate(value: string) {
  return !value.includes(' ') || '不能包含空格'
}

function onInvalid(value: string, reason: string) {
  error.value = true
  message.value = reason === 'duplicate'
    ? `“${value}” 已存在`
    : reason === 'max-count'
      ? '已达到数量上限'
      : reason === 'max-length'
        ? '单个标签过长'
        : reason
}
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>