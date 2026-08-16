import {
  CalendarClock,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react'
import { useParams } from 'react-router-dom'

import { AIInsightCard } from '@/components/features/SimulationResults/AIInsightCardProps'
import { Card } from '@/components/features/SimulationResults/Card'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>()
  const { getFormData } = useSimulationStorage()
  const data = id ? getFormData(id) : null

  if (!data) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
        <PageHero
          title="Nenhuma simulação encontrada"
          subtitle="Preencha o formulário para gerar um diagnóstico financeiro personalizado."
        />
      </main>
    )
  }

  const monthlySavings = calcMonthlySavings(data)

  const goalAmount = data.goalAmount ?? 'R$ 0,00'
  const goalName = data.goalName ?? 'Meta'
  const goalDeadline = data.goalDeadline ?? '0'
  const income = data.income ?? 'R$ 0,00'
  const expenses = data.expenses ?? 'R$ 0,00'
  const debts = data.debts ?? 'R$ 0,00'

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da Meta"
          value={goalAmount}
          subtitle={goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${goalDeadline} meses`}
          subtitle="Prazo para atingir a meta"
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Economia mensal"
          value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Valor disponível por mês"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightCard simulationId={id ?? data.id} />

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={income}
            subtitle="Renda total bruta por mês"
          />
          <Card
            icon={CreditCard}
            label="Custos Fixos de Vida"
            value={expenses}
            subtitle="Gastos essenciais por mês"
          />
          <Card
            icon={Landmark}
            label="Dívidas / Parcelas"
            value={debts}
            subtitle="Valor comprometido em parcelas"
          />
        </div>
      </div>
    </main>
  )
}