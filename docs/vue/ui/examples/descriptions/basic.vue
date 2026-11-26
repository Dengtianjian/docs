<template>
  <KDescriptions :columns="3" title="订单信息" :colon="false">
    <template #extra>更新于 10:32</template>
    <KDescriptionsItem label="订单号">RUYI-20261121</KDescriptionsItem>
    <KDescriptionsItem label="客户">如意科技</KDescriptionsItem>
    <KDescriptionsItem label="状态">已支付</KDescriptionsItem>
    <KDescriptionsItem label="收货地址" :span="2">
      浙江省杭州市西湖区文三路 100 号
    </KDescriptionsItem>
    <KDescriptionsItem label="备注">工作日送货</KDescriptionsItem>
  </KDescriptions>
</template>

<script setup lang="ts">
import KDescriptions from 'kit/vue/ui/components/data-display/Descriptions/Descriptions.vue'
import KDescriptionsItem from 'kit/vue/ui/components/data-display/Descriptions/DescriptionsItem.vue'
</script>