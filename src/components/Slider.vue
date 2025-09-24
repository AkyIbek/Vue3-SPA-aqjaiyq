<template>
  <div class="slider">
    <div class="slider__card">
      <p class="slider__text">{{ slides[currentIndex] }}</p>
      <div class="slider__controls">
        <button @click="prev" class="slider__arrow slider__arrow--prev">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.295 12L7.705 10.59L3.125 6L7.705 1.41L6.295 0L0.295 6L6.295 12Z"
              fill="#5C8693"
            />
          </svg>
        </button>
        <div class="slider__dots">
          <span
            v-for="(_, i) in slides"
            :key="i"
            :class="['slider__dot', { 'slider__dot--active': i === currentIndex }]"
          ></span>
        </div>
        <button @click="next" class="slider__arrow slider__arrow--next">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.705 0L0.295 1.41L4.875 6L0.295 10.59L1.705 12L7.705 6L1.705 0Z"
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
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 361px;
  height: 200px;
  background-color: transparent;
}

.slider__card {
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 116px;
  background-color: transparent;
}

.slider__text {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: left;
}

.slider__controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider__arrow {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--greentext-color);
}

.slider__dots {
  display: flex;
  gap: 6px;
}

.slider__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--darken-color);
  transition: background-color 0.3s;
}

.slider__dot--active {
  background-color: var(--greentext-color);
}
svg path {
  fill: var(--more-details-color);
}
</style>
