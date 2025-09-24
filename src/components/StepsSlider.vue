<template>
  <!-- Верхняя часть -->
  <div class="top-section">
    <div class="custom-select" ref="selectRef" @click="toggleDropdown">
      <span class="select__option">{{ $t('steps-slider.item-list.item-3') }}</span>
      <span class="arrow" :class="{ open: dropdownOpen }">&#9662;</span>
      <ul v-if="dropdownOpen" class="dropdown">
        <li
          v-for="i in 3"
          :key="i"
          @click.stop="selectOption(t(`steps-slider.item-list.item-${i + 2}`))"
        >
          {{ t(`steps-slider.item-list.item-${i + 2}`) }}
        </li>
      </ul>
    </div>
    <div class="subtitles">
      <p class="subtitle">{{ $t('steps-slider.item-list.item-1') }}</p>
      <p class="subtitle">{{ $t('steps-slider.item-list.item-2') }}</p>
    </div>
  </div>

  <!-- Слайдер по дням -->
  <div class="day-slider">
    <button class="arrow-btn" @click="prevDay">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.29502 12L7.70502 10.59L3.12502 6L7.70502 1.41L6.29502 -1.23266e-07L0.295018 6L6.29502 12Z"
          fill="#5C8693"
        />
      </svg>
    </button>
    <div class="day-list" ref="dayListRef">
      <!-- Плавающий активный кружок -->
      <div class="active-indicator" :style="activeIndicatorStyle"></div>
      <div
        v-for="(day, index) in days"
        :key="index"
        :class="index === 0 ? 'circle-wrapper-line' : 'circle-wrapper'"
        :ref="(el) => (circleRefs[index] = el)"
        @click="currentDay = index"
      >
        <div class="day-circle">
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <button class="arrow-btn" @click="nextDay">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.70504 0L0.295044 1.41L4.87504 6L0.295044 10.59L1.70504 12L7.70504 6L1.70504 0Z"
          fill="#5C8693"
        />
      </svg>
    </button>
  </div>

  <div class="day-info">
    <h3>{{ currentDay + 1 }} {{ $t('steps-slider.item-list.item-6') }}</h3>
    <p>{{ $t('steps-slider.item-list.item-7') }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const selectedOption = ref(t('steps-slider.item-list.item-3'))
const dropdownOpen = ref(false)

const days = Array.from({ length: 9 }, (_, i) => ({
  title: `${i + 1} ${t(`steps-slider.item-list.item-6`)}`,
  description: t('steps-slider.item-list.item-7'),
}))

const currentDay = ref(0)

// Массив для ссылок на круги
const circleRefs = []

const selectRef = ref(null)
const dayListRef = ref(null)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selectOption(option) {
  selectedOption.value = option
  dropdownOpen.value = false
}

function nextDay() {
  currentDay.value = (currentDay.value + 1) % days.length
}

function prevDay() {
  currentDay.value = (currentDay.value - 1 + days.length) % days.length
}

function handleClickOutside(event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

const activeIndicatorStyle = ref({})

function updateIndicatorPosition() {
  nextTick(() => {
    const el = circleRefs[currentDay.value]
    const container = dayListRef.value
    if (el && container) {
      const elRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const left = elRect.left - containerRect.left + elRect.width / 2
      const top = elRect.top - containerRect.top + elRect.height / 2
      activeIndicatorStyle.value = {
        left: `${left}px`,
        top: `${top}px`,
        transform: 'translate(-50%, -50%)',
      }
    }
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  updateIndicatorPosition()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(currentDay, updateIndicatorPosition)
</script>

<style scoped>
.step-card {
  position: relative;
  width: 588px;
  height: 210px;
  padding: 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--midnight-color);
  color: white;
  align-items: center;
  border-radius: 12px;

  overflow: hidden;
}
.step-card:hover {
  background-color: var(--steps-shadow-color);
  transition: 0.3s ease;
}
.step-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 3px;
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

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-select {
  position: relative;
  background-color: var(--bg-color);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  min-width: 140px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  font-size: 1.125rem;
}

.arrow {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background-color: var(--bg-color);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  z-index: 10;
  list-style: none;
  padding: 4px 0;
}

.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  color: var(--text-color);
}

.dropdown li:hover {
  background-color: var(--card-bg);
}

.subtitle {
  font-size: 14px;
  color: #ccc;
}
.subtitles {
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1.25rem;
}
/* Слайдер */
.day-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
}

.arrow-btn {
  font-size: 24px;
  background: none;
  border: none;
  color: var(--label-color);
  cursor: pointer;
}

.day-list {
  display: flex;
  position: relative;
  justify-content: center;
  flex: 1;
  gap: 12px;
  margin: 0 12px;
}

/* Плавающий активный кружок */
.active-indicator {
  position: absolute;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: linear-gradient(305deg, var(--innershadow-top), var(--innershadow-bottom));
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.5);
  padding: 1px;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.circle-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.75rem;
  height: 2.75rem;
}
.circle-wrapper-line {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.75rem;
  height: 2.75rem;
}

/* Сам круг */
.day-circle {
  position: relative;
  z-index: 1;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: var(--midnight-color);
  color: var(--greentext-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.day-circle::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(165deg, var(--dropshadow-top), var(--dropshadow-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.circle-wrapper:not(:first-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -2.5rem;
  width: 3rem;
  height: 1px;
  background-color: var(--indicator-line-color);
  transform: translateY(-50%);
  z-index: 0;
}

.day-info {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875em;
}

.day-info h3 {
  margin: 0 0 8px;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--labelname-color);
}

.day-info p {
  margin: 0;
}
.select__option {
  color: var(--greentext-color);
}
.day-info h3 {
  color: var(--animatedtext-color);
}
svg path {
  fill: var(--more-details-color);
}
</style>
