'use client'

import getSession from "@/app/_actions/getSession";
import Button from "@/app/components/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const updateProfileSchema = z.object({
  bio: z.string().optional(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function Step4(){
  const [imageUrl, setImageUrl] = useState<string>('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  useEffect(() => {
    (async () => {
      const session = await getSession()

      if(!session?.user?.image || !session.user.username){
        return null
      }

      setImageUrl(session.user.image)
      setUsername(session.user.username)
    })()
  }, [])

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try{
      const { bio } = data

      const result =await api.put('/users/atualizar', {
        bio
      })

      toast.success("Perfil atualizado com sucesso!")
      localStorage.removeItem('register-form-step')
      router.push(`/agendamento/${username}`)
    }catch(error: any){
      if (error instanceof AxiosError && error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }

      toast.error(error.message);
    }
  }

  return(
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full flex flex-col rounded-lg gap-2 space-y-3 bg-gray-800 p-4">
        <div className="flex flex-col space-y-4">
          <span className="text-gray-100 text-sm">Foto de perfil</span>
          <div className="flex gap-3 items-center">
            <div>
              <Avatar>
                <AvatarImage src={imageUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button
              disabled
              className="text-ignite-300 h-full border border-ignite-300 text-sm px-2 py-2 font-medium rounded-lg"
            >
              Selecionar foto
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-100 text-sm">Sobre você</span>
          <textarea {...register('bio')} maxLength={250} className="bg-gray-900 resize-none h-[100px] rounded-lg p-2 text-gray-100 text-xs" />
          <span className="text-gray-200 text-sm">Fale um pouco sobre você. Isto será exibido em sua página pessoal.</span>
        </div>

        <Button
          type="submit"
          className="text-white bg-ignite-300 text-sm px-2 py-3 font-medium rounded-lg flex gap-2 justify-center items-center"
        >
          Finalizar
          <FaArrowRight />
        </Button>
      </form>
    </div>
    
  )
}