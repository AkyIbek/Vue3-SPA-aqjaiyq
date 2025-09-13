<template>
  <section class="solutions">
    <h2 class="title">{{ $t('solutions.item-list.item-1') }}</h2>

    <div class="filters">
      <!-- Регион -->
      <CustomSelect
        v-model="selectedRegion"
        :options="regionOptions"
        placeholder="Выберите регион"
      />

      <!-- Ключевые слова -->
      <CustomSelect
        v-model="selectedKeyword"
        :options="keywordOptions"
        placeholder="Ключевое слово"
      />
    </div>

    <div class="accordion-row">
      <!-- Левый столбец -->
      <div class="accordion-column">
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

      <!-- Правый столбец -->
      <div class="accordion-column">
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

// --- region items: ключ + переводимая метка
const regionItems = computed(() => [
  { key: 'all', label: t('solutions.filter.item-list.item-1') }, // например "Все регионы"
  { key: 'region-2', label: t('solutions.filter.item-list.item-2') },
  { key: 'region-3', label: t('solutions.filter.item-list.item-3') },
  { key: 'region-4', label: t('solutions.filter.item-list.item-4') },
  { key: 'region-5', label: t('solutions.filter.item-list.item-5') },
])

const regionOptions = computed(() => regionItems.value.map((i) => i.label))

// --- keyword items: ключ + переводимая метка (рекомендую добавить эти ключи в JSON)
const keywordItems = computed(() => [
  { key: 'all', label: t('solutions.filter.item-list.item-6') }, // например "Ключевое слово" / "All"
  { key: 'vydacha', label: t('solutions.filter.item-list.item-7') }, // выдача
  { key: 'utverzdenie', label: t('solutions.filter.item-list.item-8') }, // утверждение
  { key: 'opredelenie', label: t('solutions.filter.item-list.item-9') }, // определение
  { key: 'registraciya', label: t('solutions.filter.item-list.item-10') }, // регистрация
])

const keywordOptions = computed(() => keywordItems.value.map((i) => i.label))

// --- selected: храним и метку (для CustomSelect), и ключ (для фильтра)
const selectedRegion = ref(regionOptions.value[0]) // метка, которую рендерит CustomSelect
const selectedRegionKey = ref(regionItems.value[0].key) // логическое значение

const selectedKeyword = ref(keywordOptions.value[0]) // метка
const selectedKeywordKey = ref(keywordItems.value[0].key) // ключ

const searchKeyword = ref('')

// --- синхронизируем метки <-> ключи при смене языка или при выборе пользователем

// если при смене locale метки поменялись — подставим соответствующую метку для текущего ключа
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

// когда пользователь меняет метку в CustomSelect — находим соответствующий ключ
watch(selectedRegion, (newLabel) => {
  const found = regionItems.value.find((it) => it.label === newLabel)
  if (found) selectedRegionKey.value = found.key
})

watch(selectedKeyword, (newLabel) => {
  const found = keywordItems.value.find((it) => it.label === newLabel)
  if (found) selectedKeywordKey.value = found.key
})

// --- Данные аккордеонов (реактивно с t)
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

// --- состояния аккордеонов
const openLeftIndex = ref(null)
const openRightIndex = ref(null)
const toggleLeft = (index) => {
  openLeftIndex.value = openLeftIndex.value === index ? null : index
}
const toggleRight = (index) => {
  openRightIndex.value = openRightIndex.value === index ? null : index
}

// --- фильтрация: используем ключ selectedKeywordKey (а не только метку)
const filterItems = (items) => {
  return items.filter((item) => {
    const title = item.title.toLowerCase()
    // если выбрано "all" — все проходят
    const keywordMatch =
      selectedKeywordKey.value === 'all' ||
      // иначе сравниваем по переведённой метке (она на том же языке, что и title)
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
}

const leftFiltered = computed(() => filterItems(leftSolutions.value))
const rightFiltered = computed(() => filterItems(rightSolutions.value))

// --- добавление региона в заголовок/контент (метка всегда переведена)
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
.title {
  font-size: 24px;
  color: white;
  margin-bottom: 2rem;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.filter-select,
.filter-input {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  width: 100%;
  max-width: 250px;
  color: white;
}
.filter-input {
  background-color: var(--color-blue-dark);
}
.filter-select {
  background-color: var(--color-blue-light);
}
.accordion-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.accordion-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}
</style>
