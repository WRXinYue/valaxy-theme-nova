<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { PRISM_FRAGMENT_SHADER, PRISM_VERTEX_SHADER } from './nova-hero-prism-shaders'

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const webglReady = ref(false)

let raf = 0
let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let positionBuffer: WebGLBuffer | null = null
let uTime: WebGLUniformLocation | null = null
let uResolution: WebGLUniformLocation | null = null
let uMouse: WebGLUniformLocation | null = null
let positionLocation = -1

const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
let startTime = 0
let hostEl: HTMLElement | null = null
let resizeObs: ResizeObserver | null = null

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
  const shader = glCtx.createShader(type)
  if (!shader)
    return null
  glCtx.shaderSource(shader, source)
  glCtx.compileShader(shader)
  if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
    console.error('[NovaHeroPrism]', glCtx.getShaderInfoLog(shader))
    glCtx.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(glCtx: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = glCtx.createProgram()
  if (!prog)
    return null
  glCtx.attachShader(prog, vs)
  glCtx.attachShader(prog, fs)
  glCtx.linkProgram(prog)
  if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS)) {
    console.error('[NovaHeroPrism]', glCtx.getProgramInfoLog(prog))
    glCtx.deleteProgram(prog)
    return null
  }
  return prog
}

function resize() {
  const canvas = canvasRef.value
  const host = hostEl
  if (!canvas || !host || !gl)
    return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.floor(host.clientWidth * dpr))
  const h = Math.max(1, Math.floor(host.clientHeight * dpr))
  canvas.width = w
  canvas.height = h
  gl.viewport(0, 0, w, h)
}

function onHostMouseMove(e: MouseEvent) {
  if (!hostEl)
    return
  const rect = hostEl.getBoundingClientRect()
  mouse.targetX = (e.clientX - rect.left) / rect.width
  mouse.targetY = 1 - (e.clientY - rect.top) / rect.height
}

function render() {
  if (!gl || !program)
    return

  const currentTime = (performance.now() - startTime) * 0.001
  mouse.x += (mouse.targetX - mouse.x) * 0.05
  mouse.y += (mouse.targetY - mouse.y) * 0.05

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)

  gl.uniform1f(uTime, currentTime)
  gl.uniform2f(uResolution, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.uniform2f(uMouse, mouse.x, mouse.y)

  gl.enableVertexAttribArray(positionLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  raf = requestAnimationFrame(render)
}

function teardown() {
  cancelAnimationFrame(raf)
  raf = 0
  resizeObs?.disconnect()
  resizeObs = null
  if (hostEl)
    hostEl.removeEventListener('mousemove', onHostMouseMove)
  hostEl = null

  if (gl && program) {
    gl.deleteProgram(program)
    program = null
  }
  if (gl && positionBuffer) {
    gl.deleteBuffer(positionBuffer)
    positionBuffer = null
  }
  gl = null
  webglReady.value = false
}

onMounted(() => {
  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas)
    return

  hostEl = root.closest('.nova-hero')
  if (!hostEl)
    return

  if (prefersReducedMotion())
    return

  gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    || canvas.getContext('experimental-webgl', { alpha: false, antialias: false }) as WebGLRenderingContext | null

  if (!gl) {
    console.warn('[NovaHeroPrism] WebGL not available')
    return
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, PRISM_VERTEX_SHADER)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, PRISM_FRAGMENT_SHADER)
  if (!vs || !fs) {
    gl = null
    return
  }

  program = createProgram(gl, vs, fs)
  gl.deleteShader(vs)
  gl.deleteShader(fs)

  if (!program) {
    gl = null
    return
  }

  uTime = gl.getUniformLocation(program, 'uTime')
  uResolution = gl.getUniformLocation(program, 'uResolution')
  uMouse = gl.getUniformLocation(program, 'uMouse')
  positionLocation = gl.getAttribLocation(program, 'position')

  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  startTime = performance.now()
  hostEl.addEventListener('mousemove', onHostMouseMove)

  resize()
  resizeObs = new ResizeObserver(() => resize())
  resizeObs.observe(hostEl)

  window.addEventListener('resize', resize)

  webglReady.value = true
  raf = requestAnimationFrame(render)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  teardown()
})
</script>

<template>
  <div ref="rootRef" class="nova-hero-prism">
    <div class="nova-hero-prism__fallback" aria-hidden="true" />
    <canvas
      ref="canvasRef"
      class="nova-hero-prism__canvas"
      :class="{ 'nova-hero-prism__canvas--ready': webglReady }"
      aria-hidden="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.nova-hero-prism {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.nova-hero-prism__fallback {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 80% at 50% 100%, hsla(271, 60%, 22%, 0.9) 0%, transparent 55%),
    radial-gradient(90% 60% at 10% 20%, hsla(195, 70%, 18%, 0.85) 0%, transparent 50%),
    radial-gradient(70% 50% at 90% 30%, hsla(300, 45%, 20%, 0.75) 0%, transparent 45%), hsla(240, 35%, 6%, 1);
}

.nova-hero-prism__canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.45s ease;

  &--ready {
    opacity: 1;
  }
}
</style>
