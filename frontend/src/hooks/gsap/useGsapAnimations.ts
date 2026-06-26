import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

interface GsapRevealOptions {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
}

/**
 * useGsapReveal — patrón 3/10
 * Revela un elemento con fade + desplazamiento vertical al entrar en viewport.
 * Con prefers-reduced-motion: solo fade (sin desplazamiento).
 */
export function useGsapReveal(options: GsapRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = prefersReducedMotion()
    const { y = 40, opacity = 0, duration = 0.7, delay = 0, ease = 'power3.out', start = 'top 85%' } = options

    // Estado inicial — el elemento siempre es visible por defecto (accesibilidad)
    // La animación lo oculta temporalmente para el reveal
    gsap.set(el, { opacity: reduced ? 1 : opacity, y: reduced ? 0 : y })

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.001 : duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [options.y, options.opacity, options.duration, options.delay, options.ease, options.start])

  return ref
}

interface ParallaxLayerOptions {
  yPercent?: number
  scrub?: number | boolean
}

/**
 * useParallaxLayer — patrón 1
 * Parallax de desplazamiento vertical ligado al scroll.
 * Con prefers-reduced-motion: sin movimiento.
 */
export function useParallaxLayer(options: ParallaxLayerOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const { yPercent = -20, scrub = 1 } = options

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      })
    })

    return () => ctx.revert()
  }, [options.yPercent, options.scrub])

  return ref
}

interface CounterUpOptions {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

/**
 * useCounterUp — patrón 6
 * Anima un número de 0 hasta `target` al entrar en viewport.
 */
export function useCounterUp(options: CounterUpOptions) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { target, duration = 2, suffix = '', prefix = '', decimals = 0 } = options

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`
      return
    }

    const obj = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
        },
        onComplete: () => {
          el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`
        },
      })
    })

    return () => ctx.revert()
  }, [options.target, options.duration, options.suffix, options.prefix, options.decimals])

  return ref
}

interface ClipPathRevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  start?: string
}

/**
 * useClipPathReveal — patrón 2
 * Revela un elemento con clip-path animado al entrar en viewport.
 * Con prefers-reduced-motion: fade directo.
 */
export function useClipPathReveal(options: ClipPathRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { direction = 'up', duration = 1.2, start = 'top 80%' } = options
    const reduced = prefersReducedMotion()

    const clipStart: Record<string, string> = {
      up: 'inset(100% 0 0 0)',
      down: 'inset(0 0 100% 0)',
      left: 'inset(0 100% 0 0)',
      right: 'inset(0 0 0 100%)',
    }

    const startClip = clipStart[direction] ?? clipStart['up']

    if (reduced) {
      gsap.set(el, { opacity: 0 })
      gsap.to(el, {
        opacity: 1,
        duration: 0.4,
        scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
      })
      return
    }

    gsap.set(el, { clipPath: startClip })

    const ctx = gsap.context(() => {
      gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [options.direction, options.duration, options.start])

  return ref
}

/**
 * useSplitTextReveal — patrón 3
 * Anima texto palabra por palabra con stagger.
 * Con prefers-reduced-motion: sin animación.
 * NOTA: GSAP SplitText es premium. Implementación manual con spans.
 */
export function useSplitTextReveal(options: { stagger?: number; duration?: number; delay?: number } = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const { stagger = 0.05, duration = 0.6, delay = 0 } = options

    // Split manual por palabras
    const originalText = el.textContent ?? ''
    const words = originalText.split(' ')

    el.innerHTML = words
      .map((word) => `<span class="gsap-word" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="gsap-word-inner" style="display:inline-block;transform:translateY(110%)">${word}</span></span>`)
      .join(' ')

    const inners = el.querySelectorAll<HTMLElement>('.gsap-word-inner')

    const ctx = gsap.context(() => {
      gsap.to(inners, {
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => {
      ctx.revert()
      el.textContent = originalText
    }
  }, [options.stagger, options.duration, options.delay])

  return ref
}

/** Refresca ScrollTrigger después de que el DOM cambie */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
