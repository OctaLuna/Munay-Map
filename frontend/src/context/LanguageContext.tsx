import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import type { Language } from '@/types'
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/data/languages.mock'
import { makeT, dirFor, type TFunc } from '@/i18n'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  /** Traduce una clave del diccionario al idioma actual (con interpolación de {vars}). */
  t: TFunc
  /** Dirección de escritura del idioma actual ('ltr' | 'rtl'). */
  dir: 'ltr' | 'rtl'
}

const STORAGE_KEY = 'munay-lang'

const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Lee el idioma persistido (si existe y es válido), o el idioma por defecto. */
function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const match = LANGUAGES.find((l) => l.code === saved)
      if (match) return match
    }
  }
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang.code)
    }
  }, [])

  // Mantener <html lang> y <html dir> sincronizados con el idioma (a11y + RTL)
  useEffect(() => {
    const root = document.documentElement
    root.lang = language.code
    root.dir = dirFor(language.code)
  }, [language])

  const t = useMemo<TFunc>(() => makeT(language.code), [language.code])
  const dir = dirFor(language.code)

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t, dir }),
    [language, setLanguage, t, dir]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

/** Atajo para componentes que solo necesitan la función de traducción. */
export function useT(): TFunc {
  return useLanguage().t
}
