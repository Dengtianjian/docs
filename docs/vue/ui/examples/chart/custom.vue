<template>
  <KChart :series="series" :categories="categories" type="bar" :show-legend="false">
    <template #chart="{ categories: names, series: data }">
      <div class="adapter">
        <div v-for="(name, index) in names" :key="name" class="adapter__col">
          <span class="adapter__value">{{ data[0].data[index] }}</span>
          <span class="adapter__bar" :style="{ height: `${data[0].data[index] / 6}%` }" />
          <span class="adapter__name">{{ name }}</span>
        </div>
      </div>
    </template>
  </KChart>
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const categories = ['A', 'B', 'C', 'D', 'E']
const series = [{ name: '自定义渲染', data: [120, 260, 180, 340, 220] }]
</script>

<style scoped>
.adapter {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  height: 220px;
  padding: 12px 8px 0;
}
.adapter__col {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  height: 100%;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.adapter__bar {
  width: 100%;
  max-width: 48px;
  border-radius: var(--k-border-radius-sm) var(--k-border-radius-sm) 0 0;
  background: linear-gradient(180deg, var(--k-color-primary), var(--k-color-primary-border));
}
.adapter__value {
  color: var(--k-color-text);
  font-weight: var(--k-font-weight-strong);
}
</style>
