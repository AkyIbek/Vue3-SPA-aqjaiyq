<template>
  <div class="custom-select">
    <div class="custom-select__header" @click="isOpen = !isOpen">
      <span class="custom-select__selected">{{ modelValue || placeholder }}</span>
      <span class="custom-select__arrow" :class="{ 'custom-select__arrow--open': isOpen }">
        <svg
          width="10"
          height="6"
          class="custom-select__arrow-icon"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#00688A" />
        </svg>
      </span>
    </div>

    <div v-if="isOpen" class="custom-select__options">
      <div
        class="custom-select__option"
        v-for="option in options"
        :key="option"
        @click="select(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  options: Array,
  placeholder: String,
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

function select(option) {
  emit('update:modelValue', option)
  isOpen.value = false
}

watch(
  () => props.modelValue,
  () => {
    isOpen.value = false
  },
)
</script>

<style scoped>
.custom-select {
  display: flex;
  position: relative;
  width: 200px;
  font-size: 14px;
  color: white;
}

.custom-select__header {
  position: relative;
  height: 2.75rem;
  width: 17.625rem;
  background-color: var(--filters-color);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  padding: 0.75rem;
  justify-content: space-between;
  align-items: center;
}
.custom-select__header::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(360deg, var(--dropshadow3-top), var(--dropshadow3-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 8px;
  pointer-events: none;
  z-index: 1;
}

.custom-select__arrow {
  transition: transform 0.3s ease;
}
.custom-select__arrow--open {
  transform: rotate(180deg);
}

.custom-select__options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  color: var(--text-color);
  background-color: var(--bg-color, #00455c);
  border: 1px solid var(--dropshadow2-top, #61dafb);
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.custom-select__option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
.custom-select__option:hover {
  background-color: var(--darken-color, #003e52);
}

.custom-select__arrow-icon path {
  fill: var(--arrow-color);
}
.custom-select__selected {
  color: var(--text-color);
}
</style>
