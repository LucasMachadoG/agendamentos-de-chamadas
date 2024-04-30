'use client'

import ButtonComponent from "@/app/components/ButtonComponent";
import InputComponent from "@/app/components/InputComponent";
import FormAnnotation from "@/app/components/FormAnnotation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { z } from "zod";

const formCadastrarSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase()),
  fullname: z.string().min(3,{message: 'Nome precisa ter pelo menos 3 letras.'})
})

type formCadastrarData = z.infer<typeof formCadastrarSchema>

export default function ClaimUserNameForm(){
  const { register, handleSubmit, formState: { errors } } = useForm<formCadastrarData>({
    resolver: zodResolver(formCadastrarSchema)
  })

  const handleClaimUserName = (data: formCadastrarData) => {
    console.log(data)
  }

  return(
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full flex flex-col rounded-lg bg-gray-800 p-4">
        <InputComponent register={register('username')} label="Nome de usuário" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
        <span className="text-xs">{errors.username ? errors.username.message : null}</span>
        <InputComponent register={register('fullname')} label="Nome completo" placeholder="" ClassNameInput="w-full p-3" ClassNameLabel="text-sm text-gray-100"/>
        <span className="text-xs">{errors.fullname ? errors.fullname.message : null}</span>
        <ButtonComponent type="submit" title="Próximo passo" icon={<FaArrowRight />} />
      </form>
    </div>
  )
}