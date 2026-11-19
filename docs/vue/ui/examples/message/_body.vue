<template>
  <KSpace size="lg" wrap>
    <KButton @click="message!.success('操作成功')">success</KButton>
    <KButton @click="message!.error('操作失败，请重试')">error</KButton>
    <KButton @click="message!.warning('请注意数据安全', 5)">warning（5s）</KButton>
    <KButton @click="message!.info('普通提示')">info</KButton>
    <KButton type="primary" @click="loadingThenSuccess">loading → success（同 key）</KButton>
    <KButton variant="text" type="link" @click="message!.destroyAll()">清空队列</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const { message } = useKApp()!

function loadingThenSuccess() {
  // 同 key 复更新：loading 挂 key，成功后同 key 换成 success，不叠两条
  message!.loading({ content: '提交中…', duration: 0, key: 'save' })
  setTimeout(() => message!.success({ content: '保存成功', key: 'save' }), 1500)
}
</script>
