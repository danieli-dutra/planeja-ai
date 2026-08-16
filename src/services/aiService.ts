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

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL_NAME = 'gemini-2.5-flash'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

async function callGeminiAPI(prompt: string) {
  if (!API_KEY || API_KEY === 'undefined') {
    throw new Error('VITE_GEMINI_API_KEY não configurada.')
  }

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export async function getInsight(prompt: string) {
  const response = await callGeminiAPI(prompt)
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('Resposta vazia da IA.')
  }

  const cleanJson = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim()

  return JSON.parse(cleanJson) as InsightData
}
