<template>
  <section class="solutions">
    <h2 class="solutions__title">{{ $t('solutions.item-list.item-1') }}</h2>

    <div class="solutions-filter">
      <CustomSelect
        v-model="selectedRegion"
        :options="regionOptions"
        placeholder="Выберите регион"
      />
      <CustomSelect
        v-model="selectedKeyword"
        :options="keywordOptions"
        placeholder="Ключевое слово"
      />
    </div>

    <div class="solutions-accordion">
      <div class="solutions-accordion__column">
        <Accordion
          v-for="(item, index) in leftFinalSolutions"
          :key="'left-' + index"
          :title="item.title"
          :isOpen="openLeftIndex === index"
          @toggle="() => toggleLeft(index)"
        >
          <p>{{ item.content }}</p>
        </Accordion>
      </div>

      <div class="solutions-accordion__column">
        <Accordion
          v-for="(item, index) in rightFinalSolutions"
          :key="'right-' + index"
          :title="item.title"
          :isOpen="openRightIndex === index"
          @toggle="() => toggleRight(index)"
        >
          <p>{{ item.content }}</p>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Accordion from '@/components/Accordion.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const regionItems = computed(() => [
  { key: 'all', label: t('solutions.filter.item-list.item-1') },
  { key: 'region-2', label: t('solutions.filter.item-list.item-2') },
  { key: 'region-3', label: t('solutions.filter.item-list.item-3') },
  { key: 'region-4', label: t('solutions.filter.item-list.item-4') },
  { key: 'region-5', label: t('solutions.filter.item-list.item-5') },
])
const regionOptions = computed(() => regionItems.value.map((i) => i.label))

const keywordItems = computed(() => [
  { key: 'all', label: t('solutions.filter.item-list.item-6') },
  { key: 'vydacha', label: t('solutions.filter.item-list.item-7') },
  { key: 'utverzdenie', label: t('solutions.filter.item-list.item-8') },
  { key: 'opredelenie', label: t('solutions.filter.item-list.item-9') },
  { key: 'registraciya', label: t('solutions.filter.item-list.item-10') },
])
const keywordOptions = computed(() => keywordItems.value.map((i) => i.label))

const selectedRegion = ref(regionOptions.value[0])
const selectedRegionKey = ref(regionItems.value[0].key)
const selectedKeyword = ref(keywordOptions.value[0])
const selectedKeywordKey = ref(keywordItems.value[0].key)
const searchKeyword = ref('')

watch(
  regionItems,
  (newItems) => {
    const found = newItems.find((it) => it.key === selectedRegionKey.value)
    if (found) selectedRegion.value = found.label
    else {
      selectedRegionKey.value = newItems[0].key
      selectedRegion.value = newItems[0].label
    }
  },
  { immediate: true },
)

watch(
  keywordItems,
  (newItems) => {
    const found = newItems.find((it) => it.key === selectedKeywordKey.value)
    if (found) selectedKeyword.value = found.label
    else {
      selectedKeywordKey.value = newItems[0].key
      selectedKeyword.value = newItems[0].label
    }
  },
  { immediate: true },
)

watch(selectedRegion, (newLabel) => {
  const found = regionItems.value.find((it) => it.label === newLabel)
  if (found) selectedRegionKey.value = found.key
})
watch(selectedKeyword, (newLabel) => {
  const found = keywordItems.value.find((it) => it.label === newLabel)
  if (found) selectedKeywordKey.value = found.key
})

const leftSolutions = computed(() => [
  {
    title: t('solutions.accordion.item-list.item-1.title'),
    content: t('solutions.accordion.item-list.item-1.content'),
  },
  {
    title: t('solutions.accordion.item-list.item-2.title'),
    content: t('solutions.accordion.item-list.item-2.content'),
  },
  {
    title: t('solutions.accordion.item-list.item-3.title'),
    content: t('solutions.accordion.item-list.item-3.content'),
  },
  {
    title: t('solutions.accordion.item-list.item-4.title'),
    content: t('solutions.accordion.item-list.item-4.content'),
  },
])
const rightSolutions = computed(() => [
  {
    title: t('solutions.accordion.item-list.item-5.title'),
    content: t('solutions.accordion.item-list.item-5.content'),
  },
  {
    title: t('solutions.accordion.item-list.item-6.title'),
    content: t('solutions.accordion.item-list.item-6.content'),
  },
  {
    title: t('solutions.accordion.item-list.item-7.title'),
    content: t('solutions.accordion.item-list.item-7.content'),
  },
])

const openLeftIndex = ref(null)
const openRightIndex = ref(null)
const toggleLeft = (index) => {
  openLeftIndex.value = openLeftIndex.value === index ? null : index
}
const toggleRight = (index) => {
  openRightIndex.value = openRightIndex.value === index ? null : index
}

const filterItems = (items) =>
  items.filter((item) => {
    const title = item.title.toLowerCase()
    const keywordMatch =
      selectedKeywordKey.value === 'all' ||
      title.includes(
        (
          keywordItems.value.find((k) => k.key === selectedKeywordKey.value)?.label || ''
        ).toLowerCase(),
      )
    const searchMatch = searchKeyword.value
      ? title.includes(searchKeyword.value.toLowerCase())
      : true
    return keywordMatch && searchMatch
  })

const leftFiltered = computed(() => filterItems(leftSolutions.value))
const rightFiltered = computed(() => filterItems(rightSolutions.value))

const leftFinalSolutions = computed(() =>
  leftFiltered.value.map((item) => ({
    title:
      selectedRegionKey.value !== 'all' ? `${item.title} — ${selectedRegion.value}` : item.title,
    content:
      selectedRegionKey.value !== 'all'
        ? `${item.content} (${selectedRegion.value})`
        : item.content,
  })),
)
const rightFinalSolutions = computed(() =>
  rightFiltered.value.map((item) => ({
    title:
      selectedRegionKey.value !== 'all' ? `${item.title} — ${selectedRegion.value}` : item.title,
    content:
      selectedRegionKey.value !== 'all'
        ? `${item.content} (${selectedRegion.value})`
        : item.content,
  })),
)
</script>

<style scoped>
.solutions {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  height: 900px;
}

.solutions__title {
  font-size: 2rem;
  color: var(--text-color);
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.solutions-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.solutions-accordion {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.solutions-accordion__column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}
</style>
