<template>
  <div class="services__wrapper">
    <h1>{{ t('services.card.item-list.item-7') || 'Сервисы' }}</h1>
    <div class="filters">
      <CustomSelect
        v-model="selectedTypeLabel"
        :options="typeOptions"
        :placeholder="t('services.filter.placeholder.type') || 'Тип сервиса'"
      />
      <CustomSelect
        v-model="selectedRegionLabel"
        :options="regionOptions"
        :placeholder="t('services.filter.placeholder.region') || 'Регион'"
      />
    </div>
    <div class="card__row">
      <div class="service__card" v-for="(service, index) in filteredServices" :key="index">
        <h3 class="title">{{ service.title }}</h3>
        <p class="subtitle">{{ service.subtitle }}</p>
        <div class="more">{{ t('services.card.item-list.item-6') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomSelect from '@/components/CustomSelect.vue'

const { t } = useI18n()

const typeItems = computed(() => [
  { key: 'all', label: t('services.filter.item-list.item-6') },
  { key: 'online', label: t('services.filter.item-list.item-1') },
  { key: 'offline', label: t('services.filter.item-list.item-8') },
])

const regionItems = computed(() => [
  { key: 'all', label: t('services.filter.item-list.item-1') },
  { key: 'almaty', label: t('services.filter.item-list.item-2') },
  { key: 'astana', label: t('services.filter.item-list.item-3') },
  { key: 'shymkent', label: t('services.filter.item-list.item-4') },
  { key: 'turkestan', label: t('services.filter.item-list.item-5') },
])

const typeOptions = computed(() => typeItems.value.map((i) => i.label))
const regionOptions = computed(() => regionItems.value.map((i) => i.label))

const selectedTypeLabel = ref(typeOptions.value[0])
const selectedTypeKey = ref(typeItems.value[0].key)

const selectedRegionLabel = ref(regionOptions.value[0])
const selectedRegionKey = ref(regionItems.value[0].key)

watch(
  typeItems,
  (newItems) => {
    const found = newItems.find((it) => it.key === selectedTypeKey.value)
    if (found) selectedTypeLabel.value = found.label
    else {
      selectedTypeKey.value = newItems[0].key
      selectedTypeLabel.value = newItems[0].label
    }
  },
  { immediate: true },
)

watch(
  regionItems,
  (newItems) => {
    const found = newItems.find((it) => it.key === selectedRegionKey.value)
    if (found) selectedRegionLabel.value = found.label
    else {
      selectedRegionKey.value = newItems[0].key
      selectedRegionLabel.value = newItems[0].label
    }
  },
  { immediate: true },
)

watch(selectedTypeLabel, (newLabel) => {
  const found = typeItems.value.find((it) => it.label === newLabel)
  if (found) selectedTypeKey.value = found.key
})

watch(selectedRegionLabel, (newLabel) => {
  const found = regionItems.value.find((it) => it.label === newLabel)
  if (found) selectedRegionKey.value = found.key
})

const services = computed(() => [
  {
    title: t('services.card.item-list.item-1'),
    subtitle: t('services.card.item-list.item-5'),
    type: 'online',
    region: 'shymkent',
  },
  {
    title: t('services.card.item-list.item-2'),
    subtitle: t('services.card.item-list.item-5'),
    type: 'offline',
    region: 'turkestan',
  },
  {
    title: t('services.card.item-list.item-3'),
    subtitle: t('services.card.item-list.item-5'),
    type: 'offline',
    region: 'almaty',
  },
  {
    title: t('services.card.item-list.item-4'),
    subtitle: t('services.card.item-list.item-5'),
    type: 'online',
    region: 'astana',
  },
])

const filteredServices = computed(() =>
  services.value.filter(
    (s) =>
      (selectedTypeKey.value === 'all' || s.type === selectedTypeKey.value) &&
      (selectedRegionKey.value === 'all' || s.region === selectedRegionKey.value),
  ),
)
</script>
<style scoped>
.services__wrapper {
  max-width: 1200px;
  color: var(--text-color);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.card__row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.service__card {
  position: relative;
  width: 272px;
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

.services__wrapper h1 {
  margin-bottom: 2rem;
}
</style>
