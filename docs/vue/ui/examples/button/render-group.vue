<template>
  <!-- 组 headless：role=group 语义继承，size 下发（provide）照跑——组内按钮仍是默认 KButton，实测 sm 档高 -->
  <KButtonGroup size="sm">
    <template #render="ctx">
      <div v-bind="ctx.rootAttrs" class="hl-btngroup">
        <KButton>左</KButton>
        <KButton>中</KButton>
        <KButton>右</KButton>
      </div>
    </template>
  </KButtonGroup>
</template>

<script setup lang="ts">
import KButtonGroup from 'kit/vue/ui/components/general/Button/ButtonGroup.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
</script>

<style scoped>
.hl-btngroup {
  display: inline-flex;
}
/* 接壤视觉自绘：叠边 + 首尾圆角（组内 KButton 的 size 注入逻辑不受影响） */
.hl-btngroup :deep(.k-button) {
  border-radius: 0;
}
.hl-btngroup :deep(.k-button:first-child) {
  border-radius: 999px 0 0 999px;
}
.hl-btngroup :deep(.k-button:last-child) {
  border-radius: 0 999px 999px 0;
}
.hl-btngroup :deep(.k-button + .k-button) {
  margin-left: -1px;
}
</style>
