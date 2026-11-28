<template>
  <p style="line-height: 2">
    <KText strong>加重</KText>、<KText code>const kit = true</KText>、<KText mark>标记</KText>、
    <KText delete>删除</KText>、<KText underline>下划线</KText>——各自映射语义元素
    <KText code>b / code / mark / del / u</KText>，可自由组合嵌套。
  </p>
</template>

<script setup lang="ts">
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
</script>
