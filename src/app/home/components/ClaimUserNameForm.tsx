'use client'

import ButtonComponent from "@/app/components/ButtonComponent";
import InputComponent from "@/app/components/InputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { z } from "zod";
import FormAnnotation from "../../components/FormAnnotation";

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export default function ClaimUserNameForm(){
  const { register, handleSubmit, formState: { errors } } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema)
  })

  const handleClaimUserName = (data: ClaimUserNameFormData) => {
    console.log(data)
  }

  return(
    <div>
      <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full justify-center flex gap-4 items-center rounded-lg bg-gray-800 p-3">
        <InputComponent type="text" register={register('username')} placeholder="Insira o seu nome"/>
        <ButtonComponent icon={<FaArrowRight />} title="Reservar usuário" type="submit" className="text-white bg-ignite-300" />
      </form>
      <FormAnnotation>
        <span className="text-xs">{errors.username ? errors.username.message : null}</span>
      </FormAnnotation>
    </div>
  )
}