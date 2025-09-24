<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

function setTheme(theme) {
  document.body.className = ''
  document.body.classList.add(`${theme}-theme`)
  localStorage.setItem('theme', theme)
}
</script>

<template>
  <div id="app">
    <Header @change-theme="setTheme" />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
</style>
