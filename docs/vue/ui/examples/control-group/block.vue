<template>
  <KControlGroup block style="max-width: 520px">
    <KInput v-model="name" placeholder="名称" />
    <KSelect v-model="role" :options="roles" />
    <KButton type="primary">保存</KButton>
  </KControlGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/ControlGroup/ControlGroup.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const name = ref('')
const role = ref('dev')
const roles = [
  { label: '开发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '产品', value: 'pm' },
]
</script>
