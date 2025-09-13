<template>
  <h1>{{ $t('maps.filter.item-list.item-3') }}</h1>
  <div class="cards-row">
    <div class="map-card" v-for="(map, index) in filteredMaps" :key="index">
      <img class="map-image" :src="map.image" :alt="map.title" />
      <div class="map-content">
        <div class="map-text">
          <div class="title">{{ map.title }}</div>
          <div class="subtitle">{{ map.subtitle }}</div>
        </div>
        <div class="more">{{ $t('maps.card.item-list.item-6') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '@/assets/images/Rectangle 446.jpg'
import img2 from '@/assets/images/Rectangle 447.png'
import img3 from '@/assets/images/Rectangle 447 (1).png'
import img4 from '@/assets/images/Rectangle 447 (2).png'
import { ref, computed } from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const selectedType = ref('')
const selectedRegion = ref('')

const maps = computed(() => [
  {
    title: t('maps.card.item-list.item-1'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: t('maps.filter.item-list.item-2'), // карты
    region: t('maps.filter.item-list.item-5'), // Алматы
    image: img1,
  },
  {
    title: t('maps.card.item-list.item-2'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: t('maps.filter.item-list.item-3'), // карты
    region: t('maps.filter.item-list.item-6'), // Астана
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
.maps-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: white;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  max-width: 200px;
  width: 100%;
}
/* 
.cards-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
} */

.map-card {
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
.map-card::before {
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
.map-card:hover {
  transform: translateY(-4px);
  background-color: #347c8d;
}

.map-image {
  height: 140px;
  width: 100%;
  object-fit: cover;
}

.map-content {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.title {
  font-size: 1em;
  font-weight: bold;
}

.subtitle {
  font-size: 14px;
  width: 13rem;
  opacity: 0.9;
}

.more {
  align-self: flex-end;
  font-size: 13px;
  color: var(--labelname-color);
  opacity: 0.8;
  cursor: pointer;
  margin-right: 1em;
}
.map-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1rem;
}
.cards-row {
  display: flex;
  gap: 2rem;
}
h1 {
  margin-bottom: 1.125rem;
  margin-top: 3rem;
}
</style>
