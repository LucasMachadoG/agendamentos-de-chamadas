'use client'

import getSession from "@/app/_actions/getSession"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface UserSessionProps{
  email?: string
  id?: string
  image?: string
  name?: string
  username?: string
  bio?: string
}

export default function Agendamento(){
  const [user, setUser] = useState<UserSessionProps | null>()

  useEffect(() => {
    (async () => {
      const session = await getSession()

      if(!session?.user?.image || !session.user.name || !session.user.bio){
        return null
      }

      setUser({
        image: session.user.image,
        name: session.user.name,
        bio: session.user.bio
      })
    })()
  }, [])

  return(
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-xl mt-20">
        <div className="w-full flex flex-col items-center space-y-3">
          <Avatar>
            <AvatarImage src={user?.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-white text-2xl font-bold">{user?.name}</span>
          <span className="text-gray-200">{user?.bio}</span>
        </div>
      </div>
    </div>
  )
}