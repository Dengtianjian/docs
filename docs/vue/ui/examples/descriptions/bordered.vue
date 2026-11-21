<template>
  <KSpace direction="vertical" size="xl">
    <KDescriptions :columns="2" bordered :label-width="92">
      <KDescriptionsItem label="实例">k-ui-prod-01</KDescriptionsItem>
      <KDescriptionsItem label="区域">cn-hangzhou</KDescriptionsItem>
      <KDescriptionsItem label="CPU">8 核</KDescriptionsItem>
      <KDescriptionsItem label="内存">32 GB</KDescriptionsItem>
    </KDescriptions>
    <KDescriptions :columns="2" bordered layout="vertical" size="sm">
      <KDescriptionsItem label="创建时间">2026-11-21 09:00</KDescriptionsItem>
      <KDescriptionsItem label="到期时间">2027-11-21 09:00</KDescriptionsItem>
    </KDescriptions>
  </KSpace>
</template>

<script setup lang="ts">
import KDescriptions from 'kit/vue/ui/components/Descriptions/Descriptions.vue'
import KDescriptionsItem from 'kit/vue/ui/components/Descriptions/DescriptionsItem.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>