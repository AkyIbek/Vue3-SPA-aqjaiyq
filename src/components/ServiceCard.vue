<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedType = ref('')
const selectedRegion = ref('')

const services = computed(() => [
  {
    title: t('services.card.item-list.item-1'),
    subtitle: t('services.card.item-list.item-5'),
    type: t('services.filter.item-list.item-7'), // Онлайн
    region: t('services.filter.item-list.item-4'), // Алматы
  },
  {
    title: t('services.card.item-list.item-2'),
    subtitle: t('services.card.item-list.item-5'),
    type: t('services.filter.item-list.item-8'), // Оффлайн
    region: t('services.filter.item-list.item-5'), // Астана
  },
])

const filteredServices = computed(() =>
  services.value.filter((s) => {
    const typeMatch = selectedType.value ? s.type === selectedType.value : true
    const regionMatch = selectedRegion.value ? s.region === selectedRegion.value : true
    return typeMatch && regionMatch
  }),
)
</script>

<template>
  <h1>{{ $t('services.card.item-list.item-7') }}</h1>
  <div class="card__row">
    <div class="service__card" v-for="service in filteredServices" :key="service.title">
      <h3 class="title">{{ service.title }}</h3>
      <p class="subtitle">{{ service.subtitle }}</p>
      <div class="more">{{ $t('services.card.item-list.item-6') }}</div>
    </div>
  </div>
</template>

<style scoped>
.services__wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: white;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter__select {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  max-width: 200px;
  width: 100%;
}

.service__card {
  position: relative;
  width: 258px;
  height: 282px;
  background-color: var(--midnight-color);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: transform 0.2s ease;
}

.service__card:hover {
  transform: translateY(-4px);
  background-color: var(--steps-shadow-color);
}

.service__card::before {
  content: '';
  position: absolute;
  inset: -6px;
  padding: 2px;
  background: linear-gradient(
    145deg,
    var(--dropshadow-top, #61dafb),
    var(--dropshadow-bottom, #0e4a63)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.more {
  align-self: flex-end;
  font-size: 13px;
  color: var(--more-details-color);
  opacity: 0.8;
  cursor: pointer;
}

.card__row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

h1 {
  margin-bottom: 1.725rem;
}
</style>
