import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'elevated' | 'dark'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  as?: React.ElementType
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface border border-neutral/20 text-dark',
  elevated: 'bg-surface text-dark shadow-[0_2px_8px_rgba(34,28,24,0.10)]',
  dark: 'bg-dark text-surface',
}

export function Card({ variant = 'default', as: Tag = 'div', className, children, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  )
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2'
}

export function CardImage({ aspectRatio = '16/9', className, alt = '', ...props }: CardImageProps) {
  const aspectMap = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  }
  return (
    <div className={cn('overflow-hidden', aspectMap[aspectRatio])}>
      <img
        alt={alt}
        className={cn('h-full w-full object-cover transition-transform duration-300', className)}
        {...props}
      />
    </div>
  )
}
