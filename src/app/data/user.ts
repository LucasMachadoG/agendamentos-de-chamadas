import { prisma } from "@/lib/prisma.connection";

export default async function getUserById(id: string | undefined){
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(!user){
    return null
  }

  return user
}

export async function getUserByUsername(username: string){
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