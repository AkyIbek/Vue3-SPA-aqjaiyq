<template>
  <div class="accordion">
    <div class="accordion-header" @click="emit('toggle')">
      <h3>{{ title }}</h3>
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </div>

    <!-- Плавное появление тела -->
    <transition name="accordion">
      <div v-if="isOpen" class="accordion-body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  isOpen: Boolean,
})

const emit = defineEmits(['toggle'])
</script>

<style scoped>
.accordion {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: var(--color-blue-light, #2e6070);
  padding: 1rem;
  color: white;
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.arrow {
  transition: transform 0.2s ease;
}
.arrow.open {
  transform: rotate(180deg);
}

/* Анимация тела */
.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px; /* достаточно для любого контента */
  opacity: 1;
}

.accordion-body {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.5rem;
}
</style>
