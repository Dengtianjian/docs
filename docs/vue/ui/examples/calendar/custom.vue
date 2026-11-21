<template>
  <div class="grid">
    <KCalendar v-model="date" :fullscreen="false">
      <template #dateCell="{ date: cellDate, cell }">
        <span class="cell">
          {{ cell.label }}
          <i v-if="events.includes(cellDate.format('YYYY-MM-DD'))" class="dot" />
        </span>
      </template>
      <template #footer>
        本月有 {{ monthEvents }} 个日程
      </template>
    </KCalendar>

    <KCalendar v-model="month" type="month" :fullscreen="false" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'

const events = ['2026-11-05', '2026-11-12', '2026-11-21', '2026-11-28']
const date = ref<number | null>(Date.now())
const month = ref<number | null>(Date.now())
const monthEvents = computed(() => {
  const current = date.value == null ? '' : new Date(date.value).toISOString().slice(0, 7)
  return events.filter((item) => item.startsWith(current)).length
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  align-items: start;
}
.cell {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--k-color-primary);
}
:deep(.k-calendar) {
  height: 100%;
}
</style>
