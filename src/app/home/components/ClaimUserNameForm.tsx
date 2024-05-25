'use client'

import InputComponent from "@/app/components/InputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { z } from "zod";
import FormAnnotation from "../../components/FormAnnotation";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export default function ClaimUserNameForm(){
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema)
  })

  const handleClaimUserName = async (data: ClaimUserNameFormData) => {
    const { username } = data

    await router.push(`http://localhost:3000/cadastrar?username=${username}`)
  }

  return(
    <div>
      <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full justify-center flex gap-4 items-center rounded-lg bg-gray-800 p-3">
        <InputComponent type="text" register={register('username')} placeholder="Insira o seu nome"/>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-ignite-300 text-sm px-2 py-3 
          font-medium rounded-lg flex gap-2 justify-center items-center"
        >
          Reservar usuário
          <FaArrowRight />
        </Button>
      </form>
      <FormAnnotation>
        <span className="text-xs">{errors.username ? errors.username.message : null}</span>
      </FormAnnotation>
    </div>
  )
}