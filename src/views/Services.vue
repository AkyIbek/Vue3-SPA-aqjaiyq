<script setup>
import ServiceContent from '@/components/ServiceContent.vue'
</script>

<template>
  <section class="services">
    <div class="services__container">
      <ServiceContent />
    </div>
  </section>
</template>

<style scoped>
.services {
  margin-top: 2.75rem;
  height: 900px;
}

.services__container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
