import { useState, useRef, useEffect, useId } from 'react'
import { LANGUAGES } from '@/data/languages.mock'
import { useLanguage } from '@/context/LanguageContext'
import { normalizeForSearch } from '@/lib/utils'
import type { Language } from '@/types'

/**
 * LanguageSwitcher — dropdown buscable con 40 idiomas
 * Usa <dialog> posicionado como popover para evitar clipping en overflow.
 * Patrón: posición absoluta con detección de espacio disponible.
 */
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()
  const inputId = useId()

  const filtered = LANGUAGES.filter(
    (l) =>
      normalizeForSearch(l.nombre).includes(normalizeForSearch(query)) ||
      normalizeForSearch(l.nombreEs).includes(normalizeForSearch(query)) ||
      l.code.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (lang: Language) => {
    setLanguage(lang)
    setOpen(false)
    setQuery('')
    buttonRef.current?.focus()
  }

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !dialogRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Foco al input cuando abre
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  // Cerrar con Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      buttonRef.current?.focus()
    }
  }

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-neutral/20 bg-surface px-3 py-1.5 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span aria-hidden="true" className="text-base leading-none">{language.bandera}</span>
        <span className="hidden sm:inline">{language.code.toUpperCase()}</span>
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 text-neutral transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
        </svg>
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label={t('nav.aria.language')}
          className="absolute right-0 top-full z-[var(--z-dropdown,100)] mt-2 w-64 rounded-xl border border-neutral/20 bg-surface shadow-[0_4px_16px_rgba(34,28,24,0.15)]"
          style={{ zIndex: 100 }}
        >
          {/* Buscador */}
          <div className="border-b border-neutral/15 p-2">
            <label htmlFor={inputId} className="sr-only">
              {t('nav.language.searchLabel')}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('nav.language.search')}
              autoComplete="off"
              className="w-full rounded-lg border border-neutral/20 bg-background px-3 py-1.5 text-sm text-dark placeholder:text-neutral/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Lista */}
          <ul
            id={listboxId}
            role="listbox"
            aria-label={t('nav.language.available')}
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral/60">{t('nav.language.empty')}</li>
            )}
            {filtered.map((lang) => (
              <li key={lang.code} role="option" aria-selected={lang.code === language.code}>
                <button
                  onClick={() => handleSelect(lang)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-primary/8 ${
                    lang.code === language.code
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-dark'
                  }`}
                >
                  <span aria-hidden="true" className="text-base">{lang.bandera}</span>
                  <span>{lang.nombreEs}</span>
                  <span className="ml-auto text-xs text-neutral/60">{lang.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
