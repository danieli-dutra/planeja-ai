import * as Slider from '@radix-ui/react-slider'
import { useMemo, useState } from 'react'

import type { SimulationFormData } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'
import { calcMonthlySavings } from '@/utils/simulation'

interface GoalSimulatorProps {
  data: SimulationFormData
}

export function GoalSimulator({ data }: GoalSimulatorProps) {
  const monthlySavings = calcMonthlySavings(data)
  const goalAmount = parseCurrency(data.goalAmount)
  const originalDeadline = Number(data.goalDeadline)

  const initialSavings = Math.max(monthlySavings, 0)

  const minSavings = Math.max(50, Math.floor(initialSavings * 0.5))
  const maxSavings = Math.max(
    minSavings + 100,
    Math.ceil(initialSavings * 2),
  )

  const [simulatedSavings, setSimulatedSavings] = useState(initialSavings)

  const estimatedMonths = useMemo(() => {
    if (simulatedSavings <= 0 || goalAmount <= 0) {
      return null
    }

    return Math.ceil(goalAmount / simulatedSavings)
  }, [goalAmount, simulatedSavings])

  const monthsDifference =
    estimatedMonths !== null ? originalDeadline - estimatedMonths : 0

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <section className="mb-6 rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
          🎯 Simule seu prazo
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Descubra como uma mudança na sua economia mensal pode afetar o tempo
          necessário para alcançar sua meta.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Quanto você conseguiria guardar por mês?
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(simulatedSavings)}
              </p>
            </div>

            <p className="text-right text-xs text-muted-foreground">
              Atual: {formatCurrency(initialSavings)}
            </p>
          </div>

          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            value={[simulatedSavings]}
            min={minSavings}
            max={maxSavings}
            step={50}
            onValueChange={([value]) => {
              if (value !== undefined) {
                setSimulatedSavings(value)
              }
            }}
            aria-label="Economia mensal simulada"
          >
            <Slider.Track className="relative h-2 grow overflow-hidden rounded-full bg-muted">
              <Slider.Range className="absolute h-full bg-primary" />
            </Slider.Track>

            <Slider.Thumb
              className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Valor da economia mensal"
            />
          </Slider.Root>

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(minSavings)}</span>
            <span>{formatCurrency(maxSavings)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-muted/40 p-5">
          {estimatedMonths !== null ? (
            <>
              <p className="text-sm text-muted-foreground">
                Prazo estimado para alcançar sua meta
              </p>

              <p className="mt-1 text-3xl font-semibold">
                {estimatedMonths}{' '}
                <span className="text-base font-normal text-muted-foreground">
                  {estimatedMonths === 1 ? 'mês' : 'meses'}
                </span>
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Com {formatCurrency(simulatedSavings)} por mês, você chegaria
                aos {formatCurrency(goalAmount)} da meta{' '}
                {monthsDifference > 0
                  ? `${monthsDifference} ${
                      monthsDifference === 1 ? 'mês' : 'meses'
                    } antes do prazo informado.`
                  : monthsDifference < 0
                    ? `${Math.abs(monthsDifference)} ${
                        Math.abs(monthsDifference) === 1 ? 'mês' : 'meses'
                      } depois do prazo informado.`
                    : 'exatamente dentro do prazo informado.'}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aumente sua economia mensal para simular um prazo para alcançar
              sua meta.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}