<template>
  <div class="intro__region--content">
    <div class="region__content-top">
      <div class="region__title">{{ $t('region.item-list.item-1') }}</div>
      <div v-for="(item, index) in topStats" :key="'top-' + index" class="region__text">
        <span>{{ item.value }}</span> {{ $t(item.key) }}
      </div>
    </div>
    <div class="region__content-bottom">
      <div v-for="(item, index) in bottomStats" :key="'bottom-' + index" class="region__text">
        <span>{{ item.value }}</span> {{ $t(item.key) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const topStats = [
  { value: 3, key: 'region.item-list.item-2' },
  { value: 22, key: 'region.item-list.item-3' },
  { value: 68, key: 'region.item-list.item-4' },
]

const bottomStats = [
  { value: 656, key: 'region.item-list.item-5' },
  { value: 35, key: 'region.item-list.item-6' },
  { value: 287, key: 'region.item-list.item-7' },
  { value: 38, key: 'region.item-list.item-8' },
]
</script>

<style scoped>
.intro__region--content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--lighten1-color);
  height: 9.5rem;
  padding: 1.5rem;
  width: 1400px;
  justify-content: center;
  border-radius: 1rem;
  position: relative;
}

.intro__region--content:hover {
  background-color: var(--steps-shadow-color);
  transition: 0.3s ease;
}

.intro__region--content::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(var(--dropshadow2-top), var(--dropshadow2-bottom));
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
  align-items: center;
  gap: 0.75em;
  padding: 0 0.75rem;
  color: var(--region-text-color);
  font-size: 0.875rem;
}

.region__text span {
  font-size: 1.125rem;
  color: var(--text-color);
}

.region__text:hover {
  background-color: var(--steps-shadow-color);
  transition: 0.3s ease;
}

.region__text::before {
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
