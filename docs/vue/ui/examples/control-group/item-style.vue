<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KControlGroup>
      <KControlGroupItem
        :class-names="{ root: 'hl-cg-style__mono' }"
        :styles="{
          root: {
            '--k-control-group-item-bg': 'var(--k-color-fill-secondary)',
            '--k-control-group-item-text-color': 'var(--k-color-text-secondary)',
            '--k-control-group-item-padding-x': 'var(--k-padding-lg)',
          },
        }"
      >
        SKU-20261123
      </KControlGroupItem>
      <KInput v-model="code" placeholder="优惠码" style="width: 160px; flex: none" />
      <KButton>复制</KButton>
    </KControlGroup>

    <KControlGroup>
      <KControlGroupItem
        :styles="{
          root: {
            '--k-control-group-item-bg': 'var(--k-color-success-bg)',
            '--k-control-group-item-border-color': 'var(--k-color-success-border)',
            '--k-control-group-item-text-color': 'var(--k-color-success-text-strong)',
          },
        }"
      >
        已同步
      </KControlGroupItem>
      <KControlGroupItem
        :styles="{
          root: {
            '--k-control-group-item-border-width': '0',
            '--k-control-group-item-bg': 'transparent',
            '--k-control-group-item-text-color': 'var(--k-color-text-tertiary)',
          },
        }"
      >
        无边框说明
      </KControlGroupItem>
      <KControlGroupItem
        :styles="{
          root: {
            '--k-control-group-item-bg': 'var(--k-color-warning-bg)',
            '--k-control-group-item-border-color': 'var(--k-color-warning-border)',
            '--k-control-group-item-text-color': 'var(--k-color-warning-text-strong)',
          },
        }"
      >
        待审核
      </KControlGroupItem>
    </KControlGroup>

    <KControlGroup block style="max-width: 520px">
      <KControlGroupItem
        :styles="{
          root: {
            '--k-control-group-item-bg': 'var(--k-color-primary-bg)',
            '--k-control-group-item-border-color': 'var(--k-color-primary-border)',
            '--k-control-group-item-text-color': 'var(--k-color-primary)',
          },
        }"
      >
        今日订单 128
      </KControlGroupItem>
      <KControlGroupItem>客单价 ¥96.5</KControlGroupItem>
      <KControlGroupItem>退款 3</KControlGroupItem>
    </KControlGroup>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroup.vue'
import KControlGroupItem from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroupItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const code = ref('')
</script>

<style>
.hl-cg-style__mono {
  font-family: var(--k-font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-variant-numeric: tabular-nums;
}
</style>