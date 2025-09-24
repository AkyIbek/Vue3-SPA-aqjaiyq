<template>
  <div class="summary-card">
    <h2 class="summary-card__title">Сводка текущих показателей</h2>

    <div class="summary-card__navigation">
      <button class="summary-card__arrow" @click="prev">&#60;</button>

      <div class="summary-card__chart-wrapper">
        <div class="summary-card__focused-border" :style="focusedBorderStyle" />

        <div class="summary-card__chart" :style="trackStyle">
          <div
            v-for="(day, dayIndex) in allDates"
            :key="dayIndex"
            class="summary-card__column"
            :class="{ 'summary-card__column--active': hoveredDay === dayIndex }"
          >
            <div class="summary-card__date-line"></div>
            <p class="summary-card__date">{{ day.label }}</p>

            <div class="summary-card__bar-group">
              <div
                v-for="(value, barIndex) in day.values"
                :key="barIndex"
                class="summary-card__mini-bar-group"
                @mouseover="setHover(dayIndex, barIndex)"
                @mouseleave="clearHover"
              >
                <div class="summary-card__mini-bar-shadow"></div>
                <div class="summary-card__mini-bar-wrapper">
                  <div
                    class="summary-card__mini-bar"
                    :style="{ height: value + 'px' }"
                    :class="{
                      'summary-card__mini-bar--active':
                        hoveredDay === dayIndex && hoveredBar === barIndex,
                      'summary-card__mini-bar--first': barIndex === 0,
                    }"
                  >
                    <div class="summary-card__mini-value">{{ value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="summary-card__arrow" @click="next">&#62;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const allDates = computed(() => [
  { label: t('indicator.item-list.item-2'), values: [60, 40, 70, 90, 30, 50, 80, 20, 65] },
  { label: t('indicator.item-list.item-3'), values: [20, 60, 45, 75, 90, 10, 55, 70, 30] },
  { label: t('indicator.item-list.item-4'), values: [55, 25, 40, 60, 80, 50, 35, 75, 65] },
  { label: t('indicator.item-list.item-5'), values: [40, 60, 30, 70, 90, 20, 80, 50, 45] },
  { label: t('indicator.item-list.item-6'), values: [35, 55, 65, 45, 25, 75, 85, 95, 20] },
  { label: t('indicator.item-list.item-7'), values: [60, 40, 50, 70, 30, 90, 10, 80, 55] },
  { label: t('indicator.item-list.item-8'), values: [45, 25, 60, 35, 55, 75, 85, 65, 40] },
  { label: t('indicator.item-list.item-9'), values: [35, 55, 65, 25, 45, 70, 80, 90, 30] },
])

const range = 4
const chartColumnWidth = 253
const startIndex = ref(0)
const focusedIndex = ref(0)
const hoveredDay = ref(-1)
const hoveredBar = ref(-1)

const trackStyle = computed(() => ({
  transform: `translateX(-${startIndex.value * chartColumnWidth}px)`,
}))

const focusedBorderStyle = computed(() => {
  const visibleItems = Math.min(range, allDates.value.length)
  let localIndex

  if (startIndex.value + visibleItems >= allDates.value.length) {
    const lastVisibleIndex = allDates.value.length - startIndex.value - 1
    localIndex = Math.min(focusedIndex.value - startIndex.value, lastVisibleIndex)
  } else {
    localIndex = focusedIndex.value - startIndex.value
  }

  return {
    transform: `translateX(${localIndex * chartColumnWidth}px)`,
  }
})

function next() {
  if (focusedIndex.value < allDates.value.length - 1) {
    focusedIndex.value++
  }
  if (
    focusedIndex.value >= startIndex.value + range &&
    startIndex.value + range < allDates.value.length
  ) {
    startIndex.value++
  }
}

function prev() {
  if (focusedIndex.value > 0) {
    focusedIndex.value--
  }
  if (focusedIndex.value < startIndex.value && startIndex.value > 0) {
    startIndex.value--
  }
}

function setHover(dayIndex, barIndex) {
  hoveredDay.value = dayIndex
  hoveredBar.value = barIndex
}
function clearHover() {
  hoveredDay.value = -1
  hoveredBar.value = -1
}
</script>

<style scoped>
.summary-card {
  width: 1200px;
  padding: 24px;
  background-color: var(--bg-color);
  border-radius: 16px;
  margin: 40px auto;
  box-sizing: border-box;
}

.summary-card__title {
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

.summary-card__navigation {
  display: flex;
  width: 1100px;
  align-items: center;
  justify-content: space-between;
}

.summary-card__arrow {
  font-size: 26px;
  background: none;
  border: none;
  color: var(--more-details-color);
  cursor: pointer;
}

.summary-card__chart-wrapper {
  overflow: hidden;
  border: 1px solid var(--color-border);
  width: 1150px;
  position: relative;
  padding: 0 1rem;
}

.summary-card__focused-border {
  position: absolute;
  top: 0;
  left: 8px;
  width: 249px;
  height: 100%;
  border-radius: 12px;
  background-color: var(--focused-border-color);
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.summary-card__focused-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(165deg, var(--dropshadow-top), var(--dropshadow-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

.summary-card__chart {
  display: flex;
  transition: transform 0.5s ease;
  width: max-content;
  gap: 1.5rem;
}

.summary-card__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 10px;
  transition: background-color 0.3s;
  width: 230px;
}
.summary-card__column--active {
  border-radius: 8px;
}

.summary-card__bar-group {
  display: flex;
  align-items: end;
  height: 120px;
  padding: 8px;
  border-radius: 8px;
  gap: 0.25rem;
}

.summary-card__mini-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.summary-card__mini-bar-group {
  align-items: end;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.summary-card__mini-bar {
  position: relative;
  width: 1.375rem;
  background-color: var(--lighten1-color);
  transition:
    background-color 0.3s,
    height 0.3s;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.summary-card__mini-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(
    115deg,
    var(--dropshadow-top, #61dafb),
    var(--dropshadow-bottom, #0e4a63)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 1;
}
.summary-card__mini-bar--active {
  background-color: var(--active-color);
}
.summary-card__mini-value {
  font-size: 10px;
  color: var(--text-color);
  margin-bottom: 3px;
  z-index: 9;
}

.summary-card__date {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 10px;
  font-size: 0.825rem;
  width: 6.625em;
  height: 2em;
  align-items: center;
  color: var(--greentext-color);
  text-align: center;
  border-radius: 16px;
  margin-bottom: 4px;
  background-color: var(--midnight-color);
  z-index: 10;
}
.summary-card__date::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(
    115deg,
    var(--dropshadow-top, #61dafb),
    var(--dropshadow-bottom, #0e4a63)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 10;
  border-radius: 16px;
}

.summary-card__date-line {
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 84%;
  height: 1px;
  width: 120%;
  background: var(--indicator-line-color);
}

.summary-card__mini-bar-shadow {
  display: flex;
  width: 22px;
  height: 100px;
}
.summary-card__mini-bar-group:hover .summary-card__mini-bar-shadow {
  background: linear-gradient(
    to bottom,
    var(--indicator-gradient-solid) 0%,
    var(--indicator-gradient-transparent) 100%
  );
}
.summary-card__mini-bar-group:hover .summary-card__mini-value {
  color: var(--greentext-color);
}
</style>
