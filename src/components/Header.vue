<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

// i18n
const { locale } = useI18n()

// тема
const activeTheme = ref(localStorage.getItem('theme') || '')
const indicatorOffset = ref(0)

// язык
const languageIndicatorOffset = ref(0)
const activeLanguage = ref(localStorage.getItem('language') || 'kz')

// контейнеры
const languageContainer = ref(null)
const themeContainer = ref(null)

onMounted(() => {
  nextTick(() => {
    updateLanguageIndicator()
    updateThemeIndicator()
    // восстановим язык
    locale.value = activeLanguage.value
    // восстановим тему
    applyTheme(activeTheme.value)
  })
})

// === ЯЗЫК ===
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

// === ТЕМА ===
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
    <div class="header-container">
      <div class="header__top">
        <div class="header__top__content">
          <div class="header__top--item">
            <!-- языки -->
            <div class="header__languages" ref="languageContainer">
              <div
                class="languages__indicator"
                :style="{ transform: `translateX(${languageIndicatorOffset}px)` }"
              ></div>

              <button data-lang="kaz" @click="changeLang('kaz')" class="kaz">Каз</button>
              <button data-lang="ru" @click="changeLang('ru')" class="rus">Рус</button>
              <button data-lang="en" @click="changeLang('en')" class="eng">Eng</button>
            </div>

            <!-- темы -->
            <div class="header__themes" ref="themeContainer">
              <div
                class="theme-indicator"
                :style="{ transform: `translateX(${indicatorOffset}px)` }"
              ></div>
              <button data-theme="default" @click="setTheme('')" class="theme-circle blue"></button>
              <button
                data-theme="light"
                @click="setTheme('light')"
                class="theme-circle light"
              ></button>
              <button
                data-theme="dark"
                @click="setTheme('dark')"
                class="theme-circle dark"
              ></button>
            </div>
          </div>
          <div class="header__accessibility">
            <img src="../assets/images/mdi_eye-outline.svg" alt="" />
            <button class="accessibility__text">{{ $t('header.accessibility.text') }}</button>
          </div>
        </div>
      </div>

      <div class="header__middle">
        <div class="header__middle__content">
          <div class="header__logo">
            <router-link to="/">
              <img src="../assets/images/Digital-Aqjaiyq-Export-01 1.svg" alt="" />
            </router-link>
            <h4 class="header__title">
              {{ $t('header.middle.title') }}
            </h4>
          </div>
          <div class="header__contact">
            <p class="header__text">{{ $t('header.middle.text') }}</p>
            <p class="header__text">+7 (727) 258 8180</p>
          </div>
        </div>
      </div>
      <div class="header__nav">
        <div class="header__nav__content">
          <nav class="header__nav__list">
            <router-link to="/solutions" class="nav-item">{{
              $t('header.nav.item-list.item-1')
            }}</router-link>
            <router-link to="/services" class="nav-item">{{
              $t('header.nav.item-list.item-2')
            }}</router-link>
            <router-link to="/maps" class="nav-item"
              >{{ $t('header.nav.item-list.item-3') }}
            </router-link>
            <router-link to="/citizens" class="nav-item">{{
              $t('header.nav.item-list.item-4')
            }}</router-link>
            <router-link to="/business" class="nav-item">{{
              $t('header.nav.item-list.item-5')
            }}</router-link>
            <router-link to="/investors" class="nav-item">{{
              $t('header.nav.item-list.item-6')
            }}</router-link>
          </nav>
          <div>
            <router-link to="/contact" class="nav-item">{{
              $t('header.nav.item-list.item-7')
            }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.languages__indicator {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  top: 0px;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.theme-indicator {
  position: absolute;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  right: 339px;
  top: 0;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.theme-indicator::before {
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

.header__top {
  display: flex;
  height: 2.25rem;
  background-color: var(--darken-color);
}
.header__top__content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
}
.header__accessibility {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.header__middle {
  display: flex;
}
.header__logo {
  display: flex;
}

.header__themes {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.themes-wrapper {
  align-items: center;
  position: relative;
  display: flex;
  gap: 1.5rem;
  padding: 4px;
}

.theme-indicator {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  top: 0;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
  border-radius: 6px;
}
.theme-indicator::before {
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
.theme-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.light {
  background-color: #eeeeee;
}
.dark {
  background-color: #1c1c1e;
}
.blue {
  background-color: #003647;
}
.header__middle {
  background-color: var();
  justify-content: space-between;
}
.header__nav {
  display: flex;
  justify-content: space-between;
  background-color: var(--header-nav-color);
  height: 2.75rem;
  align-items: center;
}
.header__nav__list {
  display: flex;
  gap: 3rem;
  font-weight: 400;
}
.header__middle__content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
}
.header__nav__content {
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
.header__nav__content::before {
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
.header__nav__content::after {
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
.nav-item {
  cursor: pointer;
  color: var(--navlist-color);
}
.header__logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.nav-item:hover {
  color: #5c8693;
}
.header__top--item {
  display: flex;
}
.header__languages {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}
.header__languages::after {
  position: relative;
  left: 1rem;
  content: '';
  display: flex;
  width: 2px;
  height: 1rem;
  background-color: #ffffff;
}
.header__title {
  width: 450px;
  font-size: 1.225rem;
  color: var(--descripotion-color);
  font-weight: 300;
  margin-left: 0.5rem;
}
.header__text {
  font-size: 1rem;
}
.header__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.accessibility__text {
  color: var(--descripotion-color);
}
.languages__indicator {
  position: relative;
  right: 145px;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
  border-radius: 6px;
}
.languages__indicator::before {
  content: '';
  position: absolute;
  left: -10px;
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
button {
  z-index: 2;
  cursor: pointer;
}
</style>
