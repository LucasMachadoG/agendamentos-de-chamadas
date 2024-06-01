"use client"

import getUserUsername from "@/app/_actions/getUserUsername"
import FormError from "@/app/components/FormError"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Step1 from "./1/Step1"

export default function Agendamento(){
  const [user, setUser] = useState<User | null>()
  const [error, setError] = useState("")

  const params = useParams()

  const { username } = params

  useEffect(() => {
    (async () => {
      const user = await getUserUsername(username as string)

      if(!user){
        setError("Usuário não encontrado!")
      }

      setUser(user)
    })()
  }, [])

  if(!user){
    return (
      <div className="h-full w-full flex justify-center items-center">
        <FormError message={error} />
      </div>
    )
  }

  console.log(user)
  
  return(
    <div className="w-full h-screen flex items-center flex-col">
      <div className="max-w-xl mt-20">
        <div className="w-full flex flex-col items-center space-y-3">
          <Avatar>
            <AvatarImage src={user?.image as string} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-white text-2xl font-bold">{user?.name}</span>
          <span className="text-gray-200">{user?.bio}</span>
        </div>
      </div>
      <Step1 />
    </div>
  )
}