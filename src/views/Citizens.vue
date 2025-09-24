<template>
  <section class="citizens">
    <div class="citizens__filters">
      <h1 class="citizens__filters-title">{{ $t('citizens.item-1') }}</h1>
      <div class="citizens__filters-content">
        <CustomSelect v-model="selectedType" :options="typeOptions" placeholder="Тип" />
        <CustomSelect v-model="selectedRegion" :options="regionOptions" placeholder="Регион" />
      </div>
    </div>
    <div class="citizens__container">
      <div v-if="showAccordion" class="citizens__accordion">
        <h1 class="citizens__accordion-title">{{ $t('citizens.item-2') }}</h1>
        <div class="citizens__accordion-items">
          <Accordion
            v-for="(item, index) in filteredServices"
            :key="index"
            :title="item.title"
            :isOpen="openIndex === index"
            @toggle="() => (openIndex = openIndex === index ? null : index)"
          >
            <p>{{ item.content }}</p>
          </Accordion>
        </div>
      </div>
      <div class="citizens__cards">
        <div v-if="showServices" class="citizens__cards-services">
          <ServiceCard />
        </div>
        <div v-if="showMaps" class="citizens__cards-maps">
          <MapsCard />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Accordion from '@/components/Accordion.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import MapsCard from '@/components/MapsCard.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const selectedType = ref(t('citizens.filter.item-list.item-1'))
const selectedRegion = ref(t('citizens.filter.item-list.item-5'))
const searchKeyword = ref('')
const openIndex = ref(null)

const services = computed(() => [
  { title: t('citizens.card.item-list.item-1'), region: t('citizens.filter.item-list.item-6') },
  { title: t('citizens.card.item-list.item-2'), region: t('citizens.filter.item-list.item-7') },
  { title: t('citizens.card.item-list.item-3'), region: t('citizens.filter.item-list.item-8') },
  { title: t('citizens.card.item-list.item-4'), region: t('citizens.filter.item-list.item-5') },
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

<style scoped>
.citizens {
  margin-top: 2.75rem;
}
.citizens__container {
  display: flex;
  max-width: 1200px;
  margin: 4.5rem auto;
  gap: 2.5rem;
  min-height: 500px;
}
.citizens__filters {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  flex-direction: column;
}
.citizens__filters-content {
  display: flex;
  gap: 1.5rem;
}
.citizens__filters-title {
  margin-bottom: 2rem;
}
.citizens__accordion-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.citizens__accordion-title {
  margin-bottom: 1.25rem;
}
.citizens__cards {
  display: flex;
  flex-direction: column;
}
</style>
