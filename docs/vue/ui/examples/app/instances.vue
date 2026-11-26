<template>
  <div class="instances">
    <KApp v-for="name in ['A', 'B']" :key="name">
      <UsePanel :title="`实例 ${name}`" />
    </KApp>
  </div>
</template>

<script setup lang="ts">
import KApp from 'kit/vue/ui/components/general/App/App.vue'
import UsePanel from './_use-panel.vue'
</script>

<style scoped>
.instances {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 767px) {
  .instances {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>