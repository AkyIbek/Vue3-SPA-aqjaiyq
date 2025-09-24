<template>
  <section class="maps">
    <h1 class="maps__title">{{ $t('maps.filter.item-list.item-3') }}</h1>
    <div class="maps__list">
      <div class="maps__card" v-for="(map, index) in filteredMaps" :key="index">
        <img class="maps__image" :src="map.image" :alt="map.title" />
        <div class="maps__content">
          <div class="maps__text">
            <div class="maps__text-title">{{ map.title }}</div>
            <div class="maps__text-subtitle">{{ map.subtitle }}</div>
          </div>
          <div class="maps__more">{{ $t('maps.card.item-list.item-6') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from '@/assets/images/Rectangle 446.jpg'
import img2 from '@/assets/images/Rectangle 447.png'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const selectedType = ref('')
const selectedRegion = ref('')

const maps = computed(() => [
  {
    title: t('maps.card.item-list.item-1'),
    subtitle: 'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate.',
    type: t('maps.filter.item-list.item-2'),
    region: t('maps.filter.item-list.item-5'),
    image: img1,
  },
  {
    title: t('maps.card.item-list.item-2'),
    subtitle: 'Tempor proident dolor in ex pariatur sit et ea amet veniam.',
    type: t('maps.filter.item-list.item-3'),
    region: t('maps.filter.item-list.item-6'),
    image: img2,
  },
])

const filteredMaps = computed(() =>
  maps.value.filter((m) => {
    const typeMatch = selectedType.value ? m.type === selectedType.value : true
    const regionMatch = selectedRegion.value ? m.region === selectedRegion.value : true
    return typeMatch && regionMatch
  }),
)
</script>

<style scoped>
.maps {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--text-color);
}

.maps__title {
  margin: 3rem 0 1.125rem;
}

.maps__list {
  display: flex;
  gap: 2rem;
}

.maps__card {
  position: relative;
  width: 262px;
  height: 292px;
  background-color: var(--color-blue-light);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  box-sizing: border-box;
}

.maps__card::before {
  content: '';
  position: absolute;
  inset: -4px;
  padding: 2px;
  background: linear-gradient(130deg, var(--dropshadow3-top), var(--dropshadow3-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

.maps__card:hover {
  transform: translateY(-4px);
  background-color: var(--steps-shadow-color);
}

.maps__image {
  height: 140px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.maps__content {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.maps__text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.maps__text-title {
  font-size: 1em;
  font-weight: bold;
}

.maps__text-subtitle {
  font-size: 14px;
  width: 13rem;
  opacity: 0.9;
}

.maps__more {
  align-self: flex-end;
  font-size: 13px;
  color: var(--more-details-color);
  opacity: 0.8;
  cursor: pointer;
  margin-right: 1em;
}
</style>
