'use server'

import { prisma } from "@/lib/prisma.connection"

export default async function getUserUsername(username: string){
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user){
    return null
  }

  return user
}