import type { Ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { nextTick, onUnmounted, ref, watch } from 'vue'

if (typeof window !== 'undefined')
  gsap.registerPlugin(ScrollTrigger)

const DURATION = 1.05
const STAGGER_UNIT = DURATION * 0.24
const EASE = 'power3.out'

/**
 * Homepage sections below Hero — same GSAP + ScrollTrigger style as wrxinyue.org
 * (e.g. gsap.from / timeline + scrollTrigger: { trigger, start: 'top bottom', toggleActions }).
 */
export function useHomeSectionReveal(sectionRef: Ref<HTMLElement | null>) {
  const isRevealed = ref(false)
  let ctx: gsap.Context | null = null

  watch(
    () => sectionRef.value,
    (el) => {
      ctx?.revert()
      ctx = null

      if (!el || typeof window === 'undefined')
        return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        isRevealed.value = true
        el.classList.add('nova-home-below-hero--in-view')
        return
      }

      ctx = gsap.context(() => {
        const animated: Element[] = []
        const getStarted = el.classList.contains('get-started-section')

        const tl = gsap.timeline({
          onComplete: () => {
            el.classList.add('nova-home-below-hero--in-view')
            isRevealed.value = true
            gsap.set(animated, { clearProps: 'transform,opacity' })
          },
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            toggleActions: 'play none none none',
          },
        })

        const fromTo = (
          targets: Element | Element[] | null,
          fromVars: gsap.TweenVars,
          tier: number,
        ) => {
          if (!targets)
            return
          const list = (Array.isArray(targets) ? targets : [targets]).filter(Boolean) as Element[]
          if (!list.length)
            return
          animated.push(...list)
          const toVars: gsap.TweenVars = {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: DURATION,
            ease: EASE,
          }
          tl.fromTo(list, fromVars, toVars, STAGGER_UNIT * (tier - 1))
        }

        if (getStarted) {
          fromTo(el.querySelector('.framework-row'), { opacity: 0, y: '2em' }, 1)
          fromTo(el.querySelector('.heading span'), {
            rotation: 30,
            y: '2em',
            opacity: 0,
            transformOrigin: '0 100%',
          }, 2)
          fromTo(el.querySelector('.subheading span'), { opacity: 0, y: '2em' }, 3)
          fromTo(el.querySelector('.actions'), { opacity: 0, y: '2em' }, 4)
        }
        else {
          fromTo(el.querySelector('.subtitle'), { opacity: 0, y: '2em' }, 1)
          fromTo(el.querySelector('.title span'), {
            rotation: 30,
            y: '2em',
            opacity: 0,
            transformOrigin: '0 100%',
          }, 2)
          const copy = el.querySelector('.description p') ?? el.querySelector('.text p')
          fromTo(copy, { opacity: 0, y: '2em' }, 3)
          fromTo(el.querySelector('.nova-home-below-hero__block'), { opacity: 0, y: '2em' }, 4)
        }

        void nextTick(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })
        })
      }, el)
    },
    { flush: 'post', immediate: true },
  )

  onUnmounted(() => {
    ctx?.revert()
  })

  return { isRevealed }
}
