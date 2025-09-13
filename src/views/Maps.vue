<script setup>
import MapsContent from '@/components/MapsContent.vue'
</script>
<template>
  <section class="maps">
    <h2 class="title">{{ $t('maps.filter.item-list.item-3') }}</h2>
    <MapsContent />
  </section>
</template>
<style scoped>
.maps {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2.75rem;
  height: 900px;
}
.title {
  color: white;
  font-size: 24px;
  margin-bottom: 2rem;
}
</style>
