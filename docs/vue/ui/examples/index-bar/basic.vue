<template>
  <KIndexBar :indexes="indexes" :offset="90" @change="active = $event">
    <KIndexAnchor v-for="group in groups" :key="group.index" :index="group.index">
      <div class="anchor">
        <div v-for="name in group.names" :key="name" class="row">{{ name }}</div>
      </div>
    </KIndexAnchor>
  </KIndexBar>
  <p class="tip">当前索引：{{ active }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KIndexBar from 'kit/vue/ui/components/IndexBar/IndexBar.vue'
import KIndexAnchor from 'kit/vue/ui/components/IndexBar/IndexAnchor.vue'

const active = ref('A')
const groups = [
  { index: 'A', names: ['安禾', '艾米', '敖然'] },
  { index: 'C', names: ['陈默', '程一', '崔宁'] },
  { index: 'L', names: ['林小满', '刘青', '陆行'] },
  { index: 'S', names: ['沈知微', '苏木', '宋乔'] },
  { index: 'W', names: ['王野', '吴桐', '温言'] },
  { index: 'Z', names: ['周既白', '赵清', '郑屿'] },
]
const indexes = groups.map(group => group.index)
</script>

<style scoped>
.anchor {
  padding: 0 12px 8px;
}
.row {
  padding: 9px 12px;
  border-bottom: 1px solid var(--k-color-border-secondary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>