import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { simulationFormSteps, type SimulationFormData } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

import { FormStep } from './FormStep'
import { StepProgress } from './Progress'

export function SimulationForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)
  const { saveFormData } = useSimulationStorage()
  const navigate = useNavigate()

  const totalSteps = simulationFormSteps.length
  const currentStep = simulationFormSteps[currentStepIndex]

  const handleNextStep = (value: string) => {
    const updatedFormData = {
      ...formData,
      [currentStep.id]: value,
    } as SimulationFormData

    setFormData(updatedFormData)

    if (currentStepIndex === totalSteps - 1) {
      const id = saveFormData(updatedFormData)
      void navigate(`/resultado/${id}`)
      return
    }

    setCurrentStepIndex((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return
    }

    setCurrentStepIndex((prev) => prev - 1)
  }

  return (
    <>
      <StepProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        hideBackButton={currentStepIndex === 0}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
      />
    </>
  )
}
