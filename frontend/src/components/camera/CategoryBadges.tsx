const CATEGORIES = [
  {
    label: 'Sitios turísticos',
    icon: (
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {/* Columna/monumento */}
        <rect x="3" y="5" width="2" height="8" rx="0.5" />
        <rect x="7" y="3" width="2" height="10" rx="0.5" />
        <rect x="11" y="6" width="2" height="7" rx="0.5" />
        <line x1="1.5" y1="13" x2="14.5" y2="13" strokeLinecap="round" />
        <line x1="2" y1="5" x2="14" y2="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Gastronomía y bebidas',
    icon: (
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {/* Plato y cubiertos */}
        <circle cx="8" cy="9" r="5" />
        <line x1="3" y1="2" x2="3" y2="6" strokeLinecap="round" />
        <line x1="3" y1="6" x2="5" y2="8" strokeLinecap="round" />
        <line x1="13" y1="2" x2="13" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Danzas y folklore',
    icon: (
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {/* Figura bailando */}
        <circle cx="8" cy="3" r="1.5" />
        <line x1="8" y1="4.5" x2="8" y2="9" strokeLinecap="round" />
        <line x1="5" y1="6.5" x2="11" y2="6.5" strokeLinecap="round" />
        <line x1="8" y1="9" x2="5.5" y2="13" strokeLinecap="round" />
        <line x1="8" y1="9" x2="10.5" y2="13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Tradiciones y festividades',
    icon: (
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {/* Estrella / festividad */}
        <polygon
          points="8,1.5 9.5,6 14.5,6 10.5,9 12,13.5 8,10.5 4,13.5 5.5,9 1.5,6 6.5,6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const

/**
 * CategoryBadges — chips informativos que muestran los tipos de contenido detectables.
 * Usa iconos SVG inline (sin emojis).
 */
export function CategoryBadges() {
  return (
    <div aria-label="Categorías que puede identificar la IA">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral/70 font-sans">
        Categorías detectables
      </p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral/20 bg-surface px-3 py-1 text-xs font-medium text-dark font-sans"
          >
            {icon}
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
