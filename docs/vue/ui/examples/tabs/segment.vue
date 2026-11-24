<template>
  <KFlex vertical gap="lg">
    <KRadioGroup
      v-model="size"
      shape="button"
      :options="[
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
      ]"
    />
    <KTabs v-model:active="active" type="segment" :size="size">
      <KTabPane name="all" label="全部">全部任务。</KTabPane>
      <KTabPane name="todo" label="待办">待办任务。</KTabPane>
      <KTabPane name="done" label="已完成">已完成任务。</KTabPane>
    </KTabs>
    <KTabs v-model:active="period" type="segment" stretch>
      <KTabPane name="day" label="按天">按天视图。</KTabPane>
      <KTabPane name="week" label="按周">按周视图。</KTabPane>
      <KTabPane name="month" label="按月">按月视图。</KTabPane>
    </KTabs>
    <div class="tip">灰底分段控件：白色激活块随切换滑动；`stretch` 可等分铺满。</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const size = ref('md')
const active = ref<string | number>('all')
const period = ref<string | number>('day')
</script>

<style scoped>
.tip {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>