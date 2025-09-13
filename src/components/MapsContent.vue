<template>
  <div class="maps-wrapper">
    <div class="filters">
      <CustomSelect
        v-model="selectedType"
        :options="[
          t('maps.filter.item-list.item-1'),
          t('maps.filter.item-list.item-2'),
          t('maps.filter.item-list.item-3'),
        ]"
        placeholder="Выберите тип карты"
        name="type"
        :openedFilter="openedFilter"
        @opened="handleOpened"
      />

      <CustomSelect
        v-model="selectedRegion"
        :options="[
          t('maps.filter.item-list.item-4'),
          t('maps.filter.item-list.item-5'),
          t('maps.filter.item-list.item-6'),
          t('maps.filter.item-list.item-7'),
          t('maps.filter.item-list.item-8'),
        ]"
        placeholder="Выберите тип карты"
        name="region"
        :openedFilter="openedFilter"
        @opened="handleOpened"
      />
    </div>

    <!-- Карточки -->
    <div class="cards-row">
      <div class="map-card" v-for="(map, index) in filteredMaps" :key="index">
        <img class="map-image" :src="map.image" :alt="map.title" />
        <div class="map-content">
          <div class="title">{{ map.title }}</div>
          <div class="subtitle">{{ map.subtitle }}</div>
          <div class="more">{{ $t('maps.filter.item-list.item-1') }}</div>
        </div>
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
import CustomSelect from '@/components/CustomSelect.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const selectedType = computed(() => t('maps.filter.item-list.item-1')) // Показать все
const selectedRegion = computed(() => t('maps.filter.item-list.item-4')) // Все регионы

const openedFilter = ref(null)
const handleOpened = (name) => {
  openedFilter.value = name
}
const maps = computed(() => [
  {
    title: t('maps.card.item-list.item-1'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: t('maps.filter.item-list.item-2'),
    region: 'Алматы',
    image: img1,
  },
  {
    title: t('maps.card.item-list.item-2'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: 'карты',
    region: 'Астана',
    image: img2,
  },
  {
    title: t('maps.card.item-list.item-3'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: 'карты',
    region: 'Актобе',
    image: img3,
  },
  {
    title: t('maps.card.item-list.item-4'),
    subtitle:
      'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate. Tempor proident dolor in ex pariatur sit et ea amet veniam. ',
    type: 'карты',
    region: 'Уральск',
    image: img4,
  },
])

const filteredMaps = computed(() =>
  maps.value.filter((m) => {
    const typeMatch =
      selectedType.value !== t('maps.filter.item-list.item-1')
        ? m.type === selectedType.value
        : true
    const regionMatch =
      selectedRegion.value !== t('maps.filter.item-list.item-4')
        ? m.region === selectedRegion.value
        : true
    return typeMatch && regionMatch
  }),
)
</script>

<style scoped>
.maps-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.cards-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.map-card {
  position: relative;
  width: 262px;
  height: 292px;
  background-color: var(--color-blue-light);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}
.map-card::before {
  content: '';
  position: absolute;
  inset: -4px;
  padding: 2px;
  background: linear-gradient(150deg, var(--dropshadow3-top), var(--dropshadow3-bottom));
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
  border-radius: inherit;
}

.map-content {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-left: 1.25rem;
  text-align: left;
  gap: 0.75rem;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  width: 13rem;
}

.more {
  align-self: flex-end;
  font-size: 13px;
  color: var(--labelname-color);
  cursor: pointer;
  margin-right: 1rem;
}
</style>
