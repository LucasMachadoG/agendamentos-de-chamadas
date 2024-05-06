'use client'

import { useEffect, useState } from "react";
import MultiStep from "../components/MultiStep";
import FormCadastrar from "./components/FormCadastrar";
import Header from "./components/Header";
import Step1 from "./1/Step1";
import Step2 from "./2/Step2";

export default function Cadastrar(){
  const [step, setStep] = useState(() => {
    const formStepString = localStorage.getItem('register-form-step')
    const formStepData = formStepString ? parseInt(formStepString) : 1

    return formStepData
  })  

  console.log(step - 1)

  useEffect(() => {
    localStorage.setItem('register-form-step', JSON.stringify(step))
  }, [step])

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const backStep = () => {
    setStep((prev) => prev - 1);
  }

  const formComponents = [
    {
      header: <Header 
        title="Bem vindo ao Ignite Call!"
        content="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."  
      />,
      form: <Step1 nextStep={nextStep} />
    }, 
    {
      header: <Header
        title="Conecte sua agenda!"
        content="Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos 
        à medida em que são agendados."
      />,
      form: <Step2 />
    }, 
    {
      header: <Header
        title="Quase lá"
        content="Defina o intervalo de horários que você está disponível em cada dia da semana."
      />
    }, 
    {
      header: <Header 
        title="Defina sua disponibilidade"
        content="Por último, uma breve descrição e uma foto de perfil."
      />
    }
  ]

  return(
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-xl mt-20">
        {formComponents[step - 1]?.header}
        <MultiStep size={4} currentStep={step} />
        {formComponents[step - 1]?.form}
      </div>
    </div>
  )
}