<template>
  <div class="maps">
    <div class="maps__filters">
      <CustomSelect
        :key="currentLocale + 'type'"
        v-model="selectedType"
        :options="typeOptions"
        :placeholder="typePlaceholder"
        name="type"
        :openedFilter="openedFilter"
        @opened="handleOpened"
      />

      <CustomSelect
        :key="currentLocale + 'region'"
        v-model="selectedRegion"
        :options="regionOptions"
        :placeholder="regionPlaceholder"
        name="region"
        :openedFilter="openedFilter"
        @opened="handleOpened"
      />
    </div>

    <div class="maps__list">
      <div class="maps__card" v-for="(map, index) in filteredMaps" :key="index">
        <img class="maps__image" :src="map.image" :alt="map.title" />
        <div class="maps__content">
          <div class="maps__title">{{ map.title }}</div>
          <div class="maps__subtitle">{{ map.subtitle }}</div>
          <div class="maps__more">{{ t('maps.card.item-list.item-6') }}</div>
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

const { t, locale } = useI18n()
const currentLocale = locale

const selectedType = ref('')
const selectedRegion = ref('')

const openedFilter = ref(null)
const handleOpened = (name) => {
  openedFilter.value = name
}

// reactive options
const typeOptions = computed(() => [
  t('maps.filter.item-list.item-1'),
  t('maps.filter.item-list.item-2'),
  t('maps.filter.item-list.item-3'),
])
const regionOptions = computed(() => [
  t('maps.filter.item-list.item-4'),
  t('maps.filter.item-list.item-5'),
  t('maps.filter.item-list.item-6'),
  t('maps.filter.item-list.item-7'),
  t('maps.filter.item-list.item-8'),
])

// reactive placeholders
const typePlaceholder = computed(() => t('maps.filter.item-list.item-1'))
const regionPlaceholder = computed(() => t('maps.filter.item-list.item-4'))

const maps = computed(() => [
  {
    title: t('maps.card.item-list.item-1'),
    subtitle: 'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate...',
    type: t('maps.filter.item-list.item-2'),
    region: t('maps.filter.item-list.item-5'),
    image: img1,
  },
  {
    title: t('maps.card.item-list.item-2'),
    subtitle: 'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate...',
    type: t('maps.filter.item-list.item-3'),
    region: t('maps.filter.item-list.item-6'),
    image: img2,
  },
  {
    title: t('maps.card.item-list.item-3'),
    subtitle: 'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate...',
    type: t('maps.filter.item-list.item-2'),
    region: t('maps.filter.item-list.item-7'),
    image: img3,
  },
  {
    title: t('maps.card.item-list.item-4'),
    subtitle: 'Ex cillum eiusmod voluptate Lorem dolor laboris voluptate...',
    type: t('maps.filter.item-list.item-3'),
    region: t('maps.filter.item-list.item-8'),
    image: img4,
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
  color: var(--text-color);
}

.maps__filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.maps__list {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
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
}
.maps__card::before {
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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
  text-align: left;
  gap: 0.75rem;
}

.maps__title {
  font-size: 18px;
  font-weight: bold;
}

.maps__subtitle {
  font-size: 14px;
  opacity: 0.9;
  width: 13rem;
}

.maps__more {
  align-self: flex-end;
  font-size: 13px;
  color: var(--more-details-color);
  cursor: pointer;
  margin-right: 1rem;
}
</style>
