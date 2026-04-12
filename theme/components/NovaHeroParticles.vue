<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let particleCount = 0

class Particle {
  w = 0
  h = 0
  x = 0
  y = 0
  speed = 0.1
  opacity = 1
  fadeDelay = 100
  fadeStart = 0
  fadingOut = false

  constructor(width: number, height: number) {
    this.w = width
    this.h = height
    this.reset()
    this.y = Math.random() * height
    this.fadeDelay = Math.random() * 600 + 100
    this.fadeStart = Date.now() + this.fadeDelay
    this.fadingOut = false
  }

  reset() {
    this.x = Math.random() * this.w
    this.y = Math.random() * this.h
    this.speed = Math.random() / 5 + 0.1
    this.opacity = 1
    this.fadeDelay = Math.random() * 600 + 100
    this.fadeStart = Date.now() + this.fadeDelay
    this.fadingOut = false
  }

  update() {
    this.y -= this.speed
    if (this.y < 0)
      this.reset()

    if (!this.fadingOut && Date.now() > this.fadeStart)
      this.fadingOut = true

    if (this.fadingOut) {
      this.opacity -= 0.008
      if (this.opacity <= 0)
        this.reset()
    }
  }

  draw(c: CanvasRenderingContext2D) {
    const t = 255 - (Math.random() * 255) / 2
    c.fillStyle = `rgba(${t}, 255, 255, ${this.opacity})`
    c.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1)
  }
}

function calcCount(w: number, h: number) {
  return Math.floor((w * h) / 6000)
}

function resize() {
  const canvas = canvasRef.value
  const host = canvas?.closest('.nova-hero')
  if (!canvas || !host || !ctx)
    return
  const w = Math.max(1, host.clientWidth)
  const h = Math.max(1, host.clientHeight)
  canvas.width = w
  canvas.height = h
  particleCount = Math.max(8, calcCount(w, h))
  particles = []
  for (let i = 0; i < particleCount; i++)
    particles.push(new Particle(w, h))
}

function loop() {
  const canvas = canvasRef.value
  if (!ctx || !canvas)
    return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const p of particles) {
    p.update()
    p.draw(ctx)
  }
  raf = requestAnimationFrame(loop)
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

let ro: ResizeObserver | null = null

onMounted(async () => {
  if (prefersReducedMotion())
    return
  await nextTick()
  const canvas = canvasRef.value
  if (!canvas)
    return
  ctx = canvas.getContext('2d')
  if (!ctx)
    return
  resize()
  ro = new ResizeObserver(() => resize())
  const host = canvas.closest('.nova-hero')
  if (host)
    ro.observe(host)
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="nova-hero-particles"
    aria-hidden="true"
  />
</template>

<style scoped>
.nova-hero-particles {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  animation: nova-hero-particles-in 0.5s ease-out 0.2s forwards;
}

@keyframes nova-hero-particles-in {
  to {
    opacity: 1;
  }
}
</style>
