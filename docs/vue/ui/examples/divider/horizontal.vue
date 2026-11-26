<template>
  <div>
    <p>第一段内容</p>
    <KDivider />
    <p>水平分割线（缺省）</p>
    <KDivider dashed />
    <KDivider>文字分割线</KDivider>
    <KDivider orientation="start">标题在左</KDivider>
    <KDivider orientation="end" plain>右侧常规字重</KDivider>
  </div>
</template>

<script setup lang="ts">
import KDivider from 'kit/vue/ui/components/general/Divider/Divider.vue'
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
</script>
