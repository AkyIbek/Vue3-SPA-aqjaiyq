<template>
  <div class="intro__region--content">
    <div class="region__content-top">
      <div class="region__title">{{ $t('region.item-list.item-1') }}</div>
      <div class="region__text"><span>3</span> {{ $t('region.item-list.item-2') }}</div>
      <div class="region__text"><span>22</span> {{ $t('region.item-list.item-3') }}</div>
      <div class="region__text"><span>68</span> {{ $t('region.item-list.item-4') }}</div>
    </div>
    <div class="region__content-bottom">
      <div class="region__text"><span>656</span>{{ $t('region.item-list.item-5') }}</div>
      <div class="region__text"><span>35</span>{{ $t('region.item-list.item-6') }}</div>
      <div class="region__text"><span>287</span>{{ $t('region.item-list.item-7') }}</div>
      <div class="region__text"><span>38</span>{{ $t('region.item-list.item-') }}</div>
    </div>
  </div>
</template>
<style>
.intro__region--content {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--lighten1-color);
  height: 9.5rem;
  padding: 1.5rem;
  width: 1400px;
  justify-content: center;
  border-radius: 1rem;
}
.intro__region--content::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px; /* Толщина "рамки" */
  background: linear-gradient(
    var(--dropshadow2-top),
    var(--dropshadow2-bottom)
  ); /* Градиент по диагонали */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 1rem;
  pointer-events: none;
  z-index: 1;
}
.region__content-top,
.region__content-bottom {
  display: flex;
  gap: 1rem;
}
.region__text {
  background-color: var(--lighten1-color);
  position: relative;
  width: 11.25rem;
  height: 2.75rem;
  display: flex;
  color: var(--region-text-color);
  font-size: 0.875rem;
  align-items: center;
  gap: 0.75em;
  padding: 0 0.75rem;
}
.region__text span {
  font-size: 1.125rem;
}
.region__text:hover {
  background-color: var(--steps-shadow-color);
}
.region__text::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px; /* Толщина "рамки" */
  background: linear-gradient(
    165deg,
    var(--dropshadow-top),
    var(--dropshadow-bottom)
  ); /* Градиент по диагонали */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 0.25rem;
  pointer-events: none;
  z-index: 1;
}
.region__title {
  position: relative;
  width: 11.25rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  gap: 0.75em;
}
@media (max-width: 1660px) {
  .intro__region--content {
    width: 912px;
  }
}
</style>
