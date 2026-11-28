<template>
  <KFlex vertical gap="lg">
    <KFlex>
      <KRadioGroup
        v-model="placement"
        shape="button"
        :options="[
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
        ]"
      />
      <KRadioGroup
        v-model="type"
        shape="button"
        :options="[
          { label: 'line', value: 'line' },
          { label: 'card', value: 'card' },
          { label: 'segment', value: 'segment' },
        ]"
      />
    </KFlex>
    <KTabs :placement="placement" :type="type" style="min-height: 160px">
      <KTabPane name="one" label="页签一">页签一内容。</KTabPane>
      <KTabPane name="two" label="页签二">页签二内容。</KTabPane>
      <KTabPane name="three" label="页签三">页签三内容。</KTabPane>
    </KTabs>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/navigation/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/navigation/Tabs/TabPane.vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTabsPlacement, KTabsType } from 'kit/vue/ui'

const placement = ref<KTabsPlacement>('top')
const type = ref<KTabsType>('line')
</script>