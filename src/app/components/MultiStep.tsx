'use client'

import { useState } from "react"

interface multiStepProps{
  size: number
  currentStep: number
}

export default function MultiStep({ size, currentStep }: multiStepProps){
  const [steps, setSteps] = useState<number[]>(Array(size).fill(0))

  return(
    <div className="w-full flex flex-col mt-2">
      <span className="text-gray-200 text-xs mb-1">Passo {currentStep} de {size}</span>
      <div className="flex gap-2">
        {steps.map((step, index) => (
          <div
            className={`w-full h-1 rounded-lg ${
              index + 1 <= currentStep ? 'bg-green-500' : 'bg-gray-600'
            }`}
            key={index}
        ></div>
        ))}
      </div>
    </div>
  )
}