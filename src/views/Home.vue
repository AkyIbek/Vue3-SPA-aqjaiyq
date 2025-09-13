<script setup>
import Timeline from '@/components/Timeline.vue'
import Slider from '@/components/Slider.vue'
import Region from '@/components/Region.vue'
import Steps from '@/components/Steps.vue'
import StepsSlider from '@/components/StepsSlider.vue'
import Indicators from '@/components/Indicators.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const slidesText = [
  t('slider.item-list.item-1'),
  t('slider.item-list.item-2'),
  t('slider.item-list.item-3'),
  t('slider.item-list.item-4'),
]
</script>

<template>
  <section class="timeline">
    <div class="timeline-container">
      <Timeline />
    </div>
  </section>
  <section class="intro">
    <div class="intro-container">
      <div class="intro__slider">
        <Slider :slides="slidesText" />
      </div>
      <div class="intro__region">
        <Region />
      </div>
    </div>
  </section>
  <section class="intro__steps">
    <div class="intro__steps-container">
      <Steps />
      <div class="step-card">
        <StepsSlider />
      </div>
    </div>
  </section>
  <section class="indicators">
    <Indicators />
  </section>
</template>
<style>
.intro__region {
  display: flex;
}
.intro-container {
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
.intro__steps-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
}
.timeline-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.step-card {
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
}
.step-card:hover {
  background-color: #003e52;
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
</style>
