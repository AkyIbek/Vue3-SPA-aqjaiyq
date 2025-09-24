<template>
  <div class="accordion">
    <div class="accordion-header" @click="toggle">
      <h3 class="accordion__title">{{ title }}</h3>
      <span class="arrow" :class="{ open: isOpen }">
        <svg
          class="accordion__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.59 8.29501L12 12.875L7.41 8.29501L6 9.70501L12 15.705L18 9.70501L16.59 8.29501Z"
          />
        </svg>
      </span>
    </div>

    <div
      ref="bodyRef"
      class="accordion-body-wrapper"
      :style="{ maxHeight: isOpen ? contentHeight + 'px' : '0px' }"
    >
      <div ref="bodyContent" class="accordion-body">
        <StepsSlider />
        <div class="accordion__text">{{ t('solutions.item-list.item-2') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import StepsSlider from '@/components/StepsSlider.vue'

const { t } = useI18n()

const props = defineProps({
  title: String,
  isOpen: Boolean,
})
const emit = defineEmits(['toggle'])

const bodyRef = ref(null)
const bodyContent = ref(null)
const contentHeight = ref(0)

const toggle = () => emit('toggle')

watch(
  () => props.isOpen,
  async (newVal) => {
    await nextTick()
    if (newVal && bodyContent.value) {
      contentHeight.value = bodyContent.value.scrollHeight
    }
  },
  { immediate: true },
)
</script>

<style>
.accordion {
  position: relative;
  border-radius: 8px;
  background-color: var(--bg-color, #2e6070);
  color: var(--text-color);
}
.accordion::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(173deg, var(--dropshadow2-top), var(--dropshadow2-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}
.accordion:hover {
  background-color: var(--steps-shadow-color);
}
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
}
.arrow {
  transition: transform 0.3s ease;
}
.arrow.open {
  transform: rotate(180deg);
}
.accordion-body-wrapper {
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.accordion-body {
  height: 270px;
  padding-top: 0.5rem;
}
.accordion__title {
  display: flex;
  max-width: 508px;
  font-size: 1em;
  font-weight: 500;
}
.accordion__text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
.accordion__text::after {
  bottom: 200%;
  content: '';
  position: absolute;
  height: 1px;
  background-color: black;
  width: 608px;
}
.accordion__icon path {
  fill: var(--arrow-color);
}
</style>
