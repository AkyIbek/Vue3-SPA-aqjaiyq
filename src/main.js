import './assets/main.css'
import './assets/themes.css'

const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme)
}

import { createApp } from 'vue'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import kaz from './locales/kaz.json'

// Роутер
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Services from './views/Services.vue'
import Solutions from './views/Solutions.vue'
import Maps from './views/Maps.vue'
import Contact from './views/Contact.vue'
import Citizens from './views/Citizens.vue'
import Business from './views/Business.vue'
import Investors from './views/Investors.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/solutions', component: Solutions },
  { path: '/maps', component: Maps },
  { path: '/contact', component: Contact },
  { path: '/citizens', component: Citizens },
  { path: '/business', component: Business },
  { path: '/investors', component: Investors },
]

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'ru',
  locale: 'en',
  messages: {
    en,
    ru,
    kaz,
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

///////////
import PrimeVue from 'primevue/config'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(i18n)
app.mount('#app')
  