<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const contacts = [
  [
    { type: 'phone', value: '+7 (707) 711 1129' },
    { type: 'phone', value: '+7 (727) 256 1129' },
    { type: 'email', value: 'dep20@gmail.com' },
  ],
  [
    { type: 'phone', value: '+7 (707) 711 1129' },
    { type: 'phone', value: '+7 (727) 256 1129' },
    { type: 'email', value: 'dep20@gmail.com' },
  ],
]

const icons = {
  phone: `<path d="M7.5 3C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.70031 6.45031 9.07031 7.57031C9.18011 7.92012 9.10002 8.30996 8.82031 8.58984L6.62012 10.79C8.06011 13.62 10.38 15.9299 13.21 17.3799L15.4102 15.1797C15.6101 14.9898 15.8602 14.8896 16.1201 14.8896C16.22 14.8897 16.3298 14.9005 16.4297 14.9404C17.5497 15.3104 18.76 15.5098 20 15.5098C20.5499 15.5098 20.9999 15.9599 21 16.5098V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5ZM15.2002 18.21C16.4101 18.6099 17.6801 18.87 19 18.96V17.4697C18.1201 17.4097 17.2503 17.2595 16.4004 17.0195L15.2002 18.21ZM5.03027 5C5.12027 6.31999 5.38004 7.59004 5.79004 8.79004L6.99023 7.58984C6.75025 6.75987 6.60004 5.88997 6.54004 5H5.03027Z"/>`,
  email: `<path d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18L2.00977 6C2.00977 4.9 2.9 4 4 4H20ZM12 13L4 8V18H20V8L12 13ZM4 6L12 11L20 6H4Z"/>`,
}
</script>

<template>
  <div class="contact__content">
    <h4 class="contact__title">{{ t('contact.item-list.item-1') }}</h4>
    <h6 class="contact__subtitle">{{ t('contact.item-list.item-2') }}</h6>
    <div class="contact__card">
      <div v-for="(group, index) in contacts" :key="index" class="contact__list">
        <div v-for="(item, idx) in group" :key="idx" class="contact__item">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g v-html="icons[item.type]" />
          </svg>
          <p>{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.contact__list {
  margin-top: 1.625rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.265rem;
  font-weight: 300;
}
.contact__content {
  flex-direction: column;
}
.contact__title {
  font-size: 2rem;
  font-weight: 600;
}
.contact__subtitle {
  margin-top: 2.625rem;
  font-size: 1.125rem;
  font-weight: 400;
}
.contact__card {
  display: flex;
  gap: 102px;
}
.contact__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.contact__item svg path {
  fill: var(--more-details-color);
}
</style>
