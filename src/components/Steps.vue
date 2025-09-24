<template>
  <div class="step-card">
    <div class="step-card__title">{{ $t('steps.item-list.item-1') }}</div>
    <div class="step-card__subtitle">{{ $t('steps.item-list.item-2') }}</div>
    <div class="step-card__steps">
      <div class="step-card__line"></div>
      <div
        v-for="(_, index) in steps"
        :key="index"
        class="step-card__point"
        :style="{ left: `${(index / (steps.length - 1)) * 100}%` }"
        @click="currentStep = index"
      >
        {{ index + 1 }}
      </div>
      <div
        class="step-card__active-indicator"
        :style="{ left: `${(currentStep / (steps.length - 1)) * 100}%` }"
      ></div>
    </div>
    <div class="step-card__info">
      <h3>{{ steps[currentStep].title }}</h3>
      <p>{{ steps[currentStep].description }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const steps = [
  { title: t('steps.steps-list.item-1'), description: t('steps.item-list.item-3') },
  { title: t('steps.steps-list.item-2'), description: t('steps.item-list.item-4') },
  { title: t('steps.steps-list.item-3'), description: t('steps.item-list.item-5') },
  { title: t('steps.steps-list.item-4'), description: t('steps.item-list.item-6') },
  { title: t('steps.steps-list.item-5'), description: t('steps.item-list.item-7') },
  { title: t('steps.steps-list.item-6'), description: t('steps.item-list.item-8') },
]

const currentStep = ref(0)
</script>
<style scoped>
.step-card {
  position: relative;
  width: 588px;
  height: 210px;
  padding: 20px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--midnight-color);
  color: white;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
}

.step-card::before {
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
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

.step-card:hover {
  background-color: var(--steps-shadow-color);
  transition: 0.3s ease;
}

.step-card__title {
  font-size: 1.125rem;
  margin-bottom: 0.25em;
  color: var(--text-color);
}

.step-card__subtitle {
  color: var(--text-color);
  margin-bottom: 3rem;
  font-size: 1.125rem;
}

.step-card__steps {
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}

.step-card__line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--indicator-line-color);
  transform: translateY(-50%);
  z-index: 1;
}

.step-card__point {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--midnight-color);
  border-radius: 50%;
  color: var(--greentext-color);
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
}

.step-card__point::before {
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

.step-card__active-indicator {
  position: absolute;
  transform: translate(-50%, -50%);
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
  transition: left 0.4s ease;
  pointer-events: none;
  z-index: 2;
}

.step-card__info {
  text-align: center;
}

.step-card__info h3 {
  margin-bottom: 0.5rem;
  font-weight: 300;
  font-size: 0.95rem;
  color: var(--subtext-color);
}

.step-card__info p {
  font-size: 14px;
  color: var(--text-color);
}
</style>
