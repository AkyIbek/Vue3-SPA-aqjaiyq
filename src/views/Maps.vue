<script setup>
import MapsContent from '@/components/MapsContent.vue'
</script>

<template>
  <section class="maps">
    <h2 class="maps__title">{{ $t('maps.filter.item-list.item-3') }}</h2>
    <MapsContent />
  </section>
</template>

<style scoped>
.maps {
  max-width: 1200px;
  margin: 2.75rem auto 0;
  height: 900px;
}

.maps__title {
  color: var(--text-color);
  font-size: 2em;
  margin-bottom: 2rem;
}
</style>
