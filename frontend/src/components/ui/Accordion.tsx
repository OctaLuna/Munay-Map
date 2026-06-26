import { useState, useRef, useId } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'

export interface AccordionItem {
  id?: string
  titulo: string
  contenido: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Permite múltiples ítems abiertos simultáneamente */
  multiple?: boolean
  className?: string
}

interface AccordionItemComponentProps {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

/** Ítem individual del acordeón — animación 7 (GSAP height) */
function AccordionItemComponent({ item, isOpen, onToggle, index }: AccordionItemComponentProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const itemId = useId()
  const headerId = `accordion-header-${itemId}-${index}`
  const panelId = `accordion-panel-${itemId}-${index}`

  const handleToggle = () => {
    const body = bodyRef.current
    const icon = iconRef.current
    if (!body) return

    const reduced = prefersReducedMotion()

    if (!isOpen) {
      // Abrir
      body.style.display = 'block'
      const fullHeight = body.scrollHeight
      body.style.overflow = 'hidden'

      if (reduced) {
        body.style.height = `${fullHeight}px`
      } else {
        gsap.fromTo(
          body,
          { height: 0, opacity: 0 },
          {
            height: fullHeight,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              body.style.height = 'auto'
              body.style.overflow = 'visible'
            },
          }
        )
        if (icon) {
          gsap.to(icon, { rotation: 45, duration: 0.3, ease: 'power2.out' })
        }
      }
    } else {
      // Cerrar
      const fullHeight = body.scrollHeight
      body.style.overflow = 'hidden'
      body.style.height = `${fullHeight}px`

      if (reduced) {
        body.style.display = 'none'
        body.style.height = '0'
      } else {
        gsap.to(body, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            body.style.display = 'none'
          },
        })
        if (icon) {
          gsap.to(icon, { rotation: 0, duration: 0.3, ease: 'power2.in' })
        }
      }
    }

    onToggle()
  }

  return (
    <div className="border-b border-neutral/20 last:border-0">
      <h3>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          className={cn(
            'flex w-full items-center justify-between gap-4 py-5 text-left',
            'font-sans text-base font-medium text-dark',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            'transition-colors duration-150 hover:text-primary'
          )}
        >
          <span>{item.titulo}</span>
          <svg
            ref={iconRef}
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-neutral"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>
      </h3>
      <div
        ref={bodyRef}
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        style={{ display: isOpen ? 'block' : 'none' }}
        className="pb-5 text-neutral font-sans text-sm leading-relaxed"
      >
        {item.contenido}
      </div>
    </div>
  )
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!multiple) next.clear()
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className={cn('rounded-xl border border-neutral/20 bg-surface px-5', className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id ?? index}
          item={item}
          isOpen={openItems.has(index)}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  )
}
