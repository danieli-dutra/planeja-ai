import type { SimulationFormData } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'
import { parseCurrency } from '@/utils/currency'

interface FinancialSummaryProps {
  data: SimulationFormData
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  const income = parseCurrency(data.income)
  const expenses = parseCurrency(data.expenses)
  const debts = parseCurrency(data.debts)

  const monthlySavings = calcMonthlySavings(data)

  const committedAmount = expenses + debts

  const commitmentPercentage =
    income > 0 ? (committedAmount / income) * 100 : 0

  const goalAmount = parseCurrency(data.goalAmount)
  const goalDeadline = Number(data.goalDeadline)

  const requiredMonthlySavings =
    goalDeadline > 0 ? goalAmount / goalDeadline : 0

  const difference = monthlySavings - requiredMonthlySavings

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const isGoalPossible = difference >= 0

  return (
    <section className="mb-6 rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
          📊 Análise da sua meta
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Uma visão rápida sobre sua capacidade de alcançar o objetivo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Comprometimento da renda
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {commitmentPercentage.toFixed(0)}%
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${Math.min(commitmentPercentage, 100)}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Custos fixos + dívidas
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Necessário por mês
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {formatCurrency(requiredMonthlySavings)}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Para atingir "{data.goalName}" em {goalDeadline} meses
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Sua capacidade atual
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {formatCurrency(monthlySavings)}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Valor disponível após os compromissos mensais
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-muted/40 p-4">
        <p className="text-sm font-medium">
          {isGoalPossible
            ? `✓ Sua capacidade atual é suficiente para atingir sua meta no prazo informado.`
            : `⚠ Para atingir sua meta no prazo informado, seria necessário economizar mais ${formatCurrency(
                Math.abs(difference),
              )} por mês.`}
        </p>
      </div>
    </section>
  )
}