<template>
  <KFlex align="center" gap="lg">
    <KBadge :count="5" pulse>
      <KButton>计数呼吸</KButton>
    </KBadge>
    <KBadge dot pulse>
      <KButton>圆点呼吸</KButton>
    </KBadge>
    <KBadge color="processing" text="进行中" pulse />
    <KBadge :count="9" color="#722ed1" pulse>
      <KButton>自定义色呼吸</KButton>
    </KBadge>
  </KFlex>
</template>

<script setup lang="ts">
import KBadge from 'kit/vue/ui/components/data-display/Badge/Badge.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>
