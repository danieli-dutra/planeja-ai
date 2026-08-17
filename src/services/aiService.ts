export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

async function callInsightAPI(prompt: string): Promise<GeminiResponse> {
  const response = await fetch('/api/insight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string
    } | null

    throw new Error(data?.error ?? `Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export async function getInsight(prompt: string): Promise<InsightData> {
  const response = await callInsightAPI(prompt)

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('Resposta vazia da IA.')
  }

  const cleanJson = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim()

  try {
    return JSON.parse(cleanJson) as InsightData
  } catch (error) {
    console.error('Erro ao fazer JSON.parse:', error)

    throw new Error('A IA retornou uma resposta em formato inválido.', {
      cause: error,
    })
  }
}