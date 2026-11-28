<template>
  <KControlGroup>
    <KInput v-model="keyword" placeholder="关键字" clearable style="width: 200px; flex: none" />
    <KSelect v-model="scope" :options="scopes" style="width: 140px; flex: none" />
    <KButton type="primary">搜索</KButton>
  </KControlGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroup.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const keyword = ref('')
const scope = ref('all')
const scopes = [
  { label: '全部范围', value: 'all' },
  { label: '仅标题', value: 'title' },
  { label: '仅正文', value: 'body' },
]
</script>
