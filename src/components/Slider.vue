<template>
  <div class="slider-container">
    <div class="card">
      <p class="text">{{ slides[currentIndex] }}</p>
      <div class="dots">
        <button @click="prev" class="arrow">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.29499 12L7.70499 10.59L3.12499 6L7.70499 1.41L6.29499 -1.23266e-07L0.294987 6L6.29499 12Z"
              fill="#5C8693"
            />
          </svg>
        </button>
        <div class="dot-group">
          <span
            v-for="(_, i) in slides"
            :key="i"
            :class="['dot', { active: i === currentIndex }]"
          ></span>
        </div>
        <button @click="next" class="arrow">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.70501 0L0.295013 1.41L4.87501 6L0.295013 10.59L1.70501 12L7.70501 6L1.70501 0Z"
              fill="#5C8693"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const currentIndex = ref(0)

// 👇 Динамический массив переводов
const slides = computed(() => [
  t('slider.item-list.item-1'),
  t('slider.item-list.item-2'),
  t('slider.item-list.item-3'),
  t('slider.item-list.item-4'),
])

function next() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}
</script>
<style scoped>
.slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 361px;
  background-color: transparent;
}

.card {
  max-width: 20rem;
  text-align: start;
  height: 116px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  background-color: transparent;
}

.text {
  font-size: 16px;
  text-align: left;
  margin-bottom: 10px;
}

.dots {
  display: flex;
  align-items: center;
  gap: 12px;
}

.arrow {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--greentext-color);
}

.dot-group {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--darken-color);
  transition: background-color 0.3s;
}

.dot.active {
  background-color: var(--greentext-color);
}
</style>
