<script setup>
import { ref, onMounted, nextTick } from 'vue'

const activeTheme = ref(localStorage.getItem('theme') || '')
const indicatorOffset = ref(0)
const languageindicatorOffset = ref(0)

const btn_l1 = ref(null)
const btn_l2 = ref(null)
const btn_l3 = ref(null)

const languageMap = {
  kz: btn_l1,
  rus: btn_l2,
  eng: btn_l3,
}

const setLanguage = async (lang) => {
  document.documentElement.setAttribute('lang', lang)
  localStorage.setItem('language', lang)
  await nextTick()
  updateLanguageIndicator(lang)
}

const updateLanguageIndicator = (lang) => {
  const btnRef = languageMap[lang]
  if (btnRef.value) {
    const parent = btnRef.value.parentElement
    languageindicatorOffset.value = btnRef.value.offsetLeft - parent.offsetLeft
  }
}

const btn1 = ref(null)
const btn2 = ref(null)
const btn3 = ref(null)

const themeMap = {
  '': btn1,
  light: btn2,
  dark: btn3,
}

const setTheme = async (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  activeTheme.value = theme
  await nextTick()
  updateIndicator()
}

const updateIndicator = () => {
  const btnRef = themeMap[activeTheme.value]
  if (btnRef.value) {
    const parent = btnRef.value.parentElement
    indicatorOffset.value = btnRef.value.offsetLeft - parent.offsetLeft
  }
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', activeTheme.value)
  updateIndicator()

  const savedLang = localStorage.getItem('language') || 'kz'
  updateLanguageIndicator(savedLang)
})
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLang(lang) {
  locale.value = lang
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div class="header__top">
        <div class="header__top__content">
          <div class="header__top--item">
            <div class="header__languages">
              <div
                class="languages__indicator"
                :style="{ transform: `translateX(${languageindicatorOffset}px)` }"
              ></div>
              <button ref="btn_l1" @click="changeLang('kz')" class="kz">Каз</button>
              <button ref="btn_l2" @click="changeLang('ru')" class="rus">Рус</button>
              <button ref="btn_l3" @click="changeLang('en')" class="eng">Eng</button>
            </div>
            <div class="header__themes">
              <div
                class="theme-indicator"
                :style="{ transform: `translateX(${indicatorOffset}px)` }"
              ></div>
              <button ref="btn1" @click="setTheme('')" class="theme-circle blue"></button>
              <button ref="btn2" @click="setTheme('light')" class="theme-circle light"></button>
              <button ref="btn3" @click="setTheme('dark')" class="theme-circle dark"></button>
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
            <p class="header__text">{{ $t('header.middle.text ') }}</p>
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
/* ...все твои стили без изменений... */

.languages__indicator {
  position: absolute;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  top: 0;
  left: 305px;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.theme-indicator {
  position: absolute;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 6px;
  top: 0;
  left: 305px;
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
  left: -12px;
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
  left: -10px;
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
