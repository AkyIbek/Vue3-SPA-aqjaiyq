<template>
  <div class="slider-container">
    <div class="card">
      <p class="text">{{ slides[currentIndex] }}</p>
      <div class="dots">
        <button @click="prev" class="arrow">&#60;</button>
        <div class="dot-group">
          <span
            v-for="(_, i) in slides"
            :key="i"
            :class="['dot', { active: i === currentIndex }]"
          ></span>
        </div>
        <button @click="next" class="arrow">&#62;</button>
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
