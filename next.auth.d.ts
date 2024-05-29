import { UserUsername, UserBio } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  username: UserUsername
  bio: UserBio
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}