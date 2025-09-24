<template>
  <div class="timeline">
    <!-- Эллипс с точками -->
    <svg :width="width" :height="height" class="timeline__ellipse">
      <!-- Мелкие точки вдоль эллипса -->
      <circle
        v-for="(dot, i) in dottedLine"
        :key="'dot-' + i"
        :cx="dot.x"
        :cy="dot.y"
        r="1"
        fill="#ccc"
      />

      <!-- Основные точки -->
      <circle
        v-for="(point, index) in points"
        :key="'point-' + index"
        v-show="isNearGlow(point)"
        :cx="point.x"
        :cy="point.y"
        r="6"
        :fill="activeIndex === index ? 'var(--animatedcircle-color)' : 'var(--static-circle-color)'"
        class="fade"
      />

      <!-- Светящийся шар -->
      <circle
        :cx="glow.x"
        :cy="glow.y"
        r="8"
        fill="var(--animatedcircle-color)"
        stroke=""
        stroke-width="2"
        class="glow"
      />
    </svg>

    <!-- Подписи к точкам -->
    <div class="labels">
      <div
        v-for="(point, index) in points"
        :key="'label-' + index"
        v-show="isNearGlow(point)"
        class="label"
        :class="[point.labelPosition, { active: activeIndex === index }]"
        :style="{ left: point.x + 'px', top: point.y + 'px' }"
      >
        {{ point.label }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const width = 1140
const height = 300
const padding = 20
const cx = width / 2
const cy = height / 2
const rx = width / 2 - padding - 20
const ry = height / 2 - padding - 40
const pointCount = 12
const dottedCount = 360

const glow = ref({ x: cx, y: cy })
const activeIndex = ref(0)

function getLabelPosition(angle) {
  const deg = (angle * 180) / Math.PI
  if (deg >= -30 && deg <= 30) return 'right'
  if (deg >= 150 || deg <= -150) return 'left'
  if (deg > 30 && deg < 150) return 'top'
  return 'bottom'
}

const labels = computed(() =>
  Array.from({ length: pointCount }, (_, i) => ({
    title: `${t('timeline.item-list.item-1')} ${i + 1}`,
    description: `${t('timeline.item-list.description')} ${i + 1}`, // если будет
  })),
)

const points = computed(() =>
  labels.value.map((label, i) => {
    const angle = (2 * Math.PI * i) / pointCount
    return {
      angle,
      x: cx + rx * Math.cos(angle),
      y: cy - ry * Math.sin(angle),
      label: label.title,
      labelPosition: getLabelPosition(angle),
    }
  }),
)

const dottedLine = Array.from({ length: dottedCount }, (_, i) => {
  const angle = (2 * Math.PI * i) / dottedCount
  return {
    x: cx + rx * Math.cos(angle),
    y: cy - ry * Math.sin(angle),
  }
})

function isNearGlow(point, radius = 140) {
  const dx = glow.value.x - point.x
  const dy = glow.value.y - point.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance < radius
}

onMounted(() => {
  let angle = 0
  setInterval(() => {
    angle = (angle - 0.004 + 2 * Math.PI) % (2 * Math.PI)
    glow.value = {
      x: cx + rx * Math.cos(angle),
      y: cy - ry * Math.sin(angle),
    }

    let closest = -1
    let minDiff = Infinity
    points.value.forEach((p, i) => {
      const diff = Math.abs(p.angle - angle)
      if (diff < 0.2 && diff < minDiff) {
        closest = i
        minDiff = diff
      }
    })
    activeIndex.value = closest
  }, 30)
})
</script>
<style scoped>
.timeline {
  position: relative;
  width: 1140px;
  height: 360px;
  margin: 0 auto;
}

.timeline__ellipse {
  display: block;
  background-image: url(/src/assets/images/galaxy stars.svg);
}

.glow {
  filter: drop-shadow(0 0 6px var(--animatedcircle-color));
}

.labels {
  position: absolute;
  top: 1.625rem;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.label {
  position: absolute;
  font-size: 13px;
  color: var(--animatedtext-color);
  transform: translate(-50%, -50%);
  white-space: nowrap;
  transition: all 0.3s ease;
  text-align: center;
  width: 80px;
  opacity: 0.4;
}

.label.active {
  color: var(--animatedtext-active-color);
  font-weight: bold;
  opacity: 1;
}

.label.top {
  transform: translate(-50%, -120%);
}

.label.bottom {
  transform: translate(-50%, 120%);
}

.label.left {
  transform: translate(-110%, -50%);
  text-align: right;
}

.label.right {
  transform: translate(10%, -50%);
  text-align: left;
}

.timeline__background {
  position: absolute;
  margin-top: 5rem;
  width: 100%;
}

/* Плавное появление точек */
.fade {
  transition: opacity 0.4s ease;
}
</style>
