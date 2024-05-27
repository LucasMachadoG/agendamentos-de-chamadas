import { prisma } from "@/lib/prisma.connection";

export default async function getUserById(id: string){
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