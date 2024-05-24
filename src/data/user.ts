import { prisma } from "@/lib/prisma.connection"

export const getUserByUsername = async (username: string) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  } catch{
    return null
  }
}