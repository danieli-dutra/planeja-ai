import type { VercelRequest, VercelResponse } from '@vercel/node'

const API_KEY = process.env.GEMINI_API_KEY
const MODEL_NAME = 'gemini-2.5-flash'

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({
      error: 'Método não permitido.',
    })
  }

  if (!API_KEY) {
    return response.status(500).json({
      error: 'GEMINI_API_KEY não configurada.',
    })
  }

  const { prompt } = request.body

  if (!prompt || typeof prompt !== 'string') {
    return response.status(400).json({
      error: 'Prompt inválido.',
    })
  }

  try {
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text()

      console.error('Erro da Gemini:', errorBody)

      return response.status(geminiResponse.status).json({
        error: 'Erro ao consultar a API de IA.',
      })
    }

    const data = await geminiResponse.json()

    return response.status(200).json(data)
  } catch (error) {
    console.error('Erro na Serverless Function:', error)

    return response.status(500).json({
      error: 'Erro interno ao consultar a IA.',
    })
  }
}