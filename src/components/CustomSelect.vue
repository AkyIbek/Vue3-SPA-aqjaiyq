<template>
  <div class="custom-select">
    <div class="select-header" @click="isOpen = !isOpen">
      <span>{{ modelValue || placeholder }}</span>
      <span class="arrow" :class="{ open: isOpen }"
        ><svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#00688A" />
        </svg>
      </span>
    </div>

    <div v-if="isOpen" class="select-options">
      <div class="option" v-for="option in options" :key="option" @click="select(option)">
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

.select-header {
  position: relative;
  color: white;
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
.select-header::before {
  content: '';
  position: absolute;
  inset: 0px;
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

.arrow {
  transition: transform 0.3s ease;
}
.arrow.open {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-color, #00455c);
  border: 1px solid var(--dropshadow2-top, #61dafb);
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
.option:hover {
  background-color: var(--darken-color, #003e52);
}
</style>
