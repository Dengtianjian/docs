<template>
  <KFlex gap="md" vertical style="width: 240px">
    <KDatePicker v-model="v" clearable />
    <div>时间戳：{{ v }}<template v-if="v != null">（{{ new Date(v).toLocaleDateString('zh-CN') }}）</template></div>
    <KDatePicker :model-value="Date.now()" disabled />
    <KFlex gap="xs" vertical style="width: 240px">
      <KDatePicker v-for="s in ['xs', 'sm', 'md', 'lg']" :key="s" :size="s" :placeholder="`size=${s}`" />
    </KFlex>
    <KDatePicker variant="filled" placeholder="variant=filled" />
    <KDatePicker variant="borderless" placeholder="variant=borderless" />
    <KDatePicker status="error" placeholder="status=error" />
    <KDatePicker status="warning" placeholder="status=warning" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const v = ref<number | null>(null)
</script>
