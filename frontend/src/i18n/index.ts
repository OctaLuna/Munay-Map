/**
 * i18n — motor ligero de internacionalización de la UI (sin dependencias).
 *
 * Diseño:
 *  - Diccionarios planos por locale (clave con namespace por puntos → string).
 *  - Idiomas con traducción completa: `es` (origen) y `en`.
 *  - Cualquier otro código del selector (40 idiomas) cae con elegancia a `en`,
 *    y agregar un idioma nuevo es soltar un archivo en `locales/` y registrarlo
 *    en `DICTS`. (También podría autogenerarse vía el backend Gemini a futuro.)
 *  - Soporte RTL para árabe/hebreo/persa/urdu.
 *
 * Cadena de fallback por clave: locale → en → es → la propia clave.
 */
import { es } from './locales/es'
import { en } from './locales/en'

export type Dict = Record<string, string>

/** Locales con traducción completa autoría humana. */
const DICTS: Record<string, Dict> = { es, en }

/** Idiomas de escritura derecha-a-izquierda (por código base). */
export const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur'])

function baseOf(code: string): string {
  return code.split('-')[0] ?? code
}

/** Devuelve la clave de diccionario a usar para un código de idioma dado. */
export function dictKeyFor(code: string): string {
  if (DICTS[code]) return code
  const b = baseOf(code)
  if (DICTS[b]) return b
  return 'en'
}

/** Dirección de escritura para un código de idioma. */
export function dirFor(code: string): 'rtl' | 'ltr' {
  return RTL_LANGS.has(baseOf(code)) ? 'rtl' : 'ltr'
}

/** ¿El idioma tiene traducción completa de la UI (no cae a fallback)? */
export function isFullyTranslated(code: string): boolean {
  return Boolean(DICTS[code] ?? DICTS[baseOf(code)])
}

export type TFunc = (key: string, vars?: Record<string, string | number>) => string

/** Crea la función de traducción para un código de idioma. */
export function makeT(code: string): TFunc {
  const primary = DICTS[dictKeyFor(code)] ?? en
  return (key, vars) => {
    let value = primary[key] ?? en[key] ?? es[key] ?? key
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement))
      }
    }
    return value
  }
}
