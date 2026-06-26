/**
 * lib/gsap.ts — Registro central de plugins GSAP
 *
 * Importar este módulo UNA VEZ en main.tsx para registrar los plugins.
 * Todos los demás módulos importan desde 'gsap' directamente.
 *
 * SplitText está disponible en GSAP v3+ (se maneja internamente).
 * ScrollTrigger requiere registro explícito.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro de plugins
gsap.registerPlugin(ScrollTrigger)

// Configuración global
gsap.config({
  // Deshabilitar todo movimiento si el usuario prefiere reducción
  // Decisión: la verificación de prefers-reduced-motion se hace en cada hook,
  // no aquí, para mayor control granular (algunos elementos pueden tener
  // animaciones sutiles de opacity que son aceptables incluso con la preferencia activa).
  nullTargetWarn: false,
})

export { gsap, ScrollTrigger }
