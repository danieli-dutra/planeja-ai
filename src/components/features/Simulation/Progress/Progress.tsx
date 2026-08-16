interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-4">
      <p className="mb-2 text-sm text-muted-foreground">
        Passo {currentStep} de {totalSteps}
      </p>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Passo ${currentStep} de ${totalSteps}`}
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}