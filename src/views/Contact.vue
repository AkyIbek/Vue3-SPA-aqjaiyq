<script setup>
import ContactContent from '@/components/ContactContent.vue'
import ContactForm from '@/components/ContactForm.vue'
import MapboxMap from '@/components/MapboxMap.vue'
</script>

<template>
  <section class="contact">
    <div class="contact-container">
      <ContactContent />
      <ContactForm />
    </div>
  </section>
  <section class="mapbox">
    <div class="mapbox-container">
      <MapboxMap />
    </div>
  </section>
</template>

<style>
.contact-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
}
.mapbox {
  margin-top: 6.5rem;
}
.contact {
  margin-top: 2.5rem;
}
</style>
