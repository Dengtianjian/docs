<template>
  <KFlex vertical gap="lg">
    <KFlex gap="lg" wrap align="center">
      <span style="color: var(--k-color-text-secondary)">弹出位置</span>
      <KRadioGroup v-model="placement" shape="button">
        <KRadio value="top">上中</KRadio>
        <KRadio value="topLeft">左上</KRadio>
        <KRadio value="topRight">右上</KRadio>
        <KRadio value="bottom">下中</KRadio>
        <KRadio value="bottomLeft">左下</KRadio>
        <KRadio value="bottomRight">右下</KRadio>
      </KRadioGroup>
    </KFlex>
    <KFlex gap="lg" wrap>
      <KButton type="primary" @click="openWithActions"
        >带操作区（actions）</KButton
      >
      <KButton @click="openTypes">success + error（常驻）</KButton>
      <KButton variant="text" type="link" @click="notification!.destroyAll()"
        >清空</KButton
      >
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { useKApp } from "kit/vue/ui/composables/useKApp";
import KButton from "kit/vue/ui/components/general/Button/Button.vue";
import KRadioGroup from "kit/vue/ui/components/data-entry/Radio/RadioGroup.vue";
import KRadio from "kit/vue/ui/components/data-entry/Radio/Radio.vue";
import KFlex from "kit/vue/ui/components/layouts/Flex/Flex.vue";
import type { KNotificationPlacement } from "kit/vue/ui/components/feedback/Notification/service";

const { notification } = useKApp()!;
const placement = ref<KNotificationPlacement>("topRight");

function openWithActions() {
  const handle = notification!.open({
    title: `${Date.now()} 构建完成`,
    description: "产物已上传 CDN，用时 42s。",
    placement: placement.value,
    actions: h(
      KButton,
      { size: "xs", type: "primary", onClick: () => handle.destroy() },
      () => "查看详情",
    ),
  });
}

function openTypes() {
  notification!.success({ title: "保存成功", placement: placement.value });
  notification!.error({
    title: "请求失败",
    description: "502 Bad Gateway，已自动重试 1 次。",
    duration: 0,
    placement: placement.value,
  });
}
</script>
