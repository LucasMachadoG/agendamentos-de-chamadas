'use client'

import { z } from "zod";
import InputComponent from "../components/InputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonComponent from "../components/ButtonComponent";
import { FaArrowRight } from "react-icons/fa";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const formCadastrarSchema = z.object({
  email: z.string().email({ message: "Informe um email válido."}),
  password: z.string().min(6, { message: "Informe a senha." })
})

type formCadastrarData = z.infer<typeof formCadastrarSchema>

export default function Login(){
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<formCadastrarData>({
    resolver: zodResolver(formCadastrarSchema)
  })

  const handleClaimUserName = async (data: formCadastrarData) => {
    try{
      const { email, password } = data

      const result = await api.post('/users/login', {
        email, 
        password
      })

      toast.success("Login efetuado com sucesso.")
      router.push('/dashboard')

    }catch(error: any){
      if(error instanceof AxiosError && error?.response?.data?.message){
        toast.error(error.response.data.message)
        return
      }

      toast.error(error)
    }
  }

  return(
    <div className="w-full h-screen flex justify-center">
        <div className="max-w-xl mt-20 flex flex-col">
          <div className="w-full flex flex-col">
            <span className="text-2xl font-bold text-white">Realizar login</span>
            <span className="text-gray-200">Realize o seu login para poder utilizar o nosso site!</span>
          </div>
          <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full mt-3 flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
            <InputComponent register={register('email')} label="Email" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
            <span className="text-xs text-red-500">{errors.email ? errors.email.message : null}</span>
            <InputComponent type="password" register={register('password')} label="Senha" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
            <span className="text-xs text-red-500">{errors.password ? errors.password.message : null}</span>
            <ButtonComponent disabled={isSubmitting} className="text-white bg-ignite-300" type="submit" title="Entrar" icon={<FaArrowRight />} />
          </form>
        </div>
    </div>
  )
}