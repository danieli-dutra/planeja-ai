import { type SimulationFormData } from '@/data/simulation'

import type { InsightData } from '@/services/aiService'

const LOCAL_STORAGE_KEY = 'simulation-data'

export type SimulationRecord = SimulationFormData & {
  id: string
  insight?: InsightData
}

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []
    const id = crypto.randomUUID()
    const record: SimulationRecord = { ...formData, id }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []
    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  const getFormData = (id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.find((record) => record.id === id) ?? null
  }

  const getLatestFormData = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.at(-1) ?? null
  }

  const getAllFormData = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return [] as SimulationRecord[]
    }

    return JSON.parse(storage) as SimulationRecord[]
  }

  const deleteFormData = (id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    const updated = savedData.filter((record) => record.id !== id)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    saveFormData,
    updateSimulation,
    getFormData,
    getLatestFormData,
    getAllFormData,
    deleteFormData,
  }
}