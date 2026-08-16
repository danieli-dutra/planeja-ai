import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'
import { useState, type ChangeEvent, type SyntheticEvent } from 'react'

import { Button } from '@/components/shared/Button'
import { Input, type InputProps } from '@/components/shared/Input'
import { formatCurrencyMask } from '@/utils/currency'

export interface FormStepProps {
  id: string
  icon: LucideIcon
  title: string
  question: string
  inputProps: InputProps
  submitButtonProps?: {
    label: string
    emojiIcon?: string
  }
}

interface ActionsButtonsProps {
  onBack: () => void
  onNext: (value: string) => void
  hideBackButton?: boolean
}

export function FormStep({
  id,
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  hideBackButton,
  onBack,
  onNext,
}: FormStepProps & ActionsButtonsProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextValue = inputValue.trim()

    if (!nextValue) {
      return
    }

    onNext(nextValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (inputProps.prefix === 'R$') {
      setInputValue(formatCurrencyMask(value))
      return
    }

    setInputValue(value)
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{question}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          {...inputProps}
          key={id}
          value={inputValue}
          onChange={handleInputChange}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {!hideBackButton && (
            <Button
              type="button"
              variant="ghost"
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Voltar
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            className="order-1 flex-1 sm:order-2"
            disabled={!inputValue.trim()}
          >
            {submitButtonProps?.label ?? 'Próximo'}
            {submitButtonProps?.emojiIcon ? (
              <span>{submitButtonProps.emojiIcon}</span>
            ) : (
              <ArrowRight size={16} />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}