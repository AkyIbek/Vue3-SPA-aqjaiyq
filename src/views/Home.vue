<script setup>
import Timeline from '@/components/Timeline.vue'
import Slider from '@/components/Slider.vue'
import Region from '@/components/Region.vue'
import Steps from '@/components/Steps.vue'
import StepsSlider from '@/components/StepsSlider.vue'
import Indicators from '@/components/Indicators.vue'

import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()
const slidesText = computed(() => [
  t('slider.item-list.item-1'),
  t('slider.item-list.item-2'),
  t('slider.item-list.item-3'),
  t('slider.item-list.item-4'),
])
</script>

<template>
  <section class="home__timeline">
    <div class="home__timeline-container">
      <Timeline />
    </div>
  </section>
  <section class="home__intro">
    <div class="home__intro-container">
      <div class="home__intro-slider">
        <Slider :slides="slidesText" />
      </div>
      <div class="home__intro-region">
        <Region />
      </div>
    </div>
  </section>
  <section class="home__steps">
    <div class="home__steps-container">
      <Steps />
      <div class="home__step-card">
        <StepsSlider />
      </div>
    </div>
  </section>
  <section class="home__indicators">
    <Indicators />
  </section>
</template>

<style>
.home__intro-region {
  display: flex;
}
.home__intro-container {
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
.home__steps-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
}
.home__timeline-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.home__step-card {
  position: relative;
  width: 588px;
  height: 210px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--midnight-color);
  color: white;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  transition: background-color 0.3s ease;
}
.home__step-card:hover {
  background-color: var(--steps-shadow-color);
}
.home__step-card::before {
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
</style>
