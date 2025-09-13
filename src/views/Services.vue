<script setup>
import ServiceContent from '@/components/ServiceContent.vue'
</script>
<template>
  <section class="services">
    <div class="services-container">
      <ServiceContent />
    </div>
  </section>
</template>
<style>
.services-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}
.services {
  margin-top: 2.75rem;
  height: 900px;
}
</style>
