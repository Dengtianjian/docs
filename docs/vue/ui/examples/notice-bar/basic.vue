<template>
  <KFlex vertical gap="md">
    <KNoticeBar text="K UI P9 移动端专项已发布：底部面板、选择器、滑动单元格与签名板。" />
    <KNoticeBar text="滚动公告：本周五 22:00 进行数据库维护，请提前保存。" mode="link" @click="last = '打开维护公告'" />
    <KNoticeBar text="该提示可关闭，关闭后不再展示。" mode="close" type="warning" v-model:open="visible" />
    <KNoticeBar text="长文本可换行展示，适合需要完整阅读的通知内容。" wrapable />
    <KButton v-if="!visible" size="sm" @click="visible = true">重新显示警告</KButton>
    <p class="tip">{{ last || '（无操作）' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KNoticeBar from 'kit/vue/ui/components/feedback/NoticeBar/NoticeBar.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const visible = ref(true)
const last = ref('')
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>