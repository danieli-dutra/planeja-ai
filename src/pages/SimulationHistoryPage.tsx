import { ArrowRight, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/shared/Button'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllFormData, deleteFormData } = useSimulationStorage()
  const simulations = getAllFormData()

  if (!simulations.length) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <PageHero
          title="Histórico de simulações"
          subtitle="Ainda não há registros salvos. Faça sua primeira simulação para ver o histórico."
        />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Revise seus diagnósticos anteriores e acesse cada detalhe com um clique."
      />

      <div className="space-y-4">
        {simulations.map((simulation) => {
          const monthlySavings = calcMonthlySavings(simulation)

          return (
            <div
              key={simulation.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Meta
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">
                    {simulation.goalName ?? 'Meta sem nome'}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Prazo: {simulation.goalDeadline ?? '0'} meses • Economia mensal: R${' '}
                    {monthlySavings.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    className="rounded-xl"
                    onClick={() => void navigate(`/resultado/${simulation.id}`)}
                  >
                    Ver detalhes
                    <ArrowRight size={16} />
                  </Button>

                  <Button
                    variant="ghost"
                    className="rounded-xl border border-red-200 text-red-500 hover:opacity-80"
                    onClick={() => {
                      deleteFormData(simulation.id)
                      window.location.reload()
                    }}
                  >
                    <Trash2 size={16} />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
