'use client'

import { useEffect, useState } from "react";
import MultiStep from "../components/MultiStep";
import FormCadastrar from "./components/FormCadastrar";
import Header from "./components/Header";

export default function Cadastrar(){
  const [step, setStep] = useState(() => {
    const formStepString = localStorage.getItem('register-form-step')
    const formStepData = formStepString ? parseInt(formStepString) : 0

    return formStepData
  })  

  useEffect(() => {
    localStorage.setItem('register-form-step', JSON.stringify(step))
  }, [step])

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const backStep = () => {
    setStep((prev) => prev - 1);
  }

  const formComponenst = [
    {

    }, 
    {

    }, 
    {

    }, 
    {
      
    }
  ]

  return(
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-xl mt-20">
        <Header />
        <MultiStep size={4} currentStep={step} />
        <FormCadastrar />
      </div>
    </div>
  )
}