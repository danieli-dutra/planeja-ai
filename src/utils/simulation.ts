import type { SimulationFormData } from '@/data/simulation'

import { parseCurrency } from './currency'

export function calcMonthlySavings(data: SimulationFormData) {
  const income = data.income ?? '0'
  const expenses = data.expenses ?? '0'
  const debts = data.debts ?? '0'

  return (
    parseCurrency(income) -
    parseCurrency(expenses) -
    parseCurrency(debts)
  )
}