<!-- src/components/MapboxMap.vue -->
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FtdWVsY29sdCIsImEiOiJjbWJpMnhhczgwMWJuMmtzZDZhdml5dXozIn0.JfvBcjIHEEk_Ab5rd0dG7Q'

const mapContainer = ref(null)

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [76.8913138, 43.2393351],
    zoom: 16,
  })
  new mapboxgl.Marker().setLngLat([76.8913138, 43.2393351]).addTo(map)
})
</script>

<style scoped>
.map-container {
  overflow: hidden;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  height: 25rem;
  border-radius: 10px;
  flex-direction: column;
}
</style>
