<template>
  <KSpace size="md" direction="vertical" style="width: 240px">
    <KDatePicker v-model="v" clearable />
    <div>时间戳：{{ v }}<template v-if="v != null">（{{ new Date(v).toLocaleDateString('zh-CN') }}）</template></div>
    <KDatePicker :model-value="Date.now()" disabled />
    <KSpace size="xs" direction="vertical" style="width: 240px">
      <KDatePicker v-for="s in ['xs', 'sm', 'md', 'lg']" :key="s" :size="s" :placeholder="`size=${s}`" />
    </KSpace>
    <KDatePicker variant="filled" placeholder="variant=filled" />
    <KDatePicker variant="borderless" placeholder="variant=borderless" />
    <KDatePicker status="error" placeholder="status=error" />
    <KDatePicker status="warning" placeholder="status=warning" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const v = ref<number | null>(null)
</script>
