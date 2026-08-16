import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

const baseClasses =
  'flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

const variantClasses = {
  primary: 'rounded-xl bg-primary font-semibold text-primary-foreground',
  secondary: 'rounded-3xl border border-border bg-secondary-button',
  ghost: 'rounded-lg text-foreground',
} satisfies Record<ButtonProps['variant'], string>

export function Button({
  variant,
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[baseClasses, variantClasses[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
