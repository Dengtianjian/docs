<template>
  <KSpace direction="vertical" size="lg" style="width: 360px">
    <KSkeleton avatar :paragraph="{ rows: 3 }" />
    <KSkeleton avatar :avatar="{ shape: 'square' }" :paragraph="{ rows: 2, width: ['100%', '60%'] }" active />
    <KSkeleton :avatar="false" :paragraph="{ rows: 2, width: ['90%', '50%'] }" round />
    <div>
      <KSwitch v-model="loading">加载态</KSwitch>
      <KSkeleton :loading="loading" :paragraph="{ rows: 2 }" style="margin-top: 12px">
        <KParagraph>内容加载完成后替换骨架；加载期间容器保留 aria-busy 状态。</KParagraph>
      </KSkeleton>
    </div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSkeleton from 'kit/vue/ui/components/Skeleton/Skeleton.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KParagraph from 'kit/vue/ui/components/Typography/Paragraph.vue'

const loading = ref(true)
</script>