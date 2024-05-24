'use client'
''
import ButtonComponent from "@/app/components/ButtonComponent"
import InputComponent from "@/app/components/InputComponent"
import { IoIosArrowBack } from "react-icons/io";
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa"
import { toast } from "sonner"
import { z } from "zod"
import Link from "next/link";

interface NextStep{
  nextStep: () => void
}

const formCadastrarSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase()),
  name: z.string().min(3,{message: 'Nome precisa ter pelo menos 3 letras.'}),
})

type formCadastrarData = z.infer<typeof formCadastrarSchema>

export default function Step1({ nextStep }: NextStep){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formCadastrarData>({
    resolver: zodResolver(formCadastrarSchema)
  })

  const queryParams = useSearchParams()

  const username = queryParams.get('username')

  const handleClaimUserName = async (data: formCadastrarData) => {
    try{
      const { username, name } = data

      const result = await api.post("/users", {
        username, 
        name,
      })

      toast.success("Cadastro realizado com sucesso.")
      nextStep()
    }catch(error: any){
      if(error instanceof AxiosError && error?.response?.data?.message){
        toast.error(error.response.data.message)
        return
      }

      toast.error(error)
    }
  }

  return(
    <div className="mt-6 space-y-4">
      <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
        <InputComponent value={username} register={register('username')} label="Nome de usuário" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
        <span className="text-xs text-red-500">{errors.username ? errors.username.message : null}</span>
        <InputComponent register={register('name')} label="Nome completo" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
        <span className="text-xs text-red-500">{errors.name ? errors.name.message : null}</span>
        <ButtonComponent disabled={isSubmitting} className="text-white bg-ignite-300" type="submit" title="Próximo passo" icon={<FaArrowRight />} />
        <div className="mt-4 flex gap-2 items-center">
          <IoIosArrowBack className="h-5 w-5 text-ignite-300" />
          <Link href={"/"} className="text-ignite-300 text-sm">Voltar</Link>
        </div>
      </form>
    </div>
  )
}