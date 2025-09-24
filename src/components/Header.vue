<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const activeTheme = ref(localStorage.getItem('theme') || '')
const indicatorOffset = ref(0)

const languageIndicatorOffset = ref(0)
const activeLanguage = ref(localStorage.getItem('language') || 'kz')

const languageContainer = ref(null)
const themeContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    updateLanguageIndicator()
    updateThemeIndicator()
    locale.value = activeLanguage.value
    applyTheme(activeTheme.value)
  })
})

function changeLang(lang) {
  activeLanguage.value = lang
  localStorage.setItem('language', lang)
  locale.value = lang
  updateLanguageIndicator()
}

function updateLanguageIndicator() {
  if (!languageContainer.value) return
  const activeBtn = languageContainer.value.querySelector(`[data-lang="${activeLanguage.value}"]`)
  if (activeBtn) {
    languageIndicatorOffset.value = activeBtn.offsetLeft
  }
}

function setTheme(theme) {
  activeTheme.value = theme
  localStorage.setItem('theme', theme)
  applyTheme(theme)
  updateThemeIndicator()
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme || 'default')
}

function updateThemeIndicator() {
  if (!themeContainer.value) return
  const activeBtn = themeContainer.value.querySelector(
    `[data-theme="${activeTheme.value || 'default'}"]`,
  )
  if (activeBtn) {
    indicatorOffset.value = activeBtn.offsetLeft
  }
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__top">
        <div class="header__top-content">
          <div class="header__controls">
            <div class="header__languages" ref="languageContainer">
             
              <button data-lang="kaz" @click="changeLang('kaz')" class="header__languages-btn">
                Каз
              </button>
              <button data-lang="ru" @click="changeLang('ru')" class="header__languages-btn">
                Рус
              </button>
              <button data-lang="en" @click="changeLang('en')" class="header__languages-btn">
                Eng
              </button>
              <div
                class="header__languages-indicator"
                :style="{ transform: `translateX(${languageIndicatorOffset}px)` }"
              ></div>
            </div>
            <div class="header__themes" ref="themeContainer">

              <button
                data-theme="default"
                @click="setTheme('')"
                class="header__themes-btn blue"
              ></button>
              <button
                data-theme="light"
                @click="setTheme('light')"
                class="header__themes-btn light"
              ></button>
              <button
                data-theme="dark"
                @click="setTheme('dark')"
                class="header__themes-btn dark"
              ></button>
              <div
                class="header__themes-indicator"
                :style="{ transform: `translateX(${indicatorOffset}px)` }"
              ></div>
            </div>
          </div>
          <div class="header__accessibility">
            <img src="../assets/images/mdi_eye-outline.svg" alt="" />
            <button class="header__accessibility-text">
              {{ $t('header.accessibility.text') }}
            </button>
          </div>
        </div>
      </div>

      <div class="header__middle">
        <div class="header__middle-content">
          <div class="header__logo">
            <router-link to="/">
              <img src="../assets/images/Digital-Aqjaiyq-Export-01 1.svg" alt="Logo" />
            </router-link>
            <h4 class="header__title">{{ $t('header.middle.title') }}</h4>
          </div>
          <div class="header__contact">
            <p class="header__text">{{ $t('header.middle.text') }}</p>
            <p class="header__text">+7 (727) 258 8180</p>
          </div>
        </div>
      </div>

      <div class="header__nav">
        <div class="header__nav-content">
          <nav class="header__nav-list">
            <router-link to="/solutions" class="header__nav-item">
              {{ $t('header.nav.item-list.item-1') }}
            </router-link>
            <router-link to="/services" class="header__nav-item">
              {{ $t('header.nav.item-list.item-2') }}
            </router-link>
            <router-link to="/maps" class="header__nav-item">
              {{ $t('header.nav.item-list.item-3') }}
            </router-link>
            <router-link to="/citizens" class="header__nav-item">
              {{ $t('header.nav.item-list.item-4') }}
            </router-link>
            <router-link to="/business" class="header__nav-item">
              {{ $t('header.nav.item-list.item-5') }}
            </router-link>
            <router-link to="/investors" class="header__nav-item">
              {{ $t('header.nav.item-list.item-6') }}
            </router-link>
          </nav>
          <router-link to="/contact" class="header__nav-item">
            {{ $t('header.nav.item-list.item-7') }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
}

.header__top {
  display: flex;
  height: 2.25rem;
  background-color: var(--darken-color);
}

.header__top-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
}

.header__controls {
  display: flex;
}

.header__languages {
  display: flex;
  gap: 1.25rem;
  position: relative;
  align-items: center;
}

.header__languages::after {
  position: relative;
  left: -3.2rem;
  content: '';
  display: flex;
  width: 2px;
  height: 1rem;
  background-color: var(--more-details-color);
}

.header__languages-indicator {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  right:73%;
  border-radius: 6px;
  background-color: var(--indicator-color);
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.header__languages-indicator::before {
  content: '';
  position: absolute;
  left: -12px;
  width: 2.5rem;
  height: 1.5rem;
  inset: 0;
  padding: 1px;
  background: linear-gradient(165deg, var(--dropshadow-top), var(--dropshadow-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 6px;
  pointer-events: none;
  z-index: 1;
}

.header__languages-btn {
  z-index: 2;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--text-color);
}

.header__themes {
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  position: relative;
  gap: 1.5rem;
}

.header__themes-indicator {
  position: relative;
  width: 2.5rem;
  right: 83%;
  height: 1.5rem;
  border-radius: 6px;
  background-color: var(--indicator-color);
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.header__themes-indicator::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(165deg, var(--dropshadow-top), var(--dropshadow-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 6px;
  pointer-events: none;
  z-index: 1;
}

.header__themes-btn {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 1;
  border: none;
}

.header__themes-btn.light {
  background-color: #eeeeee;
}

.header__themes-btn.dark {
  background-color: #1c1c1e;
}

.header__themes-btn.blue {
  background-color: #003647;
}

.header__accessibility {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__accessibility-text {
  color: var(--descripotion-color);
  background: none;
  border: none;
  cursor: pointer;
}

.header__middle {
  display: flex;
  justify-content: space-between;
}

.header__middle-content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header__title {
  width: 450px;
  font-size: 1.225rem;
  color: var(--descripotion-color);
  font-weight: 300;
  margin-left: 0.5rem;
}

.header__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.header__text {
  font-size: 1rem;
}

.header__nav {
  display: flex;
  justify-content: space-between;
  background-color: var(--header-nav-color);
  height: 2.75rem;
  align-items: center;
}

.header__nav-content {
  position: relative;
  height: 2.5rem;
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--header-color);
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-radius: 0.5rem;
}

.header__nav-content::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(var(--dropshadow3-top), var(--dropshadow3-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 0.5rem;
  pointer-events: none;
  z-index: 1;
}

.header__nav-content::after {
  content: '';
  position: absolute;
  inset: -4.5px;
  border-radius: 0.5rem;
  background: linear-gradient(var(--dropshadow3-top), var(--dropshadow3-bottom));
  filter: blur(2px);
  opacity: 0.6;
  z-index: -11;
  pointer-events: none;
}

.header__nav-list {
  display: flex;
  gap: 3rem;
  font-weight: 400;
}

.header__nav-item {
  cursor: pointer;
  color: var(--navlist-color);
  text-decoration: none;
}

.header__nav-item:hover {
  filter: brightness(0.6);
}
</style>
