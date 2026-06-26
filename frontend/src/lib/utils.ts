/**
 * utils.ts — Utilidades generales del proyecto
 */
import { type ClassValue, clsx } from 'clsx'

/** Combina clases Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/** Simula un delay de red para mocks realistas */
export function mockDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Formatea un número con separador de miles */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-BO').format(n)
}

/** Trunca texto a N caracteres */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

/** Normaliza texto para búsqueda (minúsculas, sin tildes) */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Verifica si el usuario prefiere reducción de movimiento */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
