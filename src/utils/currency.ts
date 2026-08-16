export function formatCurrencyMask(value: string): string {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  const number = Number.parseInt(digits, 10) / 100

  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseCurrency(value: string): number {
  const normalized = value
    .replace(/R\$/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim()

  return Number.parseFloat(normalized) || 0
}