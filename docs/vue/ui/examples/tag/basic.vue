<template>
  <KFlex vertical gap="md">
    <KFlex>
      <KTag>默认</KTag>
      <KTag color="processing">处理中</KTag>
      <KTag color="success">成功</KTag>
      <KTag color="warning">警告</KTag>
      <KTag color="error">错误</KTag>
    </KFlex>
    <KFlex align="center">
      <KTag size="sm" color="primary">小号</KTag>
      <KTag color="primary">中号</KTag>
      <KTag size="lg" color="primary">大号</KTag>
      <KTag color="primary" round>胶囊</KTag>
    </KFlex>
    <KFlex>
      <KTag v-for="(tag, index) in tags" :key="tag" color="success" closable @close="remove(index)">
        {{ tag }}
      </KTag>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const tags = ref(['可关闭', '标签二', '标签三'])

function remove(index: number) {
  tags.value.splice(index, 1)
}
</script>