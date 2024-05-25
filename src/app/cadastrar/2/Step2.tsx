'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa"
import { z } from "zod"
import { signIn } from "next-auth/react"
import FormError from "@/app/components/FormError"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Button from "@/app/components/Button"
import getSession from "@/app/_actions/getSession"
import { CheckIcon } from "@radix-ui/react-icons"

interface NextStep{
  nextStep: () => void
}

const formCadastrarSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase()),
  name: z.string().min(3,{message: 'Nome precisa ter pelo menos 3 letras.'})
})

type formCadastrarData = z.infer<typeof formCadastrarSchema>
 
export default function Step2({ nextStep }: NextStep){
  const [messageError, setMessageError] = useState<string>('')
  const [isSignedIn, setIsSignedIn] = useState(false);

  const searchParams = useSearchParams()

  useEffect(() => {
    const hasAuthError = searchParams.get('error')

    if(hasAuthError){
      setMessageError('Falha ao se conectar com o Google, verifique se você habilitou as permissões de acesso ao Google Calendar.')
    }
  }, [])

  useEffect(() => {
    (async () => {
      const session = await getSession()

      
      if(session){
        setIsSignedIn(true)
      }

      console.log(session?.user)

      return null
    })()
  }, [])

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: '/cadastrar'
    })
  }

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formCadastrarData>({
    resolver: zodResolver(formCadastrarSchema)
  })

  const handleClaimUserName = async (data: formCadastrarData) => {
    
  }

  return(
    <div className="mt-6">
      <form className="w-full flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
        <div className="w-full flex justify-between items-center bg-gray-800 border py-4 px-5 border-gray-600 rounded-lg">
          <span className="text-gray-100 font-medium">Google Agenda</span>
          {isSignedIn ? (
            <Button 
              disabled={isSignedIn}
              className="rounded-lg flex gap-2 justify-center items-center text-white bg-ignite-300 text-sm px-2 py-3 font-medium"
            >
              Conectado
              <CheckIcon className="h-5 w-5" />
            </Button> 
          ) : (
            <Button
            onClick={() => onClick('google')}
            type="button"
            className="text-ignite-300 px-4 py-3 border border-ignite-300 
              hover:bg-ignite-300 hover:text-white transition duration-300 text-sm font-medium 
              rounded-lg flex gap-2 justify-center items-center"
          >
            <FaArrowRight />
            Conectar
          </Button>
          )}
          
        </div>
        <FormError message={messageError} />
        <Button onClick={nextStep} disabled={!isSignedIn} className="text-white bg-ignite-300 text-sm px-2 py-3 font-medium rounded-lg flex gap-2 justify-center items-center">
          <FaArrowRight />
          Próximo passo
        </Button>
      </form>

    </div>
  )
}