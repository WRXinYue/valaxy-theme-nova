<script setup lang="ts">
import gsap from 'gsap'
import { useAppStore } from 'valaxy'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { SITE_LOADER_SEEN_KEY } from '../composables/siteLoader'

const LOADER_REPEAT_TIME_SCALE = 2.8

const appStore = useAppStore()
const rootRef = ref<HTMLElement | null>(null)
const accelerated = ref(false)

const PATH_INITIAL = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z'
const PATH_CURVE = 'M0 502S175 272 500 272s500 230 500 230V0H0Z'
const PATH_FLAT = 'M0 2S175 1 500 1s500 1 500 1V0H0Z'

const BODY_CLASS = 'nova-preload-active'

function markLoaderSeen() {
  try {
    sessionStorage.setItem(SITE_LOADER_SEEN_KEY, '1')
  }
  catch {
    /* ignore */
  }
}

onMounted(async () => {
  const isRepeatVisit
    = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SITE_LOADER_SEEN_KEY) === '1'
  accelerated.value = isRepeatVisit

  document.body.classList.add(BODY_CLASS)
  await nextTick()

  const svgPath = document.querySelector<SVGPathElement>('#nova-site-loader-path')
  const wrap = rootRef.value
  if (!svgPath || !wrap) {
    markLoaderSeen()
    appStore.showLoading = false
    document.body.classList.remove(BODY_CLASS)
    return
  }

  svgPath.setAttribute('d', PATH_INITIAL)

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    paused: true,
    onComplete: () => {
      markLoaderSeen()
      appStore.showLoading = false
    },
  })

  tl.timeScale(isRepeatVisit ? LOADER_REPEAT_TIME_SCALE : 1)

  tl.to('.nova-site-loader .load-text', {
    delay: 0.5,
    y: -100,
    opacity: 0,
    duration: 0.45,
    ease: 'power2.out',
  })

  tl.to(svgPath, {
    duration: 0.5,
    attr: { d: PATH_CURVE },
    ease: 'power2.in',
  })

  tl.to(svgPath, {
    duration: 0.5,
    attr: { d: PATH_FLAT },
    ease: 'power2.out',
  })

  tl.to(wrap, {
    y: typeof window !== 'undefined' ? -Math.max(window.innerHeight * 1.5, 900) : -1500,
    duration: 0.55,
    ease: 'power2.in',
  })

  tl.set(wrap, {
    zIndex: -1,
    display: 'none',
  })

  tl.play()
})

onUnmounted(() => {
  document.body.classList.remove(BODY_CLASS)
})
</script>

<template>
  <div
    ref="rootRef"
    class="nova-site-loader"
    :class="{ 'nova-site-loader--dark': appStore.isDark }"
    aria-busy="true"
    aria-live="polite"
  >
    <svg class="nova-site-loader__svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <path id="nova-site-loader-path" :d="PATH_INITIAL" />
    </svg>

    <div class="nova-site-loader__heading">
      <div class="load-text">
        <span v-for="(ch, i) in 'Loading'.split('')" :key="i">{{ ch }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nova-site-loader {
  position: fixed;
  z-index: 2147483646;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: transparent;
  pointer-events: auto;

  &__svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 110vh;
    fill: hsla(0, 0%, 98%, 1);
  }

  &__heading {
    position: relative;
    z-index: 2;
  }

  .load-text {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.02em;
    font-size: clamp(1.125rem, 4.5vw, 2rem);
    font-weight: 300;
    letter-spacing: 0.55em;
    text-transform: uppercase;
    color: hsla(240, 2%, 12%, 1);
    text-indent: 0.55em;

    span {
      display: inline-block;
      animation: nova-loader-letter 1s infinite alternate;
    }

    span:nth-child(1) {
      animation-delay: 0s;
    }
    span:nth-child(2) {
      animation-delay: 0.1s;
    }
    span:nth-child(3) {
      animation-delay: 0.2s;
    }
    span:nth-child(4) {
      animation-delay: 0.3s;
    }
    span:nth-child(5) {
      animation-delay: 0.4s;
    }
    span:nth-child(6) {
      animation-delay: 0.5s;
    }
    span:nth-child(7) {
      animation-delay: 0.6s;
    }
  }

  .load-text--accelerated span {
    animation-duration: 0.35s;
  }

  &--dark &__svg {
    fill: hsla(0, 0%, 5%, 1);
  }

  &--dark .load-text {
    color: hsla(0, 0%, 100%, 1);
  }
}

@keyframes nova-loader-letter {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.35;
  }
}
</style>
