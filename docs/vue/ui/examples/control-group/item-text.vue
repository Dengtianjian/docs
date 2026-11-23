<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KControlGroup>
      <KControlGroupItem>数量</KControlGroupItem>
      <KInput v-model="qty" inputmode="numeric" style="width: 110px; flex: none" />
      <KControlGroupItem>件</KControlGroupItem>
      <KButton type="primary">加入购物车</KButton>
    </KControlGroup>

    <KControlGroup>
      <KControlGroupItem>合计</KControlGroupItem>
      <KControlGroupItem
        :class-names="{ root: 'hl-cg-text__amount' }"
        :styles="{
          root: {
            '--k-control-group-item-bg': 'var(--k-color-fill-secondary)',
            '--k-control-group-item-border-color': 'transparent',
          },
        }"
      >
        ¥ {{ total }}
      </KControlGroupItem>
      <KButton>去结算</KButton>
    </KControlGroup>

    <KControlGroup block style="max-width: 520px">
      <KControlGroupItem style="flex: none">收件人</KControlGroupItem>
      <KInput v-model="name" placeholder="请输入姓名" />
      <KControlGroupItem
        style="flex: none"
        :styles="{ root: { '--k-control-group-item-text-color': 'var(--k-color-warning-text-strong)' } }"
      >
        必填
      </KControlGroupItem>
    </KControlGroup>
  </KFlex>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/ControlGroup/ControlGroup.vue'
import KControlGroupItem from 'kit/vue/ui/components/ControlGroup/ControlGroupItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const qty = ref('2')
const name = ref('')
const total = computed(() => (Number(qty.value || 0) * 32).toFixed(2))
</script>

<style>
.hl-cg-text__amount {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
</style>