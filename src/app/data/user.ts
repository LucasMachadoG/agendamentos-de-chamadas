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