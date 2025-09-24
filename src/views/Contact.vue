<script setup>
import ContactContent from '@/components/ContactContent.vue'
import ContactForm from '@/components/ContactForm.vue'
import MapboxMap from '@/components/MapboxMap.vue'
</script>

<template>
  <section class="contact">
    <div class="contact__container">
      <ContactContent />
      <ContactForm />
    </div>
  </section>
  <section class="mapbox">
    <div class="mapbox__container">
      <MapboxMap />
    </div>
  </section>
</template>

<style scoped>
.contact {
  margin-top: 2.5rem;
}
.contact__container,
.mapbox__container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
.contact__container {
  justify-content: space-between;
}
.mapbox {
  margin-top: 6.5rem;
}
</style>
