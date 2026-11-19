<template>
  <div class="grid-demo">
    <KRow><KCol :span="24"><div class="cell">24</div></KCol></KRow>
    <KRow>
      <KCol :span="12"><div class="cell">12</div></KCol>
      <KCol :span="12"><div class="cell light">12</div></KCol>
    </KRow>
    <KRow>
      <KCol v-for="i in 3" :key="i" :span="8"><div :class="['cell', i === 2 && 'light']">8</div></KCol>
    </KRow>
    <KRow>
      <KCol v-for="i in 6" :key="i" :span="4"><div :class="['cell', i % 2 && 'light']">4</div></KCol>
    </KRow>
  </div>
</template>

<script setup lang="ts">
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
</script>

<style scoped>
.grid-demo .cell,
.grid-demo .cell.light {
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: var(--k-font-size-sm);
  border-radius: var(--k-border-radius);
}
.grid-demo .cell {
  background: var(--k-color-primary);
}
.grid-demo .cell.light {
  background: var(--k-color-primary-bg-hover);
  color: var(--k-color-primary);
}
.grid-demo > * + * {
  margin-top: 8px;
}
</style>
