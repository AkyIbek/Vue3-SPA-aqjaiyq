<script setup>
import Accordion from '@/components/Accordion.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import MapsCard from '@/components/MapsCard.vue'
import { ref, computed } from 'vue'
import CitizensAccordion from '@/components/CitizensAccordion.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Фильтры
const typeOptions = computed(() => [
  t('citizens.filter.item-list.item-1'),
  t('citizens.filter.item-list.item-2'),
  t('citizens.filter.item-list.item-3'),
  t('citizens.filter.item-list.item-4'),
])
const regionOptions = computed(() => [
  t('citizens.filter.item-list.item-5'),
  t('citizens.filter.item-list.item-6'),
  t('citizens.filter.item-list.item-7'),
  t('citizens.filter.item-list.item-8'),
])
const selectedType = computed(() => t('citizens.filter.item-list.item-1')) // Показать все
const selectedRegion = computed(() => t('citizens.filter.item-list.item-5')) // Все регионыx
const searchKeyword = ref('')
const openIndex = ref(null)

// Услуги (аккордеон)
const services = computed(() => [
  {
    title: t('citizens.card.item-list.item-1'),
    region: t('citizens.filter.item-list.item-6'),
  },
  { title: t('citizens.card.item-list.item-2'), region: t('citizens.filter.item-list.item-7') },
  { title: t('citizens.card.item-list.item-3'), region: t('citizens.filter.item-list.item-8') },
  {
    title: t('citizens.card.item-list.item-4'),
    region: t,
  },
])
const filteredServices = computed(() =>
  services.value.filter((item) => {
    const matchRegion =
      selectedRegion.value === t('citizens.filter.item-list.item-5') ||
      item.region === selectedRegion.value
    const matchKeyword =
      searchKeyword.value === '' ||
      item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchRegion && matchKeyword
  }),
)

// Логика отображения по фильтру типа
const showAccordion = computed(
  () =>
    selectedType.value === t('citizens.filter.item-list.item-1') ||
    selectedType.value === t('citizens.filter.item-list.item-2'),
)
const showServices = computed(
  () =>
    selectedType.value === t('citizens.filter.item-list.item-1') ||
    selectedType.value === t('citizens.filter.item-list.item-3'),
)
const showMaps = computed(
  () =>
    selectedType.value === t('citizens.filter.item-list.item-1') ||
    selectedType.value === t('citizens.filter.item-list.item-4'),
)
</script>

<template>
  <section class="citizens">
    <div class="filters">
      <h1 class="filter__title">{{ $t('citizens.item-5') }}</h1>
      <div class="filter__content">
        <CustomSelect v-model="selectedType" :options="typeOptions" placeholder="Тип" />
        <CustomSelect v-model="selectedRegion" :options="regionOptions" placeholder="Регион" />
      </div>
    </div>
    <div class="citizens__container">
      <div v-if="showAccordion" class="citizens__accordion">
        <h1>{{ $t('citizens.item-2') }}</h1>
        <div class="citizens__accordion-items">
          <Accordion
            v-for="(item, index) in filteredServices"
            :key="index"
            :title="`${item.title}`"
            :isOpen="openIndex === index"
            @toggle="() => (openIndex = openIndex === index ? null : index)"
          >
            <p>{{ item.content }}</p>
          </Accordion>
        </div>
      </div>
      <div class="citizens__card">
        <div v-if="showServices" class="citizens__cards">
          <ServiceCard />
        </div>

        <div v-if="showMaps" class="citizens__cards">
          <MapsCard />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.citizens {
  margin-top: 2.75rem;
}
.citizens__accordion-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.citizens__container {
  display: flex;
  max-width: 1200px;
  margin: 4.5rem auto;
  gap: 2.5rem;
}
.filters {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  flex-direction: column;
}
.search-input {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  max-width: 200px;
}
.citizens__cards {
  display: flex;
  flex-direction: column;
}
.filter__content {
  display: flex;
  gap: 1.5rem;
}
.filter__title {
  margin-bottom: 2rem;
}
h1 {
  margin-bottom: 1.25rem;
}
</style>
